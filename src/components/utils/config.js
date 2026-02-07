// utils/config.js

const PROD_HTTP = "https://verve-ai-ukec.onrender.com";
const PROD_WS = "wss://verve-ai-ukec.onrender.com";

const DEV_HTTP = "http://127.0.0.1:10000";
const DEV_WS = "ws://127.0.0.1:10000";

const isDev =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");

export const BACKEND_URL = isDev ? DEV_HTTP : PROD_HTTP;

export const getWebSocketUrl = (path) => `${isDev ? DEV_WS : PROD_WS}${path}`;

export const API_BASE_URL = import.meta.env.VITE_API_URL;

