<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useArtistasStore } from '@/stores/artistas'

const router = useRouter()
const route = useRoute()
const referenciaInput = ref(null)
const artistasStore = useArtistasStore()

const formulario = ref({
  nombre: '',
  fecha_inicio: '',
  fecha_fin: '',
  nacimiento: '',
  bibliografia: '',
  foto_url: ''
})

onMounted(() => {
  // Buscar el artista por id en la lista del store
  const artistaId = route.params.id
  const artista = artistasStore.listaArtistas.find(a => a.id === artistaId)
  if (artista) {
    formulario.value = {
      nombre: artista.nombre || '',
      fecha_inicio: artista.fecha_inicio || '',
      fecha_fin: artista.fecha_fin || '',
      nacimiento: artista.nacimiento || '',
      bibliografia: artista.bibliografia || '',
      foto_url: artista.foto_url || ''
    }
  }
})

const irAInicio = () => {
  router.push('/')
}

const seleccionarImagen = () => {
  referenciaInput.value.click()
}

const alCambiarArchivo = (evento) => {
  const archivo = evento.target.files[0]
  if (archivo) {
    archivoImagen.value = archivo
    previsualizacionImagen.value = URL.createObjectURL(archivo)
  }
}

const limpiarFormulario = () => {
  formulario.value = {
    nombre: '',
    fecha_inicio: '',
    fecha_fin: '',
    nacimiento: '',
    bibliografia: '',
    foto_url: ''
  }
}

const guardarArtista = () => {
  const artistaId = route.params.id
  const artistaPayload = {
    nombre: formulario.value.nombre,
    fecha_inicio: formulario.value.fecha_inicio ? parseInt(formulario.value.fecha_inicio) : null,
    fecha_fin: formulario.value.fecha_fin ? parseInt(formulario.value.fecha_fin) : null,
    nacimiento: formulario.value.nacimiento || null,
    bibliografia: formulario.value.bibliografia,
    foto_url: formulario.value.foto_url
  }
  artistasStore.actualizarArtista(artistaId, artistaPayload)
    .then(() => {
      alert('Artista actualizado correctamente')
      router.push('/artistas')
    })
    .catch((error) => {
      alert('Error al actualizar el artista')
      console.error(error)
    })
}
</script>

<template>
  <div class="contenedor-agregar-artista">
    <header class="encabezado">
      </header>

    <div class="contenido">
      <div class="contenedor-formulario">
        <div class="barra-superior">
          <button class="boton-texto" @click="irAInicio">← Regresar</button>
        </div>

        <div class="seccion-titulo">
          <h1 class="titulo">Editar Artista</h1>
          <p class="subtitulo">Modifica la información del artista seleccionado</p>
        </div>

        <form class="formulario" @submit.prevent="guardarArtista">
          <div class="cuadricula-formulario">
            <div class="seccion-datos">
              <div class="grupo-input">
                <label class="etiqueta">Nombre Artístico</label>
                <input
                  v-model="formulario.nombre"
                  type="text"
                  required
                  class="entrada"
                  placeholder="Ej: Luis Miguel, The Beatles..."
                />
              </div>

              <div class="fila-input">
                <div class="grupo-input">
                  <label class="etiqueta">Fecha Inicio / Formación</label>
                  <input
                    v-model="formulario.fecha_inicio"
                    type="number"
                    min="1900"
                    max="2100"
                    required
                    class="entrada"
                    placeholder="Año de inicio"
                  />
                </div>

                <div class="grupo-input">
                  <label class="etiqueta">Fecha Fin (Opcional)</label>
                  <input
                    v-model="formulario.fecha_fin"
                    type="number"
                    min="1900"
                    max="2100"
                    class="entrada"
                    placeholder="Año de fin (opcional)"
                  />
                  <span class="pista">Deja vacío si sigue activo</span>
                </div>
              </div>

              <div class="grupo-input">
                <label class="etiqueta">Fecha de Nacimiento (Solo solistas)</label>
                <input
                  v-model="formulario.nacimiento"
                  type="date"
                  class="entrada"
                />
              </div>

              <div class="grupo-input">
                <label class="etiqueta">Biografía</label>
                <textarea
                  v-model="formulario.bibliografia"
                  rows="6"
                  required
                  class="entrada area-texto"
                  placeholder="Escribe la historia, origen y datos relevantes del artista..."
                ></textarea>
              </div>
            </div>

            <div class="seccion-imagen">
              <div class="grupo-input">
                <label class="etiqueta">URL de la Foto del Artista</label>
                <input
                  v-model="formulario.foto_url"
                  type="url"
                  class="entrada"
                  placeholder="Pega aquí la URL de la imagen desde imgbb.com"
                  required
                />
                <span class="pista">Ejemplo: https://i.ibb.co/xxxxxx/imagen.jpg</span>
                <div v-if="formulario.foto_url" class="previsualizacion" style="margin-top:1rem;">
                  <img :src="formulario.foto_url" alt="Preview" />
                </div>
              </div>
            </div>
          </div>

          <div class="acciones">
            <button type="button" class="btn btn-secundario" @click="limpiarFormulario">
              Limpiar
            </button>
            <button type="button" class="btn btn-borde" @click="irAInicio">
              Cancelar
            </button>
            <button type="submit" class="btn btn-primario">
              Guardar Cambios →
            </button>
          </div>
        </form>
      </div>
    </div>
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

