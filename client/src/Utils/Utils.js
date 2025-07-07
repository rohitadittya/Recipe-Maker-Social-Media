import { SESSION_STORAGE_KEYS } from "./Constants";

export const getTokenExpiration = () => {
    const token = sessionStorage.getItem(SESSION_STORAGE_KEYS.JWT_TOKEN);
    if (!token) return null;

    try {
        const payloadBase64 = token.split('.')[1];
        const payload = JSON.parse(atob(payloadBase64));
        const expiry = payload.exp ? payload.exp * 1000 : null;

        if (token && expiry) {
            return expiry - Date.now();
        }
        return null;
    } catch (e) {
        return null;
    }
};

export const istokenExpired = () => {
    const expiry = getTokenExpiration();
    if (expiry && expiry > 0) {
        return false;
    }
    return true;
}