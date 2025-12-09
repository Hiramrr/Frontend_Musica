<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAlbumesStore } from '@/stores/albums'
import { storeToRefs } from 'pinia'

// Componentes utilizados
import HeaderComponente from '../../components/HeaderComponente.vue'
import AlbumInfo from '@/components/album/AlbumInfo.vue'
import AlbumTracklist from '@/components/album/AlbumTracklist.vue'
import AlbumReviews from '@/components/album/AlbumReviews.vue'

const route = useRoute()
const router = useRouter()
const store = useAlbumesStore()

// Obtenemos estado global
const { albumSeleccionado, cancionesAlbum, reseñasAlbum, cargando } = storeToRefs(store)

// Al montar, pedimos los datos al backend
onMounted(async () => {
  const id = route.params.id
  await store.obtenerDetalleAlbum(id)
})

// Manejo de la acción de agregar reseña
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

      <div v-else-if="albumSeleccionado" class="pila-vertical">
        
        <AlbumInfo :album="albumSeleccionado" />

        <div class="seccion-central">
          <AlbumTracklist :canciones="cancionesAlbum" />
        </div>

        <AlbumReviews 
          :reviews="reseñasAlbum" 
          @agregar-review="manejarNuevaResena" 
        />
        
      </div>
      
      <div v-else class="error">No se encontró el álbum.</div>
    </main>
  </div>
</template>

<style scoped>
.detalle-container { 
  min-height: 100vh; 
  background-color: var(--content-bg); 
  font-family: 'Nunito', sans-serif; 
}

.contenido { 
  max-width: 900px; 
  margin: 0 auto; 
  padding: 20px; 
}

.btn-regresar { 
  background: none; 
  border: none; 
  color: var(--azul-textos); 
  cursor: pointer; 
  font-size: 1rem; 
  margin-bottom: 1rem; 
  font-weight: bold; 
}


.pila-vertical {
  display: flex;
  flex-direction: column;
  gap: 3rem; 
}

.seccion-central {
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
}

.loading, .error { 
  text-align: center; 
  padding: 3rem; 
  font-size: 1.2rem; 
  color: #666; 
}
</style>