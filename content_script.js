// Add a centralized logging system
const logger = {
    info: (message) => console.log(`[CookieBlocker] ${message}`),
    error: (message, error) => console.error(`[CookieBlocker] ${message}`, error),
    warn: (message) => console.warn(`[CookieBlocker] ${message}`)
};

obtenerReglas((reglasPorDominio) => {
    const dominio = window.location.hostname.replace(/^www\./, '');
    const regla = reglasPorDominio[dominio];
  
    function esBannerDeCookies(nodo) {
      const posiblesClases = ['cookie', 'consent', 'gdpr', 'privacy', 'truste', 'onetrust'];
      const idClase = (nodo?.id + ' ' + nodo?.className).toLowerCase();
      return posiblesClases.some(c => idClase.includes(c));
    }
  
    function buscarBotonRechazoSeguroEn(doc) {
      const botones = Array.from(doc.querySelectorAll('button, input[type="button"], a'));
      for (const boton of botones) {
        const texto = boton.innerText?.toLowerCase() || '';
        const esTextoRechazo = ['rechazar', 'reject', 'solo necesarias', 'denegar', 'rechazar todo'].some(t => texto.includes(t));
        const contenedor = boton.closest('div, section, form');
  
        if (
          esTextoRechazo &&
          contenedor &&
          esBannerDeCookies(contenedor) &&
          boton.offsetParent !== null
        ) {
          return boton;
        }
      }
      return null;
    }
  
    function buscarBotonEnPaginaPrincipalYIframes() {
      // Buscar en documento principal
      const botonPrincipal = buscarBotonRechazoSeguroEn(document);
      if (botonPrincipal) return botonPrincipal;
  
      // Buscar en iframes accesibles
      const iframes = Array.from(document.querySelectorAll('iframe'));
      for (const iframe of iframes) {
        try {
          const doc = iframe.contentDocument || iframe.contentWindow.document;
          const botonIframe = buscarBotonRechazoSeguroEn(doc);
          if (botonIframe) return botonIframe;
        } catch (e) {
          // Cross-origin iframe, no accesible
          continue;
        }
      }
  
      return null;
    }
  
    // Si hay una regla personalizada, usarla
    if (regla?.botonRechazo) {
      const boton = document.querySelector(regla.botonRechazo);
      if (boton && boton.offsetParent !== null) {
        boton.click();
        logger.info('Botón personalizado clicado.');
      } else {
        logger.info('Botón personalizado no encontrado.');
      }
      return;
    }
  
    let intentos = 0;
    const maxIntentos = 6;
  
    const observer = new MutationObserver(() => {
      if (intentos >= maxIntentos) {
        observer.disconnect();
        logger.info('Máximo de intentos alcanzado.');
        return;
      }
  
      intentos++;
      const botonSeguro = buscarBotonEnPaginaPrincipalYIframes();
      if (botonSeguro) {
        botonSeguro.click();
        logger.info('Clic realizado en botón seguro:', botonSeguro.innerText.trim());
        observer.disconnect();
      }
    });
  
    observer.observe(document.body, { childList: true, subtree: true });
  
    setTimeout(() => {
      observer.disconnect();
      logger.info('Observador detenido tras timeout.');
    }, 10000);
  });
  
// Add try-catch blocks for critical operations
try {
    // ... existing code ...
} catch (error) {
    logger.error('Error in cookie rejection process', error);
}
  