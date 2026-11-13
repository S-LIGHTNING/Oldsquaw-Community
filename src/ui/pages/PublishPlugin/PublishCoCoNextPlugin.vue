<script setup lang="ts">

import { computed, ref } from "vue"
import axios from "axios"

import { withShowError } from "../../../utils/with-show-error"
import { alert } from "../../dialogs/Alert.vue"
import { WRITE_API_BASE } from "../../../env.ts"
import { uploadFile } from "../../../utils/upload-file.ts"

const name = ref("")
const icon = ref("")
const customID = ref("")
const version = ref("")
const description = ref("")
const uploadFiles = ref<File[]>()

const ok = ref(false)
const loading = ref(false)
const totalFilesCount = ref(0)
const uploadedFilesCount = ref(0)
const process = computed(() => totalFilesCount.value === 0 ? 0 : uploadedFilesCount.value / totalFilesCount.value * 100)

const publish = withShowError(async () => {
    loading.value = true
    const files = uploadFiles.value!
    totalFilesCount.value = files.length + 1
    uploadedFilesCount.value = 0
    const filesURLRecord: Record<string, string> = Object.create(null)
    for (const [path, file] of Object.entries(buildFileRecord(files))) {
        filesURLRecord[path] = await uploadFile(file)
        uploadedFilesCount.value++
    }
    const indexFile = new File([JSON.stringify(filesURLRecord)], "index.json")
    const link = await uploadFile(indexFile)
    uploadedFilesCount.value++
    await axios.post(WRITE_API_BASE + "/plugins", {
        name: name.value,
        type: "coco-next-plugin",
        custom_id: customID.value,
        link,
        icon_url: icon.value,
        description: description.value
    })
    alert.success("插件发布成功")
    loading.value = false
})

const setPluginInList = withShowError(async () => {
    ok.value = false
    const files = uploadFiles.value
    if (files === undefined || files.length === 0) {
        return
    }
    const fileRecord = buildFileRecord(files)
    const packageFile = fileRecord["package.json"]
    if (!(packageFile instanceof File)) {
        throw new Error("未找到 package.json 文件")
    }
    if (!(fileRecord["index.js"] instanceof File)) {
        throw new Error("未找到插件入口文件（index.js）")
    }
    const packageInfo = JSON.parse(await packageFile.text())
    name.value = packageInfo.title
    icon.value = packageInfo.icon
    customID.value = packageInfo.name
    version.value = packageInfo.version
    description.value = packageInfo.description
    ok.value = Boolean(name.value && customID.value && version.value)
})

function buildFileRecord(files: File[]): Record<string, File> {
    const fileRecord: Record<string, File> = Object.create(null)
    for (const file of files) {
        fileRecord[file.webkitRelativePath.split("/", 2)[1]] = file
    }
    return fileRecord
}

</script>

<template>
    <v-file-input label="文件夹" multiple webkitdirectory v-model="uploadFiles" @change="setPluginInList" />
    <p>选择插件文件夹，以下信息将自动读取</p>
    <div class="nameAndIcon">
        <v-icon class="icon" v-if="!icon" icon="mdi-puzzle-outline" size="x-large" />
        <v-avatar class="icon" v-if="icon" :image="icon" />
        <v-text-field label="名称" readonly v-model="name" />
    </div>
    <v-text-field label="自定义 ID（包名）" readonly v-model="customID" />
    <v-text-field label="版本" readonly v-model="version" />
    <v-textarea label="简介" readonly v-model="description" />
    <p v-if="loading">
        正在上传文件……({{ uploadedFilesCount }}/{{ totalFilesCount }})
        <span class="process">{{ Math.round(process) }}%</span>
        <v-progress-linear v-model="process" />
    </p>
    <v-btn :disabled="!ok" :loading @click="publish">发布</v-btn>
</template>

<style scoped>
.nameAndIcon {
    display: flex;
}
.icon {
    margin-right: 16px;
}
.process {
    float: right;
}
</style>
