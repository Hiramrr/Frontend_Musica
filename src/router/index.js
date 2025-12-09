import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import CrearCuentaView from '../views/CrearCuentaView.vue'
import PerfilView from '../views/PerfilView.vue'
import EditarPerfilView from '../views/EditarPerfilView.vue'
import AlbumDetalleView from '../views/catalogo/AlbumDetalleView.vue'
import ConsultaUsuariosView from '../views/ConsultaUsuariosView.vue'

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
      path: '/artistas/:id',
      name: 'detalle-artista',
      component: () => import('../views/catalogo/DetalleArtistaView.vue'),
      props: true,
    },
    {
      path: '/editar-artista/:id',
      name: 'editar-artista',
      component: () => import('../views/registros/EditarArtistaView.vue'),
      props: true,
    },
    {
      path: '/albumes',
      name: 'albumes',
      component: () => import('../views/catalogo/AlbumsView.vue'),
    },
    {
      path: '/editar-album/:id',
      name: 'editar-album',
      component: () => import('../views/registros/EditarAlbumView.vue'),
      props: true
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

    {
      path: '/artistas-admin',
      name: 'artistas-admin',
      component: () => import('../views/catalogo/ArtistasAdminView.vue'),
    },
    {
      path: '/editar-perfil',
      name: 'editar perfil',
      component: EditarPerfilView,
      meta: {
        title: 'Editar perfil',
      },
    },
    {
      path: '/album/:id',
      name: 'album-detalle',
      component: () => import('../views/catalogo/AlbumDetalleView.vue'),
      props: true,
    },
    {
      path: '/comunidad',
      name: 'Comunidad',
      component: ConsultaUsuariosView,
      meta: {
        title: 'Comunidad',
      },
    },
    {
      path: '/usuario/:id',
      name: 'usuario-detalle',
      component: PerfilView,
      props: true,
    },
  ],
})

export default router
