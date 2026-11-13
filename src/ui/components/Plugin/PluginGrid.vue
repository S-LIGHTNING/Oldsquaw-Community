<script lang="ts" setup>

import type { BasicPlugin } from "../../../interfaces/plugin/basic-plugin.ts"
import type { PluginInList } from "../../../interfaces/plugin/plugin-in-list.ts"
import PluginCard from "./PluginCard.vue"
import PluginLoadingCard from "./PluginLoadingCard.vue"

defineProps<{
    plugins: (BasicPlugin & Partial<PluginInList>)[]
    loading?: boolean
    loadingCardNumber?: number
}>()

</script>

<template>
    <div class="plugin-list" v-if="loading">
        <PluginLoadingCard class="plugin-card" v-for="_ in Array(loadingCardNumber ?? 4)" />
    </div>
    <div v-if="!loading">
        <v-empty-state
            v-if="!loading && plugins.length === 0"
            icon="mdi-file-outline"
            title="没有插件"
        />
        <div class="plugin-list" v-if="plugins.length > 0">
            <PluginCard class="plugin-card" v-for="plugin in plugins" :plugin />
        </div>
    </div>
</template>

<style scoped>
.plugin-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(calc(256px + 16px), 1fr));
    justify-items: center;
}
.plugin-card {
    height: fit-content;
    margin: 8px;
    display: inline-block;
}
</style>
