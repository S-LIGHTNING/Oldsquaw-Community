<script setup lang="ts">

import { ref, watchEffect } from "vue"
import axios from "axios"

import type { WorkInList } from "../../../interfaces/work/work-in-list.ts"
import { READ_API_BASE } from "../../../env.ts"
import { withShowError } from "../../../utils/with-show-error.ts"
import WorkList from "../../components/Work/Grid/WorkGrid.vue"

const PAGE_SIZE = 20

const works = ref<WorkInList[]>([])
const loading = ref(true)
const sort = ref<"latest" | "views">("latest")
const page = ref(1)
const totalPages = ref(0)

watchEffect(withShowError(async () => {
    loading.value = true
    const { data: { data } } = await axios.get(READ_API_BASE + "/works", {
        params: {
            page: page.value,
            page_size: PAGE_SIZE,
            sort: sort.value
        }
    })
    works.value = data.list
    totalPages.value = data.total_pages
    loading.value = false
}))

</script>

<template>
    <div class="page-content">
        <v-toolbar class="sort">
            <v-toolbar-title>作品广场</v-toolbar-title>
            <template #append>
                <v-btn-toggle color="primary" density="compact" v-model="sort">
                    <v-btn value="latest">最新</v-btn>
                    <v-btn value="views">最热</v-btn>
                </v-btn-toggle>
            </template>
        </v-toolbar>
        <WorkList :works :loading :loadingCardNumber="PAGE_SIZE" />
        <v-pagination v-model="page" :length="totalPages" />
    </div>
</template>
