<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
const store = useAuthStore()

const router = useRouter()

function cerrarSesion(){
  router.push("/");
  store.logout();
}
</script>

<template>
  <div id="container">
    <div id="headerArea">
      <div id="header"></div>

      <nav id="navbar" v-if="store.estaLogeado">
        <ul>
          <li><RouterLink to="/">Inicio</RouterLink></li>
          <li><RouterLink to="/artistas">Artistas</RouterLink></li>
          <li><RouterLink to="/albumes">Albumes</RouterLink></li>
          <li><RouterLink to="/musica">Musica</RouterLink></li>
          <li>
            <RouterLink to="/login">Hola, {{ store.usuario.nombre }}</RouterLink>
          </li>
        </ul>
      </nav>

      <nav id="navbar" v-else>
        <ul>
          <li><RouterLink to="/">Inicio</RouterLink></li>
          <li><RouterLink to="/artistas">Artistas</RouterLink></li>
          <li><RouterLink to="/albumes">Albumes</RouterLink></li>
          <li><RouterLink to="/musica">Musica</RouterLink></li>
          <li>
            <RouterLink to="/login">Iniciar Sesion</RouterLink>
          </li>
        </ul>
      </nav>
    </div>

    <div id="flex">
      <main>
        <h1>Perfil de {{ store.usuario.nombre }}</h1>
        <div class="contenido-perfil-layout">
          <div class="sidebar">
            <div class="foto-perfil-contenedor">
              <img :src="store.usuario?.foto_url || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'" class="foto-perfil"></img>
            </div>
          </div>

          <div class="informacion-usuario">
            <ul class="lista">
              <li><strong>Correo:</strong> {{store.usuario?.correo || 'No tiene' }}</li>
              <li><strong>Nombre:</strong> {{store.usuario?.nombre || 'No tiene' }}</li>
            </ul>
          </div>
        </div>

          <div class="pestanas">
            <span class="pestana activa">General</span>
            <span class="pestana">Reseñas de albums</span>
            <span class="pestana">Reseñas de canciones</span>
          </div>

          <p class="intro-text">
            <strong>Reseñas recientes</strong>
          </p>

          <div v-for="album in nuevosLanzamientos" :key="album.id" class="box fila-album">
            <div class="portada-album">
              <img :src="album.imagen" :alt="album.titulo" />
            </div>

            <div class="detalles-album">
              <h2>
                <a href="#">{{ album.titulo }}</a>
              </h2>
              <div class="artista-album">
                de <strong>{{ album.artista }}</strong>
              </div>
              <div class="meta-album">Lanzado: {{ album.fecha }}</div>

              <div class="generos-album">
                <span v-for="(genero, indice) in album.generos" :key="indice">
                  [{{ genero }}]{{ indice < album.generos.length - 1 ? ' ' : '' }}
                </span>
              </div>
            </div>

            <div class="estadisticas-album">
              <div class="stat-group">
                <span class="stat-label">Promedio</span>
                <span class="stat-value">{{ album.promedio }}</span>
              </div>
              <div class="stat-group">
                <span class="stat-label">Numero de votos</span>
                <span class="stat-value">{{ album.votos }}</span>
              </div>
            </div>
        </div>
        <div class="boton-container">
          <button @click="cerrarSesion()" class="editar-datos">Editar datos</button>
          <button @click="cerrarSesion()" class="cerrar-sesion">Cerrar Sesión</button>
        </div>
      </main>
    </div>
    <footer>
      <p>Smart Rating</p>
    </footer>
  </div>
</template>

<style>
/* Variables para imágenes y colores */
:root {
  --header-image: url('https://sadhost.neocities.org/images/layouts/wp.jpeg');
  --body-bg-image: url('https://sadhost.neocities.org/images/tiles/bk024.gif');
  --content-bg: #e6f0fa;
  --azul-textos: #2b7de9;
  --gris-azul: #c2d6ea;
  --text-color: #0f2d52;
}

/* Fuentes importadas */
@font-face {
  font-family: Nunito;
  src: url('https://sadhost.neocities.org/fonts/Nunito-Regular.ttf');
}
@font-face {
  font-family: Nunito;
  src: url('https://sadhost.neocities.org/fonts/Nunito-Bold.ttf');
  font-weight: bold;
}

body {
  font-family: 'Nunito', sans-serif;
  margin: 0;
  background-color: #e6f0fa;
  background-size: 65px;
  color: var(--text-color);
  background-image: var(--body-bg-image);
}

a {
  color: var(--azul-textos);
  font-weight: bold;
  text-decoration: none;
}
a:hover {
  color: #a49cba;
  text-decoration: underline;
}

#container {
  background-color: var(--content-bg);
  max-width: 900px;
  margin: 0 auto;
}

#navbar {
  height: 40px;
  background-color: var(--gris-azul);
  width: 100%;
  border-bottom: 1px solid var(--azul-textos);
}

