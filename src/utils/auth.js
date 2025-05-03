export function getAccessToken() {
    return localStorage.getItem("accessToken");
}

export function getUserRole() {
    return localStorage.getItem("accountType");
}

export function getUserId() {
    return localStorage.getItem("userId");
}