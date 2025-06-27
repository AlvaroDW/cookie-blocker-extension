// Función para renderizar las reglas en el popup
function renderizarReglas(reglas) {
    const contenedor = document.getElementById('lista');
    contenedor.innerHTML = '';
  
    for (const dominio in reglas) {
      const regla = reglas[dominio];
      const div = document.createElement('div');
      div.innerHTML = `
        <div class="dominio">${dominio}</div>
        <div><code>${regla.botonRechazo}</code></div>
        <button onclick="eliminarRegla('${dominio}')">Eliminar</button>
      `;
      contenedor.appendChild(div);
    }
  }
  
  // Función para eliminar una regla
  function eliminarRegla(dominio) {
    chrome.storage.local.get(['reglas'], (result) => {
      const reglas = result.reglas || {};
      delete reglas[dominio];
      chrome.storage.local.set({ reglas }, () => {
        renderizarReglas(reglas);
      });
    });
  }
  
  // Evento para guardar una regla
  document.getElementById('guardar').addEventListener('click', () => {
    const dominio = document.getElementById('dominio').value.trim();
    const selector = document.getElementById('selector').value.trim();
  
    if (!dominio || !selector) return;
  
    chrome.storage.local.get(['reglas'], (result) => {
      const reglas = result.reglas || {};
      reglas[dominio] = { botonRechazo: selector };
      chrome.storage.local.set({ reglas }, () => {
        document.getElementById('dominio').value = '';
        document.getElementById('selector').value = '';
        renderizarReglas(reglas);
      });
    });
  });
  
  // Cargar las reglas al cargar el popup
  chrome.storage.local.get(['reglas'], (result) => {
    renderizarReglas(result.reglas || {});
  });
  