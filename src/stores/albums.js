import { ref } from 'vue'
import { defineStore } from 'pinia'
import apiClient from '@/api/axios'

export const useAlbumesStore = defineStore('albumes', () => {
  const listaAlbumes = ref([])
  const cargando = ref(false)

  const obtenerAlbumes = async () => {
    cargando.value = true
    console.log("1. Iniciando petición a backend...") // LOG 1

    try {
      // OJO: Asegúrate de que la ruta inicie con / si tu baseURL no termina en /
      const response = await apiClient.get('/albums') 
      
      console.log("2. Respuesta cruda del Backend:", response) // LOG 2
      console.log("3. Datos (JSON) recibidos:", response.data) // LOG 3
      
      // Verificamos el primer elemento para ver sus propiedades
      if (response.data && response.data.length > 0) {
        console.log("4. Propiedades del primer álbum:", Object.keys(response.data[0]))
        console.log("   - ¿Tiene nombreArtista?:", response.data[0].nombreArtista)
        console.log("   - ¿Tiene nombre_artista?:", response.data[0].nombre_artista)
      }

      listaAlbumes.value = response.data

    } catch (error) {
      console.error('❌ ERROR CRÍTICO cargando álbumes:', error)
    } finally {
      cargando.value = false
    }
  }

  return { 
    listaAlbumes, 
    cargando, 
    obtenerAlbumes 
  }
})