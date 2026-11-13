<script setup lang="ts">

import type { BasicWork } from "../../../../interfaces/work/basic-work"
import type { WorkInList } from "../../../../interfaces/work/work-in-list"
import WorkItem from "./WorkItem.vue"
import WorkLoadingItem from "./WorkLoadingItem.vue"

defineProps<{
    works: (BasicWork & Partial<WorkInList>)[]
    loading?: boolean
    loadingCardNumber?: number
}>()

</script>

<template>
    <v-list v-if="loading" :elevation="1">
        <WorkLoadingItem v-for="_ in Array(loadingCardNumber ?? 4)" />
    </v-list>
    <v-list v-if="!loading" :elevation="1">
        <WorkItem v-for="work in works" :work />
    </v-list>
</template>
