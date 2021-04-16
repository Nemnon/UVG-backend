
export interface ZoomReportAnswer{
    page_count: number
    page_size: number
    total_records: number
    next_page_token: string
    participants:ZoomReportAnswerUser[]
}

export interface ZoomReportAnswerUser{
    id: string
    user_id: string
    name: string
    user_email: string
    join_time: string | Date
    leave_time: string | Date
    duration: number
    attentiveness_score: string
}
