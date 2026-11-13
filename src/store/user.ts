import { ref } from "vue"

import type { User } from "../interfaces/user/user"

export const user = ref<User | null>(null)
