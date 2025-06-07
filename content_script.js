// Función para obtener las reglas
obtenerReglas((reglasPorDominio) => {
    const dominio = window.location.hostname.replace(/^www\./, '');
    const regla = reglasPorDominio[dominio];
  
    // Función para verificar si el nodo es un banner de cookies
    function esBannerDeCookies(nodo) {
      const posiblesClases = ['cookie', 'consent', 'gdpr', 'privacy', 'truste'];
      const idClase = (nodo?.id + ' ' + nodo?.className).toLowerCase();
      return posiblesClases.some(c => idClase.includes(c));
    }
  
    // Función para buscar y clicar el botón
    function buscarBotonRechazoSeguro() {
      const botones = Array.from(document.querySelectorAll('button, input[type="button"], a'));
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
  
    // Si hay una regla personalizada, usarla
    if (regla?.botonRechazo) {
      const boton = document.querySelector(regla.botonRechazo);
      if (boton && boton.offsetParent !== null) {
        boton.click();
        console.log('[CookieBlocker] Botón personalizado clicado.');
      } else {
        console.log('[CookieBlocker] Botón personalizado no encontrado.');
      }
      return;
    }
  
    // Si no hay una regla personalizada, usar una lógica genérica
    let intentos = 0;
    const maxIntentos = 6;
  
    // Observer
    const observer = new MutationObserver(() => {
      if (intentos >= maxIntentos) {
        observer.disconnect();
        console.log('[CookieBlocker] Máximo de intentos alcanzado.');
        return;
      }
  
      intentos++;
      const botonSeguro = buscarBotonRechazoSeguro();
      if (botonSeguro) {
        botonSeguro.click();
        console.log('[CookieBlocker] Clic realizado en botón seguro:', botonSeguro.innerText.trim());
        observer.disconnect();
      }
    });
  
    observer.observe(document.body, { childList: true, subtree: true });
  
    // Timeout
    setTimeout(() => {
      observer.disconnect();
      console.log('[CookieBlocker] Observador detenido tras timeout.');
    }, 8000);
  });
  