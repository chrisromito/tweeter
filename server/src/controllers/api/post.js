import * as R from 'ramda'
import { ASSOCIATE, SQL } from 'models/base'
import { Post, PostMap } from 'models/post/models'

const queryCatcher = res => e => {
    console.error(e)
    return res.sendStatus(500)
}



// -- Read methods
//-- List PostMaps GET /api/post/
const getPostMapList = (req, res)=> {
    console.log('getPostMapList()')
    return PostMap.all()
        .then(list => res.send(list))
        .catch(queryCatcher(res))
}


//-- Single PostMap - GET /api/post/id/
const getPostMapDetail = (req, res)=> {
    const { id } = req.params
    return PostMap.inject(SQL`WHERE id = ${id} LIMIT 1`)
        .then(
            R.pipe(
                R.head,
                R.ifElse(
                    R.complement(R.isNil),
                    postMap => res.send(postMap),
                    ()=> res.sendStatus(404)
                )
            )
        )
        .catch(queryCatcher(res))
}

//-- Create PostMap - POST /api/post/
const createPostMap = (req, res)=> {
    console.log('createPostMap()')
    console.log(req.body)
    const postFields = {
        body: req.body.body,
        user_id: req.body.user_id
    }
    const parentId = req.body.from_post_id
        ? Number(req.body.from_post_id)
        : null

    return PostMap.mapPost(parentId, postFields)
        .then(({ id }) =>
            PostMap.inject(SQL`WHERE id = ${id} LIMIT 1`)
        )
        .then(postMap => res.send(postMap))
        .catch(queryCatcher(res))
}

//-- Delete PostMap - DELETE /api/post/id/
const deletePostMap = (req, res)=> {
    const { id } = req.params

    return PostMap.selectOneWhere({ id })
        .then(postMap => {
            if (!postMap) {
                return res.sendStatus(404)
            }
            return Post.deleteWhere({ id: postMap.post_id })
                .then(() => PostMap.deleteWhere({ id }))
                .then(()=>
                    res.send({
                        id,
                        post_id: postMap.post_id
                    })
                )
        })
        .catch(queryCatcher(res))
}

//-- Update PostMap - PATCH /api/post/id/
const updatePostMap = (req, res)=> {
    const { id } = req.params
    const { user_id, body } = req.body

    return PostMap.getPostId({ id })
        .then(postId =>
            Post.updateWhere({ user_id, id: postId }, body)
        )
        .then(()=>
            PostMap.inject(SQL`WHERE id = ${id} LIMIT 1`)
        )
        .then(R.head)
        .then(postMap => res.send(postMap))
        .catch(queryCatcher(res))
}


export const PostApi = {
    list: getPostMapList,
    detail: getPostMapDetail,
    create: createPostMap,
    update: updatePostMap,
    destroy: deletePostMap
}

export default PostApi
