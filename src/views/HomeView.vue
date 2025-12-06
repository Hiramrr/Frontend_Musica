<script setup>
import { ref } from 'vue'

const nuevosLanzamientos = ref([
  {
    id: 1,
    titulo: 'Navidades',
    artista: 'Luis Miguel',
    fecha: '14 de Noviembre de 2006',
    generos: ['Villancicos', 'Jazz Pop'],
    promedio: '4.20',
    votos: '15,600',
    deseados: '4,100',
    imagen: 'https://placehold.co/100x100/c0392b/FFF?text=LM',
  },
  {
    id: 2,
    titulo: 'Recuerdos, Vol. II',
    artista: 'Juan Gabriel',
    fecha: '20 de Julio de 1984',
    generos: ['Balada', 'Mariachi'],
    promedio: '4.90',
    votos: '30,150',
    deseados: '5,000',
    imagen: 'https://placehold.co/100x100/8e44ad/FFF?text=JG',
  },
  {
    id: 3,
    titulo: 'Romance',
    artista: 'Luis Miguel',
    fecha: '19 de Noviembre de 1991',
    generos: ['Bolero', 'Pop Latino'],
    promedio: '4.85',
    votos: '25,420',
    deseados: '3,200',
    imagen: 'https://placehold.co/100x100/2c3e50/FFF?text=Romance',
  },
  {
    id: 4,
    titulo: 'En el Palacio de Bellas Artes',
    artista: 'Juan Gabriel',
    fecha: '20 de Diciembre de 1990',
    generos: ['En Vivo', 'Ranchera'],
    promedio: '5.00',
    votos: '45,000',
    deseados: '8,500',
    imagen: 'https://placehold.co/100x100/d35400/FFF?text=Bellas+Artes',
  },
  {
    id: 5,
    titulo: 'Aries',
    artista: 'Luis Miguel',
    fecha: '22 de Junio de 1993',
    generos: ['Pop', 'R&B'],
    promedio: '4.75',
    votos: '18,300',
    deseados: '2,100',
    imagen: 'https://placehold.co/100x100/f39c12/FFF?text=Aries',
  },
])

const masEscuchados = ref([
  { id: 1, titulo: 'Santa Claus Llegó a La Ciudad', artista: 'Luis Miguel', oyentes: 1500 },
  { id: 2, titulo: 'Querida', artista: 'Juan Gabriel', oyentes: 1450 },
  { id: 3, titulo: 'No Sé Tú', artista: 'Luis Miguel', oyentes: 1320 },
  { id: 4, titulo: 'Amor Eterno (En Vivo)', artista: 'Juan Gabriel', oyentes: 1280 },
  { id: 5, titulo: 'Suave', artista: 'Luis Miguel', oyentes: 1100 },
])
</script>

<template>
  <div id="container">
    <div id="headerArea">
      <div id="header"></div>

      <nav id="navbar">
        <ul>
          <li><a href="#">Inicio</a></li>
          <li><a href="#">Artistas</a></li>
          <li><a href="#">Albums</a></li>
          <li><a href="#">Musica</a></li>
          <li><a href="#">Perfil</a></li>
        </ul>
      </nav>
    </div>

    <div id="flex">
      <main>
        <h1>Nuevos Lanzamientos</h1>

        <div class="pestanas">
          <span class="pestana activa">Todos</span>
          <span class="pestana">Albums</span>
          <span class="pestana">Canciones</span>
        </div>

        <p class="intro-text">
          <strong>Canciones más populares</strong>
        </p>

        <div v-for="album in nuevosLanzamientos" :key="album.id" class="box fila-album">
          <div class="portada-album">
            <img :src="album.imagen" :alt="album.titulo" />
          </div>

          <div class="detalles-album">
            <h2>
              <a href="#">{{ album.titulo }}</a>
            </h2>
            <div class="artista-album">
              de <strong>{{ album.artista }}</strong>
            </div>
            <div class="meta-album">Lanzado: {{ album.fecha }}</div>

            <div class="generos-album">
              <span v-for="(genero, indice) in album.generos" :key="indice">
                [{{ genero }}]{{ indice < album.generos.length - 1 ? ' ' : '' }}
              </span>
            </div>
          </div>

          <div class="estadisticas-album">
            <div class="stat-group">
              <span class="stat-label">Promedio</span>
              <span class="stat-value">{{ album.promedio }}</span>
            </div>
            <div class="stat-group">
              <span class="stat-label">Numero de votos</span>
              <span class="stat-value">{{ album.votos }}</span>
            </div>
          </div>
        </div>
      </main>

      <aside id="rightSidebar">
        <h2>Top Tracks</h2>
        <div class="box">
          <p><strong>Lo más escuchado esta semana en la comunidad.</strong></p>
          <ul class="lista-top">
            <li v-for="(track, index) in masEscuchados" :key="track.id">
              <div class="track-info">
                <strong>{{ index + 1 }}. {{ track.titulo }}</strong
                ><br />
                <span style="font-size: 0.8em; color: #0f2d52">{{ track.artista }}</span>
              </div>
            </li>
          </ul>
        </div>

        <h2>Enlaces</h2>
        <ul>
          <li><a href="#">No se que poner</a></li>
          <li><a href="#">Tops</a></li>
          <li><a href="https://github.com/Hiramrr/Frontend_Musica">Repositorio GitHub</a></li>
        </ul>
      </aside>
    </div>
    <footer>
      <p>Smart Rating</p>
    </footer>
  </div>
