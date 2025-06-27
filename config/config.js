// Configuración de la extensión
export const CONFIG = {
    maxIntentos: 6,
    timeout: 10000,
    debounceTime: 250,
    checkInterval: 1000,
    textosRechazo: [
        'rechazar', 'reject', 'solo necesarias', 'denegar', 'rechazar todo',
        'only necessary', 'decline', 'deny all', 'reject all', 'essential only'
    ],
    posiblesClases: [
        'cookie', 'consent', 'gdpr', 'privacy', 'truste', 'onetrust',
        'cookie-banner', 'cookie-notice', 'cookie-policy', 'cookie-consent',
        'cookie-law', 'cookie-warning', 'cookie-popup'
    ]
}; 