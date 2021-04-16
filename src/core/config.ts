import fs from "fs";
import path from "path";
import {CommonConfigType} from "@core/CommonTypes";

function loadJSON(fileName: string): any{
    try{
        let rawData = fs.readFileSync(path.resolve(__dirname, 'config', fileName));
        return JSON.parse(rawData.toString());
    }
    catch (e) {
        throw new Error('Failed load file: ' + fileName)
    }
}

export const config:CommonConfigType = loadJSON('config.json')
