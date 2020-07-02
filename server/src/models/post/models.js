import {
    ASSOCIATE,
    ASSOCIATE_MODULE,
    extendModel,
    SQL
} from '../base'


/**
 * @typedef {Object} post
 * @property {Number} id
 * @property {Number} user_id - The user that created the post
 * @property {String} body
 * @property {Date} created
 * @property {(Date|null)} updated
 */
export const Post = extendModel('post',
    model => ({
        assocUser: ()=>
            ASSOCIATE_MODULE`
                - user ${{
                    left_key: 'user_id',
                    table: 'app_user'
               }}
            `
    })
)

/**
 * @typedef {Object} postMap
 * @property {Number} id
 * @property {(Number|null)} from_post_id - The parent post_id
 * @property {Number} post_id - The target/current post
 * @property {(String|null)} avatar
 * @property {Date} created
 * @property {(Date|null)} updated
 */
export const PostMap = extendModel('post_map',
    model => ({
        inject: sql =>
            ASSOCIATE`
                post_map ${sql}
                    ${PostMap.assocPosts}
            `,
        all: ()=> PostMap.inject(SQL`ORDER BY post_map.created DESC`),

        getPostId: ({ id }) =>
            PostMap.selectOneWhere({ id }, 'post_id')
                .then(data =>
                    data
                        ? data.post_id
                        : null
                ),

        assocPosts: ()=>
            ASSOCIATE_MODULE`
                - post ${{
                    key: 'id',
                    left_key: 'post_id',
                    table: 'post'
                }}
                    ${Post.assocUser}
                - from_post ${{
                    key: 'id',
                    left_key: 'from_post_id',
                    table: 'post'
                }}
                    ${Post.assocUser}
            `,

        /**
         * @method mapPost - Auto-magically generate a post/reply,
         * & align it to its parent post
         * @param {Number} parentId
         * @param {Object} postData
         * @returns {Promise<postMap>}
         */
        mapPost: (parentId, postData)=>
            Post.insert(postData)
                .then(post =>
                    model.insert({
                        from_post_id: parentId,
                        post_id: post.id
                    })
                )
    })
)
