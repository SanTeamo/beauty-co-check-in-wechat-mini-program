import {httpGet} from "@/utils/http";
import momentUtil from "@/utils/moment-util";

const app = getApp()
const baseApi = '/check-in/check-in-time-config'

export const getTodayCheckInTimeConfig = async () => {
    if (!app.globalData.serviceOnline) {
        return getTodayCheckInTimeConfigOffline()
    }
    return await httpGet(baseApi + '/today-check-in-time-config')
}

const getTodayCheckInTimeConfigOffline = () => {
    const weekday = momentUtil.createMoment().get('weekday') + 1;
    let todayCheckInTimeConfig = null
    // TODO 修改
    // if (weekday >= 2 && weekday <= 5) {
    if (weekday !== 1) {
        todayCheckInTimeConfig = {
            weekday,
            workInTime: '09:30:00',
            workOutTime: '17:30:00',
        }
    }
    return {
        data: {
            data: todayCheckInTimeConfig
        }
    }
}