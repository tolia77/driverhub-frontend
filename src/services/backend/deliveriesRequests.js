import {instance} from "src/services/backend/config.js";


export async function deliveriesIndexRequest(params, authorization) {
    return await instance.get("/deliveries/", {
        params: params,
        headers: {
            Authorization: authorization
        }
    })
}

export async function deliveryShowRequest(driverId, authorization) {
    return await instance.get("/deliveries/" + driverId, {
        headers: {
            Authorization: authorization
        }
    })
}

export async function deliveriesCreateRequest(data, authorization) {
    return await instance.post("/deliveries/", data, {
        headers: {
            authorization: authorization
        }
    })
}

export async function deliveriesUpdateRequest(deliveryId, data, authorization) {
    return await instance.patch("/deliveries/" + deliveryId, data, {
        headers: {
            Authorization: authorization
        },
    })
}

export async function deliveriesMyDriverRequest(authorization) {
    return await instance.get("/deliveries/driver/me/", {
        headers: {
            Authorization: authorization
        },
    })
}

export async function deliveriesMyClientRequest(authorization) {
    return await instance.get("/deliveries/client/me/", {
        headers: {
            Authorization: authorization
        },
    })
}

export async function deliveriesUpdateStatusRequest(deliveryId, status, authorization) {
    return await instance.patch(`/deliveries/${deliveryId}/status/`,
        {
            new_status: status,
        },
        {
            headers: {
                Authorization: authorization
            }
        })
}

export async function deliveriesDeleteRequest(driverId, authorization) {
    return await instance.delete("/deliveries/" + driverId, {
        headers: {
            Authorization: authorization
        }
    })
}
