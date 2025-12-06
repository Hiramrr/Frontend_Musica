<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const fileInput = ref(null)

// Datos simulados de artistas (esto vendrá de tu BD luego)
const listaArtistas = ref([
  { id: 1, nombre: 'Luis Miguel' },
  { id: 2, nombre: 'Juan Gabriel' },
  { id: 3, nombre: 'José José' },
  { id: 4, nombre: 'The Weeknd' }
])

// Estado del formulario
const form = ref({
  titulo: '',
  artista_id: '',
  anio_salida: '',
  duracion: '',
  total_canciones: '',
  descripcion: ''
})

// Estado para la imagen
const imagenPreview = ref(null)
const imagenArchivo = ref(null)

// Navegación
const goToPanel = () => router.push('/')

// Manejo de Imagen
const triggerFileInput = () => fileInput.value.click()

const onFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    imagenArchivo.value = file
    imagenPreview.value = URL.createObjectURL(file)
  }
}

// Acciones del formulario
const limpiarCampos = () => {
  form.value = { titulo: '', artista_id: '', anio_salida: '', duracion: '', total_canciones: '', descripcion: '' }
  imagenPreview.value = null
  imagenArchivo.value = null
  if (fileInput.value) fileInput.value.value = ''
}

const registrarAlbum = () => {
  console.log("Registrando Álbum:", { ...form.value, portada: imagenArchivo.value })
  alert("Álbum registrado correctamente (Simulación)")
  router.push('/')
}
</script>

<template>
  <div class="agregar-album-container">
    <div class="content">
      <div class="form-wrapper">
        
        <div class="top-bar">
          <button class="btn btn-outline-sm" @click="goToPanel">← Regresar</button>
        </div>

        <div class="title-section">
          <h1 class="title">Agregar Álbum</h1>
          <p class="subtitle">Registra un nuevo lanzamiento discográfico en la plataforma</p>
        </div>

        <form class="form" @submit.prevent="registrarAlbum">
          <div class="form-grid">
            
            <div class="form-section">
              
              <div class="input-group">
                <label class="label">Título del Álbum</label>
                <input
                  v-model="form.titulo"
                  type="text"
                  required
                  class="input"
                  placeholder="Ej: Romance, Aries, After Hours..."
                />
              </div>

              <div class="input-group">
                <label class="label">Artista o artistas (colaboración) </label>
                <select v-model="form.artista_id" required class="input select">
                  <option value="" disabled>Selecciona un artista</option>
                  <option v-for="artista in listaArtistas" :key="artista.id" :value="artista.id">
                    {{ artista.nombre }}
                  </option>
                </select>
              </div>

              <div class="input-row">
                <div class="input-group">
                  <label class="label">Año de Lanzamiento</label>
                  <input
                    v-model="form.anio_salida"
                    type="number"
                    min="1900"
                    max="2099"
                    required
                    class="input"
                    placeholder="Ej: 1991"
                  />
                </div>

                <div class="input-group">
                  <label class="label">Duración Total</label>
                  <input
                    v-model="form.duracion"
                    type="text"
                    class="input"
                    placeholder="Ej: 45:30 min"
                  />
                </div>

                <div class="input-group">
                  <label class="label">Total de Canciones</label>
                  <input
                    v-model="form.total_canciones"
                    type="number"
                    min="1"
                    required
                    class="input"
                    placeholder="Ej: 10"
                  />
                </div>
              </div>

              <div class="input-group">
                <label class="label">Descripción / Reseña Corta</label>
                <textarea
                  v-model="form.descripcion"
                  rows="5"
                  class="input textarea"
                  placeholder="Detalles sobre la producción, estilo musical o contexto del álbum..."
                ></textarea>
              </div>
            </div>

            <div class="form-section image-section">
              <div class="input-group">
                <label class="label">Portada del Álbum</label>
                
                <div 
                  class="image-upload-area" 
                  :class="{ 'has-image': imagenPreview }"
                  @click="triggerFileInput"
                >
                  <div v-if="imagenPreview" class="image-preview">
                    <img :src="imagenPreview" alt="Portada Preview" />
                    <div class="image-overlay">
                      <span>Cambiar portada</span>
                    </div>
                  </div>

                  <div v-else class="image-placeholder">
                    <svg width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                    </svg>
                    <p class="upload-text">Subir Portada</p>
                    <p class="upload-hint">Cuadrada preferentemente (JPG, PNG)</p>
                  </div>
                </div>
                
                <input
                  ref="fileInput"
                  type="file"
                  @change="onFileChange"
                  accept="image/*"
                  style="display: none"
                />
              </div>
            </div>

          </div>

          <div class="actions">
            <button type="button" class="btn btn-secondary" @click="limpiarCampos">
              Limpiar
            </button>
            <button type="button" class="btn btn-outline" @click="goToPanel">
              Cancelar
            </button>
            <button type="submit" class="btn btn-primary">
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

