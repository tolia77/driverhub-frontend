import {instance} from "src/services/backend/config.js";

export async function signIn(email, password) {
    return await instance.post("/auth/login", {
        email: email,
        password: password
    })
}


export async function dispatchersCreate(data, authorization) {
    return await instance.post("/dispatchers/", data, {
        headers: {
            Authorization: authorization
        }
    })
}

export async function registerClient(data) {
    return await instance.post("/auth/signup", data)
}

export async function getMe(authorization) {
    return await instance.get("/auth/me", {
        headers: {
            Authorization: authorization
        }
    })
}
