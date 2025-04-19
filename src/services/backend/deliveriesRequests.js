import {instance} from "src/services/backend/config.js";


export async function deliveriesIndex(params, authorization) {
    return await instance.get("/deliveries/", {
        params: params,
        headers: {
            Authorization: authorization
        }
    })
}

export async function deliveryShow(driverId, authorization) {
    return await instance.get("/deliveries/" + driverId, {
        headers: {
            Authorization: authorization
        }
    })
}

export async function deliveryCreate(data, authorization) {
    return await instance.post("/deliveries/", data, {
        headers: {
            authorization: authorization
        }
    })
}

export async function deliveryUpdate(deliveryId, data, authorization) {
    return await instance.patch("/deliveries/" + deliveryId, data, {
        headers: {
            Authorization: authorization
        },
    })
}

export async function getMyDeliveries(authorization) {
    return await instance.get("/deliveries/my", {
        headers: {
            Authorization: authorization
        },
    })
}

export async function updateDeliveryStatus(deliveryId, status, authorization) {
    return await instance.patch(`/deliveries/${deliveryId}/status`, {}, {
        params: {
            status: status,
        },
        headers: {
            Authorization: authorization
        }
    })
}

export async function deliveryDelete(driverId, authorization) {
    return await instance.delete("/deliveries/" + driverId, {
        headers: {
            Authorization: authorization
        }
    })
}
