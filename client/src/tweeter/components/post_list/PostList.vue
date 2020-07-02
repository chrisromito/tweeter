<template>
    <div class="post-list">
        <div v-if="isLoading" class="w-100 fill-height">
            <v-progress-circular
                :size="50"
                color="primary"
                indeterminate
            />
        </div>
        <v-container v-if="!isLoading" fluid>
            <v-row
                v-for="postMap in rootPosts"
                :key="postMap.id"
                justify="center"
                align="center"
                no-gutters
            >
                <v-col>
                    <PostCard :postMap="postMap"/>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import { mapGetters, mapState } from 'vuex'
    import { compose, complement, filter, isNil, view } from 'ramda'
    import { postMapLenses } from '../../shared/optics'
    import PostCard from './PostCard.vue'


    const isRootPostMap = compose(
        isNil,
        view(postMapLenses.fromPostId)
    )


    export default {
        name: 'PostList',
        components: {
            PostCard
        },
        computed: {
            ...mapState('post', [
                'isLoading',
                'isSaving'
            ]),
            ...mapGetters('post', [
                'sortPosts'
            ]),

            rootPosts() {
                const { sortPosts } = this
                return filter(
                    isRootPostMap,
                    sortPosts
                )
            }
        }
    }
</script>

<style scoped>

</style>
