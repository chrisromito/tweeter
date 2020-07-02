<template>
    <v-avatar
        v-on="$listeners"
        v-bind="$attrs"
        :color="color"
        :size="size"
    >
        <span :class="[textColor, textSize, 'text-center']">
            {{ userInitials }}
        </span>
    </v-avatar>
</template>

<script>
    export default {
        name: 'UserAvatar',
        props: {
            user: {
                type: Object,
                required: true
            },
            color: {
                type: String,
                default: 'red'
            },
            textColor: {
                type: String,
                default: 'white--text'
            },
            textSize: {
                type: String,
                default: 'text-subtitle-2'
            },
            size: {
                type: Number,
                default: 30
            }
        },
        computed: {
            userInitials() {
                const { first_name, last_name } = this.user
                const firstLetter = (first_name || ' ')[0]
                const secondLetter = (last_name || ' ')[0]
                return `${firstLetter}${secondLetter}`.toUpperCase()
            }
        }
    }
</script>
