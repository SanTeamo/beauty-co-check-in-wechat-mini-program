import {httpGet} from "@/utils/http";

const baseUrl = '/common'

export const serviceOnlineCheck = async () => {
    return await httpGet(baseUrl + '/service-online-check')
}