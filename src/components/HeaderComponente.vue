<script setup>
import { RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
//checa si hay alguien logeado con authStore
const store = useAuthStore()
</script>

<template>
  <div class="logo-header">
    <RouterLink to="/">
      <img src="/header.png" alt="Smart Rating Logo" class="logo-img" />
    </RouterLink>
  </div>

  <nav id="navbar" v-if="store.estaLogeado">
    <ul>
      <li><RouterLink to="/">Inicio</RouterLink></li>
      <li><RouterLink to="/artistas">Artistas</RouterLink></li>
      <li><RouterLink to="/albumes">Albumes</RouterLink></li>
      <li><RouterLink to="/musica">Musica</RouterLink></li>
      <li><RouterLink to="/comunidad">Comunidad</RouterLink></li>
      <li>
        <RouterLink to="/perfil" class="user-link">
          <img
            :src="
              store.usuario?.fotoUrl ||
              'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
            "
            class="nav-avatar"
          />
          <span>Hola, {{ store.usuario.nombre }}</span>
        </RouterLink>
      </li>
    </ul>
  </nav>

  <nav id="navbar" v-else>
    <ul>
      <li><RouterLink to="/">Inicio</RouterLink></li>
      <li><RouterLink to="/artistas">Artistas</RouterLink></li>
      <li><RouterLink to="/albumes">Albumes</RouterLink></li>
      <li><RouterLink to="/musica">Musica</RouterLink></li>
      <li><RouterLink to="/comunidad">Comunidad</RouterLink></li>
      <li>
        <RouterLink to="/login">Iniciar Sesion</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
:root {
  --header-image: url('https://sadhost.neocities.org/images/layouts/wp.jpeg');
  --body-bg-image: url('https://sadhost.neocities.org/images/tiles/bk024.gif');
  --content-bg: #e6f0fa;
  --azul-textos: #2b7de9;
  --gris-azul: #c2d6ea;
  --text-color: #0f2d52;
}

.logo-header {
  background-color: var(--content-bg);
  text-align: center;
  padding: 10px 0;
  border-bottom: 1px solid var(--azul-textos);
}

.logo-img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
  max-height: 100px;
}

#navbar {
  height: 40px;
  background-color: var(--gris-azul);
  width: 100%;
  border-bottom: 1px solid var(--azul-textos);
}

#navbar ul {
  display: flex;
  padding: 0;
  margin: 0;
  list-style-type: none;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
}

#navbar li {
  display: flex;
  align-items: center;
}

.user-link {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
}

.nav-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid var(--azul-textos);
}
</style>