.agregar-album-container {
  min-height: 100vh;
  background-color: var(--content-bg);
  color: var(--text-color);
  padding: 2rem;
  font-family: 'Nunito', sans-serif;
  background-image: var(--body-bg-image);
}

.content {
  max-width: 1200px;
  margin: 0 auto;
}

.form-wrapper {
  background-color: var(--gris-azul);
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--azul-textos);
}

.top-bar {
  margin-bottom: 1.5rem;
}

.title-section {
  margin-bottom: 2.5rem;
  border-bottom: 1px dashed var(--azul-textos);
  padding-bottom: 1.5rem;
}

.title {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--azul-textos);
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #0f2d52;
  font-size: 0.95rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

@media (min-width: 768px) {
  .form-grid {
    grid-template-columns: 2fr 1fr;
  }
}

/* Inputs & Labels */
.input-group {
  margin-bottom: 1.25rem;
  display: flex;
  flex-direction: column;
}

.input-row {
  display: flex;
  gap: 1rem;
}
.input-row > .input-group {
  flex: 1;
}

.label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--azul-textos);
  margin-bottom: 0.5rem;
}

.input {
  background-color: #e6f0fa;
  border: 1px solid var(--azul-textos);
  border-radius: 8px;
  padding: 0.8rem 1rem;
  color: var(--text-color);
  font-size: 0.95rem;
  transition: all 0.2s;
}

.input:focus {
  outline: none;
  border-color: #2b7de9;
  box-shadow: 0 0 0 3px rgba(43, 125, 233, 0.15);
}

.input::placeholder {
  color: #5c6b7f;
}

.select {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%232b7de9' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;
  cursor: pointer;
  color: var(--text-color);
}

.textarea {
  resize: vertical;
  min-height: 120px;
}

.hint {
  font-size: 0.75rem;
  color: #5c6b7f;
  margin-top: 0.3rem;
}

.image-upload-area {
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

.image-upload-area:hover {
  border-color: #345d91;
  background-color: #c2d6ea;
}

.image-placeholder {
  text-align: center;
  color: #0f2d52;
}

.upload-text {
  font-weight: 600;
  margin-top: 1rem;
}

.upload-hint {
  font-size: 0.8rem;
  color: #5c6b7f;
}

.image-preview {
  width: 100%;
  height: 100%;
  position: relative;
}

.image-preview img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  display: block;
  border-radius: 8px;
  border: 1px solid var(--azul-textos);
}

.image-overlay {
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

.image-upload-area:hover .image-overlay {
  opacity: 1;
}

.image-overlay span {
  color: var(--azul-textos);
  font-weight: 600;
  border: 1px solid var(--azul-textos);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background: #e6f0fa;
}

.actions {
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

.btn-primary {
  background-color: var(--azul-textos);
  color: white;
}
.btn-primary:hover {
  background-color: #345d91;
  transform: translateY(-1px);
}

.btn-secondary {
  background-color: transparent;
  color: var(--azul-textos);
}
.btn-secondary:hover {
  color: #345d91;
  text-decoration: underline;
}

.btn-outline {
  background-color: transparent;
  border: 1px solid var(--azul-textos);
  color: var(--text-color);
}
.btn-outline:hover {
  border-color: #345d91;
  background-color: #e6f0fa;
}

.btn-outline-sm {
  background: none;
  border: none;
  color: var(--azul-textos);
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0;
}
.btn-outline-sm:hover {
  color: #345d91;
}

/* Responsive */
@media (max-width: 600px) {
  .agregar-album-container { padding: 1rem; }
  .form-wrapper { padding: 1.5rem; }
  .input-row { flex-direction: column; }
  .actions { flex-direction: column-reverse; }
  .btn { width: 100%; }
}
</style>
