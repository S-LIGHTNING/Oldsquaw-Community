<script setup lang="ts">

import axios from "axios"
import { watchEffect, ref } from "vue"

import type { ForumPostInList } from "../../../interfaces/forum/post/forum-post-in-list.ts"
import { withShowError } from "../../../utils/with-show-error.ts"
import { READ_API_BASE } from "../../../env.ts"
import ForumPostList from "../../components/Forum/Post/ForumPostList.vue"
import ForumBoardList from "../../components/Forum/Board/ForumBoardList.vue"
import type { ForumBoardInList } from "../../../interfaces/forum/board/forum-board-in-list.ts"

const PAGE_SIZE = 20

const posts = ref<ForumPostInList[]>([])
const loadingPosts = ref(true)
const page = ref(1)
const totalPages = ref(0)

const boards = ref<ForumBoardInList[]>([])
const loadingBoards = ref(true)

watchEffect(withShowError(async () => {
    loadingPosts.value = true
    const { data: { data } } = await axios.get(READ_API_BASE + "/posts", {
        params: {
            page: page.value,
            page_size: PAGE_SIZE
        }
    })
    posts.value = data.list
    totalPages.value = data.total_pages
    loadingPosts.value = false
}))

withShowError(async () => {
    loadingBoards.value = true
    boards.value = (await axios.get(READ_API_BASE + "/boards")).data.data
    loadingBoards.value = false
})()

</script>

<template>
    <v-toolbar class="sort">
        <v-toolbar-title>论坛</v-toolbar-title>
        <template #append>
            <v-btn class="post-button" variant="outlined" color="primary">发帖</v-btn>
        </template>
    </v-toolbar>
    <div class="page-content">
        <div class="right">
            <ForumBoardList :loading="loadingBoards" :boards />
        </div>
        <div class="posts">
            <ForumPostList :posts :loading="loadingPosts" :loadingItemNumber="PAGE_SIZE" />
            <v-pagination v-model="page" :length="totalPages" />
        </div>
    </div>
</template>

<style scoped>
.right {
    margin-bottom: 16px;
}
@media screen and (min-width: 768px) {
    .page-content {
        display: flex;
        flex-direction: row-reverse;
    }
    .right {
        width: 256px;
        flex-shrink: 0;
        margin-left: 16px
    }
    .posts {
        flex-grow: 1;
    }
}
</style>
