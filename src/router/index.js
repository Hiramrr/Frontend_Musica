import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/agregar-artista',
      name: 'add-artist',
      component: () => import('../views/registros/AgregarArtistaView.vue'),
    },
    {
      path: '/agregar-album',
      name: 'add-album',
      component: () => import('../views/registros/AgregarAlbumView.vue'),
    },
    {
      path: '/agregar-cancion',
      name: 'add-song',
      component: () => import('../views/registros/AgregarCancionView.vue'),
    },
    {
      path: '/artistas',
      name: 'artistas',
      component: () => import('../views/catalogo/ArtistasView.vue'),
    },
    {
      path: '/albumes',
      name: 'albumes',
      component: () => import('../views/catalogo/AlbumsView.vue'),
    },
    {
      path: '/musica',
      name: 'musica',
      component: () => import('../views/catalogo/CancionesView.vue'),
    }
  ],
})

export default router
