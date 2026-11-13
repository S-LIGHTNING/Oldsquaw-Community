<script setup lang="ts">

const props = defineProps<{
    views?: number | null
    thumbUps?: number | null
    comments?: number | null
}>()

</script>

<template>
    <div class="statistics">
        <div class="statistic" v-if="views !== undefined">
            <v-icon size="smallest" icon="mdi-eye-outline" />
            <span>{{ views ?? "…" }}</span>
        </div>
        <div class="statistic" v-if="thumbUps !== undefined">
            <v-icon size="smallest" icon="mdi-thumb-up-outline" />
            <span>{{ thumbUps ?? "…" }}</span>
        </div>
        <div class="statistic" v-if="comments !== undefined">
            <v-icon size="smallest" icon="mdi-comment-outline" />
            <span>{{ comments ?? "…" }}</span>
        </div>
    </div>
</template>

<style scoped>
.statistics {
    display: flex;
    justify-content: space-evenly;
}
.statistic {
    display: flex;
    align-items: center;
    margin-inline: 8px;
}
.statistic>span {
    margin-left: 8px;
}
</style>
