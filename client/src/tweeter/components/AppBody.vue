<template>
    <v-container
        id="app-body-container"
        class="justify-start align-start pt-10"
        fluid
    >
        <!-- Post form -->
        <v-row justify="center" align="center">
            <v-col cols="10" lg="10" xs="12">
                <PostForm class="main-post-form" />
            </v-col>
        </v-row>
        <v-row justify="center" align="start">
            <v-col cols="10" lg="10" xs="12">
                <PostList />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import { mapState } from 'vuex'
    import PostForm from './shared/PostForm.vue'
    import PostList from './post_list/PostList.vue'

    export default {
        name: 'AppBody',
        components: {
            PostForm,
            PostList
        },

        computed: {
            ...mapState('post', [
                'isLoading',
                'isSaving',
                'posts'
            ]),

            sortedPosts() {
                return this.$store.getters['post/sortPosts']
            }
        }
    }
</script>

<style scoped>

</style>
