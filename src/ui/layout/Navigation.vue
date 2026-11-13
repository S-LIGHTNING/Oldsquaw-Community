<script setup lang="ts">

import { navigationRoutes } from "../app/router"

</script>

<template>
    <div class="top">
        <v-btn
            v-for="route in navigationRoutes"
            class="top-item"
            variant="text"
            :to="route.path"
            :text="route.meta.title"
        />
    </div>
    <Teleport to="body">
        <v-bottom-navigation class="bottom">
            <v-btn v-for="route in navigationRoutes" :to="route.path">
                <v-icon>{{ route.meta.icon }}</v-icon>
                <span>{{ route.meta.title }}</span>
            </v-btn>
        </v-bottom-navigation>
    </Teleport>
</template>

<style scoped>
.top {
    height: 100%;
    margin-left: 32px;
    display: none;
    align-items: center;
}
.top-item {
    width: 64px;
    margin-inline: 8px;
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: inherit;
}
.bottom {
    background-color: rgba(var(--v-theme-surface-light), var(--v-high-emphasis-opacity));
    backdrop-filter: blur(4px);
}
@media screen and (min-width: 825px) {
    .top {
        display: inline-flex;
    }
    .bottom {
        display: none;
    }
}
</style>
