<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCancionesStore } from '@/stores/canciones'
import { storeToRefs } from 'pinia'
import HeaderComponente from '../../components/HeaderComponente.vue'

const router = useRouter()
const route = useRoute()
const store = useCancionesStore()

const { listaCanciones, cargando } = storeToRefs(store)
const filtroAlbum = ref(route.query.album || '')

//Determina qué canciones mostrar en la cuadrícula.
const cancionesFiltradas = computed(() => {
  if (filtroAlbum.value) {
    return listaCanciones.value.filter((c) => c.nombre_album === filtroAlbum.value)
  }
  return listaCanciones.value
})

const formatearDuracion = (segundos) => {
  if (!segundos) return '--:--'
  const min = Math.floor(segundos / 60)
  const sec = segundos % 60
  return `${min}:${sec.toString().padStart(2, '0')}`
}

onMounted(() => {
  store.obtenerCanciones()
})

const irAInicio = () => router.push('/')
const irAAgregarCancion = () => router.push('/agregar-cancion')

const editarCancion = (id) => {
  router.push(`/editar-cancion/${id}`)
}

/**
 * 1. Pide confirmación al usuario.
 * 2. Llama a la acción del store para eliminar en BD y en local.
 */
const borrarCancion = async (id) => {
  if (confirm("¿Estás seguro de que deseas eliminar esta canción permanentemente?")) {
    await store.eliminarCancion(id)
  }
}
</script>

<template>
  <div class="contenedor-catalogo">
    <div id="headerArea">
      <HeaderComponente />
    </div>
    <main class="contenido-principal">
      <h1 class="titulo-pagina">Gestión de Canciones (CRUD)</h1>

      <div class="botones-superiores">
        <button @click="irAAgregarCancion" class="boton-nav boton-resaltado">
          + Nueva Canción
        </button>
      </div>

      <div v-if="cargando" class="mensaje-carga">Cargando repertorio...</div>

      <div v-else-if="cancionesFiltradas.length > 0" class="cuadricula-canciones">
        <div
          v-for="cancion in cancionesFiltradas"
          :key="cancion.id || cancion.nombre"
          class="tarjeta-cancion"
        >
          <div class="imagen-tarjeta">
            <img :src="cancion.portada_url" :alt="cancion.nombre" />
          </div>

          <div class="info-tarjeta">
            <h2>{{ cancion.nombre }}</h2>
            <p class="texto-artista">
              {{ cancion.nombre_artista }}
              <span class="texto-anio">({{ cancion.fecha_salida }})</span>
            </p>
            <p class="texto-album">
              <span class="etiqueta-gris">Álbum:</span> {{ cancion.nombre_album }}
            </p>
            <p class="descripcion-cancion">{{ cancion.descripcion }}</p>

            <div class="meta-inferior">
              <span class="dato-meta"> ⏱ {{ formatearDuracion(cancion.duracion_segundos) }} </span>
              <span class="dato-meta calificacion"> ★ {{ cancion.calificacion }}/5 </span>
            </div>

            <div class="acciones-tarjeta" style="margin-top: 15px; display: flex; gap: 10px;">
                <button @click="editarCancion(cancion.id)" class="boton-ver">Editar</button>
                <button @click="borrarCancion(cancion.id)" class="boton-eliminar">Eliminar</button>
            </div>

          </div>
        </div>
      </div>

      <div v-else class="mensaje-vacio">No se encontraron canciones.</div>
    </main>
  </div>
</template>

<style scoped>
@import '../../assets/base.css';

:root {
  --header-image: url('https://sadhost.neocities.org/images/layouts/wp.jpeg');
  --body-bg-image: url('https://sadhost.neocities.org/images/tiles/bk024.gif');
  --content-bg: #e6f0fa;
  --azul-textos: #2b7de9;
  --gris-azul: #c2d6ea;
  --text-color: #0f2d52;
}

.contenedor-catalogo {
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
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
}

.tarjeta-cancion {
  background: var(--gris-azul);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--azul-textos);
  transition: transform 0.2s;
  display: flex;
  flex-direction: column;
}

.tarjeta-cancion:hover {
  transform: translateY(-3px);
  border-color: #345d91;
}

.imagen-tarjeta {
  height: 180px;
  overflow: hidden;
  background: #e6f0fa;
  position: relative;
}

.imagen-tarjeta img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.tarjeta-cancion:hover .imagen-tarjeta img {
  transform: scale(1.05);
}

.info-tarjeta {
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.info-tarjeta h2 {
  color: var(--azul-textos);
  font-size: 1.1rem;
  margin-bottom: 0.2rem;
  font-weight: bold;
}

.texto-artista {
  font-size: 0.95rem;
  color: #0f2d52;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.texto-album {
  font-size: 0.85rem;
  color: #5c6b7f;
  margin-bottom: 1rem;
  font-style: italic;
}

.etiqueta-gris {
  font-weight: bold;
  color: #5c6b7f;
}

.meta-inferior {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(43, 125, 233, 0.2);
  padding-top: 0.8rem;
}

.boton-ver {
  background-color: transparent;
  border: 1px solid var(--azul-textos);
  color: var(--azul-textos);
  padding: 0.3rem 0.8rem;
  border-radius: 6px;
  font-size: 0.85rem;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s;
}

.boton-ver:hover {
  background-color: var(--azul-textos);
  color: white;
}

.boton-eliminar {
  background-color: transparent;
  border: 1px solid #d9534f;
  color: #d9534f;
  padding: 0.3rem 0.8rem;
  border-radius: 6px;
  font-size: 0.85rem;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s;
}
.boton-eliminar:hover {
  background-color: #d9534f;
  color: white;
}

@media (max-width: 600px) {
  .contenido-principal {
    padding: 0 10px;
  }
  .cuadricula-canciones {
    grid-template-columns: 1fr;
  }
}
</style>