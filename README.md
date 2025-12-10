# Smart Rating - Frontend

Frontend desarrollado en **Vue 3** utilizando **Vite** para la aplicación de gestión musical "Smart Rating". Este proyecto actúa como interfaz de usuario para consumir servicios REST de un backend desarrollado en SpringBoot con base de datos PostgreSQL.

## Tecnologías Principales

* **Vue 3 (Composition API):** Framework progresivo para interfaces de usuario.
* **Vite:** Herramienta de compilación rápida y servidor de desarrollo.
* **Pinia:** Librería de gestión de estado (Store) intuitiva y modular.
* **Axios:** Cliente HTTP basado en promesas para conectar con el Backend.
* **Vue Router:** Enrutador oficial para crear una SPA (Single Page Application).

## Prerrequisitos

Antes de iniciar, asegúrate de tener instalado:
* [Node.js](https://nodejs.org/) (Versión 18 o superior recomendada).
* **NPM** (Viene incluido con Node.js).

## Instalación y Configuración Local

Sigue estos pasos para ejecutar el proyecto en tu máquina:

1.  **Clonar el repositorio e instalar dependencias:**
    Abrir una terminal en la carpeta del proyecto y ejecutar:
    ```bash
    npm install
    ```

2.  **Configurar Variables de Entorno:**
    El proyecto utiliza variables de entorno para saber a dónde conectarse. Asegúrate de tener un archivo `.env` en la raíz del proyecto.
    
    * Si estás probando con el backend en tu PC:
        `VITE_API_BASE_URL=http://localhost:8080/api`
    * Si usas el backend en la nube (ej. Railway):
        `VITE_API_BASE_URL=https://backendmusica-production.up.railway.app/api/`

3.  **Ejecutar en modo Desarrollo:**
    Este comando levanta un servidor local con recarga rápida (HMR).
    ```bash
    npm run dev
    ```
    > Por defecto la app correrá en: `http://localhost:5173/`

## Compilación para Producción

Para generar los archivos estáticos optimizados (HTML, CSS, JS) listos para subir a un hosting:

```bash
npm run build
```

## Despliegue

El proyecto incluye configuración para Vercel (vercel.json) para manejar las redirecciones de la SPA, pero la carpeta /dist generada puede desplegarse en cualquier servidor estático (Nginx, Apache, Netlify).
