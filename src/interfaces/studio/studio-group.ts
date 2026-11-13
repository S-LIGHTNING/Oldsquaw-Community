import type { User } from "../user/user"
import type { StudioInfo } from "./studio-info"
import type { StudioLevel } from "./studio-level"

export interface StudioGroup {
    level: StudioLevel
    workshops: (
        Pick<StudioInfo,
            "id" |
            "name" |
            "description" |
            "logo_url" |
            "level_id" |
            "creator_id" |
            "created_at"
        > &
        Pick<User,
            "nickname" |
            "avatar_url"
        >
    )[]
}
