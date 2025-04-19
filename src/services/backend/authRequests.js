import {instance} from "src/services/backend/config.js";

export async function registerDriver(data, authorization) {
    return await instance.post("/auth/register-driver", data, {
        headers: {
            Authorization: authorization
        }
    })
}

export async function registerDispatcher(data) {
    return await instance.post("/auth/register-dispatcher", data)
}

export async function getMe(authorization) {
    return await instance.get("/auth/me", {
        headers: {
            Authorization: authorization
        }
    })
}
