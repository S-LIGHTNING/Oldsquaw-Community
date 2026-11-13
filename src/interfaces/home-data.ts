import type { ForumPostInList } from "./forum/post/forum-post-in-list"
import type { PluginInList } from "./plugin/plugin-in-list"
import type { WorkInList } from "./work/work-in-list"

export interface HomeData {
    ads: unknown[]
    plugins: PluginInList[]
    posts: ForumPostInList[]
    works: WorkInList[]
}
