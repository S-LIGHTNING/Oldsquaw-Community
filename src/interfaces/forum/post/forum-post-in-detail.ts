import type { UserInDetailOfPublication } from "../../user/user-in-detail-of-publication"
import type { BasicForumPost } from "./basic-forum-post"

export type ForumPostInDetail = BasicForumPost & UserInDetailOfPublication
