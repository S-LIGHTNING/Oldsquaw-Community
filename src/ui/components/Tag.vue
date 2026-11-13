<script setup lang="ts">

import { useTemplateRef, watchEffect } from "vue"

const props = defineProps<{ color?: string }>()

const tagElementRef = useTemplateRef<HTMLSpanElement>("tag")

watchEffect(() => {
    const color = props.color
    const tagElement = tagElementRef.value
    if (color === undefined || tagElement == undefined) {
        return
    }
    tagElement.style.color = `rgb(var(--v-theme-on-${color}))`
    tagElement.style.backgroundColor = `rgb(var(--v-theme-${color}))`
})

</script>

<template>
    <span class="tag" ref="tag">
        <slot />
    </span>
</template>

<style scoped>
.tag {
    font-size: small;
    font-weight: bold;
    height: fit-content;
    color: rgb(var(--v-theme-on-primary));
    background-color: rgb(var(--v-theme-primary));
    padding-inline: 4px;
    padding-bottom: 3px;
    border-radius: 4px;
    margin-right: 4px;
}
</style>
