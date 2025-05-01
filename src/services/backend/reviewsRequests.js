import {instance} from "src/services/backend/config.js";

export async function reviewsIndexRequest(authorization) {
    return await instance.get("reviews/", {
        headers: {
            Authorization: authorization
        }
    })
}

