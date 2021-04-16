
export interface IncomingUsersData{
    key:        string
    email:      string
    username:   string
    camera:     boolean
    ping:       number
    time:       number
    _userId:     number
}

export interface CommonConfigType{

    arvut:{
        userTimeOut: number
        getRoomsPeriod: number
        tokenUrl: string
        roomsUrl: string
        tokenAuthData:{
            'grant_type': string
            'client_id': string
            'username': string
            'password': string
        },
        rooms: string[]
    },

    DataBase:{
        host: string
        user: string
        password: string
        charset: string
        database: string
    },

    UVGGoogleSheet:{
        UVGSheetId: string
        timeLineSheetName: string
        usersSheet:{
            // ZERO BASED
            startRowIndex: number
            usersDataStartColumn: number
        }
    },

    WebServer:{
        jwt_secret: string
        adminIps: string[]
        ssl:{
            fullchain: string,
            privkey: string
        },
        zoom:{
            IncomingAuthKey: string,
            meetingId: string
        }
    },

    zoom:{
        meetingId: string
        IncomingAuthKey: string
        authToken: string
    },

    GoogleServiceAccount: {
        type: string
        project_id: string
        private_key_id: string
        private_key: string
        client_email: string
        client_id: string
        auth_uri: string
        token_uri: string
        auth_provider_x509_cert_url: string
        client_x509_cert_url: string
    },

    telegram: {
        botToken: string
        channel: string
    },

    block: {
        countToBlock: number
        blockTimeOut: number
    }

}
