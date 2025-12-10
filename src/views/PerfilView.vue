<script setup>
import { onMounted, computed, watch, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { useUsuariosStore } from '../stores/usuarios'
import { useResenasStore } from '../stores/resenas'
import HeaderComponente from '../components/HeaderComponente.vue'

const props = defineProps({
  id: { type: String, default: null }
})

const router = useRouter()
const authStore = useAuthStore()
const usuariosStore = useUsuariosStore()
const resenasStore = useResenasStore() // <--- USAR

const tabActiva = ref('todo')

const esMiPerfil = computed(() => {
  return !props.id || (authStore.usuario && props.id === authStore.usuario.id)
})

const usuarioVisualizado = computed(() => {
  if (esMiPerfil.value) return authStore.usuario || {}
  return usuariosStore.usuarioSeleccionado || {}
})

// filtro de reseñas segun la pestaña, general, albums o canciones
const resenasFiltradas = computed(() => {
  const todas = resenasStore.resenasUsuario || []

  if (tabActiva.value === 'albums') {
    return todas.filter(r => r.album && !r.cancion)
  } else if (tabActiva.value === 'canciones') {
    return todas.filter(r => r.cancion)
  }
  //si no es ninguno de esos 2 significa que esta en general y devuelve todas
  return todas
})

const cargarDatos = async () => {
  const idACargar = props.id ? props.id : authStore.usuario?.id

  if (idACargar) {
    //carga la id del usuario seleccionado en comunidad
    if (!esMiPerfil.value) {
      await usuariosStore.obtenerUsuarioPorId(idACargar)
    }
    // Cargar las reseñas del usuario que se tiene la id, ya sea yo o el seleccionado
    await resenasStore.obtenerResenasPorUsuario(idACargar)
  }
}

onMounted(() => {
  cargarDatos()
})

watch(() => props.id, () => {
  cargarDatos()
})

function cerrarSesion(){
  router.push("/");
  authStore.logout();
}

function goToEditar(){
  router.push("/editar-perfil");
}

// Manda a la cancion o album, depende al que se le de click en su reseña
const irAlItem = (resena) => {
  if (resena.album) {
    router.push({ name: 'album-detalle', params: { id: resena.album.id } })
  } else if (resena.cancion) {
    router.push({ name: 'detalle-cancion', params: { id: resena.cancion.id } })
  }
}

// Funcion para obtener la imagen ya sea album o cancion
const obtenerImagen = (item) => {
  if (item.album) {
    // Intenta con portadaUrl, si no existe devuelve null
    return item.album.portadaUrl || null;
  }
  if (item.cancion) {
    return item.cancion.imagen || null;
  }
  return null;
}

// Funcion para que si la cancion o album no tiene imagen le ponga una de placeholder
const imagenError = (e) => {
  e.target.src = "https://placehold.co/80?text=No+Tiene";
}
</script>

<template>
  <div id="container">
    <div id="headerArea">
      <HeaderComponente />
    </div>

    <div id="flex">
      <main>
        <h1>Perfil de {{ usuarioVisualizado.nombre }}</h1>

        <div class="contenido-perfil-layout">
          <div class="sidebar">
            <div class="foto-perfil-contenedor">
              <img :src="usuarioVisualizado?.fotoUrl || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'" class="foto-perfil"></img>
            </div>
          </div>

          <div class="informacion-usuario">
            <ul class="lista">
              <li><strong>Correo:</strong> {{usuarioVisualizado?.correo || 'No tiene' }}</li>
              <li><strong>Nombre:</strong> {{usuarioVisualizado?.nombre || 'No tiene' }}</li>
              <li><strong>Reseñas:</strong> {{ resenasStore.resenasUsuario.length }}</li>
            </ul>
          </div>
        </div>

        <div class="pestanas">
          <span
            class="pestana"
            :class="{ active: tabActiva === 'todo' }"
            @click="tabActiva = 'todo'">
            General
          </span>
          <span
            class="pestana"
            :class="{ active: tabActiva === 'albums' }"
            @click="tabActiva = 'albums'">
            Reseñas de álbums
          </span>
          <span
            class="pestana"
            :class="{ active: tabActiva === 'canciones' }"
            @click="tabActiva = 'canciones'">
            Reseñas de canciones
          </span>
        </div>

        <p class="intro-text">
          <strong>
            {{ tabActiva === 'todo' ? 'Actividad Reciente' :
               tabActiva === 'albums' ? 'Álbumes Reseñados' : 'Canciones Reseñadas' }}
          </strong>
        </p>

        <div v-if="resenasStore.cargando" style="text-align:center; padding: 20px;">
            Cargando reseñas...
        </div>

        <div v-else-if="resenasFiltradas.length > 0">

          <div v-for="resena in resenasFiltradas" :key="resena.id" class="box fila-album">

            <div class="portada-album" style="cursor: pointer;" @click="irAlItem(resena)">
              <img
              :src="obtenerImagen(resena) || 'https://placehold.co/80?text=Sin+Foto'"
              @error="imagenError"
              alt="Portada"
              class="portada-img"
              />
            </div>

            <div class="detalles-album">
              <h2>
                <a href="#" @click.prevent="irAlItem(resena)">
                  {{ resena.album ? resena.album.nombre : resena.cancion?.titulo }}
                </a>

                <span v-if="tabActiva === 'todo'" class="badge-tipo">
                  {{ resena.album ? '(Álbum)' : '(Canción)' }}
                </span>
              </h2>

              <div class="artista-album">
                de <strong>{{ resena.album ? resena.album.artista : resena.cancion?.artista }}</strong>
              </div>

              <div class="meta-album">
                Reseñado el: {{ resena.fechaCreacion || 'Fecha desconocida' }}
              </div>

              <div class="resena-texto-preview">
                 "{{ resena.contenido }}"
              </div>
            </div>

            <div class="estadisticas-album">
              <div class="stat-group">
                <span class="stat-label">Calificación</span>
                <span class="stat-value stars">★ {{ resena.calificacion }}/5</span>
              </div>
            </div>

          </div>
        </div>

        <p v-else class="vacio">No hay reseñas en esta categoría.</p>

        <div class="boton-container" v-if="esMiPerfil">
          <button @click="goToEditar()" class="editar-datos">Editar datos</button>
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
  object-fit: cover;
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
.active {
    font-weight: bold;
    border-bottom: 2px solid var(--azul-textos);
    color: var(--azul-textos);
}

.resena-texto-preview {
    margin-top: 8px;
    font-size: 0.9rem;
    font-style: italic;
    color: #444;
    background: rgba(255,255,255,0.5);
    padding: 5px;
    border-radius: 4px;
}

.badge-tipo {
    font-size: 0.7rem;
    color: #666;
    font-weight: normal;
    margin-left: 5px;
}

.stars {
    color: #f39c12;
}
</style>
