const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

export const API_CONFIG = {
    BASE_URL: API_BASE_URL,
    HEADERS: {
        'Content-Type': 'application/json',
        Accept: "application/json",
    },
    ENDPOINTS: {
        RESERVATIONS: `${API_BASE_URL}/reservations`,
        CUSTOMERS: `${API_BASE_URL}/customers`,
    },
};
