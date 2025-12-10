<script setup>
/**
 * IMPORTACIONES
 * - Vue: Herramientas base para reactividad y ciclo de vida.
 * - Vue Router: Para navegar entre páginas y leer parámetros de la URL.
 * - Pinia: Para acceder al estado global (lista de canciones).
 * - Componentes: Importamos el Header para reutilizarlo.
 */
import { onMounted, ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCancionesStore } from '@/stores/canciones'
import { storeToRefs } from 'pinia'
import HeaderComponente from '../../components/HeaderComponente.vue'

// Inicialización de herramientas de enrutamiento
// Para hacer acciones (navegar)
const router = useRouter()
// Para leer datos de la URL actual
const route = useRoute()
// Inicialización del Store (Estado Global)
const store = useCancionesStore()

// Desestructuración reactiva:
// Usamos storeToRefs para extraer 'listaCanciones' y 'cargando' sin perder
// la reactividad. Si el store se actualiza, estas variables también.
const { listaCanciones, cargando } = storeToRefs(store)
// Filtro Reactivo:
// Lee si hay un parámetro '?album=...' en la URL. Si no hay, inicia vacío.
const filtroAlbum = ref(route.query.album || '')

/**
 * PROPIEDAD COMPUTADA: cancionesFiltradas
 * Esta función se ejecuta automáticamente cuando cambian las dependencias.
 * Si 'filtroAlbum' tiene texto, devuelve solo las canciones de ese álbum.
 * Si no, devuelve la lista completa.
 */
const cancionesFiltradas = computed(() => {
  if (filtroAlbum.value) {
    return listaCanciones.value.filter((c) => c.nombre_album === filtroAlbum.value)
  }
  return listaCanciones.value
})

/**
 * Convierte segundos (ej. 125) a formato legible (ej. "2:05").
 * Usa padStart para asegurar que los segundos siempre tengan 2 dígitos.
 */
const formatearDuracion = (segundos) => {
  if (!segundos) return '--:--'
  const min = Math.floor(segundos / 60)
  const sec = segundos % 60
  return `${min}:${sec.toString().padStart(2, '0')}`
}

/**
 * CICLO DE VIDA: onMounted
 * Se ejecuta cuando el componente se carga en el navegador.
 * Llama a la acción del store para traer los datos desde el Backend API.
 */
onMounted(() => {
  store.obtenerCanciones()
})

const irAAdmin = () => router.push('/musica-admin')

const verDetalles = (id) => {
  router.push({ name: 'detalle-cancion', params: { id } })
}
</script>

<template>
  <div class="catalogo-container">
    <div id="headerArea">
      <HeaderComponente />
    </div>
    <main class="contenido-principal">
      <h1 class="titulo-pagina">Catálogo de Música</h1>

      <div class="botones-superiores">
        <button @click="irAAdmin" class="boton-nav boton-resaltado">
          Gestionar Canciones (CRUD)
        </button>
      </div>

      <div v-if="cargando" class="mensaje-carga">Cargando repertorio...</div>

      <div v-else-if="cancionesFiltradas.length > 0" class="cuadricula-canciones">
        <div
          v-for="cancion in cancionesFiltradas"
          :key="cancion.id"
          class="tarjeta-cancion"
          @click="verDetalles(cancion.id)"
        >
          <div class="imagen-tarjeta">
            <img :src="cancion.portada_url || 'https://placehold.co/400'" :alt="cancion.nombre" />
          </div>

          <div class="info-tarjeta">
            <h2>{{ cancion.nombre }}</h2>
            
            <p class="texto-artista">
              {{ cancion.nombre_artista }}
            </p>
            
            <p class="texto-album">
              <span class="etiqueta-gris">Álbum:</span> {{ cancion.nombre_album }}
            </p>
            
            <div class="meta-inferior">
              <span class="dato-meta"> ⏱ {{ formatearDuracion(cancion.duracion_segundos) }} </span>
              <span class="dato-meta calificacion"> ★ {{ cancion.calificacion }}/5 </span>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="mensaje-vacio">No se encontraron canciones.</div>
    </main>
  </div>
</template>

<style scoped>
:root {
  --header-image: url('https://sadhost.neocities.org/images/layouts/wp.jpeg');
  --body-bg-image: url('https://sadhost.neocities.org/images/tiles/bk024.gif');
  --content-bg: #e6f0fa;
  --azul-textos: #2b7de9;
  --gris-azul: #c2d6ea;
  --text-color: #0f2d52;
}

.catalogo-container {
  min-height: 100vh;
  background-color: var(--content-bg);
  background-image: var(--body-bg-image);
  padding-bottom: 2rem;
  font-family: 'Nunito', sans-serif;
  max-width: 900px;
  margin: 0 auto;
}

.contenido-principal {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
  padding-top: 2rem;
}

.titulo-pagina {
  color: var(--azul-textos);
  border-bottom: 1px dashed var(--azul-textos);
  padding-bottom: 10px;
  margin-bottom: 30px;
  font-size: 25px;
  font-weight: bold;
}

.botones-superiores {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.boton-nav {
  background: transparent;
  border: 1px solid var(--azul-textos);
  color: #0f2d52;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  margin-left: 10px;
  transition: all 0.2s;
  font-weight: bold;
}

.boton-resaltado {
  background-color: var(--azul-textos);
  color: white;
}

.boton-nav:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}


.cuadricula-canciones {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); 
  gap: 30px;
}

.tarjeta-cancion {
  background: var(--gris-azul);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--azul-textos);
  transition: transform 0.3s ease, border-color 0.3s;
  display: flex;
  flex-direction: column;
}

.tarjeta-cancion:hover {
  transform: translateY(-5px);
  border-color: #345d91;
}

.imagen-tarjeta {
  height: 200px; 
  overflow: hidden;
  background: #e6f0fa;
  position: relative;
}

.imagen-tarjeta img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
  border-bottom: 1px solid var(--azul-textos);
}

.tarjeta-cancion:hover .imagen-tarjeta img {
  transform: scale(1.05);
}

.info-tarjeta {
  padding: 1.5rem;
  text-align: center; 
  flex: 1;
  display: flex;
  flex-direction: column;
}

.info-tarjeta h2 {
  color: var(--azul-textos);
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.texto-artista {
  font-size: 1rem;
  color: #0f2d52;
  font-weight: 600;
  margin-bottom: 0.2rem;
}

.texto-album {
  font-size: 0.85rem;
  color: #5c6b7f;
  margin-bottom: 1rem;
  font-style: italic;
}

.meta-inferior {
  margin-top: auto;
  display: flex;
  justify-content: center; 
  gap: 15px;
  padding-top: 0.8rem;
  border-top: 1px dashed rgba(43, 125, 233, 0.3);
}

.dato-meta {
  font-size: 0.9rem;
  color: #0f2d52;
  font-weight: bold;
  background: rgba(255,255,255,0.4);
  padding: 2px 8px;
  border-radius: 4px;
}

.calificacion {
  color: #d35400;
}

@media (max-width: 600px) {
  .contenido-principal {
    padding: 0 10px;
  }
  .cuadricula-canciones {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  .info-tarjeta {
    padding: 1rem;
  }
}
</style>