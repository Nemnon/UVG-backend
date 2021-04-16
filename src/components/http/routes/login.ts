import server from  '@/components/http/server'
import {loginUser} from "@/components/dataBase";
import {FastifyReply, FastifyRequest, RouteShorthandOptions} from "fastify"
import {addToWatch} from "@/components/http/block";
import {alertMsg} from "@core/logger";


interface IUserLogin {
    username: string;
    password: string;
}

export const options: RouteShorthandOptions = {
    schema: {
        body: {
            type: 'object',
            required:['username','password'],
            properties: {
                username: {
                    type: 'string',
                    minLength: 3,
                    maxLength: 32
                },
                password: {
                    type: 'string',
                    minLength: 6,
                    maxLength: 32
                }
            }
        }
    }
}

export const handler = async (request: FastifyRequest, reply: FastifyReply) =>{
    const body = <IUserLogin>request.body
    const {username, password} = body
    const userExists = await loginUser(username, password)
    if( userExists ){
        const token = server.jwt.sign(body, {expiresIn: '7d'})
        const replyUser = {
            username,
            token
        }
        return reply.code(200).send(replyUser)
    }
    addToWatch(request.ip)
    alertMsg(`${request.ip} [${username}:${password}] - failed login!`)
    return reply.code(400).send({ error: 'Wrong username or password!' })
}
