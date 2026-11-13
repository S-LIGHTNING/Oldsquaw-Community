<script setup lang="ts">

import { computed, ref } from "vue"
import axios from "axios"

import type { BasicComment } from "../../../interfaces/comment/basic-comment"
import type { CommentTarget } from "../../../interfaces/comment/comment-target"
import { user } from "../../../store/user"
import { withShowError } from "../../../utils/with-show-error"
import { WRITE_API_BASE } from "../../../env.ts"
import { openLoginDialog } from "../../dialogs/LoginDialog.vue"

const props = defineProps<{
    targetType: CommentTarget
    targetID: BasicComment["target_id"]
    reload?(): Promise<void>
}>()

const MAX_LENGTH = 2000

const content = ref("")
const overflow = computed(() => content.value.length > MAX_LENGTH)
const sending = ref(false)

const send = withShowError(async () => {
    sending.value = true
    await axios.post(WRITE_API_BASE + "/comments", {
        content: content.value,
        target_type: props.targetType,
        target_id: props.targetID
    }, { withCredentials: true })
    await props.reload?.()
    content.value = ""
    sending.value = false
})

</script>

<template>
    <v-sheet class="board login-required" v-if="!user">
        <v-btn color="primary" @click="openLoginDialog">登录</v-btn>
        <p>登录后才能评论</p>
    </v-sheet>
    <v-sheet class="board send-comment" v-if="user">
        <v-avatar class="avatar" :image="user.avatar_url" />
        <div class="right">
            <v-textarea placeholder="说点什么" density="compact" v-model="content" />
            <div class="bottom">
                <span :class="overflow && `overflow`">{{ content.length }} / {{ MAX_LENGTH }}</span>
                <v-spacer />
                <v-btn
                    variant="outlined"
                    append-icon="mdi-send-variant-outline"
                    :disabled="content.length === 0 || overflow"
                    :loading="sending"
                    @click="send()"
                >发送</v-btn>
            </div>
        </div>
    </v-sheet>
</template>

<style scoped>
.board {
    padding: 16px;
    margin-bottom: 16px;
}
.login-required {
    text-align: center;
}
.send-comment {
    display: flex;
}
.avatar {
    margin-right: 12px;
}
.right {
    flex-grow: 1;
}
.bottom {
    display: flex;
}
.overflow {
    color: rgb(var(--v-theme-error));
}
</style>
