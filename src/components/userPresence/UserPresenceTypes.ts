
export interface UserPresenceCalculated {
    userId: number
    name: string
    ten: number
    presenceValues: PresenceValues[]
}

export interface PresenceUser {
    userId: number
    name: string
    ten: number
    rangesEnterExit: UserPresenceEvent[]
    rangesCamera: UserPresenceEvent[]
}

export interface UserPresenceEvent {
    date_enter: Date
    date_exit: Date
}

export interface UserPresenceRange {
    presenceId:number
    presenceName:string
    startDate: number
    endDate: number
}

export interface PresenceValues{
    presenceId  :number
    presenceName:string
    value       :number
}

export interface PresenceTypes{
    id      :number
    name    :string
    start_h :number
    start_m :number
    end_h   :number
    end_m   :number
}
