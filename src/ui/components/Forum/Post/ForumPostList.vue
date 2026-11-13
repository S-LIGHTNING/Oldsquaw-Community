<script setup lang="ts">

import type { BasicForumPost } from "../../../../interfaces/forum/post/basic-forum-post.ts"
import type { ForumPostInList } from "../../../../interfaces/forum/post/forum-post-in-list.ts"
import ForumPostItem from "./ForumPostItem.vue"
import ForumPostLoadingItem from "./ForumPostLoadingItem.vue"

defineProps<{
    posts: (BasicForumPost & Partial<ForumPostInList>)[]
    loading?: boolean
    loadingItemNumber?: number
}>()

</script>

<template>
    <v-sheet v-if="loading">
        <ForumPostLoadingItem class="post-item" v-for="_ in Array(loadingItemNumber ?? 4)" />
    </v-sheet>
    <div v-if="!loading">
        <v-empty-state
            v-if="!loading && posts.length === 0"
            icon="mdi-file-outline"
            title="没有帖子"
        />
        <v-list v-if="posts.length > 0" :elevation="1">
            <ForumPostItem class="post-item" v-for="post in posts" :post />
        </v-list>
    </div>
</template>

<style scoped>
.post-item {
    border-bottom: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}
.post-item:last-child {
    border-bottom: none
}
</style>
