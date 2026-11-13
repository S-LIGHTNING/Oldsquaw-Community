import type { DateTime } from "../../date-time"
import type { User } from "../../user/user"
import type { ForumBoardInPost } from "../board/forum-board-in-post"

export interface BasicForumPost extends ForumBoardInPost {
    id: number
    title: string
    content: string
    content_type: "text" | "html"
    user_id: User["id"]
    views: number
    is_featured: 0 | 1
    is_top: 0 | 1
    is_global_top: 0 | 1
    status: "published"
    created_at: DateTime
    updated_at: DateTime
}
