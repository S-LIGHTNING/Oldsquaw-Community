<script setup lang="ts">

import type { PluginInList } from "../../../interfaces/plugin/plugin-in-list"
import * as URLS from "../../../global/urls"
import { URLWithParams } from "../../../utils/url-with-params"
import type { BasicPlugin } from "../../../interfaces/plugin/basic-plugin"

const { plugin } = defineProps<{
    plugin: BasicPlugin & Partial<PluginInList>
}>()

const pluginLocation = JSON.stringify({
    source: "oldsquaw-community",
    id: plugin.custom_id
})

const installURLRecord: Record<string, () => string> = Object.assign(Object.create(null), {
    "coco-next-plugin": () => URLWithParams(URLS.COCO_NEXT_EDITOR, { installPlugin: pluginLocation }),
    "coco-next-widget": () => URLWithParams(URLS.COCO_NEXT_EDITOR, { installWidget: pluginLocation })
})

function install() {
    const installURL = installURLRecord[plugin.type]
    if (installURL !== undefined) {
        open(installURL(), "_blank")
    } else {
        const downloadElement = document.createElement("a")
        downloadElement.href = plugin.link
        downloadElement.download = plugin.name
        downloadElement.target = "_blank"
        document.body.appendChild(downloadElement)
        downloadElement.click()
        downloadElement.remove()
    }
}

</script>

<template>
    <v-card :width="256" :hover-elevation="3">
        <v-list>
            <v-list-item class="basic-info">
                <template #prepend>
                    <v-icon v-if="!plugin.icon_url" icon="mdi-puzzle-outline" size="x-large" />
                    <v-avatar v-if="plugin.icon_url" :image="plugin.icon_url" />
                </template>
                <v-list-item-title>{{ plugin.name }}</v-list-item-title>
                <router-link class="nickname" :to="`/user/${plugin.user_id}`">
                    <v-list-item-subtitle v-if="plugin.nickname">{{ plugin.nickname }}</v-list-item-subtitle>
                </router-link>
            </v-list-item>
        </v-list>
        <v-card-text class="description" v-if="plugin.description">{{ plugin.description }}</v-card-text>
        <v-card-text class="description no-description" v-if="!plugin.description">这个作者很懒，什么也没留下~</v-card-text>
        <div class="spacer" />
        <v-card-actions class="actions">
            <v-spacer />
            <v-btn prepend-icon="mdi-tray-arrow-down" @click="install">{{ plugin.views }}</v-btn>
        </v-card-actions>
    </v-card>
</template>

<style scoped>
.basic-info {
    --v-list-prepend-gap: 16px;
}
.description {
    height: 4em;
    padding-block: 0;
}
.no-description {
    color: gray;
}
.actions {
    height: 32px;
}
.nickname {
    color: inherit;
    text-decoration: inherit;
}
</style>
