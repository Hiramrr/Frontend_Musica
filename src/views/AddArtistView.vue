<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Modelo de datos para el formulario
const form = ref({
  nombre: '',
  imagen: '',
  fecha_inicio: '',
  fecha_fin: '',
  fecha_nacimiento: '',
  bibliografia: ''
})

// Función simulada de guardado
const guardarArtista = () => {
  // Aquí conectarás con tu backend/base de datos
  console.log("Datos a enviar:", form.value)
  alert(`¡Artista "${form.value.nombre}" agregado con éxito!`)
  
  // Redirigir al home o limpiar formulario
  router.push('/') 
}

const cancelar = () => {
  router.go(-1) // Regresar a la página anterior
}
</script>

<template>
  <main class="contenedor-admin">
    <div class="tarjeta-formulario">
      
      <header class="encabezado-form">
        <h1 class="titulo-pagina">Nuevo Artista</h1>
        <p class="subtitulo">Ingresa los datos del solista o banda</p>
      </header>

      <form @submit.prevent="guardarArtista" class="formulario">
        
        <div class="seccion-inputs">
          <div class="grupo-input">
            <label for="nombre">Nombre Artístico</label>
            <input 
              id="nombre" 
              v-model="form.nombre" 
              type="text" 
              placeholder="Ej. Luis Miguel, Queen..." 
              required 
              class="input-oscuro"
            />
          </div>

          <div class="grupo-input">
            <label for="imagen">URL de la Foto (Perfil)</label>
            <input 
              id="imagen" 
              v-model="form.imagen" 
              type="url" 
              placeholder="https://ejemplo.com/foto.jpg" 
              class="input-oscuro"
            />
            <div v-if="form.imagen" class="preview-imagen">
              <img :src="form.imagen" alt="Vista previa" />
              <span>Vista previa</span>
            </div>
          </div>
        </div>

        <div class="fila-doble">
          <div class="grupo-input">
            <label>Fecha Inicio / Formación</label>
            <input 
              v-model="form.fecha_inicio" 
              type="date" 
              required 
              class="input-oscuro"
            />
          </div>
          
          <div class="grupo-input">
            <label>Fecha Fin (Opcional)</label>
            <input 
              v-model="form.fecha_fin" 
              type="date" 
              class="input-oscuro"
            />
            <span class="nota-input">Deja vacío si sigue activo</span>
          </div>
        </div>

         <div class="grupo-input">
            <label>Fecha de Nacimiento (Solo solistas)</label>
            <input 
              v-model="form.fecha_nacimiento" 
              type="date" 
              class="input-oscuro"
            />
          </div>

        <div class="grupo-input">
          <label for="bio">Biografía</label>
          <textarea 
            id="bio" 
            v-model="form.bibliografia" 
            rows="5" 
            placeholder="Escribe una breve historia del artista..."
            class="input-oscuro area-texto"
          ></textarea>
        </div>

        <div class="acciones">
          <button type="button" @click="cancelar" class="boton-cancelar">
            Cancelar
          </button>
          <button type="submit" class="boton-guardar">
            Guardar Artista
          </button>
        </div>

      </form>
    </div>
  </main>
</template>

<style scoped>
/* =========================================
   ESTILOS BASE (Coinciden con HomeView)
   ========================================= */

.contenedor-admin {
  background-color: #0b152b; /* Mismo fondo azul oscuro del Home */
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center; /* Centra la tarjeta verticalmente */
  padding: 2rem;
  font-family: 'Inter', sans-serif;
  color: #ffffff;
}

/* Tarjeta central flotante */
.tarjeta-formulario {
  background-color: #12203e; /* Fondo de tarjeta (igual que filas de álbum) */
  width: 100%;
  max-width: 600px;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  border: 1px solid #1c2e52;
}

/* =========================================
   TYPOGRAPHY
   ========================================= */

.encabezado-form {
  text-align: center;
  margin-bottom: 2rem;
}

.titulo-pagina {
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.5rem;
}

.subtitulo {
  color: #8fa3bf; /* Color de texto secundario del Home */
  font-size: 0.95rem;
}

/* =========================================
   INPUTS Y LABELS
   ========================================= */

.grupo-input {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
}

label {
  font-weight: 600;
  font-size: 0.9rem;
  color: #a4c2f4; /* Azul claro para etiquetas (destaca sobre oscuro) */
  margin-bottom: 0.5rem;
  display: block;
}

.input-oscuro {
  background-color: #1c2e52; /* Un tono más claro que el fondo de tarjeta */
  border: 1px solid #2c3e50;
  border-radius: 6px;
  padding: 0.9rem 1rem;
  font-size: 1rem;
  color: #ffffff;
  transition: all 0.3s ease;
  outline: none;
}

.input-oscuro:focus {
  border-color: #648bc4; /* Color de énfasis al escribir */
  background-color: #24345e;
  box-shadow: 0 0 0 3px rgba(100, 139, 196, 0.2);
}

.input-oscuro::placeholder {
  color: #5c6b7f;
}

.area-texto {
  resize: vertical; /* Permite estirar solo hacia abajo */
  line-height: 1.5;
}

.nota-input {
  font-size: 0.75rem;
  color: #5c6b7f;
  margin-top: 4px;
}

/* Grid para fechas */
.fila-doble {
  display: flex;
  gap: 1.5rem;
}

.fila-doble > div {
  flex: 1;
}

/* Preview de imagen */
.preview-imagen {
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.8rem;
  color: #8fa3bf;
}

.preview-imagen img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #a4c2f4;
}

/* =========================================
   BOTONES
   ========================================= */

.acciones {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.boton-guardar {
  flex: 2;
  background-color: #2c3e50; /* Base */
  background-image: linear-gradient(to right, #648bc4, #4a6fa5); /* Degradado sutil azul */
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.boton-guardar:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(100, 139, 196, 0.4);
}

.boton-cancelar {
  flex: 1;
  background-color: transparent;
  border: 1px solid #2c3e50;
  color: #8fa3bf;
  padding: 1rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.boton-cancelar:hover {
  border-color: #8fa3bf;
  color: #fff;
}

/* =========================================
   RESPONSIVE (Móvil)
   ========================================= */
@media (max-width: 600px) {
  .contenedor-admin {
    padding: 1rem;
  }
  
  .tarjeta-formulario {
    padding: 1.5rem;
  }
  
  .fila-doble {
    flex-direction: column;
    gap: 0;
  }
}
</style>