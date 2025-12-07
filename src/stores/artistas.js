import { ref } from 'vue'
import { defineStore } from 'pinia'
import apiClient from '@/api/axios'

export const useArtistasStore = defineStore('artistas', () => {
  // Estados globales 
  const listaArtistas = ref([])
  const cargando = ref(false)

    // Guardar artista en la base de datos
    const guardarArtista = async (artista) => {
      cargando.value = true
      try {
        const response = await apiClient.post('/artistas', artista)
        // Opcional: agregar el artista a la lista local si la API responde con el nuevo artista
        listaArtistas.value.push(response.data)
        return response.data
      } catch (error) {
        console.error('Error al guardar el artista:', error)
        throw error
      } finally {
        cargando.value = false
      }
    }

  // Obtenemos todos los artistas desde la api
  const obtenerArtistas = async () => {
    cargando.value = true
    try {
      const response = await apiClient.get('/artistas')
      listaArtistas.value = response.data
    } catch (error) {
      console.error('No se pudieron cargar los artistas:( :', error)
    } finally {
      cargando.value = false
    }
  }

  return { 
    listaArtistas, 
    cargando, 
      obtenerArtistas,
      guardarArtista
  }
})