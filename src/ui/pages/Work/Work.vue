<script setup lang="ts">

import { useRoute } from "vue-router"
import { computed, watchEffect, ref, useTemplateRef, toRaw, onUnmounted, onMounted } from "vue"
import axios from "axios"

import Comment from "../../components/Comment/index.vue"
import type { WorkInDetail } from "../../../interfaces/work/work-in-detail.ts"
import { READ_API_BASE } from "../../../env.ts"
import { withShowError } from "../../../utils/with-show-error.ts"
import UserCard from "../../components/User/UserCard.vue"
import type { BasicWork } from "../../../interfaces/work/basic-work.ts"
import WorkList from "../../components/Work/List/WorkList.vue"
import { showError } from "../../../utils/show-error.ts"
import type { User } from "../../../interfaces/user/user.ts"

const route = useRoute()
const originalTitle = document.title

const workID = computed(() => Number(route.params.id))
const work = ref<WorkInDetail>()
const user = ref<User>()
const userWorks = ref<BasicWork[]>([])

interface State {
    start?(this: this): void
    startInNewWindow?(this: this): void
    stop?(this: this): void
    reload?(this: this): void
    fullscreen(this: this): void
}

const iframeElementRef = useTemplateRef("iframe")
const runWrapperElementRef = useTemplateRef("run-wrapper")

class StoppedState implements State {

    public start(this: this) {
        state.value = new RunningInIframeState()
    }

    public startInNewWindow(this: this) {
        try {
            state.value = new RunningInExternalWindowState()
        } catch (error) {
            showError(error)
        }
    }

    public fullscreen(this: this) {
        runWrapperElementRef.value?.requestFullscreen()
    }
}

class RunningInIframeState implements State {

    public stop(this: this) {
        state.value = new StoppedState()
    }

    public reload(this: this): void {
        const iframeElement = iframeElementRef.value
        if (iframeElement === null) {
            return
        }
        iframeElement.src = iframeElement.src
    }

    public fullscreen(this: this) {
        runWrapperElementRef.value?.requestFullscreen()
    }
}

class RunningInExternalWindowState implements State {

    private readonly runWindow: Window

    public constructor() {
        const playWindow = open("/work/run", "_blank", "popup,width=800,height=600")
        if (playWindow === null) {
            throw new Error("弹出窗口失败")
        }
        this.runWindow = playWindow
        addEventListener("message", this.handlePlayWindowMessage)
        playWindow.addEventListener("beforeunload", this.stop)
    }

    public readonly handlePlayWindowMessage = (event: MessageEvent) => {
        if (event.origin !== location.origin) {
            return
        }
        if (event.data === "ready") {
            this.runWindow.postMessage({ type: "work-info", data: toRaw(work.value) })
        }
    }

    public stop = (): void => {
        removeEventListener("message", this.handlePlayWindowMessage)
        this.runWindow.postMessage("close")
        this.runWindow.close()
        state.value = new StoppedState()
    }

    public reload(this: this): void {
        this.runWindow.postMessage("reload")
    }

    public fullscreen(this: this): void {
        this.runWindow.postMessage("fullscreen")
    }
}

function stop() {
    state.value.stop?.()
}

const state = ref<State>(new StoppedState())

const fullWindow = ref(false)

function toggleFullWindow() {
    fullWindow.value = !fullWindow.value
}

watchEffect(withShowError(async () => {
    work.value = undefined
    document.title = `… - 作品 - ${originalTitle}`
    work.value = (await axios.get(READ_API_BASE + `/works/${workID.value}`)).data.data
    user.value = work.value!.user
    stop()
    document.title = `${work.value!.name} - 作品 - ${originalTitle}`
}))

watchEffect(withShowError(async () => {
    if (user.value === undefined) {
        return
    }
    userWorks.value = (await axios.get(READ_API_BASE + `/users/${user.value.id}`)).data.data.works
}))

onMounted(() => {
    addEventListener("beforeunload", stop)
})

onUnmounted(() => {
    removeEventListener("beforeunload", stop)
    stop()
    document.title = originalTitle
})

</script>

<template>
    <div class="page-wrapper">
        <div class="work-card">
            <v-skeleton-loader v-if="!work" :types="{ actions: `avatar@4` }" type="heading, text, image@3, divider@16, actions" />
            <v-card v-if="work" :class="fullWindow && `full-window`">
                <v-card-title>{{ work.name }}</v-card-title>
                <v-card-text v-if="!fullWindow">{{ work.description }}</v-card-text>
                <v-divider />
                <div ref="run-wrapper" class="run-wrapper">
                    <div class="run start" v-if="!(state instanceof RunningInIframeState)">
                        <v-img class="start-background" :src="work.cover_url" cover draggable="false" />
                        <div class="start-cover v-overlay" />
                        <v-btn
                            v-if="state.start"
                            class="start-button"
                            icon="mdi-play-circle-outline"
                            variant="text"
                            size="128px"
                            @click="state.start()"
                        />
                        <v-icon class="external-icon" v-if="(state instanceof RunningInExternalWindowState)" icon="mdi-open-in-new" />
                        <p class="external-hint" v-if="(state instanceof RunningInExternalWindowState)">正在独立窗口中运行</p>
                    </div>
                    <iframe ref="iframe" class="run" v-if="(state instanceof RunningInIframeState)" :src="work.link" />
                </div>
                <v-divider />
                <v-dialog :modelValue="fullWindow" />
                <v-card-actions class="actions">
                    <v-spacer />
                    <v-btn v-if="state.start" icon="mdi-play-circle-outline" @click="state.start()" />
                    <v-btn v-if="state.startInNewWindow" icon="mdi-open-in-new" @click="state.startInNewWindow()" />
                    <v-btn v-if="state.stop" icon="mdi-stop-circle-outline" @click="state.stop()" />
                    <v-btn v-if="state.reload" icon="mdi-reload" @click="state.reload()" />
                    <v-btn :icon="fullWindow ? `mdi-fullscreen-exit` : `mdi-overscan`" @click="toggleFullWindow" />
                    <v-btn icon="mdi-fullscreen" @click="state.fullscreen()" />
                </v-card-actions>
            </v-card>
        </div>
        <v-skeleton-loader class="user-card" v-if="!user" type="list-item-avatar-two-line" />
        <UserCard class="user-card" v-if="user" :user="user" />
        <WorkList :works="userWorks" :loading="userWorks.length === 0" />
        <Comment targetType="work" :targetID="workID" :author="work?.user_id" />
    </div>
</template>

<style scoped>
.page-wrapper {
    margin-block: 32px;
}
.full-window {
    border-radius: 0;
    position: fixed;
    inset: 0;
    z-index: 10000;
    display: flex;
    flex-direction: column;
}
.start {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: rgb(var(--v-theme-background));
    font-weight: bold;
}
.start-background {
    position: absolute;
    width: 100%;
    height: 100%;
}
.start-cover {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(var(--v-theme-on-background), var(--v-overlay-opacity));
}
.start-button {
    font-size: 64px;
}
.external-hint {
    position: relative;
}
.start-button, .external-icon, .external-hint {
    filter: drop-shadow(0 0 0.4em rgb(var(--v-theme-on-background)));
}
.run-wrapper {
    width: 100%;
    height: 512px;
}
.run {
    border: none;
    transition: none;
    width: 100%;
    height: 100%;
}
.full-window>*:not(.run-wrapper) {
    flex-grow: 0;
}
.full-window>.run-wrapper {
    flex-grow: 1;
}
.actions {
    height: 32px;
}
.user-card {
    margin-top: 16px;
}
</style>
