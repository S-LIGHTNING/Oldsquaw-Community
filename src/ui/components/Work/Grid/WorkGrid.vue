<script lang="ts" setup>

import type { BasicWork } from "../../../../interfaces/work/basic-work.ts"
import type { WorkInList } from "../../../../interfaces/work/work-in-list.ts"
import WorkCard from "./WorkCard.vue"
import WorkLoadingCard from "./WorkLoadingCard.vue"

defineProps<{
    works: (BasicWork & Partial<WorkInList>)[]
    loading?: boolean
    loadingCardNumber?: number
}>()

</script>

<template>
    <div class="work-list" v-if="loading">
        <WorkLoadingCard class="work-card" v-for="_ in Array(loadingCardNumber ?? 4)" />
    </div>
    <div v-if="!loading">
        <v-empty-state
            v-if="works.length === 0"
            icon="mdi-file-outline"
            title="没有作品"
        />
        <div class="work-list" v-if="works.length > 0">
            <WorkCard class="work-card" v-for="work in works" :work />
        </div>
    </div>
</template>

<style scoped>
.work-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(calc(256px + 16px), 1fr));
    justify-items: center;
}
.work-card {
    height: fit-content;
    margin: 8px;
    display: inline-block;
}
</style>
