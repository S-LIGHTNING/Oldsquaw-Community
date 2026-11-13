import type { DateTime } from "../date-time"
import type { User } from "../user/user"
import type { CommentTarget } from "./comment-target"

export interface BasicComment {
    id: number
    content: string
    user_id: User["id"]
    target_type: CommentTarget
    target_id: number
    status: "visible"
    created_at: DateTime
}