</template>

<style>
/* Variables para imágenes y colores */
:root {
  --header-image: url('https://sadhost.neocities.org/images/layouts/wp.jpeg');
  --body-bg-image: url('https://sadhost.neocities.org/images/tiles/bk024.gif');
  --content-bg: #e6f0fa;
  --azul-textos: #2b7de9;
  --gris-azul: #c2d6ea;
  --text-color: #0f2d52;
}

/* Fuentes importadas */
@font-face {
  font-family: Nunito;
  src: url('https://sadhost.neocities.org/fonts/Nunito-Regular.ttf');
}
@font-face {
  font-family: Nunito;
  src: url('https://sadhost.neocities.org/fonts/Nunito-Bold.ttf');
  font-weight: bold;
}

body {
  font-family: 'Nunito', sans-serif;
  margin: 0;
  background-color: #08031a;
  background-size: 65px;
  color: var(--text-color);
  background-image: var(--body-bg-image);
}

a {
  color: var(--azul-textos);
  font-weight: bold;
  text-decoration: none;
}
a:hover {
  color: #a49cba;
  text-decoration: underline;
}

#container {
  background-color: var(--content-bg);
  max-width: 900px;
  margin: 0 auto;
}

#navbar {
  height: 40px;
  background-color: var(--gris-azul);
  width: 100%;
  border-bottom: 1px solid var(--azul-textos);
}

#navbar ul {
  display: flex;
  padding: 0;
  margin: 0;
  list-style-type: none;
  justify-content: space-evenly;
}

#navbar li {
  padding-top: 10px;
}

#flex {
  display: flex;
  align-items: flex-start;
}

main {
  background-color: var(--content-bg);
  flex: 1;
  padding: 20px;
  min-height: 80vh;
}

aside {
  background-color: #c2d6ea;
  width: 250px;
  padding: 20px;
  font-size: smaller;
  border-left: 1px solid var(--azul-textos);
  border-bottom: 1px solid var(--azul-textos);
}

footer {
  background-color: var(--gris-azul);
  width: 100%;
  padding: 10px;
  text-align: center;
  border-top: 1px solid var(--azul-textos);
  margin-top: 20px;
}

h1,
h2,
h3 {
  color: var(--azul-textos);
  margin-top: 0;
}

h1 {
  font-size: 25px;
  border-bottom: 1px dashed var(--azul-textos);
  padding-bottom: 10px;
}
h2 {
  font-size: 18px;
}

.box {
  background-color: var(--gris-azul);
  border: 1px solid var(--azul-textos);
  padding: 10px;
  margin-bottom: 15px;
}

/* Pestañas de navegación interna */
.pestanas {
  margin-bottom: 15px;
  border-bottom: 1px solid #a49cba;
}
.pestana {
  margin-right: 15px;
  cursor: pointer;
  color: #0f2d52;
}
.pestana.activa {
  color: var(--azul-textos);
  font-weight: bold;
  border-bottom: 2px solid var(--azul-textos);
}

/* Layout de la fila del álbum */
.fila-album {
  display: flex;
  gap: 15px;
  align-items: center;
}

.portada-album img {
  width: 80px;
  height: 80px;
  border: 1px solid var(--azul-textos);
  display: block;
}

.detalles-album {
  flex: 1;
}

.titulo-album {
  margin: 0;
  font-size: 1.2rem;
}

.meta-album {
  font-size: 0.85rem;
  color: #0f2d52;
  font-style: italic;
}

.generos-album {
  font-size: 0.8rem;
  margin-top: 5px;
  color: #0f2d52;
}

/* Estadísticas a la derecha */
.estadisticas-album {
  display: flex;
  flex-direction: column;
  gap: 5px;
  text-align: right;
  min-width: 80px;
  background: rgba(0, 0, 0, 0.2);
  padding: 5px;
  border-radius: 4px;
}

.stat-group {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  font-size: 0.8rem;
}

.stat-label {
  color: #0f2d52;
}
.stat-value {
  color: #345d91;
  font-weight: bold;
}

/* Lista del Sidebar */
.lista-top {
  padding-left: 0;
  list-style: none;
}
.lista-top li {
  margin-bottom: 10px;
  border-bottom: 1px dashed #c2d6ea;
  padding-bottom: 5px;
}

/* --- RESPONSIVE (MEDIA QUERY) --- */
@media only screen and (max-width: 800px) {
  #flex {
    flex-wrap: wrap;
  }

  aside {
    width: 100%;
    order: 1; /* Sidebar arriba en móvil o abajo según prefieras */
    border-left: none;
    border-bottom: 1px solid var(--azul-textos);
  }

  main {
    order: 2;
  }

  #navbar ul {
    flex-wrap: wrap;
  }

  .fila-album {
    flex-direction: column;
    text-align: center;
  }

  .estadisticas-album {
    width: 100%;
    flex-direction: row;
    justify-content: center;
    gap: 20px;
    text-align: center;
  }
}
</style>
