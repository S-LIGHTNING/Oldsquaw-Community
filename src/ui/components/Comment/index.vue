<script setup lang="ts">

import { useTemplateRef } from "vue"

import type { BasicComment } from "../../../interfaces/comment/basic-comment"
import type { CommentTarget } from "../../../interfaces/comment/comment-target"
import AllComments from "./AllComments.vue"
import SendComment from "./SendComment.vue"
import type { User } from "../../../interfaces/user/user.ts"

defineProps<{
    targetType: CommentTarget
    targetID: BasicComment["target_id"]
    author?: User["id"]
}>()

const commentsCount = defineModel<number | null>("commentsCount")
const allCommentsComponent = useTemplateRef("all-comments")

</script>

<template>
    <v-toolbar><v-toolbar-title>评论（{{ commentsCount }}）</v-toolbar-title></v-toolbar>
    <SendComment :targetType :targetID :reload="allCommentsComponent?.reload" />
    <AllComments ref="all-comments" :targetType :targetID :author v-model:commentsCount="commentsCount" />
</template>
