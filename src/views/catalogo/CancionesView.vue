<script setup>
import { ref, computed } from 'vue' 
import { useRouter, useRoute } from 'vue-router' 

const router = useRouter()
const route = useRoute() 

const filtroAlbum = ref(route.query.album || '')

const listaCanciones = ref([
  {
    id: 1,
    nombre: 'No Sé Tú',
    artista: 'Luis Miguel',
    album: 'Romance', 
    duracion: '3:49',
    portada: 'https://placehold.co/400x400/2c3e50/FFF?text=No+Se+Tu'
  },
  {
    id: 2,
    nombre: 'Inolvidable',
    artista: 'Luis Miguel',
    album: 'Romance', 
    duracion: '4:19',
    portada: 'https://placehold.co/400x400/2c3e50/FFF?text=Inolvidable'
  },
  {
    id: 3,
    nombre: 'Querida',
    artista: 'Juan Gabriel',
    album: 'Recuerdos, Vol. II',
    duracion: '5:19',
    portada: 'https://placehold.co/400x400/8e44ad/FFF?text=Querida'
  },
  {
    id: 4,
    nombre: 'Gasoline',
    artista: 'The Weeknd',
    album: 'Dawn FM',
    duracion: '3:32',
    portada: 'https://placehold.co/400x400/d35400/FFF?text=Gasoline'
  },
  {
    id: 5,
    nombre: 'Get Lucky',
    artista: 'Daft Punk',
    album: 'Random Access Memories',
    duracion: '6:09',
    portada: 'https://placehold.co/400x400/1c2e52/FFF?text=Get+Lucky'
  }
])

const cancionesFiltradas = computed(() => {
  if (filtroAlbum.value) {
    return listaCanciones.value.filter(c => c.album === filtroAlbum.value)
  }
  return listaCanciones.value
})

const limpiarFiltro = () => {
  filtroAlbum.value = ''
  router.push({ name: 'musica' }) // Limpia la URL
}

const irAInicio = () => router.push('/')
const irAAgregarCancion = () => router.push('/agregar-cancion')
</script>

<template>
  <div class="contenedor-catalogo">
    <main class="contenido-principal">
      <h1 class="titulo-pagina">Catálogo de Música</h1>
      
      <div class="botones-superiores">
        <button @click="irAInicio" class="boton-nav">Inicio</button>
        <button @click="irAAgregarCancion" class="boton-nav boton-resaltado">+ Nueva Canción</button>
      </div>

      <div class="cuadricula-canciones">
        <div v-for="cancion in listaCanciones" :key="cancion.id" class="tarjeta-cancion">
          <div class="imagen-tarjeta">
            <img :src="cancion.portada" :alt="cancion.nombre" />
          </div>
          <div class="info-tarjeta">
            <h2>{{ cancion.nombre }}</h2>
            <p class="texto-artista">{{ cancion.artista }}</p>
            <p class="texto-album">
              <span class="etiqueta-gris">Album:</span> {{ cancion.album }}
            </p>
            <div class="meta-inferior">
              <span class="texto-duracion">Dur: {{ cancion.duracion }}</span>
              <button class="boton-ver">Ver Reseñas</button>
            </div>
          </div>
        </div>
      </div>
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

.contenedor-catalogo {
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

.cuadricula-canciones {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
}

.tarjeta-cancion {
  background: var(--gris-azul);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
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

.texto-duracion {
  font-size: 0.85rem;
  color: #0f2d52;
  font-weight: bold;
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

@media (max-width: 600px) {
  .contenido-principal { padding: 0 10px; }
  .cuadricula-canciones { grid-template-columns: 1fr; }
}
</style>