<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Referencias a elementos del DOM
const fileInput = ref(null)

// Estado del formulario
const form = ref({
  nombre: '',
  fecha_inicio: '',
  fecha_fin: '',
  fecha_nacimiento: '',
  bibliografia: ''
})

// Estado para la imagen
const imagenPreview = ref(null)
const imagenArchivo = ref(null)

// Métodos de navegación
const goToPanel = () => {
  router.push('/')
}

// Métodos para manejo de Imagen
const triggerFileInput = () => {
  fileInput.value.click()
}

const onFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    imagenArchivo.value = file
    // Crear URL temporal para previsualizar
    imagenPreview.value = URL.createObjectURL(file)
  }
}

// Métodos del formulario
const limpiarCampos = () => {
  form.value = {
    nombre: '',
    fecha_inicio: '',
    fecha_fin: '',
    fecha_nacimiento: '',
    bibliografia: ''
  }
  imagenPreview.value = null
  imagenArchivo.value = null
  if (fileInput.value) fileInput.value.value = ''
}

const registrarArtista = () => {
  // Aquí iría la lógica para enviar 'form' e 'imagenArchivo' a tu backend/Cloudinary
  console.log("Registrando Artista:", { ...form.value, imagen: imagenArchivo.value })
  alert("Artista registrado correctamente (Simulación)")
  router.push('/')
}
</script>

<template>
  <div class="vender-container">
    <header class="header">
      </header>

    <div class="content">
      <div class="form-wrapper">
        
        <div class="top-bar">
          <button class="btn btn-outline-sm" @click="goToPanel">← Regresar</button>
        </div>

        <div class="title-section">
          <h1 class="title">Agregar Artista</h1>
          <p class="subtitle">Completa la información para añadir un nuevo solista o banda a la base de datos</p>
        </div>

        <form class="form" @submit.prevent="registrarArtista">
          <div class="form-grid">
            
            <div class="form-section">
              
              <div class="input-group">
                <label class="label">Nombre Artístico</label>
                <input
                  v-model="form.nombre"
                  type="text"
                  required
                  class="input"
                  placeholder="Ej: Luis Miguel, The Beatles..."
                />
              </div>

              <div class="input-row">
                <div class="input-group">
                  <label class="label">Fecha Inicio / Formación</label>
                  <input
                    v-model="form.fecha_inicio"
                    type="date"
                    required
                    class="input"
                  />
                </div>

                <div class="input-group">
                  <label class="label">Fecha Fin (Opcional)</label>
                  <input
                    v-model="form.fecha_fin"
                    type="date"
                    class="input"
                  />
                  <span class="hint">Deja vacío si sigue activo</span>
                </div>
              </div>

              <div class="input-group">
                <label class="label">Fecha de Nacimiento (Solo solistas)</label>
                <input
                  v-model="form.fecha_nacimiento"
                  type="date"
                  class="input"
                />
              </div>

              <div class="input-group">
                <label class="label">Biografía</label>
                <textarea
                  v-model="form.bibliografia"
                  rows="6"
                  required
                  class="input textarea"
                  placeholder="Escribe la historia, origen y datos relevantes del artista..."
                ></textarea>
              </div>
            </div>

            <div class="form-section image-section">
              <div class="input-group">
                <label class="label">Foto del Artista</label>
                
                <div 
                  class="image-upload-area" 
                  :class="{ 'has-image': imagenPreview }"
                  @click="triggerFileInput"
                >
                  
                  <div v-if="imagenPreview" class="image-preview">
                    <img :src="imagenPreview" alt="Preview" />
                    <div class="image-overlay">
                      <span>Cambiar imagen</span>
                    </div>
                  </div>

                  <div v-else class="image-placeholder">
                    <svg width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                    <p class="upload-text">Haz clic para subir foto</p>
                    <p class="upload-hint">JPG, PNG (Max 10MB)</p>
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
              Registrar Artista →
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Contenedor Principal */
.vender-container {
  min-height: 100vh;
  background-color: #0b152b; /* Fondo principal oscuro */
  color: #fff;
  padding: 2rem;
  font-family: 'Inter', sans-serif;
}

.content {
  max-width: 1200px;
  margin: 0 auto;
}

/* Tarjeta del Formulario */
.form-wrapper {
  background-color: #12203e; /* Fondo tarjeta */
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  border: 1px solid #1c2e52;
}

.top-bar {
  margin-bottom: 1.5rem;
}

/* Títulos */
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

.subtitle {
  color: #8fa3bf;
  font-size: 0.95rem;
}

/* Grid del Formulario */
.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

@media (min-width: 768px) {
  .form-grid {
    grid-template-columns: 2fr 1fr; /* 2 partes info, 1 parte imagen */
  }
}

/* Inputs y Labels */
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

.input::placeholder {
  color: #5c6b7f;
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

/* Área de Imagen (Upload) */
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

.image-placeholder {
  text-align: center;
  color: #8fa3bf;
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
  height: 250px; /* Altura fija para la caja */
  object-fit: cover;
  display: block;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
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
  color: white;
  font-weight: 600;
  border: 1px solid white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
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
  background-color: hsla(160, 100%, 37%, 1); /* Tu color verde/teal principal */
  color: white;
}
.btn-primary:hover {
  background-color: hsla(160, 100%, 32%, 1);
  transform: translateY(-1px);
}

.btn-secondary {
  background-color: transparent;
  color: #8fa3bf;
}
.btn-secondary:hover {
  color: white;
  text-decoration: underline;
}

.btn-outline {
  background-color: transparent;
  border: 1px solid #2c3e50;
  color: #e0e0e0;
}
.btn-outline:hover {
  border-color: #8fa3bf;
  background-color: rgba(255,255,255,0.05);
}

.btn-outline-sm {
  background: none;
  border: none;
  color: #8fa3bf;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0;
}
.btn-outline-sm:hover {
  color: white;
}

/* Responsive */
@media (max-width: 600px) {
  .vender-container { padding: 1rem; }
  .form-wrapper { padding: 1.5rem; }
  .input-row { flex-direction: column; }
  .actions { flex-direction: column-reverse; }
  .btn { width: 100%; }
}
</style>