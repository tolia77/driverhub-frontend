import {instance} from "src/services/backend/config.js";

export async function clientsIndexRequest(authorization) {
    return await instance.get("/clients/", {
        headers: {
            Authorization: authorization,
        }
    })
}

export async function clientShowRequest(id, authorization) {
    return await instance.get(`/clients/${id}`, {
        headers: {
            Authorization: authorization,
        }
    })
}

export async function clientDeleteRequest(id, authorization) {
    return await instance.delete(`/clients/${id}`, {
        headers: {
            Authorization: authorization,
        }
    })
}

export async function clientUpdateRequest(id, data, authorization) {
    return await instance.patch(`/clients/${id}`, data, {
        headers: {
            Authorization: authorization,
        }
    })
}