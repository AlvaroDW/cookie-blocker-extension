export const logger = {
    info: (message) => console.log(`[CookieBlocker] ${message}`),
    error: (message, error) => console.error(`[CookieBlocker] ${message}`, error),
    warn: (message) => console.warn(`[CookieBlocker] ${message}`)
}; 