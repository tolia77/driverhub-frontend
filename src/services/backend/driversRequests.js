import {instance} from "src/services/backend/config.js";

export async function driversIndexRequest(params, authorization) {
    return await instance.get("/drivers/", {
        params: params,
        headers: {
            Authorization: authorization
        }
    })
}

export async function driversCreateRequest(data, authorization) {
    return await instance.post("/drivers/", data, {
        headers: {
            Authorization: authorization
        }
    })
}

export async function driverShowRequest(driverId, authorization) {
    return await instance.get("/drivers/" + driverId, {
        headers: {
            Authorization: authorization
        }
    })
}

export async function driversUpdateRequest(driverId, data, authorization) {
    return await instance.patch("/drivers/" + driverId, data, {
        headers: {
            Authorization: authorization
        }
    })
}

export async function driversDeleteRequest(driverId, authorization) {
    return await instance.delete("/drivers/" + driverId, {
        headers: {
            Authorization: authorization
        }
    });
}
