import {instance} from "src/services/backend/config.js";

export async function clientsIndexRequest(authorization) {
    return await instance.get("/clients", {
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

