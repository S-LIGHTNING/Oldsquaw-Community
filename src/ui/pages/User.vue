<script setup lang="ts">

import { computed, onUnmounted, ref, watchEffect } from "vue"
import axios from "axios"

import { useRoute } from "vue-router"
import type { User } from "../../interfaces/user/user.ts"
import { withShowError } from "../../utils/with-show-error"
import { READ_API_BASE } from "../../env.ts"
import WorkList from "../components/Work/Grid/WorkGrid.vue"
import PluginList from "../components/Plugin/PluginGrid.vue"
import type { BasicPlugin } from "../../interfaces/plugin/basic-plugin.ts"
import type { BasicWork } from "../../interfaces/work/basic-work.ts"
import type { BasicForumPost } from "../../interfaces/forum/post/basic-forum-post.ts"
import ForumPostList from "../components/Forum/Post/ForumPostList.vue"

const route = useRoute()
const originalTitle = document.title

const userID = computed(() => Number(route.params.id))
const loading = ref(true)
const user = ref<User>()
const works = ref<BasicWork[]>([])
const posts = ref<BasicForumPost[]>([])
const plugins = ref<BasicPlugin[]>([])

watchEffect(withShowError(async () => {
    loading.value = true
    document.title = `… - 用户 - ${originalTitle}`
    const { data } = (await axios.get(READ_API_BASE + `/users/${userID.value}`)).data
    user.value = data.user
    works.value = data.works
    posts.value = data.posts
    plugins.value = data.plugins
    loading.value = false
    document.title = `${user.value!.nickname} - 用户 - ${originalTitle}`
}))

onUnmounted(() => {
    document.title = originalTitle
})

</script>

<template>
    <section>
        <v-skeleton-loader
            class="content"
            v-if="loading"
            type="list-item-avatar-three-line"
            color="transparent"
            :elevation="0"
            :max-width="512"
        />
        <div class="content" v-if="user && !loading">
            <v-list-item class="section info">
                <template #prepend>
                    <v-avatar :image="user.avatar_url" size="x-large" />
                </template>
                <v-list-item-title>{{ user.nickname }}</v-list-item-title>
                <v-list-item-subtitle>训练师编号（编程猫ID）：{{ user.codemao_id }}</v-list-item-subtitle>
                <v-list-item-subtitle>积分：{{ user.points }}</v-list-item-subtitle>
            </v-list-item>
        </div>
    </section>
    <section>
        <v-toolbar title="作品" />
        <div class="content"><WorkList :works :user :loading /></div>
    </section>
    <section>
        <v-toolbar title="帖子" />
        <div class="content"><ForumPostList :posts :loading /></div>
    </section>
    <section>
        <v-toolbar title="插件" />
        <div class="content"><PluginList :plugins :loading /></div>
    </section>
</template>

<style scoped>
section {
    margin-block: 16px;
}
.content {
    padding-inline: 16px;
}
</style>
