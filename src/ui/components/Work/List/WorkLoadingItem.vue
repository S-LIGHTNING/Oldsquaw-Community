<template>
    <v-list-item>
        <template #prepend>
            <div class="cover-wrapper">
                <v-skeleton-loader class="cover" type="image" />
            </div>
        </template>
        <v-skeleton-loader type="paragraph" />
    </v-list-item>
</template>

<style scoped>
.cover-wrapper {
    overflow: hidden;
    margin-right: 12px;
    border: 1px solid rgb(var(--v-border-color), var(--v-border-opacity));
    border-radius: 8px;
}
.cover {
    width: 96px;
    height: 96px;
}
</style>
