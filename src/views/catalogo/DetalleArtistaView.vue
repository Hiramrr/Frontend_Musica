<script setup>
import { onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useArtistasStore } from '@/stores/artistas'
import { useAlbumesStore } from '@/stores/albums'
import { useCancionesStore } from '@/stores/canciones'
import HeaderComponente from '../../components/HeaderComponente.vue'

const route = useRoute()
const router = useRouter()

// Stores
const artistasStore = useArtistasStore()
const albumesStore = useAlbumesStore()
const cancionesStore = useCancionesStore()

// ID del artista desde la URL
const artistaId = route.params.id

onMounted(async () => {
  // Asegurarnos de tener la data cargada
  if (artistasStore.listaArtistas.length === 0) await artistasStore.obtenerArtistas()
  if (albumesStore.listaAlbumes.length === 0) await albumesStore.obtenerAlbumes()
  if (cancionesStore.listaCanciones.length === 0) await cancionesStore.obtenerCanciones()
})

// 1. Encontrar la información del artista
const artista = computed(() => {
  return artistasStore.listaArtistas.find(a => a.id == artistaId) || {}
})

// 2. Filtrar álbumes de este artista
// Nota: Ajusta 'artista_id' o 'nombreArtista' según cómo te lo devuelva tu backend exactamente
const albumesArtista = computed(() => {
  return albumesStore.listaAlbumes.filter(album => 
    album.artista_id == artistaId || album.nombreArtista === artista.value.nombre
  )
})

// 3. Filtrar canciones de este artista
const cancionesArtista = computed(() => {
  return cancionesStore.listaCanciones.filter(cancion => 
    cancion.nombre_artista === artista.value.nombre
  )
})

const irAtras = () => router.go(-1)

// Helper para duración
const formatearDuracion = (segundos) => {
  if (!segundos) return '--:--'
  const min = Math.floor(segundos / 60)
  const sec = segundos % 60
  return `${min}:${sec.toString().padStart(2, '0')}`
}
</script>

<template>
  <div class="detalle-container">
    <div id="headerArea">
      <HeaderComponente />
    </div>

    <main class="contenido-principal" v-if="artista.nombre">
      
      <div class="hero-artista">
        <button class="boton-regresar" @click="irAtras">← Regresar</button>
        <div class="perfil-layout">
          <div class="imagen-hero">
            <img :src="artista.foto_url" :alt="artista.nombre" />
          </div>
          <div class="info-hero">
            <h1 class="nombre-artista">{{ artista.nombre }}</h1>
            <p class="datos-meta">
              <span v-if="artista.fecha_inicio">Desde {{ artista.fecha_inicio }}</span>
              <span v-if="artista.nacimiento"> • Nacimiento: {{ artista.nacimiento }}</span>
            </p>
            <p class="bio">{{ artista.bibliografia }}</p>
          </div>
        </div>
      </div>

      <section class="seccion-detalle">
        <h2 class="subtitulo">Discografía</h2>
        <div v-if="albumesArtista.length > 0" class="scroll-horizontal">
          <div v-for="album in albumesArtista" :key="album.id" class="mini-card-album">
            <img :src="album.portadaUrl" :alt="album.nombre" />
            <p class="titulo-album">{{ album.nombre }}</p>
            <span class="anio-album">{{ album.anio_salida }}</span>
          </div>
        </div>
        <p v-else class="vacio">No hay álbumes registrados.</p>
      </section>

      <section class="seccion-detalle">
        <h2 class="subtitulo">Canciones Populares</h2>
        <div v-if="cancionesArtista.length > 0" class="lista-canciones">
          <div v-for="(cancion, index) in cancionesArtista" :key="cancion.id" class="fila-cancion">
            <span class="numero">{{ index + 1 }}</span>
            <div class="info-cancion">
              <p class="nombre-cancion">{{ cancion.nombre }}</p>
              <p class="album-cancion">{{ cancion.nombre_album }}</p>
            </div>
            <span class="duracion">{{ formatearDuracion(cancion.duracion_segundos) }}</span>
          </div>
        </div>
        <p v-else class="vacio">No hay canciones registradas.</p>
      </section>

    </main>

    <div v-else class="cargando">
      <p>Cargando información del artista...</p>
    </div>
  </div>
</template>

<style scoped>
:root {
  --azul-textos: #2b7de9;
  --gris-azul: #c2d6ea;
  --text-color: #0f2d52;
}

.detalle-container {
  min-height: 100vh;
  background-color: #e6f0fa;
  background-image: url('https://sadhost.neocities.org/images/tiles/bk024.gif');
  font-family: 'Nunito', sans-serif;
  padding-bottom: 2rem;
}

.contenido-principal {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

/* HERO SECTION */
.hero-artista {
  background: var(--gris-azul);
  padding: 20px;
  border-radius: 12px;
  border: 1px solid var(--azul-textos);
  margin-bottom: 30px;
}

.boton-regresar {
  background: none;
  border: none;
  color: var(--azul-textos);
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 10px;
}

.perfil-layout {
  display: flex;
  gap: 20px;
}

.imagen-hero img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid var(--azul-textos);
}

.info-hero {
  flex: 1;
}

.nombre-artista {
  font-size: 2rem;
  color: var(--azul-textos);
  margin: 0;
}

.datos-meta {
  font-size: 0.9rem;
  color: #5c6b7f;
  margin-bottom: 10px;
}

.bio {
  font-size: 0.95rem;
  color: var(--text-color);
  line-height: 1.5;
}

/* SECCIONES */
.subtitulo {
  color: var(--azul-textos);
  border-bottom: 1px dashed var(--azul-textos);
  padding-bottom: 5px;
  margin-bottom: 15px;
}

.seccion-detalle {
  margin-bottom: 30px;
}

/* ALBUMS SCROLL */
.scroll-horizontal {
  display: flex;
  gap: 15px;
  overflow-x: auto;
  padding-bottom: 10px;
}

.mini-card-album {
  min-width: 120px;
  width: 120px;
  text-align: center;
}

.mini-card-album img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.titulo-album {
  font-weight: bold;
  font-size: 0.9rem;
  margin: 5px 0 0 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* CANCIONES LISTA */
.fila-cancion {
  display: flex;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid #c2d6ea;
  transition: background 0.2s;
}

.fila-cancion:hover {
  background-color: rgba(43, 125, 233, 0.1);
}

.numero {
  width: 30px;
  color: #5c6b7f;
  font-weight: bold;
}

.info-cancion {
  flex: 1;
}

.nombre-cancion {
  font-weight: bold;
  color: var(--text-color);
  margin: 0;
}

.album-cancion {
  font-size: 0.8rem;
  color: #5c6b7f;
  margin: 0;
}

.duracion {
  font-size: 0.9rem;
  color: var(--text-color);
}

.vacio, .cargando {
  text-align: center;
  color: #5c6b7f;
  font-style: italic;
}

@media (max-width: 600px) {
  .perfil-layout {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
</style>