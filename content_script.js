// Cargar el archivo de reglas
obtenerReglas((reglasPorDominio) => {
    const dominio = window.location.hostname.replace(/^www\./, '');
    const regla = reglasPorDominio[dominio];
  
    if (regla?.botonRechazo) {
      const boton = document.querySelector(regla.botonRechazo);
      if (boton && boton.offsetParent !== null) {
        boton.click();
        console.log('[CookieBlocker] Botón personalizado clicado.');
      } else {
        console.log('[CookieBlocker] Botón personalizado no encontrado.');
      }
    } else {
      const textosRechazo = ['rechazar', 'reject', 'only necessary', 'rechazar todo'];
      const textosConfig = ['configurar', 'preferencias', 'settings'];
  
      // Función para buscar y clicar el botón
      function buscarYClickarBoton(palabrasClave) {
        const botones = Array.from(document.querySelectorAll('button, input[type="button"], a'));
        for (const boton of botones) {
          const texto = boton.innerText.trim().toLowerCase();
          if (palabrasClave.some(p => texto.includes(p)) && boton.offsetParent !== null) {
            boton.click();
            console.log('[CookieBlocker] Botón genérico clicado:', texto);
            return true;
          }
        }
        return false;
      }
  
      // Función para rechazar cookies
      function rechazarCookies() {
        if (!buscarYClickarBoton(textosRechazo)) {
          buscarYClickarBoton(textosConfig);
        }
      }
  
      // Observer
      const observer = new MutationObserver(rechazarCookies);
      observer.observe(document.body, { childList: true, subtree: true });
      setTimeout(rechazarCookies, 2000);
    }
  });
  