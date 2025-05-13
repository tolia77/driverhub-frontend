import {instance} from "src/services/backend/config.js";

export async function signInRequest(email, password) {
    return await instance.post("/auth/login", {
        email: email,
        password: password
    })
}

export async function registerClientRequest(data) {
    return await instance.post("/auth/signup", data)
}

export async function getMeRequest(authorization) {
    return await instance.get("/auth/me", {
        headers: {
            Authorization: authorization
        }
    })
}
