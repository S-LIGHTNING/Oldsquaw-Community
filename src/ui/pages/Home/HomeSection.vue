<script setup lang="ts">

defineProps<{
    title: string
    moreTo?: string
}>()

</script>

<template>
    <section>
        <v-toolbar>
            <v-toolbar-title>{{ title }}</v-toolbar-title>
            <template #append>
                <v-btn v-if="moreTo" :to="moreTo" append-icon="mdi-arrow-right">查看更多</v-btn>
            </template>
        </v-toolbar>
        <div class="content">
            <slot />
        </div>
    </section>
</template>

<style scoped>
.content {
    padding-inline: 16px;
}
</style>
