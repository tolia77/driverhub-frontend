import { instance } from "src/services/backend/config.js";

export async function messagesIndexRequest(sender_id, receiver_id, authorization) {
    return await instance.get(`/messages/conversation/`, {
        params: {
            sender_id: sender_id,
            receiver_id: receiver_id,
        },
        headers: {
            Authorization: authorization,
        },
    });
}
