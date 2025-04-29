import {instance} from "src/services/backend/config.js";

export async function logBreaksCreate(data, authorization) {
    return await instance.post("/log_breaks/", data, {
        headers: {
            Authorization: authorization
        }
    })
}

export async function logBreaksIndex(authorization, params=null) {
    return await instance.get("/log_breaks/", {
        params: params,
        headers: {
            Authorization: authorization
        }
    })
}

export async function logBreaksMy(authorization, params=null) {
    return await instance.get("/log_breaks/driver/me", {
        params: params,
        headers: {
            Authorization: authorization
        }
    })
}

export async function logBreaksDelete(logBreakId, authorization) {
    return await instance.delete(`/log_breaks/${logBreakId}`, {
        headers: {
            Authorization: authorization
        }
    })
}

export async function logBreaksUpdate(logBreakId, data, authorization) {
    return await instance.patch(`/log_breaks/${logBreakId}`, data, {
        headers: {
            Authorization: authorization
        }
    })
}