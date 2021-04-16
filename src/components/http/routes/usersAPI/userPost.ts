import {updateUser} from "@/components/dataBase";
import {FastifyReply, FastifyRequest, RouteShorthandOptions} from "fastify"

export interface IUserPost{
    id: Number
    name: String
    ten: Number
    userAliases: {
        id: Number
        mod: String
        val: String
    }[]
    userKeys: {
        id: Number
        mod: String
        val: String
    }[]
}


export const options: RouteShorthandOptions = {
    schema: {
        body: {
            type: 'object',
            required:['name','id', 'ten', 'userAliases', 'userKeys'],
            properties: {
                name: {
                    type: 'string',
                    minLength: 3,
                    maxLength: 32
                },
                id: { type: 'number', minimum: 0 },
                ten: { type: 'number', minimum: 1 },
                userAliases: {
                    type: 'array',
                    items: {
                        type: 'object',
                        required:['mod','id', 'val'],
                        properties: {
                            id: { type: 'number' },
                            mod: { type: 'string', minLength: 1, maxLength: 1 },
                            val: { type: 'string', minLength: 3 },
                        }
                    }
                },
                userKeys: {
                    type: 'array',
                    items: {
                        type: 'object',
                        required:['mod','id', 'val'],
                        properties: {
                            id: { type: 'number' },
                            mod: { type: 'string', minLength: 1, maxLength: 1 },
                            val: { type: 'string', minLength: 3 },
                        }
                    }
                }
            }
        }
    }
}

export const handler = async (request: FastifyRequest, reply: FastifyReply) =>{
    await request.jwtVerify()
    try{
        const user = <IUserPost>request.body
        const ans = await updateUser(user)
        return reply.code(200).send({id: ans})
    }catch (err) {
        return reply.code(500).send({ error: err.message})
    }
}
