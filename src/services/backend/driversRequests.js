import {instance} from "./config.js";

export async function driversIndex(params, authorization) {
    return await instance.get("/drivers", {
        params: params,
        headers: {
            Authorization: authorization
        }
    })
}

export async function driverShow(driverId, authorization) {
    return await instance.get("/drivers/" + driverId, {
        headers: {
            Authorization: authorization
        }
    })
}

export async function driverCreate(data, authorization) {
    return await instance.post("/drivers/", data, {
        headers: {
            authorization: authorization
        }
    })
}

export async function driverUpdate(driverId, data, authorization) {
    return await instance.put("/drivers/" + driverId, data, {
        headers: {
            Authorization: authorization
        }
    })
}

export async function driverDelete(driverId, authorization) {
    return await instance.delete("/drivers/" + driverId, {
        headers: {
            Authorization: authorization
        }
    });
}
