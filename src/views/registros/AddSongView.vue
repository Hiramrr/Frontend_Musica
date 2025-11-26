<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const fileInput = ref(null)
// datos simulados de Álbumes
const listaAlbums = ref([
  { id: 1, nombre: 'Romance - Luis Miguel' },
  { id: 2, nombre: 'Aries - Luis Miguel' },
  { id: 3, nombre: 'Recuerdos, Vol. II - Juan Gabriel' },
  { id: 4, nombre: 'Dawn FM - The Weeknd' },
  { id: 0, nombre: '-- Es un Single (Sin álbum) --' }
])

const form = ref({
  nombre: '',
  album_id: '',
  anio_salida: '',
  duracion: '',
  artista_colaborador: '',
  descripcion: ''
})

// con estas variables vemos el estado de la imagen
const imagenPreview = ref(null)
const imagenArchivo = ref(null)

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

// accion para limpiar campos
const limpiarCampos = () => {
  form.value = { 
    nombre: '', 
    album_id: '', 
    anio_salida: '',
    duracion: '', 
    artista_colaborador: '', 
    descripcion: '' 
  }
  imagenPreview.value = null
  imagenArchivo.value = null
  if (fileInput.value) fileInput.value.value = ''
}

const registrarCancion = () => {
  console.log("Registrando Canción:", { ...form.value, portada: imagenArchivo.value })
  alert("Canción registrada correctamente (Simulación)")
  router.push('/')
}
</script>

<template>
  <div class="agregar-song-container">
    <div class="content">
      <div class="form-wrapper">
        
        <div class="top-bar">
          <button class="btn btn-outline-sm" @click="goToPanel">← Regresar</button>
        </div>

        <div class="title-section">
          <h1 class="title">Agregar Canción</h1>
          <p class="subtitle">Añade un nuevo track o sencillo a la base de datos musical</p>
        </div>

        <form class="form" @submit.prevent="registrarCancion">
          <div class="form-grid">
            
            <div class="form-section">
              
              <div class="input-group">
                <label class="label">Nombre de la Canción</label>
                <input
                  v-model="form.nombre"
                  type="text"
                  required
                  class="input"
                  placeholder="Ej: La Incondicional, Blinding Lights..."
                />
              </div>

              <div class="input-group">
                <label class="label">Pertenece al Álbum</label>
                <select v-model="form.album_id" required class="input select">
                  <option value="" disabled>Selecciona un álbum</option>
                  <option v-for="album in listaAlbums" :key="album.id" :value="album.id">
                    {{ album.nombre }}
                  </option>
                </select>
                <span class="hint">Si es un sencillo, selecciona la opción de Single</span>
              </div>

              <div class="input-row">
                <div class="input-group">
                  <label class="label">Año de Salida</label>
                  <input
                    v-model="form.anio_salida"
                    type="number"
                    min="1900"
                    max="2099"
                    required
                    class="input"
                    placeholder="Ej: 2020"
                  />
                </div>

                <div class="input-group">
                  <label class="label">Duración</label>
                  <input
                    v-model="form.duracion"
                    type="text"
                    required
                    class="input"
                    placeholder="Ej: 03:45"
                  />
                </div>

                <div class="input-group">
                  <label class="label">Artista o artistas (colaboración) </label>
                  <input
                    v-model="form.artista_colaborador"
                    type="text"
                    class="input"
                    placeholder="Ej: Daft Punk (Opcional)"
                  />
                </div>
              </div>

              <div class="input-group">
                <label class="label">Detalles / Compositores</label>
                <textarea
                  v-model="form.descripcion"
                  rows="4"
                  class="input textarea"
                  placeholder="Información adicional sobre la composición, letra o producción..."
                ></textarea>
              </div>
            </div>

            <div class="form-section image-section">
              <div class="input-group">
                <label class="label">Portada del Sencillo</label>
                
                <div 
                  class="image-upload-area" 
                  :class="{ 'has-image': imagenPreview }"
                  @click="triggerFileInput"
                >
                  <div v-if="imagenPreview" class="image-preview">
                    <img :src="imagenPreview" alt="Portada Preview" />
                    <div class="image-overlay">
                      <span>Cambiar imagen</span>
                    </div>
                  </div>

                  <div v-else class="image-placeholder">
                    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:0 auto;">
                      <circle cx="36" cy="36" r="34" fill="#1c2e52" stroke="#648bc4" stroke-width="2"/>
                      <path d="M48 24V44.5C48 47.5376 45.5376 50 42.5 50C39.4624 50 37 47.5376 37 44.5C37 41.4624 39.4624 39 42.5 39C43.3284 39 44.1046 39.1679 44.7857 39.4643V24H48Z" fill="#648bc4"/>
                      <ellipse cx="29" cy="52" rx="5" ry="5" fill="#648bc4"/>
                      <rect x="27.5" y="22" width="3" height="25" rx="1.5" fill="#648bc4"/>
                    </svg>
                    <p class="upload-text">Subir Portada</p>
                    <p class="upload-hint">Solo si es distinta a la del álbum</p>
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
              Guardar Canción →
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.agregar-song-container {
  min-height: 100vh;
  background-color: #0b152b;
  color: #fff;
  padding: 2rem;
  font-family: 'Inter', sans-serif;
}

