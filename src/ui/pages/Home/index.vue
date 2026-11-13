<script setup lang="ts">

import { onMounted, ref } from "vue"

import type { HomeData } from "../../../interfaces/home-data.ts"
import HomeSection from "./HomeSection.vue"
import { withShowError } from "../../../utils/with-show-error.ts"
import axios from "axios"
import { READ_API_BASE } from "../../../env.ts"
import WorkList from "../../components/Work/Grid/WorkGrid.vue"
import PluginList from "../../components/Plugin/PluginGrid.vue"
import ForumPostList from "../../components/Forum/Post/ForumPostList.vue"

const data = ref<HomeData>()

onMounted(withShowError(async () => {
    data.value = (await axios.get(READ_API_BASE + "/home")).data.data
}))

</script>

<template>
    <HomeSection class="section" title="精选作品" moreTo="/work">
        <WorkList :works="data?.works ?? []" :loading="data === undefined" />
    </HomeSection>
    <HomeSection class="section" title="社区帖子" moreTo="/forum">
        <ForumPostList :posts="data?.posts ?? []" :loading="data === undefined" />
    </HomeSection>
    <HomeSection class="section" title="最新插件" moreTo="/plugin">
        <PluginList :plugins="data?.plugins ?? []" :loading="data === undefined" />
    </HomeSection>
</template>

<style scoped>
.section {
    margin-bottom: 32px;
}
</style>
