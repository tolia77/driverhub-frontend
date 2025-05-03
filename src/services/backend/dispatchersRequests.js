import {instance} from "src/services/backend/config.js";

export async function dispatchersCreateRequest(data, authorization) {
    return await instance.post("/dispatchers/", data, {
        headers: {
            Authorization: authorization
        }
    })
}

export async function dispatchersIndexRequest(authorization) {
    return await instance.get("/dispatchers/", {
        headers: {
            Authorization: authorization
        }
    })
}

export async function dispatchersShowRequest(id, authorization) {
    return await instance.get(`/dispatchers/${id}/`, {
        headers: {
            Authorization: authorization
        }
    })
}

export async function dispatchersUpdateRequest(id, data, authorization) {
    return await instance.patch(`/dispatchers/${id}/`, data, {
        headers: {
            Authorization: authorization
        }
    })
}

export async function dispatchersDeleteRequest(id, authorization) {
    return await instance.delete(`/dispatchers/${id}/`, {
        headers: {
            Authorization: authorization
        }
    })
}