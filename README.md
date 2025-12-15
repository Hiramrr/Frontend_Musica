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

##  Despliegue en Producción con Vercel

Para el Frontend utilizaremos **Vercel**, ya que está optimizado para proyectos construidos con **Vite** y Vue 3, ofreciendo un despliegue casi instantáneo.

> **Nota:** Recuerda que: para que funcione debes tener el despliegue de 
* **Backend:** Railway (Spring Boot)
* **Base de Datos:** Railway (PostgreSQL)

### 1. Preparar el Repositorio
Asegúrate de tu archivo `vercel.json` esté en la raíz del proyecto.
> **Nota:** El archivo `vercel.json` es vital para las aplicaciones SPA (Single Page Applications). Le dice al servidor que, sin importar qué ruta visite el usuario (ej: `/perfil`), siempre debe servir el `index.html` para que Vue Router maneje la navegación.

### 2. Importar Proyecto en Vercel
1. Crea una cuenta en [Vercel](https://vercel.com/) y vincula tu GitHub.
2. En el Dashboard, haz clic en **"Add New..."** -> **"Project"**.
3. Busca tu repositorio `Frontend_Musica` y haz clic en **Import**.

### 3. Configurar el Proyecto (Build & Settings)
Vercel detectará automáticamente que usas **Vite**.
* **Framework Preset:** Vite
* **Root Directory:** Si tu proyecto está en una subcarpeta, selecciona la carpeta donde está el `package.json` (por ejemplo `src/frontend` o similar). Si está en la raíz, déjalo así.

### 4. Configurar Variables de Entorno
Para que tu Frontend sepa a qué Backend conectarse (el de Railway), debemos configurar la variable de entorno.

Despliega la sección **Environment Variables** y agrega:

| Variable | Valor |
| :--- | :--- |
| `VITE_API_BASE_URL` | Tu URL de Railway (ej: `https://backend-musica-production.up.railway.app/api`) |

> **Importante:** No olvides poner el `/api` al final si así lo configuraste en tu backend, y asegúrate de usar `https`.

### 5. Desplegar
1. Haz clic en **Deploy**.
2. Espera a que termine el proceso de "Building".
3. Al finalizar, verás una captura de tu web y un botón **"Visit"**.

---
