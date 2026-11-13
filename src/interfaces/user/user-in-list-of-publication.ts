import type { StudioInfo } from "../studio/studio-info"
import type { User } from "./user"

export type UserInListOfPublication = (
    Pick<User,
        "nickname" |
        "avatar_url" |
        "user_group"
    > & {
        workshop: Pick<StudioInfo, "id" | "name"> | null
    }
)
