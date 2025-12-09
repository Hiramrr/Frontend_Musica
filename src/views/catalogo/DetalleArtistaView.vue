<script setup>
import { onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useArtistasStore } from '@/stores/artistas'
import { useAlbumesStore } from '@/stores/albums'
import { useCancionesStore } from '@/stores/canciones'
import { storeToRefs } from 'pinia'
import HeaderComponente from '../../components/HeaderComponente.vue'

const route = useRoute()
const router = useRouter()

const artistasStore = useArtistasStore()
const albumesStore = useAlbumesStore()
const cancionesStore = useCancionesStore()

const { albumsDelArtista } = storeToRefs(albumesStore)

const artistaId = route.params.id

onMounted(async () => {
  //Cargamos info del artista si no existe
  if (artistasStore.listaArtistas.length === 0) await artistasStore.obtenerArtistas()
  
  //Cargamos los álbumes específicos de este artista
  await albumesStore.obtenerAlbumsPorArtista(artistaId)

  //Cargamos las canciones para filtrar las populares
  if (cancionesStore.listaCanciones.length === 0) await cancionesStore.obtenerCanciones()
})

const artista = computed(() => {
  return artistasStore.listaArtistas.find(a => a.id == artistaId) || {}
})

const albumesArtista = computed(() => {
  return albumsDelArtista.value
})

// Filtramos las canciones del store global por el nombre del artista
const cancionesArtista = computed(() => {
  if (!artista.value.nombre) return []
  
  return cancionesStore.listaCanciones.filter(cancion => {
    const nombreEnCancion = cancion.nombreArtista || cancion.nombre_artista
    return nombreEnCancion === artista.value.nombre
  })
})

const irAtras = () => router.go(-1)

const formatearDuracion = (segundos) => {
  if (!segundos) return '--:--'
  const min = Math.floor(segundos / 60)
  const sec = segundos % 60
  return `${min}:${sec.toString().padStart(2, '0')}`
}
</script>

<template>
  <div class="detalle-container">
    <div class="centered-content">
      <div id="headerArea">
        <HeaderComponente />
      </div>

      <main class="contenido-principal" v-if="artista.nombre">
        
        <div class="hero-artista">
           <button class="boton-regresar" @click="irAtras">← Regresar</button>
           <div class="perfil-layout">
            <div class="imagen-hero">
              <img :src="artista.foto_url || artista.fotoUrl" :alt="artista.nombre" />
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
          <div v-if="albumesArtista && albumesArtista.length > 0" class="scroll-horizontal">
            <div v-for="album in albumesArtista" :key="album.id" class="mini-card-album">
              <img :src="album.portadaUrl || 'https://placehold.co/150'" :alt="album.nombre" />
              <p class="titulo-album">{{ album.nombre }}</p>
              <span class="anio-album">{{ album.fechaSalida || album.anio_salida }}</span>
            </div>
          </div>
          <p v-else class="vacio">No hay álbumes registrados.</p>
        </section>

        <section class="seccion-detalle">
          <h2 class="subtitulo">Canciones Populares</h2>
          <div v-if="cancionesArtista && cancionesArtista.length > 0" class="lista-canciones">
            <div v-for="(cancion, index) in cancionesArtista" :key="cancion.id" class="fila-cancion">
              <span class="numero">{{ index + 1 }}</span>
              <div class="info-cancion">
                <p class="nombre-cancion">{{ cancion.nombre }}</p>
                <p class="album-cancion">{{ cancion.nombreAlbum || cancion.nombre_album }}</p>
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
  cursor: pointer;
  margin-bottom: 10px;
  font-weight: bold;
}

.centered-content {
  max-width: 900px;
  margin: 0 auto;
  background: rgba(255,255,255,0.7);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(43,125,233,0.07);
  padding: 0 0 30px 0;
}

.perfil-layout {
  display: flex;
  gap: 20px;
  align-items: center;
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

.anio-album {
  font-size: 0.8rem;
  color: #666;
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
  padding: 20px;
}

@media (max-width: 600px) {
  .perfil-layout {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
</style>