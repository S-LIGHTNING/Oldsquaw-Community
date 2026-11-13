import type { DateTime } from "../../date-time"
import type { User } from "../../user/user"
import type { ForumBoardType } from "./forum-board-type"

export interface ForumBoard {
    id: number
    name: string
    description: string
    type: ForumBoardType
    icon: string
    sort_order: number
    created_at: DateTime
    moderators: Pick<User, "id" | "nickname" | "avatar_url" | "user_group">[]
}
