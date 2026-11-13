<script setup lang="ts">

import { computed, ref, watchEffect } from "vue"
import axios from "axios"

import type { ForumPostInList } from "../../../../interfaces/forum/post/forum-post-in-list.ts"
import Statistics from "../../Statistics.vue"
import { withShowError } from "../../../../utils/with-show-error.ts"
import { READ_API_BASE } from "../../../../env.ts"
import Tag from "../../Tag.vue"
import type { BasicForumPost } from "../../../../interfaces/forum/post/basic-forum-post.ts"
import BoardLink from "../Board/BoardLink.vue"

const props = defineProps<{
    post: BasicForumPost &  Partial<ForumPostInList>
    loadComments?: boolean
}>()

const comments = ref<number>()

watchEffect(withShowError(async () => {
    comments.value = undefined
    if (!props.loadComments) { return }
    comments.value = (await axios.get(READ_API_BASE + "/comments", { params: {
        target_type: "post",
        target_id: props.post.id,
        page: 1,
        page_size: 0
    } })).data.data.total
}))

const description = computed(() => {
    const { post } = props
    if (post.content_type === "html") {
        const contentDocument = new DOMParser().parseFromString(post.content, "text/html")
        return contentDocument.documentElement.textContent
    }
    return post.content
})

</script>

<template>
    <v-list-item :to="`/forum/post/${post.id}`">
        <BoardLink :board="post" />
        <v-list-item-title>
            <Tag v-if="post.is_featured" color="success">精华</Tag>
            <Tag v-if="post.board_type === `qa`">问答</Tag>
            <span>{{ post.title }}</span>
        </v-list-item-title>
        <v-list-item-subtitle>{{ description }}</v-list-item-subtitle>
        <div class="item-bottom">
            <router-link class="user-info" v-if="post.nickname" :to="`/user/${post.user_id}`">
                <v-avatar class="user-avatar" v-if="post.avatar_url" :image="post.avatar_url" size="x-small" />
                <v-list-item-title>{{ post.nickname }}</v-list-item-title>
            </router-link>
            <v-spacer v-if="post.nickname" />
            <span>{{ post.created_at }}</span>
            <v-spacer v-if="!post.nickname" />
            <Statistics :views="post.views" :comments />
        </div>
    </v-list-item>
</template>

<style scoped>
.item-bottom {
    margin-block: 8px 4px;
    display: flex;
}
.user-info {
    display: flex;
    color: inherit;
    text-decoration: none;
}
.user-avatar {
    margin-right: 8px;
}
.views {
    margin-left: 8px;
    display: flex;
    align-items: center;
}
.views>span{
    margin-left: 8px;
}
</style>
