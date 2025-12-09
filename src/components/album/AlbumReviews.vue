<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore' 
import { useRouter } from 'vue-router'

const props = defineProps({
  reviews: { type: Array, default: () => [] }
})

const emit = defineEmits(['agregar-review', 'eliminar-review', 'editar-review'])

const authStore = useAuthStore() 
const router = useRouter()

// Variables CREAR
const nuevaResena = ref('')
const calificacion = ref(5)

// Variables EDITAR
const idEditando = ref(null)
const textoEditando = ref('')
const calificacionEditando = ref(5) 

const enviarResena = () => {
  if (!nuevaResena.value.trim()) return
  emit('agregar-review', { texto: nuevaResena.value, puntos: calificacion.value })
  nuevaResena.value = ''
  calificacion.value = 5
}

const iniciarEdicion = (review) => {
  idEditando.value = review.id
  textoEditando.value = review.contenido
  calificacionEditando.value = review.calificacion 
}

const cancelarEdicion = () => {
  idEditando.value = null
  textoEditando.value = ''
  calificacionEditando.value = 5
}

const guardarEdicion = () => {
  if (!textoEditando.value.trim()) return

  emit('editar-review', {
    id: idEditando.value,
    texto: textoEditando.value,
    puntos: calificacionEditando.value
  })
  
  idEditando.value = null
}

const irALogin = () => router.push('/login')
</script>

<template>
  <div class="reviews-section">
    <h3>Reseñas de la Comunidad</h3>

    <div v-if="authStore.estaLogeado" class="form-review">
      <div class="usuario-actual">
        <span>Opinando como: <strong>{{ authStore.nombreUsuario }}</strong></span>
      </div>
      <textarea v-model="nuevaResena" placeholder="Escribe tu opinión..."></textarea>
      <div class="acciones">
        <select v-model="calificacion">
          <option v-for="n in 5" :key="n" :value="n">{{ n }} Estrellas</option>
        </select>
        <button @click="enviarResena" class="btn-enviar">Publicar</button>
      </div>
    </div>

    <div v-else class="invitado-box">
      <p>Inicia sesión para compartir tu opinión sobre este álbum.</p>
      <button @click="irALogin" class="btn-outline">Iniciar Sesión</button>
    </div>

    <div v-if="reviews.length > 0" class="lista-reviews">
      <div v-for="rev in reviews" :key="rev.id" class="review-card">
        
        <div class="review-header">
          <div class="autor-info">
            <img :src="rev.autor?.fotoUrl || 'https://placehold.co/40'" class="avatar" />
            <div>
              <span class="autor-nombre">{{ rev.autor?.nombre || 'Anónimo' }}</span>
              <span class="fecha">{{ rev.fechaCreacion }}</span>
            </div>
          </div>
          
          <div class="meta-right">
            <span v-if="idEditando !== rev.id" class="stars">★ {{ rev.calificacion }}/5</span>
            
            <div v-if="rev.esMia && idEditando !== rev.id" class="botones-dueno">
              <button @click="iniciarEdicion(rev)" class="btn-icon">✏️</button>
              <button @click="$emit('eliminar-review', rev.id)" class="btn-icon danger">🗑️</button>
            </div>
          </div>
        </div>

        <p v-if="idEditando !== rev.id" class="contenido">{{ rev.contenido }}</p>

        <div v-else class="modo-edicion">
          <textarea v-model="textoEditando" class="input-editar"></textarea>
          
          <div class="controles-edicion">
            <select v-model="calificacionEditando" class="select-editar">
              <option v-for="n in 5" :key="n" :value="n">{{ n }} Estrellas</option>
            </select>

            <div class="btns-edicion">
              <button @click="cancelarEdicion" class="btn-mini">Cancelar</button>
              <button @click="guardarEdicion" class="btn-mini primary">Guardar</button>
            </div>
          </div>
        </div>

      </div>
    </div>

    <p v-else class="vacio">No hay reseñas aún.</p>
  </div>
</template>

<style scoped>
.reviews-section { background: white; padding: 1.5rem; border-radius: 12px; margin-top: 2rem; }

.invitado-box {
  background-color: #f8f9fa;
  padding: 1.5rem;
  text-align: center;
  border-radius: 8px;
  border: 1px dashed #ccc;
  margin-bottom: 2rem;
}
.btn-outline {
  background: transparent; border: 1px solid var(--azul-textos); color: var(--azul-textos);
  padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: bold; margin-top: 10px;
}

/* Formulario */
.usuario-actual { margin-bottom: 10px; font-size: 0.9rem; color: #666; }
.form-review textarea { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px; resize: vertical; min-height: 80px;}
.acciones { display: flex; justify-content: flex-end; gap: 10px; margin-top: 10px; margin-bottom: 2rem; }
.btn-enviar { background: var(--azul-textos); color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; }

/* Tarjetas */
.review-card { border-bottom: 1px solid #eee; padding: 15px 0; }
.review-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; }
.autor-info { display: flex; gap: 10px; align-items: center; }
.avatar { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; }
.autor-nombre { font-weight: bold; font-size: 0.9rem; color: #0f2d52; display: block;}
.fecha { font-size: 0.8rem; color: #999; }
.meta-right { display: flex; align-items: center; gap: 15px; }
.stars { color: #f39c12; font-weight: bold; }

.botones-dueno { display: flex; gap: 5px; }
.btn-icon { background: none; border: none; cursor: pointer; font-size: 1rem; opacity: 0.6; transition: 0.2s; }
.btn-icon:hover { opacity: 1; transform: scale(1.1); }
.btn-icon.danger:hover { filter: hue-rotate(140deg); }

.contenido { color: #444; line-height: 1.5; }
.vacio { text-align: center; color: #888; font-style: italic; margin-top: 20px; }

.input-editar {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--azul-textos);
  border-radius: 8px;
  margin-bottom: 10px;
  background-color: #f0f7ff;
}

.controles-edicion {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.select-editar {
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.btns-edicion {
  display: flex;
  gap: 10px;
}

.btn-mini { padding: 6px 12px; font-size: 0.85rem; border-radius: 4px; border: 1px solid #ccc; background: white; cursor: pointer; }
.btn-mini.primary { background: var(--azul-textos); color: white; border: none; }
</style>