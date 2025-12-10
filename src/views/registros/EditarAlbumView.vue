<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAlbumesStore } from '@/stores/albums'
import { useArtistasStore } from '@/stores/artistas'

const router = useRouter()
const route = useRoute()
const albumesStore = useAlbumesStore()
const artistasStore = useArtistasStore()

const formulario = ref({
  id: null,
  nombre: '',
  artista_id: '',
  fechaSalida: '',
  descripcion: '',
  portadaUrl: '',
  totalCanciones: '',
  duracionTexto: ''
})

// Función para convertir segundos a formato minutos y segundos
const segundosAFormatoMMSS = (totalSegundos) => {
  if (isNaN(totalSegundos) || totalSegundos === null) return ''
  const minutos = Math.floor(totalSegundos / 60)
  const segundos = totalSegundos % 60
  return `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`
}

// Función para convertir MM:SS a segundos para su envio al back para enviar al back
const convertirDuracionASegundos = (tiempo) => {
  if (!tiempo || !tiempo.includes(':')) return 0
  const partes = tiempo.split(':')
  const minutos = parseInt(partes[0]) || 0
  const segundos = parseInt(partes[1]) || 0
  return (minutos * 60) + segundos
}

onMounted(async () => {
  await artistasStore.obtenerArtistas()
  
  //Cargar datos del álbum a editar
  const albumId = route.params.id
  const album = await albumesStore.obtenerAlbumPorId(albumId)

  if (album) {
    let idArtista = ''
    if (album.artistas && album.artistas.length > 0) {
      idArtista = album.artistas[0].id
    }

    // Llenar formulario
    formulario.value = {
      id: album.id,
      nombre: album.nombre,
      artista_id: idArtista,
      fechaSalida: album.fechaSalida,
      descripcion: album.descripcion,
      portadaUrl: album.portadaUrl,
      totalCanciones: album.totalCanciones,
      duracionTexto: segundosAFormatoMMSS(album.duracion_segundos) 
    }
  }
})

const irAAlbumes = () => router.push('/albumes')

const guardarCambios = async () => {
  // Validaciones para no dejar campos vacios
  if (!formulario.value.artista_id) {
    alert("Por favor selecciona un artista")
    return
  }

  const anio = parseInt(formulario.value.fechaSalida)
  const total = parseInt(formulario.value.totalCanciones)
  const segundos = convertirDuracionASegundos(formulario.value.duracionTexto)

  if (isNaN(anio) || isNaN(total) || isNaN(segundos)) {
    alert("Por favor verifica que los campos numéricos sean correctos")
    return
  }

  // Construcción del objeto que se va a enviar al backend
  const payload = {
    id: formulario.value.id,
    nombre: formulario.value.nombre,
    fechaSalida: anio,
    totalCanciones: total,
    descripcion: formulario.value.descripcion,
    portadaUrl: formulario.value.portadaUrl,
    duracion_segundos: segundos,
    
    // Enviamos el artista como array de objetos con su id 
    artistas: [
      { id: formulario.value.artista_id }
    ]
    
  }

  try {
    //enviamos los datos al store para que haga la actualización
    await albumesStore.actualizarAlbum(formulario.value.id, payload)
    alert('Álbum actualizado correctamente')
    router.push('/albumes')
  } catch (error) {
    console.error("Error al actualizar:", error)
    alert('Hubo un error al actualizar el álbum. Verifica la consola.')
  }
}
</script>