#navbar ul {
  display: flex;
  padding: 0;
  margin: 0;
  list-style-type: none;
  justify-content: space-evenly;
}

#navbar li {
  padding-top: 10px;
}

#flex {
  display: flex;
  align-items: flex-start;
}

main {
  background-color: var(--content-bg);
  flex: 1;
  padding: 20px;
  min-height: 80vh;
}

aside {
  background-color: #c2d6ea;
  width: 250px;
  padding: 20px;
  font-size: smaller;
  border-left: 1px solid var(--azul-textos);
  border-bottom: 1px solid var(--azul-textos);
}

footer {
  background-color: var(--gris-azul);
  width: 100%;
  padding: 10px;
  text-align: center;
  border-top: 1px solid var(--azul-textos);
  margin-top: 20px;
}

h1,
h2,
h3 {
  color: var(--azul-textos);
  margin-top: 0;
}

h1 {
  font-size: 25px;
  border-bottom: 1px dashed var(--azul-textos);
  padding-bottom: 10px;
}
h2 {
  font-size: 18px;
}

.box {
  background-color: var(--gris-azul);
  border: 1px solid var(--azul-textos);
  padding: 10px;
  margin-bottom: 15px;
}

/* Pestañas de navegación interna */
.pestanas {
  margin-bottom: 15px;
  border-bottom: 1px solid #a49cba;
}
.pestana {
  margin-right: 15px;
  cursor: pointer;
  color: #0f2d52;
}
.pestana.activa {
  color: var(--azul-textos);
  font-weight: bold;
  border-bottom: 2px solid var(--azul-textos);
}

/* Layout de la fila del álbum */
.fila-album {
  display: flex;
  gap: 15px;
  align-items: center;
}

.portada-album img {
  width: 80px;
  height: 80px;
  border: 1px solid var(--azul-textos);
  display: block;
}

.detalles-album {
  flex: 1;
}

.titulo-album {
  margin: 0;
  font-size: 1.2rem;
}

.meta-album {
  font-size: 0.85rem;
  color: #0f2d52;
  font-style: italic;
}

.generos-album {
  font-size: 0.8rem;
  margin-top: 5px;
  color: #0f2d52;
}

/* Estadísticas a la derecha */
.estadisticas-album {
  display: flex;
  flex-direction: column;
  gap: 5px;
  text-align: right;
  min-width: 80px;
  background: rgba(0, 0, 0, 0.2);
  padding: 5px;
  border-radius: 4px;
}

.stat-group {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  font-size: 0.8rem;
}

.stat-label {
  color: #0f2d52;
}
.stat-value {
  color: #345d91;
  font-weight: bold;
}

.contenido-perfil-layout{
  display: flex;
  padding: 15px;
}

.sidebar {
  width: 180px;
  text-align: center;
  border-right: 1px dashed var(--azul-textos);
  padding-right: 15px;
  margin-right: 15px;
}

.foto-perfil-contenedor{
  background-color: #0352fc;
  padding: 5px;
  border: 1px solid var(--azul-textos);
  display: inline-block;
  margin-bottom: 10px;
}

.foto-perfil{
  width: 100px;
  height: 100px;
  display: block;
}

.boton-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  padding-right: 20px;
}

.cerrar-sesion {
  background-color: #db091e;
  color: white;
  border: none;
  height: 40px;
  padding: 0 20px;
  font-weight: bold;
  font-family: 'Nunito', sans-serif;
  cursor: pointer;
}

.cerrar-sesion:hover {
  background-color: #a80515;
}

.editar-datos {
  background-color: #0f2d52;
  color: white;
  border: none;
  height: 40px;
  padding: 0 20px;
  font-weight: bold;
  font-family: 'Nunito', sans-serif;
  cursor: pointer;
  margin-right: 10px;
}

.editar-datos:hover {
  background-color: #0e2847;
}

/* Lista del Sidebar */
.lista-top {
  padding-left: 0;
  list-style: none;
}
.lista-top li {
  margin-bottom: 10px;
  border-bottom: 1px dashed #c2d6ea;
  padding-bottom: 5px;
}

/* --- RESPONSIVE (MEDIA QUERY) --- */
@media only screen and (max-width: 800px) {
  #flex {
    flex-wrap: wrap;
  }

  aside {
    width: 100%;
    order: 1; /* Sidebar arriba en móvil o abajo según prefieras */
    border-left: none;
    border-bottom: 1px solid var(--azul-textos);
  }

  main {
    order: 2;
  }

  #navbar ul {
    flex-wrap: wrap;
  }

  .fila-album {
    flex-direction: column;
    text-align: center;
  }

  .estadisticas-album {
    width: 100%;
    flex-direction: row;
    justify-content: center;
    gap: 20px;
    text-align: center;
  }
}
</style>
