// utils/config.js

const API_URL = import.meta.env.VITE_API_URL;

// Ensure API_URL is defined
if (!API_URL) {
  console.warn("VITE_API_URL is not defined in the environment variables.");
}

export const BACKEND_URL = API_URL;

export const getWebSocketUrl = (path) => {
    if (!API_URL) return "";
    const wsUrl = API_URL.replace(/^http/, "ws");
    return `${wsUrl}${path}`;
};

export const API_BASE_URL = API_URL;

