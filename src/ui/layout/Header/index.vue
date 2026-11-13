<script setup lang="ts">

import Navigation from "../Navigation.vue"
import UserAvatar from "./UserAvatar.vue"

</script>

<template>
    <v-toolbar class="header" elevation="1" density="comfortable">
        <router-link class="logo-and-title" to="/">
            <div class="logo" :style="{ backgroundImage: `url(/favicon.png)` }" />
            <h1>Oldsquaw 社区</h1>
        </router-link>
        <Navigation />
        <v-spacer />
        <UserAvatar />
    </v-toolbar>
</template>

<style scoped>
.header {
    display: flex;
    align-items: center;
    padding-inline: 5vw;
    position: sticky;
    top: 0;
    z-index: 100;
    transition: none;
    background-color: rgba(var(--v-theme-surface-light), var(--v-high-emphasis-opacity));
    backdrop-filter: blur(4px);
}
.logo-and-title {
    display: flex;
    align-items: center;
    color: inherit;
    text-decoration: inherit;
}
h1 {
    margin: 0;
    font-size: 1.4em;
}
.logo {
    width: 32px;
    height: 32px;
    margin-right: 8px;
    background-position: center;
    background-size: cover;
}
</style>
