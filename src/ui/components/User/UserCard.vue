<script setup lang="ts">

import type { User } from "../../../interfaces/user/user"

defineProps<{
    user: User
}>()

</script>

<template>
    <v-list :elevation="1">
        <v-list-item>
            <template #prepend>
                <v-avatar :image="user.avatar_url" size="large" />
            </template>
            <v-list-item-title>{{ user.nickname }}</v-list-item-title>
            <v-list-item-subtitle>{{ user.bio }}</v-list-item-subtitle>
        </v-list-item>
    </v-list>
</template>

<style scoped>
</style>
