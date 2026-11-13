import type { ForumBoard } from "./forum-board"

export type ForumBoardInList = Pick<ForumBoard,
    "id" |
    "name" |
    "description" |
    "type" |
    "icon" |
    "sort_order" |
    "created_at"
>
