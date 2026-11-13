<script setup lang="ts">

import { ref, watchEffect } from "vue"
import axios from "axios"

import type { BasicComment } from "../../../interfaces/comment/basic-comment"
import type { CommentTarget } from "../../../interfaces/comment/comment-target"
import type { CommentInList } from "../../../interfaces/comment/comment-in-list"
import CommentList from "./CommentList.vue"
import { withShowError } from "../../../utils/with-show-error.ts"
import { READ_API_BASE } from "../../../env.ts"
import type { User } from "../../../interfaces/user/user.ts"

const props = defineProps<{
    targetType: CommentTarget
    targetID: BasicComment["target_id"]
    author?: User["id"]
}>()

const commentsCount = defineModel<number | null>("commentsCount")

const PAGE_SIZE = 20

const comments = ref<CommentInList[]>([])
const loading = ref(true)
const page = ref(1)
const totalPages = ref(0)

const reload = withShowError(async () => {
    const { data: { data } } = await axios.get(READ_API_BASE + "/comments", {
        params: {
            target_type: props.targetType,
            target_id: props.targetID,
            page: page.value,
            page_size: PAGE_SIZE
        }
    })
    comments.value = data.list
    commentsCount.value = data.total
    totalPages.value = data.total_pages
    loading.value = false
})

watchEffect(() => {
    loading.value = true
    reload()
})

defineExpose({ reload })

</script>

<template>
    <CommentList :comments :loading :loadingItemNumber="PAGE_SIZE" :author :reload />
    <v-pagination v-model="page" :length="totalPages" />
</template>
