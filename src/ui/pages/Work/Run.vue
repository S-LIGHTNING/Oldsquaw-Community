<script setup lang="ts">

import { onBeforeMount, ref, useTemplateRef } from "vue"

import type { WorkInDetail } from "../../../interfaces/work/work-in-detail"

const src = ref("about:blank")
const requestFullscreen = ref(false)

const iframeElementRef = useTemplateRef("iframe")

function reload() {
    const iframeElement = iframeElementRef.value
    if (iframeElement === null) {
        return
    }
    iframeElement.src = iframeElement.src
}

function fullscreen() {
    const iframeElement = iframeElementRef.value
    if (iframeElement === null) {
        return
    }
    iframeElement.requestFullscreen()
    requestFullscreen.value = false
}

onBeforeMount(() => {
    addEventListener("message", (event) => {
        if (event.origin !== location.origin) {
            return
        }
        if (event.data.type !== "work-info") {
            return
        }
        const work: WorkInDetail = event.data.data
        src.value = work.link
        document.title = `${work.name} - 运行作品 - ${document.title}`
    })
    addEventListener("message", async (event) => {
        if (event.origin !== location.origin) {
            return
        }
        switch (event.data) {
            case "stop":
                close()
                break
            case "reload":
                reload()
                break
            case "fullscreen": {
                const iframeElement = iframeElementRef.value
                if (iframeElement === null) {
                    return
                }
                try {
                    await iframeElement.requestFullscreen()
                } catch (__error) {
                    requestFullscreen.value = !requestFullscreen.value
                }
                break
            }
        }
    })
    opener.postMessage("ready")
})

</script>

<template>
    <iframe ref="iframe" :src="src" />
    <div class="fullscreen-hint-box v-overlay" v-if="requestFullscreen" @click="fullscreen">
        <v-icon class="fullscreen-icon" icon="mdi-fullscreen" />
        <p>点击切换全屏</p>
    </div>
</template>

<style scoped>
iframe, .fullscreen-hint-box {
    border: none;
    position: fixed;
    width: 100%;
    height: 100%;
    inset: 0;
    z-index: 10000;
}
.fullscreen-hint-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    pointer-events: inherit;
    background-color: rgba(var(--v-theme-on-background), var(--v-overlay-opacity));
    color: rgb(var(--v-theme-background));
    font-weight: bold;
}
.fullscreen-hint-box>* {
    filter: drop-shadow(0 0 0.4em rgb(var(--v-theme-on-background)));
}
.fullscreen-icon {
    font-size: 128px;
}
</style>
