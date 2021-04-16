import {addLog} from "@/components/dataBase";
import {sendTelegramMessage} from "@/components/telegramBot";

enum LogTypes{
    db,
    telegram
}

interface IMessages {
    [key: string]: {
        type: LogTypes,
        date: Date,
        cnt: number
    }
}

let timer
let messages: IMessages = {}

const addMessage = (type:LogTypes, ...args:string[]) => {
    const newMsg = args.join(' ')
    const msg = messages[newMsg]
    if (!msg) {
        messages[newMsg] = {
            cnt: 1,
            date: new Date(),
            type
        }
    } else {
        messages[newMsg].cnt ++
    }
}

const RunJob = async () => {
    const msgKeys = Object.keys(messages)
    if (msgKeys.length > 0) {
        for (const key of msgKeys) {
            const msg = messages[key]
            const addResult = await addLog(msg.date, key, msg.cnt)
            if (!addResult) {
                console.log(key, msg.cnt)
            }
            if (msg.type === LogTypes.telegram) {
                sendTelegramMessage(key)
            }
        }
    }
    messages = {}
    timer = setTimeout(() => {
        RunJob()
    }, 60000)
}

RunJob()




export const infoMsg = (...args:string[]) => addMessage(LogTypes.db, ...args)
export const alertMsg = (...args:string[]) => addMessage(LogTypes.telegram, ...args)
