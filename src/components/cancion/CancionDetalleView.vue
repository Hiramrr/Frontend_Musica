<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCancionesStore } from '@/stores/canciones'
import { useResenasStore } from '@/stores/resenas' 

// Componentes
import HeaderComponente from '../../components/HeaderComponente.vue'
import CancionInfo from '@/components/cancion/CancionInfo.vue'
import AlbumReviews from '@/components/album/AlbumReviews.vue' // Reutilizamos

const route = useRoute()
const router = useRouter()

const cancionesStore = useCancionesStore()
const resenasStore = useResenasStore()

const { cancionSeleccionada, cargando } = storeToRefs(cancionesStore)
const { listaResenas } = storeToRefs(resenasStore)

// Cargamos datos en paralelo
onMounted(async () => {
  const id = route.params.id
  await Promise.all([
    cancionesStore.obtenerDetalleCancion(id),
    resenasStore.obtenerResenasCancion(id)
  ])
})

// Manejadores de eventos (conectados a la lógica de canciones en el store)
const manejarNuevaResena = async (datos) => {
  await resenasStore.crearResenaCancion(route.params.id, datos)
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

        <div v-else-if="cancionSeleccionada" class="pila-vertical">
          
          <CancionInfo :cancion="cancionSeleccionada" />

          <AlbumReviews 
            :reviews="listaResenas" 
            @agregar-review="manejarNuevaResena"
            @eliminar-review="manejarEliminarResena"
            @editar-review="manejarEditarResena"
          />
        </div>
        
        <div v-else class="error">No se encontró la canción.</div>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* Estilos consistentes con AlbumDetalleView */
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
  background: rgba(255,255,255,0.7);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(43,125,233,0.07);
  padding: 0 0 30px 0;
}

.contenido-principal { padding: 20px; }

.btn-regresar { 
  background: none; border: none; color: var(--azul-textos); 
  cursor: pointer; font-size: 1rem; margin-bottom: 1rem; font-weight: bold; 
}

.pila-vertical {
  display: flex; flex-direction: column; gap: 3rem; 
}

.loading, .error { 
  text-align: center; padding: 3rem; font-size: 1.2rem; color: #666; 
}
</style>