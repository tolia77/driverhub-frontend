import {instance} from "src/services/backend/config.js";

export async function clientsIndex(authorization) {
    return await instance.get("/clients", {
        headers: {
            Authorization: authorization,
        }
    })
}