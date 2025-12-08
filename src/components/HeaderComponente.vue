<script setup>
import { RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
const store = useAuthStore()
</script>

<template>
  <nav id="navbar" v-if="store.estaLogeado">
    <ul>
      <li><RouterLink to="/">Inicio</RouterLink></li>
      <li><RouterLink to="/artistas">Artistas</RouterLink></li>
      <li><RouterLink to="/albumes">Albumes</RouterLink></li>
      <li><RouterLink to="/musica">Musica</RouterLink></li>
      <li>
        <RouterLink to="/perfil">Hola, {{ store.usuario.nombre }}</RouterLink>
      </li>
    </ul>
  </nav>

  <nav id="navbar" v-else>
    <ul>
      <li><RouterLink to="/">Inicio</RouterLink></li>
      <li><RouterLink to="/artistas">Artistas</RouterLink></li>
      <li><RouterLink to="/albumes">Albumes</RouterLink></li>
      <li><RouterLink to="/musica">Musica</RouterLink></li>
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

/* Fuentes importadas */
@font-face {
  font-family: Nunito;
  src: url('https://sadhost.neocities.org/fonts/Nunito-Regular.ttf');
}
@font-face {
  font-family: Nunito;
  src: url('https://sadhost.neocities.org/fonts/Nunito-Bold.ttf');
  font-weight: bold;
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
}

#navbar li {
  padding-top: 10px;
}
</style>
