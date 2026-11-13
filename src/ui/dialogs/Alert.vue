<script lang="ts">

const queue: VAlert["$props"][] = reactive([])
export function alert(data: VAlert["$props"] | string): void {
    queue.push(typeof data === "string" ? { text: data } : data)
}
alert.success = function success(data: VAlert["$props"] | string): void {
    queue.push({
        type: "success",
        title: "成功",
        ...(typeof data === "string" ? { text: data } : data)
    })
}
alert.error = function error(data: VAlert["$props"] | string): void {
    queue.push({
        type: "error",
        title: "错误",
        ...(typeof data === "string" ? { text: data } : data)
    })
}

</script>

<script setup lang="ts">

import { reactive, ref, watchEffect } from "vue"
import { VAlert } from "vuetify/components"

const show = ref(false)
const props = ref()

watchEffect(() => {
    const alert = (queue[0], queue.shift())
    if (show.value) {
        return
    }
    props.value = alert
    if (props.value !== undefined) {
        show.value = true
    }
})

</script>

<template>
    <v-dialog v-model="show" :width="348">
        <v-sheet>
            <v-alert v-model="show" closable v-bind="props"></v-alert>
        </v-sheet>
    </v-dialog>
</template>
