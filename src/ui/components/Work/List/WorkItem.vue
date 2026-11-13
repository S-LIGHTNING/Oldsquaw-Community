<script setup lang="ts">

import type { BasicWork } from "../../../../interfaces/work/basic-work"
import type { WorkInList } from "../../../../interfaces/work/work-in-list"

defineProps<{
    work: BasicWork & Partial<WorkInList>
}>()

</script>

<template>
    <v-list-item class="item" :to="`/work/${work.id}`">
        <template #prepend>
            <div class="cover-wrapper">
                <v-icon v-if="!work.cover_url" class="cover" icon="mdi-image-outline" size="x-large" />
                <v-img v-if="work.cover_url" class="cover" :src="work.cover_url" />
            </div>
        </template>
        <v-list-item-title>{{ work.name }}</v-list-item-title>
        <v-list-item-subtitle>{{ work.description }}</v-list-item-subtitle>
    </v-list-item>
</template>

<style scoped>
.cover-wrapper {
    overflow: hidden;
    margin-right: 12px;
    border: 1px solid rgb(var(--v-border-color), var(--v-border-opacity));
    border-radius: 8px;
}
.cover {
    width: 96px;
    height: 96px;
    transition: transform .2s;
}
.item:hover .cover {
    transform: scale(1.05);
}
</style>
