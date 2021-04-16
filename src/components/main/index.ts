import '@/components/arvut'
import '@/components/http/server'
import * as db from '@/components/dataBase'
import {IncomingUsersData} from "@core/CommonTypes";
import {getLastMeetingReport} from "@/components/zoom";
import {startCalcUsers} from "@/components/userPresence";
import {saveUsers} from "@/components/googleSheet/polonskiy";
import {saveTenPresence, saveToTimeLine, saveUsersData} from "@/components/googleSheet/uvg";
import {alertMsg, infoMsg} from "@core/logger";
import {ifEndSchedule, ifSchedule} from "@/components/dataBase";

let timer: NodeJS.Timeout;

export const loadUsers = async (users: IncomingUsersData[]) => {
    const UsersToSaveUVGSheet: IncomingUsersData[] = []

    try {
        const isSchedule = await ifSchedule()

        for (let user of users) {
            if(user?.key?.length > 10){
                user._userId = await db.getUserIdFromKey(user.key)
            } else {
                user._userId = await db.getUserIdFromName(user.username)
            }

            if(user._userId > 0 && isSchedule) {
                const userWasToday = await db.getUserWasToday(user)
                if (!userWasToday) {
                    UsersToSaveUVGSheet.push(user)
                }
                await db.addUserToTimeLine(user)
                await db.addUserToTimeLine(user, user.camera)
            }

            await db.addUserEvent(user)
        }

        ///////////// FIND USERS TO SAVE IN UVG TABLE SHEET
        if(UsersToSaveUVGSheet.length > 0){
            saveUsersData(UsersToSaveUVGSheet)
        }

    }
    catch (err){
        alertMsg('loadUsers Error: ', err.message)
    }

}

const onTimerEvent = async () => {
    const schedule = await ifEndSchedule()
    if (schedule) {
        infoMsg('onTimerEvent - start')
        await getLastMeetingReport()
        const calc = await startCalcUsers()
        if(calc){
            await saveToTimeLine(calc)
            await saveUsers(calc)
        }
        await saveTenPresence()
        rearmTimer()
        infoMsg('onTimerEvent - end')
    } else {
        rearmTimer()
    }
}

const rearmTimer = () => {
    clearTimeout(timer)
    const now = new Date()
    const delay = 60000 - (now.getTime() % 60000); // exact ms to next minute interval
    timer = setTimeout(()=>{
        onTimerEvent()
    }, delay);
}

export const init = () => {
    infoMsg('Started!')
    onTimerEvent()
}

init()

