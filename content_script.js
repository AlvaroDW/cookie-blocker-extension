// Importaciones de módulos
import { CONFIG } from './config.js';
import { logger } from './logger.js';
import { debounce, getCachedSelector, canAttempt, cleanup } from './utils.js';
import { buscarBotonRechazoSeguroEn, buscarBotonEnIframes } from './detector.js';

// Gestión de estado
const state = {
    isProcessing: false,
    hasClicked: false,
    lastAttempt: 0
};

// Función principal de búsqueda y clic
const buscarYClickarBoton = async () => {
    if (!canAttempt(state.lastAttempt) || state.hasClicked) return;

    try {
        // Buscar en documento principal
        const botonPrincipal = buscarBotonRechazoSeguroEn(document);
        if (botonPrincipal) {
            botonPrincipal.click();
            state.hasClicked = true;
            logger.info(`Clic realizado en botón principal: ${botonPrincipal.innerText.trim()}`);
            return;
        }

        // Buscar en iframes
        const botonIframe = await buscarBotonEnIframes();
        if (botonIframe) {
            botonIframe.click();
            state.hasClicked = true;
            logger.info(`Clic realizado en botón de iframe: ${botonIframe.innerText.trim()}`);
            return;
        }
    } catch (error) {
        logger.error('Error al buscar y clickar botón', error);
    }
};

// Función para manejar reglas personalizadas
const manejarReglaPersonalizada = (regla) => {
    if (!regla?.botonRechazo) return false;

    const boton = getCachedSelector(regla.botonRechazo);
    if (boton && boton.offsetParent !== null) {
        boton.click();
        logger.info('Botón personalizado clicado.');
        return true;
    }
    
    logger.warn('Botón personalizado no encontrado.');
    return false;
};

// Función para inicializar el observer
const inicializarObserver = () => {
    let intentos = 0;

    const observer = new MutationObserver(
        debounce(() => {
            if (intentos >= CONFIG.maxIntentos) {
                cleanup(observer);
                logger.info('Máximo de intentos alcanzado.');
                return;
            }

            intentos++;
            buscarYClickarBoton();
        }, CONFIG.debounceTime)
    );

    observer.observe(document.body, { childList: true, subtree: true });
    return observer;
};

// Función principal de inicialización
const inicializar = (reglasPorDominio) => {
    try {
        const dominio = window.location.hostname.replace(/^www\./, '');
        const regla = reglasPorDominio[dominio];

        // Intentar usar regla personalizada primero
        if (manejarReglaPersonalizada(regla)) {
            return;
        }

        // Inicializar observer para búsqueda automática
        const observer = inicializarObserver();

        // Timeout de seguridad
        setTimeout(() => {
            cleanup(observer);
            logger.info('Observador detenido tras timeout.');
        }, CONFIG.timeout);

        // Limpieza al descargar la página
        window.addEventListener('unload', () => cleanup(observer));

    } catch (error) {
        logger.error('Error en el proceso principal', error);
    }
};

// Iniciar el script
obtenerReglas(inicializar); 