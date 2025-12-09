<script setup>
import { onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAlbumesStore } from '@/stores/albums'
import { storeToRefs } from 'pinia'

//componentes utilizados
import HeaderComponente from '../../components/HeaderComponente.vue'
import AlbumInfo from '@/components/album/AlbumInfo.vue'
import AlbumTracklist from '@/components/album/AlbumTracklist.vue'
import AlbumReviews from '@/components/album/AlbumReviews.vue'

const route = useRoute()
const router = useRouter()
const store = useAlbumesStore()

// Obtenemos estado globales 
const { albumSeleccionado, cancionesAlbum, reseñasAlbum, cargando } = storeToRefs(store)

// Al montar, pedimos los datos al backend usando el ID de la URL
onMounted(async () => {
  const id = route.params.id
  await store.obtenerDetalleAlbum(id)
})

// Manejo de la acción de agregar reseña desde el hijo AlbumReviews
const manejarNuevaResena = (datos) => {
  store.guardarResena(route.params.id, datos)
}

const irAtras = () => router.go(-1)
</script>

<template>
  <div class="detalle-container">
    <HeaderComponente />

    <main class="contenido">
      <button @click="irAtras" class="btn-regresar">← Volver al catálogo</button>

      <div v-if="cargando" class="loading">Cargando información...</div>

      <div v-else-if="albumSeleccionado">
        <AlbumInfo :album="albumSeleccionado" />

        <div class="grid-inferior">
          <AlbumTracklist :canciones="cancionesAlbum" />
          
          <AlbumReviews 
            :reviews="reseñasAlbum" 
            @agregar-review="manejarNuevaResena" 
          />
        </div>
      </div>
      
      <div v-else class="error">No se encontró el álbum.</div>
    </main>
  </div>
</template>

<style scoped>
.detalle-container { min-height: 100vh; background-color: var(--content-bg); font-family: 'Nunito', sans-serif; }
.contenido { max-width: 1100px; margin: 0 auto; padding: 20px; }
.btn-regresar { background: none; border: none; color: var(--azul-textos); cursor: pointer; font-size: 1rem; margin-bottom: 1rem; font-weight: bold; }
.grid-inferior { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
.loading, .error { text-align: center; padding: 3rem; font-size: 1.2rem; color: #666; }

@media (max-width: 768px) {
  .grid-inferior { grid-template-columns: 1fr; }
}
</style>