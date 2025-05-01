import {instance} from "src/services/backend/config.js";

export async function dispatchersCreateRequest(data, authorization) {
    return await instance.post("/dispatchers/", data, {
        headers: {
            Authorization: authorization
        }
    })
}