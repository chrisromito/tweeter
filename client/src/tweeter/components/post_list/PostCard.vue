<template>
    <v-card minWidth="80%" maxWidth="100%">
        <v-card-title>
            <UserAvatar :user="user" />
            <span class="post-card-name title font-weight-light pl-2">
                {{ user.first_name }} {{ user.last_name }}
            </span>
            <span class="post-card-username text-subtitle-1 pl-5 pr-2">
                @{{ user.username }}
            </span>
            <span class="px-1">·</span>
            <span class="post-card-date text-subtitle-1 px-2">
                {{ createdDate }}
            </span>
        </v-card-title>

        <v-card-text class="headline font-weight-bold">
            <div
                v-text="post.body"
                class="post-card-body w-100 text-body-1"
            />
        </v-card-text>

        <!-- Show Replies + Add Reply -->
        <v-card-actions v-if="!isReply">
            <v-container fluid>
                <v-row
                    align="start"
                    justify="center"
                >
                    <v-col>
                        <div @click="showReplies = !showReplies">
                            <v-icon class="mr-1">mdi-comment-outline</v-icon>
                            <span v-if="replies.length" class="subheading mr-2">
                                {{ replies.length }}
                            </span>
                        </div>
                    </v-col>
                </v-row>
                <v-row
                    v-if="showReplies"
                    align="start"
                    justify="start"
                    class="reply-container ml-4"
                >
                    <v-col>
                        <!-- Replies -->
                        <PostCard
                            v-for="reply in replies"
                            :key="'postmap-' + postMap.id + 'reply-' + reply.id"
                            class="post--reply"
                            :postMap="reply"
                        />
                        <PostForm :from_post_id="postMap.id"/>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-actions>
    </v-card>
</template>

<script>
    import { compose, view } from 'ramda'
    import { formatDate, postMapLenses } from '../../shared/optics'
    import PostForm from '../shared/PostForm.vue'

    export default {
        name: 'PostCard',
        components: {
            PostForm
        },

        props: {
            postMap: {
                type: Object,
                required: true
            }
        },

        computed: {
            post() {
                return this.postMap._.post
            },

            user() {
                return this.post._.user
            },

            createdDate() {
                const postMap = this.postMap
                return formatDate.fromNow(
                    view(postMapLenses.created, postMap)
                )
            },

            isReply() {
                return null !== this.postMap.from_post_id
            },

            replies() {
                return this.$store.getters['post/getReplies'](this.postMap.id)
            }
        },

        data() {
            return {
                showReplies: false
            }
        }
    }
</script>
<style lang="scss">
    $subtle-border: 1px solid rgba(255, 255, 255, 0.25);

    .reply-container {
        // border-left: $subtle-border;
    }
</style>
