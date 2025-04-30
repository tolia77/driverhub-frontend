import {instance} from "src/services/backend/config.js";

export async function messagesIndex(params, authorization) {
    return await instance.get("/messages", {
        headers: {
            Authorization: authorization,
        },
        params: params,
    })
}