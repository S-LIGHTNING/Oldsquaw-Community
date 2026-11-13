import type { UserInListOfPublication } from "../user/user-in-list-of-publication"
import type { BasicComment } from "./basic-comment"

export type CommentInList = BasicComment & UserInListOfPublication
