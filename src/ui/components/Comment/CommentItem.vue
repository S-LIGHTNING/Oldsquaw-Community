<script setup lang="ts">

import { ref } from "vue"
import axios from "axios"

import type { CommentInList } from "../../../interfaces/comment/comment-in-list"
import { user } from "../../../store/user"
import { withShowError } from "../../../utils/with-show-error"
import { WRITE_API_BASE } from "../../../env.ts"
import Tag from "../Tag.vue"
import type { User } from "../../../interfaces/user/user.ts"

const props = defineProps<{
    comment: CommentInList
    author?: User["id"]
    reload?(): Promise<void>
}>()

const deleting = ref(false)

const deleteComment = withShowError(async () => {
    deleting.value = true
    await axios.post(WRITE_API_BASE + `/comments/${props.comment.id}`, {}, {
        headers: {
            "X-HTTP-Method-Override": "DELETE"
        },
        params: {
            _method: "DELETE"
        },
        withCredentials: true
    })
    await props.reload?.()
    deleting.value = false
})

</script>

<template>
    <v-list-item class="item">
        <template #prepend>
            <div class="avatar-area">
                <router-link :to="`/user/${comment.user_id}`"><v-avatar :image="comment.avatar_url" /></router-link>
            </div>
        </template>
        <v-list-item-title class="info">
            <router-link class="nickname" :to="`/user/${comment.user_id}`">{{ comment.nickname }}</router-link>
            <Tag v-if="comment.user_id === author" color="success">作者</Tag>
            <span>{{ comment.created_at }}</span>
            <v-spacer />
            <v-btn
                v-if="comment.user_id === user?.id || user?.id === author || user?.user_group === `admin` || user?.user_group === `moderator`"
                prepend-icon="mdi-delete-forever-outline"
                size="small"
                variant="outlined"
                text="删除"
                color="error"
                @click="deleteComment()"
                :loading="deleting"
            />
        </v-list-item-title>
        <div class="content">
            <div v-for="line in comment.content.split(`\n`)">{{ line }}</div>
        </div>
    </v-list-item>
</template>

<style scoped>
.item :deep(.v-list-item__prepend) {
    height: 100%;
}
.avatar-area {
    margin-right: 8px;
    min-height: 100%;
}
.info {
    display: flex;
}
.nickname {
    font-weight: bold;
    margin-right: 8px;
    color: inherit;
    text-decoration: inherit;
}
.content {
    margin-top: 4px;
}
</style>
