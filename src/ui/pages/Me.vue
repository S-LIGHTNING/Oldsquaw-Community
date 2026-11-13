<script setup lang="ts">

import { ref, watchEffect } from "vue"
import axios from "axios"

import { user } from "../../store/user"
import { getErrorMessage } from "../../utils/get-error-message"
import { READ_API_BASE } from "../../env.ts"
import { alert } from "../dialogs/Alert.vue"

const nickname = ref<string>()
const avatarURL = ref<string>()
const description = ref<string>()
const saving = ref(false)

watchEffect(() => {
    nickname.value = user.value?.nickname
    avatarURL.value = user.value?.avatar_url
    description.value = user.value?.bio
})

const errorMessage = ref("")
const showError = ref(false)

async function save() {
    saving.value = true
    try {
        const { data: { data } } = await axios.post(READ_API_BASE + "/users/me?_method=PUT", {
            avatar_url: avatarURL.value,
            bio: description.value,
            nickname: nickname.value
        })
        user.value = data
        alert.success("个人信息保存成功")
    } catch (error) {
        handleError(error)
    }
    saving.value = false
}

function handleError(error: unknown) {
    console.error(error)
    errorMessage.value = getErrorMessage(error)
    showError.value = true
}

</script>

<template>
    <div class="page-content">
        <v-skeleton-loader
            class="card"
            v-if="!user"
            type="heading, list-item-avatar-three-line, heading, heading, paragraph, heading"
        />
        <v-card class="card" v-if="user">
            <v-card-title>账号信息</v-card-title>
            <v-list-item class="section info">
                <template #prepend>
                    <v-avatar :image="user.avatar_url" size="x-large" />
                </template>
                <v-list-item-title>{{ user.nickname }}</v-list-item-title>
                <v-list-item-subtitle>训练师编号（编程猫ID）：{{ user.codemao_id }}</v-list-item-subtitle>
                <v-list-item-subtitle>积分：{{ user.points }}</v-list-item-subtitle>
            </v-list-item>
            <v-form class="section form">
                <v-text-field density="comfortable" id="nickname" label="昵称" v-model="nickname" />
                <v-text-field density="comfortable" id="avatar" label="头像" v-model="avatarURL" />
                <v-textarea id="description" label="个人简介" v-model="description" />
                <v-btn :loading="saving" @click="save">保存更改</v-btn>
                <v-alert
                    class="error"
                    density="comfortable"
                    type="error"
                    closable
                    v-model="showError"
                    title="错误"
                    :text="errorMessage"
                />
            </v-form>
        </v-card>
    </div>
</template>

<style scoped>
.page-content {
    margin-block: 32px;
    display: flex;
    justify-content: center;
}
.card {
    width: 100%;
    max-width: 512px;
}
.section.info {
    margin-block: 8px;
}
.section.form {
    margin: 16px;
}
.error {
    margin-block: 16px;
}
</style>
