import {instance} from "src/services/backend/config.js";

export async function vehiclesIndex(params, authorization) {
    return await instance.get("/vehicles/", {
        params: params,
        headers: {
            Authorization: authorization
        }
    })
}

export async function vehicleShow(driverId, authorization) {
    return await instance.get("/vehicles/" + driverId, {
        headers: {
            Authorization: authorization
        }
    })
}

export async function vehicleCreate(data, authorization) {
    return await instance.post("/vehicles/", data, {
        headers: {
            authorization: authorization
        }
    })
}

export async function vehicleUpdate(driverId, data, authorization) {
    return await instance.put("/vehicles/" + driverId, data, {
        headers: {
            Authorization: authorization
        }
    })
}

export async function vehicleDelete(driverId, authorization) {
    return instance.delete("/vehicles/" + driverId, {
        headers: {
            Authorization: authorization
        }
    });
}
