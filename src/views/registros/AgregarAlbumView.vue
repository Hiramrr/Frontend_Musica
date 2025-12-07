<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const referenciaInput = ref(null)

const listaArtistas = ref([
  { id: 1, nombre: 'Luis Miguel' },
  { id: 2, nombre: 'Juan Gabriel' },
  { id: 3, nombre: 'José José' },
  { id: 4, nombre: 'The Weeknd' }
])

const formulario = ref({
  titulo: '',
  artista_id: '',
  anio_salida: '',
  duracion: '',
  total_canciones: '',
  descripcion: '',
  portada_url: '' // Nuevo campo para la URL de la portada
})



const irAInicio = () => router.push('/')

const seleccionarImagen = () => referenciaInput.value.click()

const alCambiarArchivo = (evento) => {
  const archivo = evento.target.files[0]
  if (archivo) {
    archivoImagen.value = archivo
    previsualizacionImagen.value = URL.createObjectURL(archivo)
  }
}

const limpiarFormulario = () => {
  formulario.value = { 
    titulo: '', 
    artista_id: '', 
    anio_salida: '', 
    duracion: '', 
    total_canciones: '', 
    descripcion: '',
    portada_url: ''
  }
}

const guardarAlbum = () => {
  console.log("Registrando Álbum:", { ...formulario.value })
  alert("Álbum registrado correctamente (Simulación)")
  router.push('/')
}
</script>

<template>
  <div class="contenedor-agregar-album">
    <div class="contenido">
      <div class="contenedor-formulario">
        
        <div class="barra-superior">
          <button class="boton-texto" @click="irAInicio">← Regresar</button>
        </div>

        <div class="seccion-titulo">
          <h1 class="titulo">Agregar Álbum</h1>
          <p class="subtitulo">Registra un nuevo lanzamiento discográfico en la plataforma</p>
        </div>

        <form class="formulario" @submit.prevent="guardarAlbum">
          <div class="cuadricula-formulario">
            
            <div class="seccion-datos">
              
              <div class="grupo-input">
                <label class="etiqueta">Título del Álbum</label>
                <input
                  v-model="formulario.titulo"
                  type="text"
                  required
                  class="entrada"
                  placeholder="Ej: Romance, Aries, After Hours..."
                />
              </div>

              <div class="grupo-input">
                <label class="etiqueta">Artista o artistas (colaboración)</label>
                <select v-model="formulario.artista_id" required class="entrada selector">
                  <option value="" disabled>Selecciona un artista</option>
                  <option v-for="artista in listaArtistas" :key="artista.id" :value="artista.id">
                    {{ artista.nombre }}
                  </option>
                </select>
              </div>

              <div class="fila-input">
                <div class="grupo-input">
                  <label class="etiqueta">Año de Lanzamiento</label>
                  <input
                    v-model="formulario.anio_salida"
                    type="number"
                    min="1900"
                    max="2099"
                    required
                    class="entrada"
                    placeholder="Ej: 1991"
                  />
                </div>

                <div class="grupo-input">
                  <label class="etiqueta">Duración Total</label>
                  <input
                    v-model="formulario.duracion"
                    type="text"
                    class="entrada"
                    placeholder="Ej: 45:30 min"
                  />
                </div>

                <div class="grupo-input">
                  <label class="etiqueta">Total de Canciones</label>
                  <input
                    v-model="formulario.total_canciones"
                    type="number"
                    min="1"
                    required
                    class="entrada"
                    placeholder="Ej: 10"
                  />
                </div>
              </div>

              <div class="grupo-input">
                <label class="etiqueta">Descripción / Reseña Corta</label>
                <textarea
                  v-model="formulario.descripcion"
                  rows="5"
                  class="entrada area-texto"
                  placeholder="Detalles sobre la producción, estilo musical o contexto del álbum..."
                ></textarea>
              </div>
            </div>

            <div class="seccion-imagen">
              <div class="grupo-input">
                <label class="etiqueta">URL de la Portada del Álbum</label>
                <input
                  v-model="formulario.portada_url"
                  type="url"
                  class="entrada"
                  placeholder="Pega aquí la URL de la portada desde imgbb.com"
                  required
                />
                <span class="pista">Ejemplo: https://i.ibb.co/xxxxxx/portada.jpg</span>
                <div v-if="formulario.portada_url" class="previsualizacion" style="margin-top:1rem;">
                  <img :src="formulario.portada_url" alt="Portada Preview" />
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
              Guardar Álbum →
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

.contenedor-agregar-album {
  min-height: 100vh;
  background-color: var(--content-bg);
  color: var(--text-color);
  padding: 2rem;
  font-family: 'Nunito', sans-serif;
  background-image: var(--body-bg-image);
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

.selector {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%232b7de9' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;
  cursor: pointer;
  color: var(--text-color);
}

.area-texto {
  resize: vertical;
  min-height: 120px;
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
  .contenedor-agregar-album { padding: 1rem; }
  .contenedor-formulario { padding: 1.5rem; }
  .fila-input { flex-direction: column; }
  .acciones { flex-direction: column-reverse; }
  .btn { width: 100%; }
}
</style>