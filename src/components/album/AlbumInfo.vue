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
  align-items: center;      
  gap: 2.5rem;              
  
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  margin-bottom: 2rem;
}

.img-container {
  flex-shrink: 0;           
}

.img-container img {
  width: 220px;             
  height: 220px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.15); 
  display: block;
}

/* Cuadro Amarillo (Información) */
.info-container {
  flex: 1;                  
  text-align: center;       
  display: flex;
  flex-direction: column;   
  align-items: center;      
}

.info-container h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: var(--azul-textos); 
}

.artista { 
  font-size: 1.2rem;
  color: #555; 
  margin-top: 0;
  border-bottom: 1px dashed var(--azul-textos); 
  padding-bottom: 0.5rem;
  display: inline-block;   
}

.meta { 
  display: flex; 
  gap: 15px; 
  justify-content: center;  
  align-items: center; 
  margin-bottom: 1.5rem;
  color: #666; 
}

.pill { 
  background: #e6f0fa;     
  color: var(--azul-textos); 
  padding: 4px 15px; 
  border-radius: 20px; 
  font-weight: bold;
  font-size: 0.9rem;
}

.desc {
  max-width: 500px;         
  line-height: 1.6;
  color: #444;
}

@media (max-width: 700px) {
  .album-header { 
    flex-direction: column; 
    text-align: center; 
    gap: 1.5rem;
  }
  
  .img-container img {
    width: 180px;
    height: 180px;
  }
}
</style>