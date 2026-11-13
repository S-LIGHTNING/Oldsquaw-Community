<script setup lang="ts">

import { ref } from "vue"
import type { VListItem } from "vuetify/components"

import type { PluginType } from "../../../interfaces/plugin/plugin-type.ts"
import PublishCoCoNextPlugin from "./PublishCoCoNextPlugin.vue"

const TYPE_ITEMS: VListItem["$props"][] = [
    { title: "CoCo Next 控件", value: "coco-next-widget" },
    { title: "CoCo Next 插件", value: "coco-next-plugin" }
]

const type = ref<PluginType>()

</script>

<template>
    <v-sheet :elevation="1">
        <v-form class="form">
            <h2>发布插件</h2>
            <v-select label="类型" :items="TYPE_ITEMS" item-props v-model="type" />
            <div v-if="type === `coco-next-widget`">暂不支持</div>
            <PublishCoCoNextPlugin v-if="type === `coco-next-plugin`" />
        </v-form>
    </v-sheet>
</template>

<style scoped>
.form {
    padding: 16px;
    margin-top: 16px;
}
h2 {
    margin-top: 0px;
    text-align: center;
}
</style>
