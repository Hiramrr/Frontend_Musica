<script setup>
defineProps({
  canciones: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <div class="tracklist-container">
    <h3>Lista de Canciones</h3>
    <ul v-if="canciones.length" class="lista">
      <li v-for="(cancion, index) in canciones" :key="cancion.id" class="track">
        <span class="numero">{{ index + 1 }}</span>
        <div class="info">
          <strong>{{ cancion.nombre }}</strong>
        </div>
        <span class="duracion">{{ cancion.duracion }}</span>
      </li>
    </ul>
    <p v-else class="vacio">No hay canciones registradas aún.</p>
  </div>
</template>

<style scoped>
.tracklist-container {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 2rem;
}
.lista { list-style: none; padding: 0; }
.track { display: flex; align-items: center; padding: 10px 0; border-bottom: 1px solid #eee; }
.numero { color: #999; width: 30px; font-weight: bold; }
.info { flex: 1; }
.duracion { color: #666; font-size: 0.9rem; }
.vacio { font-style: italic; color: #888; text-align: center; }
</style>