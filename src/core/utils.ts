import moment from "moment";

export function copyObject(data:any){
    return JSON.parse(JSON.stringify(data))
}

export async function wait(ms: number){
    return new Promise(resolve=>setTimeout(resolve,ms))
}

export function log(...args: any[]){
    console.log(getDateTime(), ...args)
}

export function getDate(d: any = undefined){
    return moment(d).format('YYYY-MM-DD')
}

export function getDateTime(d: any = undefined){
    return moment(d).format('YYYY-MM-DD HH:mm:ss')
}

export function getHM(d: any = undefined){
    return moment().format('H:mm')
}

