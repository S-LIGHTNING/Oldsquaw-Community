import { onMounted, onUnmounted, ref } from "vue"

export function useInnerWidth() {
    const width = ref(innerWidth)
    function update() {
        width.value = innerWidth
    }
    onMounted(() => { addEventListener("resize", update) })
    onUnmounted(() => { removeEventListener("resize", update) })
    return width
}
