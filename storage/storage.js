// Función común para obtener reglas
function obtenerReglas(callback) {
  chrome.storage.local.get(['reglas'], (result) => {
    callback(result.reglas || {});
  });
}

// Guardar reglas
function guardarReglas(reglas, callback) {
  chrome.storage.local.set({ reglas }, callback);
}
