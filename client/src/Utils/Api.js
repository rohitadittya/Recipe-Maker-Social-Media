import { SESSION_STORAGE_KEYS } from "./Constants";

const API_BASE_URL = "http://localhost:5000/api";

let noOfActiveReq = 0;
let loadingCB = null;
let errorCB = null;

export const setLoadingHandler = (cb) => {
    loadingCB = cb;
};

const updateLoading = () => {
    if (loadingCB) {
        loadingCB(noOfActiveReq > 0);
    }
};

export const setErrorHandler = (cb) => {
    errorCB = cb;
};

const setError = (error) => {
    errorCB(error);
};

const constructUrl = (url, params) => {
    const apiUrl = `${API_BASE_URL}${url}`;
    if (!params) return apiUrl;

    const urlParams = new URLSearchParams(params).toString();
    return `${apiUrl}?${urlParams}`;
}

const constructHeaders = (headers) => {
    const token = window.sessionStorage.getItem(SESSION_STORAGE_KEYS.JWT_TOKEN) || null;
    return {
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : null,
        ...headers,
    };
}

/**
 * 
 * @param {*} apiUrl - This is the endpoint URL without base url. For example: /user/login
 * @param {*} method - HTTP method (GET, POST, PUT, PATCH, DELETE)
 * @param {*} body - Request Body Object
 * @param {*} queryParams - Query Parameters Object, eg: { id: 1, name: "test" }
 * @param {*} headers - Headers Object, eg: { "Content-Type": "application/json" }
 * @returns 
 */
const httpClient = async (apiUrl, method = "GET", body = null, queryParams = null, headersObj = {}) => {
    noOfActiveReq++;
    updateLoading();

    try {
        const url = constructUrl(apiUrl, queryParams);
        const options = {
            method,
            body: body ? JSON.stringify(body) : null,
            headers: constructHeaders(headersObj),
        }
        const response = await fetch(url, options);

        if (!response.ok) {
            const err = await response.json();
            setError(err?.message || "Some Error Occured.");
            setTimeout(() => {
                setError("")
            }, 2000);
            throw err;
        }
        return await response.json();
    }
    finally {
        noOfActiveReq--;
        updateLoading();
    }
};

export default httpClient;