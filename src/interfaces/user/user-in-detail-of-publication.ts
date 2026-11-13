import type { StudioInfo } from "../studio/studio-info"
import type { User } from "./user"
import type { UserInListOfPublication } from "./user-in-list-of-publication"

export type UserInDetailOfPublication = UserInListOfPublication & (
    Pick<User, "points"> &
    {
        workshop: NonNullable<UserInListOfPublication["workshop"]> & Pick<StudioInfo, "logo_url"> | null
        user_bio: User["bio"]
        user: User
    }
)
