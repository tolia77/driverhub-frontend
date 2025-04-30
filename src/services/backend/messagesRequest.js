import { instance } from "src/services/backend/config.js";

export async function messagesIndex(driverId, authorization) {
    return await instance.get(`/messages/conversation/${driverId}`, {
        headers: {
            Authorization: authorization,
        },
    });
}
