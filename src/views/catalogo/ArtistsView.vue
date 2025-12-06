<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Datos simulados (Mock Data)
// En el futuro, esto vendría de una base de datos o Store de Pinia
const artistas = ref([
  {
    id: 1,
    nombre: 'Luis Miguel',
    genero: 'Bolero / Pop',
    imagen: 'https://placehold.co/400x400/2c3e50/FFF?text=LM',
    bio: 'El Sol de México, icono de la música romántica.'
  },
  {
    id: 2,
    nombre: 'Juan Gabriel',
    genero: 'Ranchera / Balada',
    imagen: 'https://placehold.co/400x400/8e44ad/FFF?text=JG',
    bio: 'El Divo de Juárez, cantautor prolífico.'
  },
  {
    id: 3,
    nombre: 'The Weeknd',
    genero: 'R&B / Synth-pop',
    imagen: 'https://placehold.co/400x400/d35400/FFF?text=TW',
    bio: 'Superestrella canadiense conocida por su versatilidad.'
  },
  {
    id: 4,
    nombre: 'Daft Punk',
    genero: 'Electrónica',
    imagen: 'https://placehold.co/400x400/1c2e52/FFF?text=DP',
    bio: 'Dúo legendario de la música house francesa.'
  }
])

const irAHome = () => router.push('/')
const irAAgregar = () => router.push('/agregar-artista')

</script>

<template>
  <div class="catalogo-container">
    <main class="main-content">
      <h1 class="page-title">Nuestros Artistas</h1>
      <div class="botones-artistas">
        <button @click="irAHome" class="btn-nav">Inicio</button>
        <button @click="irAAgregar" class="btn-nav btn-highlight">+ Nuevo Artista</button>
      </div>
      <div class="grid-artistas">
        <div v-for="artista in artistas" :key="artista.id" class="card-artista">
          <div class="card-image">
            <img :src="artista.imagen" :alt="artista.nombre" />
          </div>
          <div class="card-info">
            <h2>{{ artista.nombre }}</h2>
            <span class="genero-badge">{{ artista.genero }}</span>
            <p class="bio">{{ artista.bio }}</p>
            <button class="btn-ver">Ver Detalles</button>
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

.catalogo-container {
  min-height: 100vh;
  background-color: var(--content-bg);
  background-image: var(--body-bg-image);
  padding-bottom: 2rem;
}

.navbar-catalogo {
  background-color: var(--gris-azul);
  padding: 1rem 2rem;
  border-bottom: 2px solid var(--azul-textos);
  margin-bottom: 2rem;
}

.nav-content {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand {
  font-weight: bold;
  color: var(--azul-textos);
  font-size: 1.2rem;
}

.btn-nav {
  background: transparent;
  border: 1px solid var(--azul-textos);
  color: var(--text-color);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  margin-left: 10px;
  transition: all 0.2s;
}

.btn-highlight {
  background-color: var(--azul-textos);
  color: white;
}

.btn-nav:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.main-content {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-title {
  color: var(--azul-textos);
  border-bottom: 1px dashed var(--azul-textos);
  padding-bottom: 10px;
  margin-bottom: 30px;
}

.grid-artistas {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
}

.card-artista {
  background: var(--gris-azul);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  border: 1px solid var(--azul-textos);
  transition: transform 0.3s ease, border-color 0.3s;
}

.card-artista:hover {
  transform: translateY(-5px);
  border-color: #345d91;
}

.card-image {
  height: 200px;
  overflow: hidden;
  background: #e6f0fa;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
  border-bottom: 1px solid var(--azul-textos);
}

.card-artista:hover .card-image img {
  transform: scale(1.05);
}

.card-info {
  padding: 1.5rem;
  text-align: center;
}

.card-info h2 {
  color: var(--azul-textos);
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
}

.genero-badge {
  display: inline-block;
  background-color: var(--content-bg);
  color: var(--text-color);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid var(--azul-textos);
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

.btn-ver {
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

.btn-ver:hover {
  background-color: var(--azul-textos);
  color: white;
}

.botones-artistas {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

@media (max-width: 600px) {
  .main-content {
    padding: 0 5px;
  }
  .nav-content {
    flex-direction: column;
    gap: 1rem;
  }
  .grid-artistas {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  .card-info {
    padding: 1rem;
  }
}
</style>