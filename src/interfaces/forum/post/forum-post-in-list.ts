import type { BasicForumPost } from "./basic-forum-post"
import type { UserInListOfPublication } from "../../user/user-in-list-of-publication"

export type ForumPostInList = BasicForumPost & UserInListOfPublication
