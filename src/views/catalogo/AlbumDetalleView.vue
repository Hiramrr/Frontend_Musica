<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAlbumesStore } from '@/stores/albums'
import { useResenasStore } from '@/stores/resenas' 
// componentes utilizados
import HeaderComponente from '../../components/HeaderComponente.vue'
import AlbumInfo from '@/components/album/AlbumInfo.vue'
import AlbumTracklist from '@/components/album/AlbumTracklist.vue'
import AlbumReviews from '@/components/album/AlbumReviews.vue'

const route = useRoute()
const router = useRouter()

const store = useAlbumesStore()
const resenasStore = useResenasStore() // Instanciamos

// Estados globales
const { albumSeleccionado, cancionesAlbum, cargando } = storeToRefs(store)
const { listaResenas } = storeToRefs(resenasStore)

// Cargamos en paralelo los albums y las reseñas
onMounted(async () => {
  const id = route.params.id
  await Promise.all([
    store.obtenerDetalleAlbum(id),
    resenasStore.obtenerResenasAlbum(id)
  ])
})

const manejarNuevaResena = async (datos) => {
  await resenasStore.crearResenaAlbum(route.params.id, datos)
}

const manejarEliminarResena = async (idResena) => {
  await resenasStore.eliminarResena(idResena)
}

const manejarEditarResena = async ({ id, texto, puntos }) => {
  await resenasStore.editarResena(id, { texto, puntos })
}

const irAtras = () => router.go(-1)
</script>

<template>
  <div class="detalle-container">
    <div class="centered-content">
      <div id="headerArea"> <HeaderComponente /> </div>

      <main class="contenido-principal">
        <button @click="irAtras" class="btn-regresar">← Volver al catálogo</button>

        <div v-if="cargando" class="loading">Cargando información...</div>

        <div v-else-if="albumSeleccionado" class="pila-vertical">
          <AlbumInfo :album="albumSeleccionado" />

          <div class="seccion-central">
            <AlbumTracklist :canciones="cancionesAlbum" />
          </div>

          <AlbumReviews 
            :reviews="listaResenas" 
            @agregar-review="manejarNuevaResena"
            @eliminar-review="manejarEliminarResena"
            @editar-review="manejarEditarResena"
          />
        </div>
        
        <div v-else class="error">No se encontró el álbum.</div>
      </main>
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

.centered-content {
  max-width: 900px;
  margin: 0 auto;
  background: rgba(255,255,255,0.7); /* Fondo semitransparente */
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(43,125,233,0.07);
  padding: 0 0 30px 0;
}

.contenido-principal { 
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