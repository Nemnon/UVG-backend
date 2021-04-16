import {config} from "@core/config";
import {loadUsers} from "@/components/main";
import {copyObject, log} from "@core/utils";
import {IncomingUsersData} from "@core/CommonTypes";
import {FastifyReply, FastifyRequest} from "fastify";

interface IZoomRequest {
    payload: {
        object: {
            id: string
            participant:{
                user_name: string
                id: string
                email: string
                join_time: string
                leave_time: string
            }
        }
    },
    event: string
}

export const handler = async (req: FastifyRequest, reply: FastifyReply) => {
    const body = <IZoomRequest>req.body
    const auth = req.headers.authorization
    try {
        if (auth && auth === config.zoom.IncomingAuthKey) {
            const meetingId = body?.payload?.object?.id
            if (meetingId && meetingId === config.zoom.meetingId) {
                const userJoined = body?.event === 'meeting.participant_joined'
                const userName = body?.payload?.object?.participant?.user_name
                const userZoomId = body?.payload?.object?.participant?.id
                const userEmail = body?.payload?.object?.participant?.email
                let eventTime

                if (userJoined) {
                    eventTime = body?.payload?.object?.participant?.join_time
                } else {
                    eventTime = body?.payload?.object?.participant?.leave_time
                }

                const result: IncomingUsersData = {
                    key: userZoomId ? userZoomId : '',
                    username: userName ? userName : '',
                    _userId: 0,
                    ping: 0,
                    camera: false,
                    email: userEmail ? userEmail : '',
                    time: new Date(eventTime).getTime()
                }

                loadUsers(copyObject([result]))
            }
            return reply.code(200).send('ok')
        } else {
            return reply.code(400).send('failed')
        }
    } catch (err) {
        log(err.message)
    }
}
