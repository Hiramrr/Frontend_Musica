<script setup>
defineProps({
  album: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="album-header">
    <div class="img-container">
      <img :src="album.portadaUrl || 'https://placehold.co/400'" :alt="album.nombre" />
    </div>
    <div class="info-container">
      <h1>{{ album.nombre }}</h1>
      <h2 class="artista">{{ album.nombreArtista }}</h2>
      <div class="meta">
        <span class="pill">{{ album.genero || 'Pop' }}</span>
        <span>{{ album.fechaSalida }}</span>
      </div>
      <p class="desc">{{ album.descripcion }}</p>
    </div>
  </div>
</template>

<style scoped>
.album-header {
  display: flex;
  gap: 2rem;
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  margin-bottom: 2rem;
}

.img-container img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.artista { color: var(--azul-textos); margin-top: 0; }
.meta { display: flex; gap: 10px; align-items: center; margin: 10px 0; color: #666; font-size: 0.9rem;}
.pill { background: #eef; color: var(--azul-textos); padding: 2px 10px; border-radius: 15px; font-weight: bold;}

@media (max-width: 600px) {
  .album-header { flex-direction: column; text-align: center; align-items: center; }
}
</style>