import {instance} from "src/services/backend/config.js";

export async function reviewsIndexRequest(authorization) {
    return await instance.get("/reviews/", {
        headers: {
            Authorization: authorization
        }
    })
}

export async function reviewsCreateRequest(authorization, data) {
    return await instance.post("/reviews/", data, {
        headers: {
            Authorization: authorization
        }
    })
}

export async function reviewsUpdateRequest(authorization, id, data) {
    return await instance.patch(`/reviews/${id}/`, data, {
        headers: {
            Authorization: authorization
        }
    })
}

export async function reviewsDeleteRequest(authorization, id) {
    return await instance.delete(`/reviews/${id}/`, {
        headers: {
            Authorization: authorization
        }
    })
}

export async function reviewShowRequest(authorization, id) {
    return await instance.get(`/reviews/${id}/`, {
        headers: {
            Authorization: authorization
        }
    })
}

export async function reviewsMyRequest(authorization) {
    return await instance.get("/reviews/client/me/", {
        headers: {
            Authorization: authorization
        }
    })
}