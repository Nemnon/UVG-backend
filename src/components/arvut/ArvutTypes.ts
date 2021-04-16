import {IncomingUsersData} from "@core/CommonTypes";

export interface OnlineUsers{
    [userId:string]: IncomingUsersData
}

export interface Token{
    access_token: string
    expires_in: number
    refresh_expires_in: number
    refresh_token: string
    token_type: string

    // My params
    expire: number
    expireRefresh: number
}
