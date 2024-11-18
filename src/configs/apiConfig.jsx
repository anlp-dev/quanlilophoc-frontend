const API_BASE_URL = 'http://127.0.0.1:9999';

const headers = {
    'Content-Type': 'application/json',
};

const getAuthHeaders = (token) => ({
    ...headers,
    'Authorization': `Bearer ${token}`,
});

const apiConfig = {
    baseUrl: API_BASE_URL,
    headers,
    getAuthHeaders,
};

export default apiConfig;