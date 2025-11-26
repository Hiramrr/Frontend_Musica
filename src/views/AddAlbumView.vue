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
  form.value = { titulo: '', artista_id: '', anio_salida: '', duracion: '', descripcion: '' }
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
                <label class="label">Artista Principal</label>
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
/* ==========================================
   ESTILOS REUTILIZADOS (Igual que ArtistView)
   ========================================== */

.agregar-album-container {
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

/* Grid Layout */
.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

@media (min-width: 768px) {
  .form-grid {
    grid-template-columns: 2fr 1fr; /* Info izquierda, Foto derecha */
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

/* Estilo específico para Select para que se vea igual a los inputs */
.select {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;
  cursor: pointer;
}

.textarea { resize: vertical; min-height: 120px; }

/* Image Upload Area */
.image-upload-area {
  border: 2px dashed #2c3e50;
  border-radius: 12px;
  min-height: 300px; /* Un poco más alto para portadas */
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
  height: 300px;
  object-fit: cover; /* o 'contain' si quieres ver toda la portada sin recortes */
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

/* Actions */
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

/* Responsive */
@media (max-width: 600px) {
  .agregar-album-container { padding: 1rem; }
  .form-wrapper { padding: 1.5rem; }
  .input-row { flex-direction: column; }
  .actions { flex-direction: column-reverse; }
  .btn { width: 100%; }
}
</style>