<script setup>
/**
 * 1. Obtiene el ID de la canción desde la URL.
 * 2. Carga la lista de álbumes (para el selector).
 * 3. Carga los datos actuales de la canción desde el Backend.
 * 4. Rellena el formulario con esos datos (transformando la duración).
 * 5. Envía los cambios al Backend cuando el usuario guarda.
 */
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCancionesStore } from '@/stores/canciones'
import { useAlbumesStore } from '@/stores/albums'

const router = useRouter()
const route = useRoute()
const cancionesStore = useCancionesStore()
const albumesStore = useAlbumesStore()

const listaAlbumes = ref([])

const formulario = ref({
  id: null,
  nombre: '',
  album_id: '',
  anio_salida: '',
  duracionTexto: '',
  artista_colaborador: '', 
  portada_url: ''
})

const artistasOriginales = ref([])

const segundosAFormato = (totalSegundos) => {
  if (!totalSegundos) return ''
  const minutos = Math.floor(totalSegundos / 60)
  const segundos = totalSegundos % 60
  return `${minutos}:${segundos.toString().padStart(2, '0')}`
}

const formatoASegundos = (texto) => {
  if (!texto) return 0
  const partes = texto.split(':')
  const min = parseInt(partes[0]) || 0
  const seg = parseInt(partes[1]) || 0
  return (min * 60) + seg
}

onMounted(async () => {
  await albumesStore.obtenerAlbumes()
  listaAlbumes.value = [
    { id: null, nombre: '-- Es un Single (Sin álbum) --' }, 
    ...albumesStore.listaAlbumes
  ]

  const idCancion = route.params.id
  //Pedir al backend los datos de esa canción
  const cancion = await cancionesStore.obtenerCancionPorId(idCancion)

  if (cancion) {
    formulario.value = {
      id: cancion.id,
      nombre: cancion.nombre,
      album_id: cancion.idAlbum || null, 
      anio_salida: cancion.fecha_salida,
      duracionTexto: segundosAFormato(cancion.duracion_segundos),
      descripcion: cancion.descripcion,
      portada_url: cancion.portada_url
    }
artistasOriginales.value = cancion.artistas || []  
}
})

//Prepara el objeto y lo envía al store para actualizar.
const guardarCambios = async () => {
  const payload = {
    nombre: formulario.value.nombre,
    fecha_salida: parseInt(formulario.value.anio_salida),
    duracion_segundos: formatoASegundos(formulario.value.duracionTexto),
    descripcion: formulario.value.descripcion,
    portada_url: formulario.value.portada_url,
    album: formulario.value.album_id ? { id: formulario.value.album_id } : null,
    artistas: artistasOriginales.value
  }

  try {
    await cancionesStore.actualizarCancion(formulario.value.id, payload)
    alert('Canción actualizada correctamente')
    router.push('/musica-admin') 
  } catch (error) {
    console.error(error)
    alert('Error al actualizar la canción')
  }
}

const irAtras = () => router.push('/musica-admin')
</script>

<template>
  <div class="contenedor-agregar-cancion">
    <div class="contenido">
      <div class="contenedor-formulario">
        
        <div class="barra-superior">
          <button class="boton-texto" @click="irAtras">← Cancelar</button>
        </div>

        <div class="seccion-titulo">
          <h1 class="titulo">Editar Canción</h1>
          <p class="subtitulo">Modifica los detalles de la canción</p>
        </div>

        <form class="formulario" @submit.prevent="guardarCambios">
          <div class="cuadricula-formulario">
            
            <div class="seccion-datos">
              <div class="grupo-input">
                <label class="etiqueta">Nombre</label>
                <input v-model="formulario.nombre" type="text" required class="entrada" />
              </div>

              <div class="grupo-input">
                <label class="etiqueta">Álbum</label>
                <select v-model="formulario.album_id" class="entrada selector">
                  <option 
                    v-for="album in listaAlbumes" 
                    :key="album.id" 
                    :value="album.id"
                  >
                    {{ album.nombre }}
                  </option>
                </select>
              </div>

              <div class="fila-input">
                <div class="grupo-input">
                  <label class="etiqueta">Año</label>
                  <input v-model="formulario.anio_salida" type="number" required class="entrada" />
                </div>

                <div class="grupo-input">
                  <label class="etiqueta">Duración (MM:SS)</label>
                  <input v-model="formulario.duracionTexto" type="text" required class="entrada" />
                </div>
              </div>

              <div class="grupo-input">
                <label class="etiqueta">Descripción</label>
                <textarea v-model="formulario.descripcion" rows="4" class="entrada area-texto"></textarea>
              </div>
            </div>

            <div class="seccion-imagen">
              <div class="grupo-input">
                <label class="etiqueta">URL Portada</label>
                <input v-model="formulario.portada_url" type="url" class="entrada" required />
                <div v-if="formulario.portada_url" class="previsualizacion" style="margin-top:10px">
                  <img :src="formulario.portada_url" alt="Portada" />
                </div>
              </div>
            </div>

          </div>

          <div class="acciones">
            <button type="button" class="btn btn-borde" @click="irAtras">Cancelar</button>
            <button type="submit" class="btn btn-primario">Guardar Cambios</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '../../assets/base.css';

:root {
  --content-bg: #e6f0fa;
  --azul-textos: #2b7de9;
  --gris-azul: #c2d6ea;
  --text-color: #0f2d52;
}

.contenedor-agregar-cancion {
  min-height: 100vh;
  background-color: var(--content-bg);
  color: var(--text-color);
  padding: 2rem;
  font-family: 'Nunito', sans-serif;
}

.contenido { max-width: 1200px; margin: 0 auto; }

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

.fila-input { 
    display: flex; 
    gap: 1rem; 
}

.fila-input > .grupo-input { 
    flex: 1; 
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
}

.selector { 
    cursor: pointer; 
}

.area-texto { 
    resize: vertical; 
    min-height: 120px; 
}

.previsualizacion img { 
    width: 100%; 
    height: 250px; 
    object-fit: cover; 
    border-radius: 8px; 
    border: 1px solid var(--azul-textos); 
}

.acciones { 
    display: flex; 
    justify-content: flex-end; 
    gap: 1rem; padding-top: 1.5rem; 
    border-top: 1px dashed var(--azul-textos); 
}

.btn { 
    padding: 0.75rem 1.5rem; 
    border-radius: 8px; 
    font-weight: 600; 
    cursor: pointer; 
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

@media (max-width: 600px) {
  .contenedor-agregar-cancion { padding: 1rem; }
  .contenedor-formulario { padding: 1.5rem; }
  .fila-input { flex-direction: column; }
  .acciones { flex-direction: column-reverse; }
  .btn { width: 100%; }
}
</style>