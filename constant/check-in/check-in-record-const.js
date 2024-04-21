export const WorkInState = {
    NOT_CHECK_IN: {
        state: 0,
        description: '未打卡',
    },
    NORMAL: {
        state: 1,
        description: '正常',
    },
    LATE: {
        state: 2,
        description: '迟到',
    },
}
WorkInState.LIST = Object.keys(WorkInState).map((key) => {
    return WorkInState[key]
})
WorkInState.DIC_DATA = WorkInState.LIST.map((c) => {
    return {
        label: c.description,
        value: c.state,
    }
})

export const WorkOutState = {
    NOT_CHECK_IN: {
        state: 0,
        description: '未打卡',
    },
    NORMAL: {
        state: 1,
        description: '正常',
    },
    LEAVE_EARLY: {
        state: 2,
        description: '早退',
    },
}
WorkOutState.LIST = Object.keys(WorkOutState).map((key) => {
    return WorkOutState[key]
})
WorkOutState.DIC_DATA = WorkOutState.LIST.map((c) => {
    return {
        label: c.description,
        value: c.state,
    }
})