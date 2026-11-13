import type { DateTime } from "../date-time"

export interface StudioLevel {
    id: number
    name: string
    min_points: number
    sort_order: number
    created_at: DateTime
}
