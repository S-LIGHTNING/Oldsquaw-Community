<script setup lang="ts">

import type { CommentInList } from "../../../interfaces/comment/comment-in-list"
import type { User } from "../../../interfaces/user/user.ts"
import CommentItem from "./CommentItem.vue"
import CommentLoadingItem from "./CommentLoadingItem.vue"

defineProps<{
    comments: CommentInList[]
    loading?: boolean
    loadingItemNumber?: number
    author?: User["id"]
    reload?(): Promise<void>
}>()

</script>

<template>
    <v-sheet v-if="loading">
        <CommentLoadingItem class="comment-item" v-for="_ in Array(loadingItemNumber ?? 4)" />
    </v-sheet>
    <div v-if="!loading">
        <v-empty-state
            v-if="comments.length === 0"
            icon="mdi-message-outline"
            title="没有评论"
        />
        <v-list v-if="comments.length > 0" :elevation="1">
            <CommentItem
                class="comment-item"
                v-for="comment in comments"
                :comment
                :author
                :reload
            />
        </v-list>
    </div>
</template>

<style scoped>
.comment-item {
    border-bottom: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}
.comment-item:last-child {
    border-bottom: none
}
</style>
