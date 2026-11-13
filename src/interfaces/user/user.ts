import type { StudioInfo } from "../studio/studio-info"
import type { StudioNumberRole } from "../studio/studio-member-role"
import type { UserGroup } from "./user-group"

export interface User {
    id: number
    nickname: string
    avatar_url: string
    bio: string
    points: number
    user_group: UserGroup
    codemao_id: number
    created_at: string
    workshop: (
        Pick<StudioInfo, "id" | "name" | "logo_url"> & {
            role: StudioNumberRole
        }
    ) | null
    has_pending_workshop_application: boolean
}
