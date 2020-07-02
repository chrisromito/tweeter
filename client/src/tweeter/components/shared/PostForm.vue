<template>
    <v-form
        ref="form"
        lazyValidation
        :value="isValid"
        class="w-100 rel pt-2"
    >
        <v-container fluid>
            <v-row justify="start" align="start" no-gutters>
                <v-col>
                    <!-- Current user avatar -->
                    <UserAvatar :user="currentUser" :size="50" textSize="text-size-plus-half" />
                </v-col>
                <v-col cols="10" xs="8">
                    <!-- Input -->
                    <v-textarea
                        @blur="onBlur"
                        v-model="body"
                        :rules="[
                            validateBody
                        ]"
                        placeholder="What's happening?"
                        counter
                    />
                </v-col>
                <v-spacer />
            </v-row>
            <v-row align="center" justify="end">
                <v-spacer />
                <v-col cols="2">
                    <v-btn
                        @click="submit"
                        :disabled="!isValid || isSaving || isLoading"
                        color="green darken-2"
                        right
                    >
                        Tweet
                    </v-btn>
                </v-col>
            </v-row>

            <v-divider/>
        </v-container>
    </v-form>
</template>

<script>
    import { mapState } from 'vuex'
    import UserAvatar from './UserAvatar.vue'


    export default {
        name: 'PostForm',
        props: {
            from_post_id: {
                type: Number,
                required: false
            }
        },
        computed: {
            ...mapState('user', [
                'currentUser'
            ]),

            ...mapState('post', [
                'isLoading',
                'isSaving'
            ])
        },

        data() {
            return {
                isValid: false,
                body: ''
            }
        },

        watch: {
            body(body) {
                this.isValid = this.validateBody(body) && this.$refs.form.validate()
            }
        },

        methods: {
            //-- Event Handlers
            submit() {
                if (this.currentUser.id && this.$refs.form.validate()) {
                    this.$store.dispatch('post/createPost', {
                        body: this.body,
                        user_id: this.currentUser.id,
                        from_post_id: this.from_post_id || null
                    }).finally(()=> {
                        this.reset()
                    })
                }
            },

            onBlur() {
                const canReset = !this.body || !String(this.body).length
                if (canReset) {
                    this.reset()
                }
            },

            //-- Methods
            validateBody(text) {
                const trimmed = String(text).trim()
                return Boolean(
                    text
                    && trimmed.length
                    && trimmed.length <= 240
                )
            },


            reset() {
                this.isValid = true
                this.body = ''
                this.$refs.form.resetValidation()
                this.$refs.form.reset()
            }
        }
    }
</script>
