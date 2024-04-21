import {getTodayCheckInTimeConfig} from "@/api/check-in/config";
import {checkIn, getPage} from "@/api/check-in/record";
import momentUtil from '@/utils/moment-util'
import {WorkInState, WorkOutState} from "@/constant/check-in/check-in-record-const";
import {showToastError, showToastSuccess} from "@/utils/wechat-util";
import {serviceOnlineCheck} from "@/api/common/common";

const app = getApp()

Page({
    data: {
        checkInTimeConfig: null,
        workInState: null,
        workOutState: null,
        workInStateDic: WorkInState,
        workOutStateDic: WorkOutState,
        workInTimeColor: '',
        workOutTimeColor: '',
    },
    onLoad() {
        this.getTodayCheckInTimeConfig()
    },
    async getTodayCheckInTimeConfig() {
        try {
            await this.serviceOnlineCheck()
            let res = await getTodayCheckInTimeConfig()
            const checkInTimeConfig = res.data.data
            this.setData({
                checkInTimeConfig,
            })
            if (checkInTimeConfig) {
                res = await getPage(1, 1, {
                    date: momentUtil.formatDate()
                })
                const records = res.data.data.records
                if (records && records.length > 0) {
                    const todayCheckInRecord = records[0]
                    const workInState = todayCheckInRecord.workInState
                    const workOutState = todayCheckInRecord.workOutState
                    let workInTimeColor = '', workInTimeDescription, workOutTimeColor = '', workOutTimeDescription
                    if (workInState === WorkInState.NORMAL.state) {
                        workInTimeColor = '#67C23A'
                    } else if (workInState === WorkInState.LATE.state) {
                        workInTimeColor = '#E6A23C'
                        workInTimeDescription = WorkInState.LATE.description
                    }
                    if (workOutState === WorkOutState.NORMAL.state) {
                        workOutTimeColor = '#67C23A'
                    } else if (workOutState === WorkOutState.LEAVE_EARLY.state) {
                        workOutTimeColor = '#E6A23C'
                        workOutTimeDescription = WorkOutState.LEAVE_EARLY.description
                    }
                    this.setData({
                        workInTimeColor,
                        workOutTimeColor,
                        workInTimeDescription,
                        workOutTimeDescription,
                    })
                }
            }
        } catch (e) {
            console.error(e)
            showToastError(e)
        }
    },
    async serviceOnlineCheck() {
        app.globalData.serviceOnline = false
        try {
            await serviceOnlineCheck()
            app.globalData.serviceOnline = true
        } catch (e) {
            console.error(e)
        }
    },
    async checkIn() {
        try {
            const res = await checkIn()
            showToastSuccess(res.data.msg)
        } catch (e) {
            console.error(e)
            showToastError(e)
        }
    },
});