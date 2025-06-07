// Función para obtener las reglas
obtenerReglas((reglasPorDominio) => {
    const dominio = window.location.hostname.replace(/^www\./, '');
    const regla = reglasPorDominio[dominio];
  
    // Función para buscar y clicar el botón
    function buscarYClickarBoton(palabrasClave) {
      const botones = Array.from(document.querySelectorAll('button, input[type="button"], a'));
      for (const boton of botones) {
        const texto = boton.innerText?.trim().toLowerCase();
        if (palabrasClave.some(p => texto.includes(p)) && boton.offsetParent !== null) {
          boton.click();
          console.log('[CookieBlocker] Botón clicado:', texto);
          return true;
        }
      }
      return false;
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
    const textosRechazo = ['rechazar', 'reject', 'only necessary', 'rechazar todo'];
    const textosConfig = ['configurar', 'preferencias', 'settings'];
    let intentos = 0;
    const maxIntentos = 5;
  
    // Observer
    const observer = new MutationObserver(() => {
      if (intentos >= maxIntentos) {
        observer.disconnect();
        console.log('[CookieBlocker] Máximo de intentos alcanzado.');
        return;
      }
  
      intentos++;
      console.log(`[CookieBlocker] Intento ${intentos}`);
  
      // Si se encuentra el botón, detener el observer
      if (buscarYClickarBoton(textosRechazo) || buscarYClickarBoton(textosConfig)) {
        observer.disconnect();
        console.log('[CookieBlocker] Observador detenido tras éxito.');
      }
    });
  
    observer.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => {
      observer.disconnect();
      console.log('[CookieBlocker] Observador detenido tras timeout.');
    }, 8000);
  });
  