<template>
  <div class="contenedor-editar-album">
    <div class="contenido">
      <div class="contenedor-formulario">
        <div class="barra-superior">
          <button class="boton-texto" @click="irAAlbumes">← Regresar a Álbumes</button>
        </div>

        <div class="seccion-titulo">
          <h1 class="titulo">Editar Álbum</h1>
          <p class="subtitulo">Modifica la información del lanzamiento discográfico</p>
        </div>

        <form class="formulario" @submit.prevent="guardarCambios">
          <div class="cuadricula-formulario">
            <div class="seccion-datos">
              
              <div class="grupo-input">
                <label class="etiqueta">Título del Álbum</label>
                <input v-model="formulario.nombre" type="text" required class="entrada" placeholder="Ej: Romance..." />
              </div>

              <div class="grupo-input">
                <label class="etiqueta">Artista Principal</label>
                <select v-model="formulario.artista_id" required class="entrada selector">
                  <option value="" disabled>Selecciona un artista</option>
                  <option 
                    v-for="artista in artistasStore.listaArtistas" 
                    :key="artista.id" 
                    :value="artista.id"
                  >
                    {{ artista.nombre }}
                  </option>
                </select>
              </div>

              <div class="fila-input">
                <div class="grupo-input">
                  <label class="etiqueta">Año</label>
                  <input v-model="formulario.fechaSalida" type="number" required class="entrada" />
                </div>

                <div class="grupo-input">
                  <label class="etiqueta">Duración (MM:SS)</label>
                  <input v-model="formulario.duracionTexto" type="text" required class="entrada" placeholder="45:30" />
                </div>

                <div class="grupo-input">
                  <label class="etiqueta">Total Canciones</label>
                  <input v-model="formulario.totalCanciones" type="number" required class="entrada" />
                </div>
              </div>

              <div class="grupo-input">
                <label class="etiqueta">Descripción</label>
                <textarea v-model="formulario.descripcion" rows="5" class="entrada area-texto"></textarea>
              </div>
            </div>

            <div class="seccion-imagen">
              <div class="grupo-input">
                <label class="etiqueta">URL de la Portada</label>
                <input v-model="formulario.portadaUrl" type="url" class="entrada" required />
                <div v-if="formulario.portadaUrl" class="previsualizacion" style="margin-top:1rem;">
                  <img :src="formulario.portadaUrl" alt="Portada Preview" />
                </div>
              </div>
            </div>
          </div>

          <div class="acciones">
            <button type="button" class="btn btn-borde" @click="irAAlbumes">Cancelar</button>
            <button type="submit" class="btn btn-primario" :disabled="albumesStore.cargando">
              {{ albumesStore.cargando ? 'Guardando...' : 'Guardar Cambios →' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
:root {
  --content-bg: #e6f0fa;
  --azul-textos: #2b7de9;
  --gris-azul: #c2d6ea;
  --text-color: #0f2d52;
}

.contenedor-editar-album {
  min-height: 100vh;
  background-color: var(--content-bg);
  color: var(--text-color);
  padding: 2rem;
  font-family: 'Nunito', sans-serif;
}

.contenido {
  max-width: 1200px;
  margin: 0 auto;
}

.contenedor-formulario {
  background-color: var(--gris-azul);
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--azul-textos);
}

.barra-superior {
  margin-bottom: 1.5rem;
}

.seccion-titulo {
  margin-bottom: 2.5rem;
  border-bottom: 1px dashed var(--azul-textos);
  padding-bottom: 1.5rem;
}

.titulo {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--azul-textos);
  margin-bottom: 0.5rem;
}

.subtitulo {
  color: #0f2d52;
  font-size: 0.95rem;
}

.cuadricula-formulario {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

@media (min-width: 768px) {
  .cuadricula-formulario {
    grid-template-columns: 2fr 1fr;
  }
}

.grupo-input {
  margin-bottom: 1.25rem;
  display: flex;
  flex-direction: column;
}

.etiqueta {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--azul-textos);
  margin-bottom: 0.5rem;
}

.entrada {
  background-color: #e6f0fa;
  border: 1px solid var(--azul-textos);
  border-radius: 8px;
  padding: 0.8rem 1rem;
  color: var(--text-color);
  font-size: 0.95rem;
  transition: all 0.2s;
}

.entrada:focus {
  outline: none;
  border-color: #2b7de9;
  box-shadow: 0 0 0 3px rgba(43, 125, 233, 0.15);
}

.selector {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%232b7de9' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;
  cursor: pointer;
}

.area-texto {
  resize: vertical;
  min-height: 120px;
}

.previsualizacion img {
  width: 100%;
  height: auto;
  max-height: 250px;
  object-fit: cover;
  display: block;
  border-radius: 8px;
  border: 1px solid var(--azul-textos);
}

.acciones {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding-top: 1.5rem;
  border-top: 1px dashed var(--azul-textos);
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.btn-primario {
  background-color: var(--azul-textos);
  color: white;
}

.btn-borde {
  background-color: transparent;
  border: 1px solid var(--azul-textos);
  color: var(--text-color);
}

.boton-texto {
  background: none;
  border: none;
  color: var(--azul-textos);
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0;
}
</style>
