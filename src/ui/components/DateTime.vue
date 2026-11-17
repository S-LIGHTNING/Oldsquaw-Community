<script setup lang="ts">

import { ref } from "vue"
import dayjs from "dayjs"

import type { DateTime } from "../../interfaces/date-time"

defineProps<{ datetime: DateTime }>()

const inDetail = ref(false)

let handle: ReturnType<typeof setTimeout> | null = null

function enter() {
    handle = setTimeout(() => {
        inDetail.value = true
        handle = null
    }, 400)
}

function leave() {
    inDetail.value = false
    if (handle !== null) {
        clearTimeout(handle)
        handle = null
    }
}

function click(event: Event) {
    event.preventDefault()
    event.stopPropagation()
    inDetail.value = !inDetail.value
    if (inDetail.value) {
        if (handle !== null) {
            clearTimeout(handle)
        }
        handle = setTimeout(() => {
            inDetail.value = false
            handle = null
        }, 16000)
    }
}

</script>

<template>
    <span @mouseenter="enter" @mouseleave="leave" @click="click">{{ inDetail ? datetime : dayjs(datetime).fromNow() }}</span>
</template>

<style scoped>
span {
    word-break: break-all;
    line-break: anywhere;
    white-space: break-spaces;
}
</style>
