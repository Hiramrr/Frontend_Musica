<script setup>
// Vista de catálogo que muestra todos los álbumes disponibles en el sistema
// Permite ver detalles, crear nuevos álbumes, editar y eliminar existentes

import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAlbumesStore } from '@/stores/albums'
import { storeToRefs } from 'pinia'
import HeaderComponente from '../../components/HeaderComponente.vue'

const router = useRouter()
const store = useAlbumesStore()

// Referencias reactivas del store para acceder a la lista de álbumes y estado de carga
const { listaAlbumes, cargando } = storeToRefs(store)

// Al cargar la vista, obtiene la lista completa de álbumes desde el backend
onMounted(() => {
  store.obtenerAlbumes()
})

// Navega al detalle de un álbum específico usando su ID
const verDetalle = (id) => {
  router.push({ name: 'album-detalle', params: { id: id } })
}

// Navega a la página de inicio
const irAInicio = () => router.push('/')

// Navega a la vista de agregar un nuevo álbum
const irAAgregarAlbum = () => router.push('/agregar-album')

// Navega a la vista de edición del álbum seleccionado
const editarAlbum = (id) => {
  router.push(`/editar-album/${id}`)
}

// Elimina un álbum tras pedir confirmación al usuario
// Muestra un error si el álbum tiene canciones asociadas
const eliminarAlbum = async (id) => {
  if (confirm('¿Estás seguro de que quieres eliminar este álbum?')) {
    try {
      await store.eliminarAlbum(id)
    } catch (error) {
      console.error('Error desde el componente al eliminar:', error)
      alert(
        'No se pudo eliminar el álbum. Es posible que tenga canciones asociadas. Por favor, elimine las canciones del álbum antes de intentarlo de nuevo.'
      )
    }
  }
}
</script>

<template>
  <div class="catalogo-container">
    <div id="headerArea">
      <HeaderComponente />
    </div>

    <main class="contenido-principal">
      <h1 class="titulo-pagina">Nuestros Álbumes</h1>

      <div class="botones-superiores">
        <button @click="irAInicio" class="boton-nav">Inicio</button>
        <button @click="irAAgregarAlbum" class="boton-nav boton-resaltado">+ Nuevo Álbum</button>
      </div>

      <div v-if="cargando" class="mensaje-carga">Cargando discografía...</div>

      <div v-else-if="listaAlbumes.length > 0" class="cuadricula-albumes">
        <div v-for="album in listaAlbumes" :key="album.id" class="tarjeta-album">
          <div class="imagen-tarjeta">
            <img :src="album.portadaUrl" :alt="album.nombre" />
          </div>

          <div class="info-tarjeta">
            <h2>{{ album.nombre }}</h2>

            <span class="etiqueta-artista">
              {{ album.nombreArtista }} ({{ album.fechaSalida }})
            </span>

            <p class="descripcion">{{ album.descripcion }}</p>

            <button @click="verDetalle(album.id)" class="boton-ver">Ver Canciones</button>
            <div class="botones-accion">
              <button @click="editarAlbum(album.id)" class="boton-editar">Editar</button>
              <button @click="eliminarAlbum(album.id)" class="boton-eliminar">Eliminar</button>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="mensaje-vacio">No se encontraron álbumes.</div>
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

.cuadricula-albumes {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
}

.tarjeta-album {
  background: var(--gris-azul);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--azul-textos);
  transition:
    transform 0.3s ease,
    border-color 0.3s;
}

.tarjeta-album:hover {
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

.tarjeta-album:hover .imagen-tarjeta img {
  transform: scale(1.05);
}

.info-tarjeta {
  padding: 1.5rem;
  text-align: center;
}

.info-tarjeta h2 {
  color: var(--azul-textos);
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.etiqueta-artista {
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

.descripcion {
  font-size: 0.9rem;
  color: #345d91;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 2.8em;
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
  transition:
    background-color 0.2s,
    color 0.2s;
}

.boton-ver:hover {
  background-color: var(--azul-textos);
  color: white;
}

.botones-accion {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.boton-editar,
.boton-eliminar {
  width: 48%;
  padding: 0.6rem;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition:
    background-color 0.2s,
    color 0.2s;
}

.boton-editar {
  background-color: transparent;
  border: 1px solid #f0ad4e;
  color: #f0ad4e;
}

.boton-editar:hover {
  background-color: #f0ad4e;
  color: white;
}

.boton-eliminar {
  background-color: transparent;
  border: 1px solid #d9534f;
  color: #d9534f;
}

.boton-eliminar:hover {
  background-color: #d9534f;
  color: white;
}


@media (max-width: 600px) {
  .contenido-principal {
    padding: 0 10px;
  }
  .cuadricula-albumes {
    grid-template-columns: 1fr;
    gap: 15px;
  }
}
</style>