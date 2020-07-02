import Vue from 'vue'
import Vuex from 'vuex'
import { toPojo } from 'common/utils'
import mutations from 'common/mutations'
import post from './modules/post'
import user from './modules/user'


Vue.use(Vuex)

const strict = process.env.NODE_ENV !== 'production'



export default new Vuex.Store({
    mutations,
    strict,
    modules: {
        post,
        user
    },

    actions: {
        init: ({ state, commit })=>
            new Promise(resolve =>
                requestAnimationFrame(() => {
                    commit('setProps', { isLoading: false })
                    resolve( toPojo(state) )
                })
            )
    },
    state: {
        isLoading: false
    }
})