@font-face {
  font-family: Nunito;
  src: url('https://sadhost.neocities.org/fonts/Nunito-Regular.ttf');
}
@font-face {
  font-family: Nunito;
  src: url('https://sadhost.neocities.org/fonts/Nunito-Bold.ttf');
  font-weight: bold;
}

.contenedor-agregar-artista {
  min-height: 100vh;
  background-color: var(--content-bg);
  color: var(--text-color);
  padding: 2rem;
  font-family: 'Nunito', sans-serif;
  background-image: var(--body-bg-image);
}

.contenido {
  max-width: 900px;
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
  transition: all 0.2s;
}

.entrada:focus {
  outline: none;
  border-color: #2b7de9;
  box-shadow: 0 0 0 3px rgba(43, 125, 233, 0.15);
}

.entrada::placeholder {
  color: #5c6b7f;
}

.area-texto {
  resize: vertical;
  min-height: 120px;
}

.pista {
  font-size: 0.75rem;
  color: #5c6b7f;
  margin-top: 0.3rem;
}

.area-subida-imagen {
  border: 2px dashed var(--azul-textos);
  border-radius: 12px;
  min-height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #e6f0fa;
  transition: all 0.3s;
  overflow: hidden;
  position: relative;
}

.area-subida-imagen:hover {
  border-color: #345d91;
  background-color: #c2d6ea;
}

.marcador-posicion {
  text-align: center;
  color: #0f2d52;
}

.texto-subida {
  font-weight: 600;
  margin-top: 1rem;
}

.pista-subida {
  font-size: 0.8rem;
  color: #5c6b7f;
}

.previsualizacion {
  width: 100%;
  height: 100%;
  position: relative;
}

.previsualizacion img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  display: block;
  border-radius: 8px;
  border: 1px solid var(--azul-textos);
}

.capa-superpuesta {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(43, 125, 233, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.2s;
}

.area-subida-imagen:hover .capa-superpuesta {
  opacity: 1;
}

.capa-superpuesta span {
  color: var(--azul-textos);
  font-weight: 600;
  border: 1px solid var(--azul-textos);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background: #e6f0fa;
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
.btn-primario:hover {
  background-color: #345d91;
  transform: translateY(-1px);
}

.btn-secundario {
  background-color: transparent;
  color: var(--azul-textos);
}
.btn-secundario:hover {
  color: #345d91;
  text-decoration: underline;
}

.btn-borde {
  background-color: transparent;
  border: 1px solid var(--azul-textos);
  color: var(--text-color);
}
.btn-borde:hover {
  border-color: #345d91;
  background-color: #e6f0fa;
}

.boton-texto {
  background: none;
  border: none;
  color: var(--azul-textos);
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0;
}
.boton-texto:hover {
  color: #345d91;
}

@media (max-width: 600px) {
  .contenedor-agregar-artista { padding: 1rem; }
  .contenedor-formulario { padding: 1.5rem; }
  .fila-input { flex-direction: column; }
  .acciones { flex-direction: column-reverse; }
  .btn { width: 100%; }
}
</style>
