<script setup>
import { ref } from 'vue'

//creamos una lista array llamada nuevosLanzamientos con objetos que representan los álbumes
//id: para identificar al album, titulo: el nombre del album, artista: el nombre del cantante, fecha: cuando salio, generos: lista de los estilos musicales, promedio: la calificacion o estrellas, votos: la gente que voto y deseados: es cuanta gente quiere escucharlo
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
    imagen: 'https://placehold.co/100x100/c0392b/FFF?text=Sarah'
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
    imagen: 'https://placehold.co/100x100/8e44ad/FFF?text=Hola'
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
    imagen: 'https://placehold.co/100x100/2c3e50/FFF?text=Prueba'
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
    imagen: 'https://placehold.co/100x100/d35400/FFF?text=img'
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
    imagen: 'https://placehold.co/100x100/f39c12/FFF?text=No se'
  }
])

//esta es otra lista pero es para la barra lateral pequena que son los mas escuchados
const masEscuchados = ref([
  { id: 1, titulo: 'Santa Claus Llegó a La Ciudad', artista: 'Luis Miguel', oyentes: 1500 }, 
  { id: 2, titulo: 'Querida', artista: 'Juan Gabriel', oyentes: 1450 }, 
  { id: 3, titulo: 'No Sé Tú', artista: 'Luis Miguel', oyentes: 1320 }, 
  { id: 4, titulo: 'Amor Eterno (En Vivo)', artista: 'Juan Gabriel', oyentes: 1280 }, 
  { id: 5, titulo: 'Suave', artista: 'Luis Miguel', oyentes: 1100 }, 
])
</script>

<template>
  <main class="contenedor-inicio">
    <div class="envoltura-contenido">
      
      <section class="columna-principal">
        <h1 class="titulo-seccion">Nuevos Lanzamientos</h1>
        
        <div class="pestanas">
          <span class="pestana activa">Todos los Lanzamientos</span>
          <span class="pestana">Mis Lanzamientos</span>
        </div>

        <div class="encabezado-lista">
          <span>Ordenar por: recomendado | fecha</span>
          <div class="encabezado-estadisticas">
            <span>Promedio</span>
            <span>Votos</span>
            <span>Deseados</span>
          </div>
        </div>

        <div class="lista-albumes">
          <div v-for="album in nuevosLanzamientos" :key="album.id" class="fila-album">
            
            <div class="portada-album">
              <img :src="album.imagen" :alt="album.titulo" />
            </div>

            <div class="detalles-album">
              <h2 class="titulo-album">{{ album.titulo }}</h2>
              <div class="artista-album">{{ album.artista }}</div>
              <div class="meta-album">{{ album.fecha }}</div>
              
              <div class="generos-album">
                <span v-for="(genero, indice) in album.generos" :key="indice" class="etiqueta-genero">
                  {{ genero }}{{ indice < album.generos.length - 1 ? ', ' : '' }}
                </span>
              </div>
            </div>

            <div class="estadisticas-album">
              <div class="stat-promedio">{{ album.promedio }}</div>
              <div class="stat-secundario">{{ album.votos }}</div>
              <div class="stat-secundario">{{ album.deseados }}</div>
            </div>
          </div>
        </div>
      </section>

      <aside class="barra-lateral">
        <h2 class="titulo-barra-lateral">Más escuchados</h2>
        
        <div class="pestanas-barra-lateral">
          <span class="sub-pestana activa">Lanzamientos</span>
          <span class="sub-pestana">Canciones</span>
        </div>

        <ul class="lista-top">
          <li v-for="(elemento, indice) in masEscuchados" :key="elemento.id" class="elemento-top">
            <span class="rango">{{ indice + 1 }}</span>
            <img :src="`https://placehold.co/40x40/222/FFF?text=${indice+1}`" class="mini-portada" />
            <div class="detalles-top">
              <div class="titulo-top">{{ elemento.titulo }}</div>
              <div class="artista-top">{{ elemento.artista }}</div>
              <div class="oyentes-top">{{ elemento.oyentes }} oyentes</div>
            </div>
          </li>
        </ul>
      </aside>

    </div>
  </main>
</template>

<style scoped>

/* fondo azul oscuro y el texto blanco */
.contenedor-inicio {
  background-color: #0b152b; 
  color: #ffffff;
  /* que ocupe toda la altura de la pantalla */
  min-height: 100vh;
  padding: 2rem;
  font-family: 'Inter', sans-serif;
}

