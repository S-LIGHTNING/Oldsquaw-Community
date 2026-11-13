<script setup lang="ts">

import { useRoute } from "vue-router"
import { computed, ref, useTemplateRef, watchEffect } from "vue"
import axios from "axios"

import Comment from "../../components/Comment/index.vue"
import type { ForumPostInDetail } from "../../../interfaces/forum/post/forum-post-in-detail.ts"
import { READ_API_BASE } from "../../../env.ts"
import { withShowError } from "../../../utils/with-show-error"
import BoardLink from "../../components/Forum/Board/BoardLink.vue"
import Statistics from "../../components/Statistics.vue"

const route = useRoute()

const postID = computed(() => Number(route.params.id))
const post = ref<ForumPostInDetail>()
const commentsCount = ref<number | null>(null)
const HTMLContentElementRef = useTemplateRef("html-content")

watchEffect(withShowError(async () => {
    post.value = (await axios.get(READ_API_BASE + `/posts/${postID.value}`)).data.data
}))

watchEffect(() => {
    const HTMLContentElement = HTMLContentElementRef.value
    if (HTMLContentElement === null || post.value === undefined) {
        return
    }
    const contentDocument = new DOMParser().parseFromString(post.value.content, "text/html")
    HTMLContentElement.replaceChildren(...contentDocument.body.childNodes)
})

</script>

<template>
    <v-skeleton-loader
        class="post-area"
        v-if="!post"
        type="heading, text, divider, paragraph@4"
    />
    <v-sheet class="post-area" v-if="post">
        <BoardLink :board="post" />
        <h2>{{ post.title }}</h2>
        <div class="meta">
            <v-avatar :image="post.avatar_url" size="x-small" />
            <span>{{ post.nickname }}</span>
            <v-spacer />
            <span>{{ post.updated_at }}</span>
            <Statistics :views="post.views" :comments="commentsCount" />
        </div>
        <v-divider />
        <p v-if="post.content_type === `text`" v-for="line in post.content.split(`\n`)">{{ line }}</p>
        <div v-if="post.content_type === `html`" ref="html-content" class="html-content" />
    </v-sheet>
    <Comment targetType="post" :targetID="postID" :author="post?.user_id" v-model:commentsCount="commentsCount" />
</template>

<style scoped>
.post-area {
    margin-top: 16px;
    padding: 16px;
}
h2 {
    margin-block: 4px;
}
.meta {
    display: flex;
    margin-bottom: 8px;
    align-items: center;
}
.meta>* {
    margin-right: 8px;
}
.meta>*:last-child {
    margin-right: 0;
}
.html-content {
    width: 100%;
}
.html-content :deep(img) {
    max-width: 100%;
    height: fit-content;
    object-fit: contain;
}
.html-content :deep(blockquote) {
    margin-inline: 0;
    padding: 8px 6px 8px 8px;
    border-left: #6E4FF480 4px solid;
    background-color: #6E4FF420;
}
.html-content :deep(.ql-syntax) {
    box-sizing: border-box;
    width: 100%;
    max-height: 512px;
    padding: 8px 12px 8px;
    background-color: #F4F4F4;
    overflow: auto;
}
</style>
