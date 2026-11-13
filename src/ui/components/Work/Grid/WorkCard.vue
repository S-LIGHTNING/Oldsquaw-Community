<script setup lang="ts">

import { ref, watchEffect } from "vue"
import axios from "axios"

import type { WorkInList } from "../../../../interfaces/work/work-in-list.ts"
import Statistics from "../../Statistics.vue"
import { withShowError } from "../../../../utils/with-show-error.ts"
import { READ_API_BASE } from "../../../../env.ts"
import type { BasicWork } from "../../../../interfaces/work/basic-work.ts"

const props = defineProps<{
    work: BasicWork & Partial<WorkInList>
    loadComments?: boolean
}>()

const comments = ref<number>()

watchEffect(withShowError(async () => {
    comments.value = undefined
    if (!props.loadComments) { return }
    comments.value = (await axios.get(READ_API_BASE + "/comments", { params: {
        target_type: "work",
        target_id: props.work.id,
        page: 1,
        page_size: 0
    } })).data.data.total
}))

</script>

<template>
    <v-card class="card" :width="256" :hover-elevation="3">
        <router-link class="open-work" :to="`/work/${work.id}`">
            <div class="cover-wrapper">
                <v-icon v-if="!work.cover_url" class="cover" icon="mdi-image-outline" size="x-large" />
                <v-img v-if="work.cover_url" class="cover" :src="work.cover_url" />
            </div>
            <Statistics :views="work.views" :comments />
            <v-card-title>{{ work.name }}</v-card-title>
            <v-card-subtitle>{{ work.description || work.name }}</v-card-subtitle>
        </router-link>
        <router-link class="open-user" :to="`/user/${work.user_id}`">
        <v-list-item v-if="work.nickname">
            <template #prepend>
                <v-avatar class="avatar" v-if="work.avatar_url" :image="work.avatar_url" />
            </template>
            <v-list-item-title>{{ work.nickname }}</v-list-item-title>
        </v-list-item>
        </router-link>
    </v-card>
</template>

<style scoped>
.card :deep(a) {
    color: inherit;
    text-decoration: none;
}
.cover-wrapper {
    overflow: hidden;
}
.cover {
    width: 256px;
    height: 256px;
    transition: transform .2s;
}
.open-work:hover .cover {
    transform: scale(1.03);
}
.avatar {
    margin-block: 4px;
    transition: transform .2s;
}
.open-user:hover .avatar {
    transform: scale(1.1);
}
</style>
