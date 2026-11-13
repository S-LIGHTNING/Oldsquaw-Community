<script setup lang="ts">

import type { ForumBoardInList } from "../../../../interfaces/forum/board/forum-board-in-list.ts"
import ForumBoardItem from "./ForumBoardItem.vue"
import ForumBoardLoadingItem from "./ForumBoardLoadingItem.vue"

defineProps<{
    boards: ForumBoardInList[]
    loading?: boolean
    loadingCardNumber?: number
}>()

</script>

<template>
    <v-sheet v-if="loading">
        <ForumBoardLoadingItem class="post" v-for="_ in Array(loadingCardNumber ?? 6)" />
    </v-sheet>
    <v-list v-if="!loading" lines="two" :elevation="1">
        <ForumBoardItem v-for="board in boards" :board />
    </v-list>
</template>
