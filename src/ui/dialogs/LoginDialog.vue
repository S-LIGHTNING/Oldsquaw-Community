<script lang="ts">

const visible = ref(false)
export function openLoginDialog(): void { visible.value = true }
export function closeLoginDialog(): void { visible.value = false }

</script>

<script setup lang="ts">

import { ref } from "vue"
import axios from "axios"

import { READ_API_BASE } from "../../env"
import { user } from "../../store/user"
import { getErrorMessage } from "../../utils/get-error-message"

const loading = ref(false)
const errorMessage = ref("")
const showError = ref(false)
const identity = ref("")
const password = ref("")

async function login() {
    loading.value = true
    try {
        const { data: { data } } = await axios.post(READ_API_BASE + "/auth/login", {
            identity: identity.value,
            password: password.value
        })
        closeLoginDialog()
        user.value = data
    } catch (error) {
        handleError(error)
    }
    loading.value = false
}

function handleError(error: unknown) {
    console.error(error)
    errorMessage.value = getErrorMessage(error)
    showError.value = true
}

</script>

<template>
    <v-dialog width="384" v-model="visible">
        <v-sheet>
            <v-toolbar density="compact">
                <v-toolbar-title>登录</v-toolbar-title>
                <v-btn
                    class="close"
                    icon="mdi-close"
                    @click="closeLoginDialog()"
                />
            </v-toolbar>
            <v-form class="form">
                <p>使用编程猫账号登录</p>
                <v-text-field density="comfortable" id="identity" v-model="identity" label="账号" />
                <v-text-field density="comfortable" id="password" v-model="password" label="密码" type="password" />
                <v-btn :loading @click="login">登录</v-btn>
                <v-alert
                    class="error"
                    density="comfortable"
                    type="error"
                    closable
                    v-model="showError"
                    title="错误"
                    :text="errorMessage"
                />
                <p>未注册用户自动创建本站账号</p>
            </v-form>
        </v-sheet>
    </v-dialog>
</template>

<style scoped>
.close {
    margin-left: -48px;
}
.form {
    margin: 32px;
}
p {
    text-align: center;
}
.error {
    margin-block: 16px;
}
</style>
