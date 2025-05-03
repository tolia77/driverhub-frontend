import {instance} from "src/services/backend/config.js";

export async function vehiclesIndexRequest(params, authorization) {
    return await instance.get("/vehicles/", {
        params: params,
        headers: {
            Authorization: authorization
        }
    })
}
export async function vehiclesUnassignedRequest(authorization) {
    return await instance.get("/vehicles/unassigned", {
        headers: {
            Authorization: authorization
        }
    })
}
export async function vehicleShowRequest(driverId, authorization) {
    return await instance.get("/vehicles/" + driverId, {
        headers: {
            Authorization: authorization
        }
    })
}

export async function vehiclesCreateRequest(data, authorization) {
    return await instance.post("/vehicles/", data, {
        headers: {
            authorization: authorization
        }
    })
}

export async function vehiclesUpdateRequest(driverId, data, authorization) {
    return await instance.patch("/vehicles/" + driverId, data, {
        headers: {
            Authorization: authorization
        }
    })
}

export async function vehiclesDeleteRequest(driverId, authorization) {
    return instance.delete("/vehicles/" + driverId, {
        headers: {
            Authorization: authorization
        }
    });
}
