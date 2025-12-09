<script setup>
import { ref } from 'vue'

//Recibimos las reseñas existentes
const props = defineProps({
  reviews: { type: Array, default: () => [] }
})

//Avisamos a detallesAlbumView cuando se crea una nueva reseña
const emit = defineEmits(['agregar-review'])

const nuevaResena = ref('')
const calificacion = ref(5)

const enviarResena = () => {
  if (!nuevaResena.value) return
  
  // Emitimos el evento a detallesAlbumView con los datos
  emit('agregar-review', {
    texto: nuevaResena.value,
    puntos: calificacion.value,
    fecha: new Date().toLocaleDateString()
  })

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

    <div class="lista-reviews">
      <div v-for="(rev, i) in reviews" :key="i" class="review-card">
        <div class="review-header">
          <span class="stars">★ {{ rev.puntos }}/5</span>
          <span class="fecha">{{ rev.fecha }}</span>
        </div>
        <p>{{ rev.texto }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.reviews-section { background: white; padding: 1.5rem; border-radius: 12px; }
.form-review textarea { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 10px; resize: vertical; }
.acciones { display: flex; justify-content: space-between; margin-bottom: 2rem; }
.btn-enviar { background: var(--azul-textos); color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; }
.review-card { border-bottom: 1px solid #eee; padding: 15px 0; }
.stars { color: #f39c12; font-weight: bold; margin-right: 10px; }
.fecha { color: #999; font-size: 0.8rem; }
</style>