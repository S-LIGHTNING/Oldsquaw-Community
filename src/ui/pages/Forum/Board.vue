<script setup lang="ts">

import { computed, ref, watchEffect } from "vue"
import { useRoute } from "vue-router"

import type { ForumBoard } from "../../../interfaces/forum/board/forum-board.ts"
import type { ForumPostInList } from "../../../interfaces/forum/post/forum-post-in-list"
import ForumPostList from "../../components/Forum/Post/ForumPostList.vue"
import { withShowError } from "../../../utils/with-show-error"
import axios from "axios"
import { READ_API_BASE } from "../../../env.ts"

const route = useRoute()

const boardID = computed(() => Number(route.params.id))
const board = ref<ForumBoard>()
const posts = ref<ForumPostInList[]>([])
const loading = ref(true)

watchEffect(withShowError(async () => {
    loading.value = true
    const { data } = (await axios.get(READ_API_BASE + `/boards/${boardID.value}`)).data
    board.value = data.board
    posts.value = data.posts
    loading.value = false
}))

</script>

<template>
    <div class="content-wrapper">
        <v-skeleton-loader v-if="loading" type="heading, sentences" />
        <v-sheet class="info" v-if="board">
            <h2 class="name">{{ board.name }}</h2>
            <div class="description">{{ board.description }}</div>
            <div class="moderator-list">
                版主
                <div class="moderator" v-for="moderator in board.moderators">
                    <v-avatar class="moderator-avatar" :image="moderator.avatar_url" size="x-small" />
                    <span>{{ moderator.nickname }}</span>
                </div>
            </div>
        </v-sheet>
        <div class="post-list">
            <ForumPostList :posts :loading />
        </div>
    </div>
</template>

<style scoped>
.content-wrapper {
    margin-top: 16px;
}
.info {
    padding: 16px;
}
.name {
    margin: 0;
}
.moderator-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}
.moderator {
    display: inline-flex;
    margin: 4px;
    padding: 4px 8px;
    border-radius: 16px;
    background-color: rgba(var(--v-theme-primary), calc(var(--v-activated-opacity) * var(--v-theme-overlay-multiplier)));
}
.moderator-avatar {
    margin-right: 4px;
}
.post-list {
    margin-top: 16px;
}
</style>
