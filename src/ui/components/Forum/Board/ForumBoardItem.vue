<script setup lang="ts">

import type { ForumBoardInList } from "../../../../interfaces/forum/board/forum-board-in-list.ts"
import Tag from "../../Tag.vue"

defineProps<{ board: ForumBoardInList }>()

</script>

<template>
    <v-list-item :to="`/forum/board/${board.id}`">
        <v-list-item-title><Tag v-if="board.type === `qa`">问答</Tag>{{ board.name }}</v-list-item-title>
        <v-list-item-subtitle>{{ board.description }}</v-list-item-subtitle>
    </v-list-item>
</template>
