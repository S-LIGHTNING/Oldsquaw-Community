import type { ForumBoard } from "./forum-board"
import type { ForumBoardType } from "./forum-board-type"

export interface ForumBoardInPost {
    board_id: ForumBoard["id"]
    board_name: ForumBoard["name"]
    board_type: ForumBoardType
}
