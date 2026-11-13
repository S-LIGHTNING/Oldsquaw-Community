<script setup lang="ts">

import Header from "../layout/Header/index.vue"
import Alert from "../dialogs/Alert.vue"

</script>

<template>
    <v-app>
        <Header />
        <main>
            <router-view v-slot="{ Component }">
                <v-fade-transition hide-on-leave>
                    <component :is="Component" />
                </v-fade-transition>
            </router-view>
            <Alert />
        </main>
    </v-app>
</template>

<style scoped>
main {
    margin-inline: 5vw;
    margin-bottom: 64px;
    transition: none;
}
@media screen and (min-width: 768px) {
    .main {
        margin-bottom: 0;
    }
}
</style>
