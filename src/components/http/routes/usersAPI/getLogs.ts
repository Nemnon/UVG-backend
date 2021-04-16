import {getLogs} from "@/components/dataBase";
import {FastifyReply, FastifyRequest} from "fastify"

export const handler = async (request: FastifyRequest, reply: FastifyReply) =>{
    await request.jwtVerify()
    try{
        const users = await getLogs()
        return reply.code(200).send(users)
    }catch (e) {
        return reply.code(500).send({ error: 'Database error!' })
    }
}
