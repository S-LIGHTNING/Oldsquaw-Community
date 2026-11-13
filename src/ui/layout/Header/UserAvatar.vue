<script setup lang="ts">

import { onMounted } from "vue"
import axios from "axios"

import { READ_API_BASE } from "../../../env.ts"
import { user } from "../../../store/user"
import LoginDialog, { openLoginDialog } from "../../dialogs/LoginDialog.vue"
import { withShowError } from "../../../utils/with-show-error"

onMounted(async () => {
    user.value = (await axios.get(READ_API_BASE + "/auth/me", { withCredentials: true })).data.data
})

const handleLogout = withShowError(async () => {
    await axios.post(READ_API_BASE + "/auth/logout", { withCredentials: true })
    user.value = null
})

</script>

<template>
    <v-btn v-if="user" size="large" append-icon="mdi-chevron-down">
        <v-avatar :image="user.avatar_url" />
        <v-menu activator="parent">
            <v-sheet>
                <v-btn to="/me" prepend-icon="mdi-account-outline">账号信息</v-btn>
                <v-btn :to="`/user/${user.id}`" prepend-icon="mdi-home-outline">我的主页</v-btn>
                <v-btn to="/publish/work" prepend-icon="mdi-view-grid-plus-outline">发布作品</v-btn>
                <v-btn to="/publish/plugin" prepend-icon="mdi-puzzle-plus-outline">发布插件</v-btn>
                <v-btn @click="handleLogout" prepend-icon="mdi-logout">退出登录</v-btn>
            </v-sheet>
        </v-menu>
    </v-btn>
    <v-btn
        v-if="!user"
        variant="flat"
        size="small"
        color="primary"
        :active="false"
        @click="openLoginDialog()"
    >登录</v-btn>
    <LoginDialog />
</template>
