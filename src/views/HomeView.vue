<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../stores/authStore'
import { useAlbumesStore } from '../stores/albums'
import HeaderComponente from '../components/HeaderComponente.vue'

const authStore = useAuthStore()
const albumesStore = useAlbumesStore()

// Referencias reactivas a los datos del store
const { listaAlbumes, cargando } = storeToRefs(albumesStore)

// Datos de prueba para mostrar mientras carga la información
const nuevosLanzamientos = ref([])
const masEscuchados = ref([
  { id: 1, titulo: 'Santa Claus Llegó a La Ciudad', artista: 'Luis Miguel', oyentes: 1500 },
  { id: 2, titulo: 'Querida', artista: 'Juan Gabriel', oyentes: 1450 },
  { id: 3, titulo: 'No Sé Tú', artista: 'Luis Miguel', oyentes: 1320 },
  { id: 4, titulo: 'Amor Eterno (En Vivo)', artista: 'Juan Gabriel', oyentes: 1280 },
  { id: 5, titulo: 'Suave', artista: 'Luis Miguel', oyentes: 1100 },
])

// Al cargar la vista, obtiene los álbumes de la base de datos
onMounted(async () => {
  await albumesStore.obtenerAlbumes()
  
  // Transforma los datos de álbumes para mostrarlos en el formato esperado
  if (listaAlbumes.value && listaAlbumes.value.length > 0) {
    nuevosLanzamientos.value = listaAlbumes.value.map(album => ({
      id: album.id,
      titulo: album.nombre,
      artista: album.nombreArtista || 'Artista desconocido',
      fecha: album.fechaSalida ? `${album.fechaSalida}` : 'Fecha desconocida',
      generos: ['Música'], // El backend aún no proporciona géneros
      promedio: '4.50',
      votos: '10,000',
      deseados: '2,500',
      imagen: album.portadaUrl || 'https://placehold.co/100x100/2c3e50/FFF?text=Album',
    }))
  }
})
</script>

<template>
  <div id="container">
    <div id="headerArea">
      <HeaderComponente />
    </div>

    <div id="flex">
      <main>
        <h1>Nuevos Lanzamientos</h1>

        <div class="pestanas">
          <span class="pestana activa">Todos</span>
          <span class="pestana">Albums</span>
          <span class="pestana">Canciones</span>
        </div>

        <p class="intro-text">
          <strong>Canciones más populares</strong>
        </p>

        <!-- Muestra mensaje de carga mientras se obtienen datos -->
        <div v-if="cargando" class="mensaje-carga">
          Cargando álbumes de la base de datos...
        </div>

        <!-- Muestra los álbumes una vez cargados -->
        <div v-else-if="nuevosLanzamientos.length > 0">
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
        </div>

        <!-- Muestra mensaje si no hay álbumes disponibles -->
        <div v-else class="mensaje-vacio">
          No se encontraron álbumes disponibles en la base de datos.
        </div>
      </main>

      <aside id="rightSidebar">
        <h2>Top Tracks</h2>
        <div class="box">
          <p><strong>Lo más escuchado esta semana en la comunidad.</strong></p>
          <ul class="lista-top">
            <li v-for="(track, index) in masEscuchados" :key="track.id">
              <div class="track-info">
                <strong>{{ index + 1 }}. {{ track.titulo }}</strong
                ><br />
                <span style="font-size: 0.8em; color: #0f2d52">{{ track.artista }}</span>
              </div>
            </li>
          </ul>
        </div>

        <h2>Enlaces</h2>
        <ul>
          <li><a href="#">No se que poner</a></li>
          <li><a href="#">Tops</a></li>
          <li><a href="https://github.com/Hiramrr/Frontend_Musica">Repositorio GitHub</a></li>
        </ul>
      </aside>
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

/* Mensajes de estado */
.mensaje-carga {
  text-align: center;
  padding: 3rem;
  font-size: 1.1rem;
  color: #2b7de9;
  background-color: rgba(43, 125, 233, 0.1);
  border-radius: 8px;
  border: 1px solid #2b7de9;
}

.mensaje-vacio {
  text-align: center;
  padding: 3rem;
  font-size: 1.1rem;
  color: #666;
  background-color: #f5f5f5;
  border-radius: 8px;
  border: 1px dashed #ccc;
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
