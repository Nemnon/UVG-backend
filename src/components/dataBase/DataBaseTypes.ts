
export interface ZoomPresenceSortUser {
    user_id: number
    date_enter: number
    date_exit: number
}

export interface TeenPresence{
    ten: number
    avg_presence: number
    avg_cam: number
}

export interface IdbSchedule{
    id: number
    day_of_week: number
    start_h: number
    start_m: number
    end_h: number
    end_m: number
}
