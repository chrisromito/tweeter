import * as R from 'ramda'
import mutations from 'common/mutations'
import {
    idLens,
    postLenses,
    postMapLenses,
    formatDate,
    findById
} from '../../shared/optics'


const State = {
    isLoading: false,
    isSaving: false,
    apiUrl: '/api/user/',
    posts: [],
    detail: {
        isLoading: false,
        isSaving: false,
        id: null,
        data: {},
    }
}

const Actions = {
    init: ({ dispatch, commit }) => {
        commit('setProps', {
            apiUrl: window.__APP__.postApi
        })

        return dispatch('loadPosts')
    },

    loadPosts: ({ state, dispatch, commit }) => {
        commit('setProps', {
            isLoading: true
        })

        return fetch(state.apiUrl)
            .then(resp => resp.json())
            .then(posts => {
                commit('setProps', {
                    posts,
                    isLoading: false
                })

                return posts
            })
            .catch(e => {
                commit('setProps', { isLoading: false })
                return Promise.reject(e)
            })
    },

    // API CRUD
    createPost: ({ state, dispatch, commit }, data)=> {
        return fetch(state.apiUrl, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(resp => resp.json())
            .then(post => {
                commit('setProps', {
                    posts: state.posts.concat(post)
                })
                return post
            })
    }
}


const sortPosts = R.pipe(
    R.sortBy(
        R.pipe(
            R.view(postMapLenses.created),
            formatDate.toNumber
        )
    ),
    R.reverse
)


export default {
    mutations,
    namespaced: true,
    state: State,
    getters: {
        sortPosts: state => {
            return sortPosts(state.posts)
        },

        getReplies: state => postMapId => {
            const postMap = findById(postMapId)(state.posts)
            const parentPostId = R.view(postMapLenses.postId, postMap)
            const getter = R.pipe(
                R.filter(
                    R.pipe(
                        R.view(postMapLenses.fromPostId),
                        id => id === parentPostId
                    )
                ),
                sortPosts
            )
            return getter(state.posts)
        }
    },
    actions: Actions
}
