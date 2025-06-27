// Detector de banners de cookies
import { CONFIG } from '../config/config.js';
import { logger } from '../logger/logger.js';

// Función para detectar banners de cookies
export function esBannerDeCookies(nodo) {
    const idClase = (nodo?.id + ' ' + nodo?.className).toLowerCase();
    return CONFIG.posiblesClases.some(c => idClase.includes(c));
}

// Función para buscar botones de rechazo
export function buscarBotonRechazoSeguroEn(doc) {
    const botones = Array.from(doc.querySelectorAll('button, input[type="button"], a, [role="button"]'));
    
    return botones.find(boton => {
        const texto = boton.innerText?.toLowerCase() || '';
        const esTextoRechazo = CONFIG.textosRechazo.some(t => texto.includes(t));
        const contenedor = boton.closest('div, section, form');
        
        return esTextoRechazo && 
               contenedor && 
               esBannerDeCookies(contenedor) && 
               boton.offsetParent !== null;
    });
}

// Función para buscar en iframes
export async function buscarBotonEnIframes() {
    const iframes = Array.from(document.querySelectorAll('iframe'));
    const resultados = await Promise.all(
        iframes.map(async (iframe) => {
            try {
                const doc = iframe.contentDocument || iframe.contentWindow.document;
                return buscarBotonRechazoSeguroEn(doc);
            } catch (e) {
                logger.warn(`No se pudo acceder al iframe: ${e.message}`);
                return null;
            }
        })
    );
    return resultados.find(result => result !== null);
} 