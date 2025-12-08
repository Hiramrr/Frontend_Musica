import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import CrearCuentaView from '../views/CrearCuentaView.vue'
import PerfilView from '../views/PerfilView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
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
      path: '/editar-artista/:id',
      name: 'editar-artista',
      component: () => import('../views/registros/EditarArtistaView.vue'),
      props: true
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
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        title: 'Login',
      },
    },
    {
      path: '/crear',
      name: 'crear cuenta',
      component: CrearCuentaView,
      meta: {
        title: 'Crear cuenta',
      },
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: PerfilView,
      meta: {
        title: 'Perfil',
      },
    },
  ],
})

export default router
