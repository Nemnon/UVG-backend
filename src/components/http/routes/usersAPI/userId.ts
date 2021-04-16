import {getUserData} from "@/components/dataBase";
import {FastifyReply, FastifyRequest, RouteShorthandOptions} from "fastify"

interface IUserID{
    id: Number
}

export const options: RouteShorthandOptions = {
    schema: {
        params: {
            type: 'object',
            additionalProperties: false,
            required: [ 'id' ],
            properties: { id: { type: 'number'} }
        }
    }
}

export const handler = async (request: FastifyRequest, reply: FastifyReply) =>{
    await request.jwtVerify()
    try{
        const {id} = <IUserID>request.params;
        const user = await getUserData(id)
        return reply.code(200).send(user)
    }catch (err) {
        return reply.code(500).send({ error: err.message })
    }
}
