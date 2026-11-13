import type { User } from "../user/user"

export interface BasicWork {
    id: number
    name: string
    type: string
    link: string
    cover_url: string
    description: string
    user_id: User["id"]
    views: number
    is_featured: number
    status: "published"
    created_at: string
}
