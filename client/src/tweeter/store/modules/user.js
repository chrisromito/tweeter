import * as R from 'ramda'
import mutations from 'common/mutations'

const State = {
    isLoading: false,
    isSaving: false,
    apiUrl: '/api/user/',
    users: [],
    currentUser: {
        id: null,
        first_name: null,
        last_name: null,
        email: null,
        username: null
    }
}


const Actions = {
    init: ({ state, dispatch, commit }) => {
        commit('setProps', {
            apiUrl: window.__APP__.userApi,
            isLoading: true
        })

        return fetch(state.apiUrl)
            .then(resp => resp.json())
            .then(users => {
                commit('setProps', {
                    users,
                    isLoading: false
                })

                const userId = users.length ? users[0].id : {}
                dispatch('setUser', { id: userId })
                return users
            })
            .catch(e => {
                commit('setProps', { isLoading: false })
                return Promise.reject(e)
            })
    },

    setUser: ({ state, dispatch, commit }, { id })=> {
        const user = state.users.find(R.propEq('id', id)) || { id: null }
        commit('mergeProp', {
            key: 'currentUser',
            value: user
        })
        return Promise.resolve(user)
    }
}


export default {
    mutations,
    namespaced: true,
    state: State,
    getters: {},
    actions: Actions
}