/* Flexbox: Pone la columna izquierda junto a la derecha */
.envoltura-contenido {
  display: flex; 
  /* Espacio entre las columnas */
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* la columna izquierda ocupa 3 veces mas espacio */
.columna-principal {
  flex: 3;
}

/* la columna derecha ocupa 1 parte del espacio */
.barra-lateral {
  flex: 1;
  min-width: 250px;
}

.titulo-seccion {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #fff;
}

.pestanas {
  border-bottom: 1px solid #2c3e50;
  margin-bottom: 1rem;
  display: flex;
  gap: 1.5rem;
}

.pestana {
  padding-bottom: 0.5rem;
  cursor: pointer;
  font-weight: 600;
  color: #8fa3bf;
}

.pestana.activa {
  color: #fff;
  border-bottom: 2px solid #fff;
}

.encabezado-lista {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: #8fa3bf;
  margin-bottom: 0.5rem;
  padding: 0 0.5rem;
}

.encabezado-estadisticas {
  display: flex;
  gap: 2rem;
  text-align: right;
  min-width: 180px;
  justify-content: flex-end;
}

/* la tarjeta azul oscuro que es cada fila de album */
.fila-album {
  display: flex;
  background-color: #12203e;
  margin-bottom: 2px;
  padding: 0.8rem;
  align-items: center;
  transition: background 0.2s;
}

.fila-album:hover {
  background-color: #1c2e52;
}

.portada-album img {
  width: 80px;
  height: 80px;
  object-fit: cover; /* ajusta la imagen para que quepa bien */
  border-radius: 2px;
  margin-right: 1rem;
}

.detalles-album {
  flex: 1; /* ocupa el espacio que queda */
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.titulo-album {
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0;
  color: #a4c2f4;
  cursor: pointer;
}

.titulo-album:hover {
  text-decoration: underline;
}

.artista-album {
  font-weight: 600;
  font-size: 0.95rem;
  color: #fff;
}

.meta-album {
  font-size: 0.8rem;
  color: #b0b0b0;
  margin: 2px 0;
}

.generos-album {
  font-size: 0.75rem;
  color: #7f8c8d;
}

.etiqueta-genero {
  color: #648bc4;
}

.estadisticas-album {
  display: flex;
  gap: 2rem;
  text-align: right;
  min-width: 180px;
  justify-content: flex-end;
  align-items: center;
  /* ajusta los números para que sean verticales */
  font-variant-numeric: tabular-nums;
}

.stat-promedio {
  font-weight: 700;
  color: #fff;
  font-size: 1rem;
}

.stat-secundario {
  color: #b0b0b0;
  font-size: 0.9rem;
}

.titulo-barra-lateral {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #fff;
}

.pestanas-barra-lateral {
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.sub-pestana {
  margin-right: 1rem;
  color: #8fa3bf;
  cursor: pointer;
  font-weight: bold;
}

.sub-pestana.activa {
  color: #fff;
  text-decoration: underline;
}

.lista-top {
  /* quita los puntos de lista */
  list-style: none;
  padding: 0;
  margin: 0;
}

.elemento-top {
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #1c2e52;
}

.rango {
  width: 20px;
  font-weight: bold;
  color: #fff;
}

.mini-portada {
  width: 40px;
  height: 40px;
  border-radius: 50%; /* hace que la imagen sea redonda */
  margin: 0 10px;
}

.detalles-top {
  display: flex;
  flex-direction: column;
}

.titulo-top {
  font-size: 0.9rem;
  font-weight: 700;
  color: #a4c2f4;
}

.artista-top {
  font-size: 0.8rem;
  color: #ccc;
}

.oyentes-top {
  font-size: 0.75rem;
  color: #7f8c8d;
}

/* en caso de que la pantalla es pequeña (menos de 768px de ancho) */
@media (max-width: 768px) {
  .envoltura-contenido {
    flex-direction: column; 
    /* pone una columna abajo de la otra */
  }

  .encabezado-estadisticas, .estadisticas-album {
    display: none; /* oculta los numeros para ahorrar espacio */
  }

  .barra-lateral {
    display: none; 
    /* oculta la barra lateral en el celular */
  }
}
</style>