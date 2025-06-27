# Auto Cookie Blocker

[English](#english) | [Español](#español)

<a name="english"></a>
# Auto Cookie Blocker

A browser extension that automatically rejects non-essential cookies using custom rules.

## Project Structure

The project is organized as follows:

```
cookie-blocker-extension/
  background/
    background.js
  content/
    content_script.js
    detector.js
    utils.js
  popup/
    popup.html
    popup.js
  config/
    config.js
    rules.json
  storage/
    storage.js
  logger/
    logger.js
  icons/
    icon.png
  manifest.json
  README.md
  .gitignore
```

- Each folder groups related files by their function (background scripts, content scripts, popup UI, configuration, storage, logger, etc).
- Update import paths and manifest references if you make changes to the structure.

## Features

- Automatic rejection of non-essential cookies
- Custom rules system per domain
- Intelligent rejection button detection
- Multi-language support (English and Spanish)
- Intuitive user interface
- Works on all websites

## Functionality

### Automatic Rejection
- Automatically detects and rejects non-essential cookies
- Searches for rejection buttons based on common keywords
- Works with most popular cookie banners

### Custom Rules
- Allows configuration of domain-specific rules
- Support for custom CSS selectors
- Local storage of rules for quick access

### Intelligent Detection
- Searches for rejection buttons in multiple languages
- Detects visible and hidden buttons
- Observes dynamic page changes

## Installation

1. Download the extension from the Chrome Web Store
2. Click on the extension icon in your browser
3. The extension will start working automatically

## Usage

The extension works automatically on all websites. To customize the behavior:

1. Click on the extension icon
2. Configure custom rules for specific domains
3. Save changes

## Required Permissions

- `storage`: To save custom rules
- `scripting`: To execute scripts on web pages
- `tabs`: To interact with browser tabs

## Version

Current version: 1.3

## Contributing

Contributions are welcome. Please open an issue or pull request to suggest improvements or report problems.

## License

This project is under the MIT License.

---

<a name="español"></a>
# Auto Cookie Blocker

Una extensión de navegador que rechaza automáticamente las cookies no esenciales utilizando reglas personalizadas.

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

```
cookie-blocker-extension/
  background/
    background.js
  content/
    content_script.js
    detector.js
    utils.js
  popup/
    popup.html
    popup.js
  config/
    config.js
    rules.json
  storage/
    storage.js
  logger/
    logger.js
  icons/
    icon.png
  manifest.json
  README.md
  .gitignore
```

- Cada carpeta agrupa archivos relacionados por su función (scripts de fondo, scripts de contenido, interfaz popup, configuración, almacenamiento, logger, etc).
- Actualiza las rutas de importación y referencias en el manifest si realizas cambios en la estructura.

## Características

- Rechazo automático de cookies no esenciales
- Sistema de reglas personalizadas por dominio
- Detección inteligente de botones de rechazo
- Soporte para múltiples idiomas (español e inglés)
- Interfaz de usuario intuitiva
- Funciona en todos los sitios web

## Funcionalidades

### Rechazo Automático
- Detecta y rechaza automáticamente las cookies no esenciales
- Busca botones de rechazo basados en palabras clave comunes
- Funciona con la mayoría de los banners de cookies populares

### Reglas Personalizadas
- Permite configurar reglas específicas por dominio
- Soporte para selectores CSS personalizados
- Almacenamiento local de reglas para acceso rápido

### Detección Inteligente
- Busca botones de rechazo en múltiples idiomas
- Detecta botones visibles y ocultos
- Observa cambios dinámicos en la página

## Instalación

1. Descarga la extensión desde la Chrome Web Store
2. Haz clic en el icono de la extensión en tu navegador
3. La extensión comenzará a funcionar automáticamente

## Uso

La extensión funciona automáticamente en todos los sitios web. Para personalizar el comportamiento:

1. Haz clic en el icono de la extensión
2. Configura las reglas personalizadas para dominios específicos
3. Guarda los cambios

## Permisos Requeridos

- `storage`: Para guardar las reglas personalizadas
- `scripting`: Para ejecutar scripts en las páginas web
- `tabs`: Para interactuar con las pestañas del navegador

## Versión

Versión actual: 1.3

## Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request para sugerir mejoras o reportar problemas.

## Licencia

Este proyecto está bajo la Licencia MIT.
