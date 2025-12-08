<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useArtistasStore } from '@/stores/artistas' 
import { storeToRefs } from 'pinia'

const router = useRouter()
const store = useArtistasStore()

const { listaArtistas, cargando } = storeToRefs(store)

onMounted(() => {
  store.obtenerArtistas()
})

const irAInicio = () => router.push('/')
const irAAgregarArtista = () => router.push('/agregar-artista')

const eliminarArtista = async (id) => {
  if (confirm('¿Seguro que deseas eliminar este artista?')) {
    try {
      await store.eliminarArtista(id)
      alert('Artista eliminado correctamente')
    } catch (error) {
      alert('Error al eliminar el artista')
    }
  }
}

const editarArtista = (id) => {
  // Redirigir a una vista de edición (debes crearla si no existe)
  router.push(`/editar-artista/${id}`)
}
</script>

<template>
  <div class="catalogo-container">
    <main class="contenido-principal">
      <h1 class="titulo-pagina">Nuestros Artistas</h1>
      
      <div class="botones-superiores">
        <button @click="irAInicio" class="boton-nav">Inicio</button>
        <button @click="irAAgregarArtista" class="boton-nav boton-resaltado">+ Nuevo Artista</button>
      </div>

      <div v-if="cargando" class="mensaje-carga">
        Cargando artistas...
      </div>

      <div v-else class="cuadricula-artistas">
        <div v-for="artista in listaArtistas" :key="artista.id" class="tarjeta-artista">
          <div class="imagen-tarjeta">
            <img :src="artista.foto_url" :alt="artista.nombre" />
          </div>
          <div class="info-tarjeta">
            <h2>{{ artista.nombre }}</h2>
            
            <p class="bio">{{ artista.bibliografia }}</p>
            
            <button class="boton-ver">Ver Detalles</button>
            <div class="acciones-tarjeta">
              <button class="boton-editar" @click="editarArtista(artista.id)">Editar</button>
              <button class="boton-eliminar" @click="eliminarArtista(artista.id)">Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.acciones-tarjeta {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.7rem;
}
.boton-editar {
  background: transparent;
  border: 1px solid var(--azul-textos);
  color: var(--azul-textos);
  border-radius: 6px;
  padding: 0.4rem 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}
.boton-editar:hover {
  background-color: var(--azul-textos);
  color: white;
}
.boton-eliminar {
  background: transparent;
  border: 1px solid #e74c3c;
  color: #e74c3c;
  border-radius: 6px;
  padding: 0.4rem 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}
.boton-eliminar:hover {
  background-color: #e74c3c;
  color: white;
}
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
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.cuadricula-artistas {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
}

.tarjeta-artista {
  background: var(--gris-azul);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  border: 1px solid var(--azul-textos);
  transition: transform 0.3s ease, border-color 0.3s;
}

.tarjeta-artista:hover {
  transform: translateY(-5px);
  border-color: #345d91;
}

.imagen-tarjeta {
  height: 200px;
  overflow: hidden;
  background: #e6f0fa;
}

.imagen-tarjeta img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
  border-bottom: 1px solid var(--azul-textos);
}

.tarjeta-artista:hover .imagen-tarjeta img {
  transform: scale(1.05);
}

.info-tarjeta {
  padding: 1.5rem;
  text-align: center;
}

.info-tarjeta h2 {
  color: var(--azul-textos);
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.etiqueta-genero {
  display: inline-block;
  background-color: var(--content-bg);
  color: var(--text-color);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid var(--azul-textos);
  font-weight: bold;
}

.bio {
  font-size: 0.9rem;
  color: #345d91;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.boton-ver {
  width: 100%;
  padding: 0.6rem;
  background-color: transparent;
  border: 1px solid var(--azul-textos);
  color: var(--azul-textos);
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

.boton-ver:hover {
  background-color: var(--azul-textos);
  color: white;
}

@media (max-width: 600px) {
  .contenido-principal {
    padding: 0 5px;
  }
  .cuadricula-artistas {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  .info-tarjeta {
    padding: 1rem;
  }
}
</style>