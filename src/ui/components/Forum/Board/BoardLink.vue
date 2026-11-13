<script setup lang="ts">

import type { ForumBoardInList } from "../../../../interfaces/forum/board/forum-board-in-list"
import type { ForumBoardInPost } from "../../../../interfaces/forum/board/forum-board-in-post"

defineProps<{ board: Partial<ForumBoardInList> & Partial<ForumBoardInPost> }>()

</script>

<template>
    <router-link class="board-link" :to="`/forum/board/${board.board_id ?? board.id}`">#{{ board.board_name ?? board.name }}</router-link>
</template>


<style scoped>
.board-link {
    font-size: smaller;
    font-weight: bold;
    color: rgb(var(--v-theme-primary));
    float: right;
    text-decoration: inherit;
}
</style>