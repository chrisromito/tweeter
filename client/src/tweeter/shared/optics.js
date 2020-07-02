/**
 * @module optics - Lenses & functional-domains for tweeter
 */
import * as R from 'ramda'
import * as moment from 'moment'


//-- Date Utils
export const isDate = d => moment(d).isValid()

export const eitherDate = left => right =>
    R.ifElse(
        isDate,
        R.pipe(
            moment,
            right
        ),
        left
    )


const dateOrEmpty = eitherDate(R.always(''))

const numericDate = eitherDate(R.always(0))(
    R.pipe(
        m => m.toDate(),
        Number
    )
)

const fromNow = dateOrEmpty(m => m.fromNow(true))


export const formatDate = {
    fromNow,
    toString: dateOrEmpty(m => m.format('ddd, D of MMM YY')),
    toNumber: numericDate
}


//-- Lenses
export const idLens = R.lensPath(['id'])
export const updatedLens = R.lensPath(['updated'])
export const createdLens = R.lensPath(['created'])


const lensMap = {
    id: idLens,
    updated: updatedLens,
    created: createdLens
}

export const postLenses = {
    ...lensMap,
    body: R.lensPath(['body']),
    user: R.lensPath(['_', 'user'])
}


const postMapPostLens = R.lensPath(['_', 'post'])


export const postMapLenses = {
    ...lensMap,
    postId: R.lensPath(['post_id']),
    fromPostId: R.lensPath(['from_post_id']),
    fromPost: R.lensPath(['_', 'from_post']),
    post: postMapPostLens,
    created: R.compose(
        postMapPostLens,
        createdLens
    ),
    updated: R.compose(
        postMapPostLens,
        updatedLens
    )
}


//-- Lens Utils
export const uniqById = R.uniqBy( R.view(idLens) )


export const findById = id => list =>
    R.find(x => R.view(idLens, x) === id, list)


export const updateById = o => list => {
    const id = R.view(idLens, o)
    const updateResult = list.reduce(
        ({ updated, accum }, item)=> {
            if (R.view(idLens, item) === id) {
                return {
                    updated: true,
                    accum: accum.concat(o)
                }
            }
            return R.view(idLens, item) !== id
                ? {
                    updated,
                    accum: accum.concat(item)
                }
                : {
                    updated: true,
                    accum: accum.concat(o)
                }
        },
        {
            updated: false,
            accum: []
        })

    return updateResult.updated
        ? updateResult.accum
        : list.concat(o)
}

