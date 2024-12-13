import { API_CONFIG } from "./apiConfig";

export const fetchData = async (endpoint, method, body = {}) => {
    const url = `${API_CONFIG.BASE_URL}${endpoint}`;
    // const headers = { ...API_CONFIG.HEADERS, ...(options.headers || {}) };

    const init = {
        method: method,
        headers: { "Content-Type": "application/json", },
    }

    // If there's a body and it's not empty, include it in the request
    if (Object.keys(body).length > 0) {
        init.body = JSON.stringify(body);
    }

    try {

        const response = await fetch(url, init);

        if (!response.ok) {
            alert("Something went wrong!")
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the response as JSON and return the result
        return await response.json();
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
};
