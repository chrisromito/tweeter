<template>
    <v-app-bar
        absolute
        dark
        hide-on-scroll
        scroll-target="#app-body-container"
    >
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>
            Tweeter
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu
            v-if="!isLoading"
            v-model="menu"
            bottom
            left
            closeOnClick
        >
            <!-- Open Button -->
            <template v-slot:activator="{ attrs, on }">
                <v-btn
                    v-on="on"
                    v-bind="attrs"
                    tile
                >
                    <template v-if="currentUser.id">
                        <UserAvatar :user="currentUser"/>
                        <span class="px-3">
                            @{{ currentUser.username }}
                        </span>
                    </template>
                </v-btn>
            </template>
            <!-- Options -->
            <v-list>
                <v-list-item-group
                    @input="u => setCurrentUser(u.id)"
                    :value="currentUser.id"
                >
                    <v-list-item
                        v-for="user in users"
                        :key="user.id"
                        :value="user.id"
                        @click="setCurrentUser(user.id)"
                    >
                        <v-list-item-avatar>
                            <UserAvatar :user="user" />
                        </v-list-item-avatar>
                        <v-list-item-title>
                            @{{ user.username }}
                        </v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-menu>
    </v-app-bar>
</template>

<script>
    import { mapState } from 'vuex'


    export default {
        name: 'AppBar',
        computed: {
            ...mapState('user', [
                'currentUser',
                'users',
                'isLoading'
            ]),

            activeUserId: {
                get() {
                    return this.currentUser.id
                },

                set(id) {
                    this.setCurrentUser(id)
                }
            }
        },

        data() {
            return {
                menu: false
            }
        },

        methods: {
            userInitials(user) {
                return `${user.first_name[0]}${user.last_name[0]}`.toUpperCase()
            },
            setCurrentUser(id) {
                console.log('setCurrentUser()')
                console.log(id)
                this.$store.dispatch('user/setUser', { id })
            }
        }
    }
</script>

<style scoped>

</style>
