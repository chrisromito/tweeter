import Vue from 'vue'
import vuetify from '../plugins'
import store from './store'
import AppBar from './components/AppBar.vue'
import AppBody from './components/AppBody.vue'


Vue.component('UserAvatar', () => import('./components/shared/UserAvatar.vue'))


const app = new Vue({
    store,
    vuetify,
    components: {
        AppBar,
        AppBody
    },
    el: '#app',
    mounted() {
        this.$store.dispatch('init')
        this.$store.dispatch('user/init')
        this.$store.dispatch('post/init')
    }
})


window.app = app
