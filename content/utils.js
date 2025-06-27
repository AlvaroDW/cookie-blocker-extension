import { CONFIG } from '../config/config.js';

// Cache de selectores DOM
const cachedSelectors = new Map();

// Función debounce para optimizar el rendimiento
export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Función para obtener selectores cacheados
export function getCachedSelector(selector) {
    if (!cachedSelectors.has(selector)) {
        cachedSelectors.set(selector, document.querySelector(selector));
    }
    return cachedSelectors.get(selector);
}

// Función para verificar si se puede realizar un intento
export function canAttempt(lastAttempt) {
    const now = Date.now();
    if (now - lastAttempt < CONFIG.checkInterval) {
        return false;
    }
    return true;
}

// Función de limpieza
export function cleanup(observer) {
    if (observer) {
        observer.disconnect();
    }
    cachedSelectors.clear();
} 