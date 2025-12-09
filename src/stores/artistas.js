import { ref } from 'vue'
import { defineStore } from 'pinia'
import apiClient from '@/api/axios'

export const useArtistasStore = defineStore('artistas', () => {
   
  const listaArtistas = ref([])
  const cargando = ref(false)

    // funcion para guardar un nuevo artista, recibe el objeto artista con sus datos, 
    // lo envia a la base de datos y lo agrega a la lista de artistas
    const guardarArtista = async (artista) => {
      cargando.value = true
      try {
        const response = await apiClient.post('/artistas', artista)
        
        listaArtistas.value.push(response.data)
        return response.data
      } catch (error) {
        console.error('Error al guardar el artista:', error)
        throw error
      } finally {
        cargando.value = false
      }
    }

  // Funcion para obetener la lista de artistas desde la base de datos
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

  // Funcion para eliminar un artista por su ID, lo elimina de la base de datos y de la lista de artistas
  const eliminarArtista = async (id) => {
    cargando.value = true
    try {
      await apiClient.delete(`/artistas/${id}`)
      
      listaArtistas.value = listaArtistas.value.filter(a => a.id !== id)
    } catch (error) {
      console.error('Error al eliminar el artista:', error)
      throw error
    } finally {
      cargando.value = false
    }
  }

  // Fucnion para actualizar un artista por id, recibe el artista con los nuevos datos, 
  // y actualiza la base de datos y la lista de artistas
  const actualizarArtista = async (id, artista) => {
    cargando.value = true
    try {
      const response = await apiClient.put(`/artistas/${id}`, artista)
      
      listaArtistas.value = listaArtistas.value.map(a => a.id === id ? response.data : a)
      return response.data
    } catch (error) {
      console.error('Error al actualizar el artista:', error)
      throw error
    } finally {
      cargando.value = false
    }
  }

  return { 
    listaArtistas, 
    cargando, 
    obtenerArtistas,
    guardarArtista,
    eliminarArtista,
    actualizarArtista
  }
})