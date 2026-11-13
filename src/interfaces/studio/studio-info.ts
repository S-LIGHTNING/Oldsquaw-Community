import type { DateTime } from "../date-time"
import type { StudioNumberRole } from "./studio-member-role"
import type { User } from "../user/user"
import type { StudioLevel } from "./studio-level"

export interface StudioInfo {
    id: number
    name: string
    description: string
    logo_url: string
    level_id: StudioLevel["id"]
    creator_id: number
    created_at: DateTime,
    level_name: StudioLevel["name"]
    creator_name: User["nickname"]
    creator_avatar: User["avatar_url"]
    members: (
        Pick<User,
            "created_at" |
            "nickname" |
            "avatar_url" |
            "user_group"
        > & {
            id: number
            workshop_id: StudioInfo["id"]
            user_id: User["id"],
            role: StudioNumberRole
        }
    ),
    viewer: (
        (
            {
                is_member: true
                role: StudioNumberRole
            } | {
                is_member: false
                role: null
            }
        ) & {
            has_pending: boolean
            is_owner: boolean
            pending_elsewhere: boolean
        }
    )
}
