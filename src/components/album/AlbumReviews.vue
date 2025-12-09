<script setup>
import { ref } from 'vue'

const props = defineProps({
  reviews: { type: Array, default: () => [] }
})

const emit = defineEmits(['agregar-review', 'eliminar-review'])

const nuevaResena = ref('')
const calificacion = ref(5)

const enviarResena = () => {
  if (!nuevaResena.value.trim()) return
  
  emit('agregar-review', {
    texto: nuevaResena.value,
    puntos: calificacion.value
  })

  // Limpiamos el formulario
  nuevaResena.value = ''
  calificacion.value = 5
}
</script>

<template>
  <div class="reviews-section">
    <h3>Reseñas de la Comunidad</h3>

    <div class="form-review">
      <textarea v-model="nuevaResena" placeholder="¿Qué opinas de este álbum?"></textarea>
      <div class="acciones">
        <select v-model="calificacion">
          <option v-for="n in 5" :key="n" :value="n">{{ n }} Estrellas</option>
        </select>
        <button @click="enviarResena" class="btn-enviar">Publicar Reseña</button>
      </div>
    </div>

    <div v-if="reviews.length > 0" class="lista-reviews">
      <div v-for="rev in reviews" :key="rev.id" class="review-card">
        
        <div class="review-header">
          <div class="autor-info">
            <img 
              :src="rev.autor?.fotoUrl || 'https://placehold.co/40'" 
              alt="Avatar" 
              class="avatar"
            />
            <div>
              <span class="autor-nombre">{{ rev.autor?.nombre || 'Anónimo' }}</span>
              <span class="fecha">{{ rev.fechaCreacion }}</span>
            </div>
          </div>
          
          <div class="meta-right">
            <span class="stars">★ {{ rev.calificacion }}/5</span>
            <button 
              v-if="rev.esMia" 
              @click="$emit('eliminar-review', rev.id)" 
              class="btn-eliminar"
            >
              🗑️
            </button>
          </div>
        </div>

        <p class="contenido">{{ rev.contenido }}</p>
      </div>
    </div>

    <p v-else class="vacio">Sé el primero en opinar sobre este álbum.</p>
  </div>
</template>

<style scoped>
.reviews-section { background: white; padding: 1.5rem; border-radius: 12px; margin-top: 2rem; }
.form-review textarea { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px; resize: vertical; min-height: 80px;}
.acciones { display: flex; justify-content: flex-end; gap: 10px; margin-top: 10px; margin-bottom: 2rem; }
.btn-enviar { background: var(--azul-textos); color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; }

/* Tarjetas de reseña */
.review-card { border-bottom: 1px solid #eee; padding: 15px 0; }
.review-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; }

.autor-info { display: flex; gap: 10px; align-items: center; }
.avatar { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; }
.autor-nombre { font-weight: bold; display: block; font-size: 0.9rem; color: #0f2d52; }
.fecha { font-size: 0.8rem; color: #999; }

.meta-right { display: flex; align-items: center; gap: 10px; }
.stars { color: #f39c12; font-weight: bold; }
.btn-eliminar { background: none; border: none; cursor: pointer; opacity: 0.5; transition: opacity 0.2s; }
.btn-eliminar:hover { opacity: 1; }

.contenido { color: #444; line-height: 1.5; }
.vacio { text-align: center; color: #888; font-style: italic; margin-top: 20px; }
</style>