.content {
  max-width: 1200px;
  margin: 0 auto;
}

.form-wrapper {
  background-color: #12203e;
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  border: 1px solid #1c2e52;
}

.top-bar { margin-bottom: 1.5rem; }

.title-section {
  margin-bottom: 2.5rem;
  border-bottom: 1px solid #1c2e52;
  padding-bottom: 1.5rem;
}

.title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.5rem;
}

.subtitle { color: #8fa3bf; font-size: 0.95rem; }

/* Grid */
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

/* Inputs */
.input-group {
  margin-bottom: 1.25rem;
  display: flex;
  flex-direction: column;
}

.input-row {
  display: flex;
  gap: 1rem;
}
.input-row > .input-group { flex: 1; }

.label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #a4c2f4;
  margin-bottom: 0.5rem;
}

.input {
  background-color: #1c2e52;
  border: 1px solid #2c3e50;
  border-radius: 8px;
  padding: 0.8rem 1rem;
  color: white;
  font-size: 0.95rem;
  transition: all 0.2s;
}

.input:focus {
  outline: none;
  border-color: #648bc4;
  box-shadow: 0 0 0 3px rgba(100, 139, 196, 0.15);
}

.input::placeholder { color: #5c6b7f; }

.select {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;
  cursor: pointer;
}

.textarea { resize: vertical; min-height: 120px; }

.hint {
  font-size: 0.75rem;
  color: #5c6b7f;
  margin-top: 0.3rem;
}

/* Imagen */
.image-upload-area {
  border: 2px dashed #2c3e50;
  border-radius: 12px;
  min-height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #162645;
  transition: all 0.3s;
  overflow: hidden;
  position: relative;
}

.image-upload-area:hover {
  border-color: #648bc4;
  background-color: #1c2e52;
}

.image-placeholder { text-align: center; color: #8fa3bf; }
.upload-text { font-weight: 600; margin-top: 1rem; }
.upload-hint { font-size: 0.8rem; color: #5c6b7f; }

.image-preview { width: 100%; height: 100%; position: relative; }
.image-preview img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  display: block;
}

.image-overlay {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex; justify-content: center; align-items: center;
  opacity: 0; transition: opacity 0.2s;
}
.image-upload-area:hover .image-overlay { opacity: 1; }
.image-overlay span {
  color: white; font-weight: 600; border: 1px solid white;
  padding: 0.5rem 1rem; border-radius: 4px;
}

/* Botones */
.actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid #1c2e52;
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
  background-color: hsla(160, 100%, 37%, 1);
  color: white;
}
.btn-primary:hover {
  background-color: hsla(160, 100%, 32%, 1);
  transform: translateY(-1px);
}

.btn-secondary { background-color: transparent; color: #8fa3bf; }
.btn-secondary:hover { color: white; text-decoration: underline; }

.btn-outline {
  background-color: transparent; border: 1px solid #2c3e50; color: #e0e0e0;
}
.btn-outline:hover {
  border-color: #8fa3bf; background-color: rgba(255,255,255,0.05);
}

.btn-outline-sm {
  background: none; border: none; color: #8fa3bf;
  cursor: pointer; font-size: 0.9rem; padding: 0;
}
.btn-outline-sm:hover { color: white; }

@media (max-width: 600px) {
  .agregar-song-container { padding: 1rem; }
  .form-wrapper { padding: 1.5rem; }
  .input-row { flex-direction: column; }
  .actions { flex-direction: column-reverse; }
  .btn { width: 100%; }
}
</style>