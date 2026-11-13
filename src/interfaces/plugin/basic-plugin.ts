import type { PluginType } from "./plugin-type"
import type { User } from "../user/user"

export interface BasicPlugin {
    id: number
    custom_id: string | null
    name: string
    type: PluginType
    link: string
    icon_url: string
    description: string
    user_id: User["id"]
    views: number
    is_featured: number
    status: "published"
    created_at: string
}
