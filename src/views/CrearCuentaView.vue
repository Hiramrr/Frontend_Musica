<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import HeaderComponente from '../components/HeaderComponente.vue'

const authStore = useAuthStore()
const router = useRouter()

const formulario = ref({
  nombre: '',
  correo: '',
  password: '',
  foto_url: '',
})

const enviarRegistro = async () => {
  const exito = await authStore.registrarUsuario(formulario.value)

  if (exito) {
    router.push('/')
  } else {
    alert('Fallo el registro: ' + authStore.error)
  }
}
</script>

<template>
  <div id="container">
    <div id="headerArea">
      <HeaderComponente />
    </div>

    <div id="flex">
      <main>
        <h1>Crear cuenta</h1>

        <a
          href="#"
          @click.prevent="cancelar()"
          style="display: block; text-align: center; margin-bottom: 10px"
        >
          Regresar al login
        </a>

        <fieldset class="principal">
          <form @submit.prevent="enviarRegistro">
            <label for="user">Nombre</label>
            <input v-model="formulario.nombre" type="text" id="user" />

            <label for="email">Correo Electrónico</label>
            <input v-model="formulario.correo" type="text" id="email" />

            <label for="password">Contraseña</label>
            <input v-model="formulario.password" type="password" id="password" />

            <input type="submit" value="Crear cuenta" id="crear" />
          </form>
        </fieldset>
      </main>
    </div>
    <footer>
      <p>Smart Rating</p>
    </footer>
  </div>
</template>

<style>
/* Variables para imágenes y colores */
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

h1 {
  text-align: center;
}

body {
  font-family: 'Nunito', sans-serif;
  margin: 0;
  background-color: #e6f0fa;
  background-size: 65px;
  color: var(--text-color);
  background-image: var(--body-bg-image);
}

a {
  color: var(--azul-textos);
  font-weight: bold;
  text-decoration: none;
}
a:hover {
  color: #a49cba;
  text-decoration: underline;
}

#container {
  background-color: var(--content-bg);
  max-width: 900px;
  margin: 0 auto;
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

#flex {
  display: flex;
  align-items: flex-start;
}

main {
  background-color: var(--content-bg);
  flex: 1;
  padding: 20px;
  min-height: 80vh;
}

aside {
  background-color: #c2d6ea;
  width: 250px;
  padding: 20px;
  font-size: smaller;
  border-left: 1px solid var(--azul-textos);
  border-bottom: 1px solid var(--azul-textos);
}

footer {
  background-color: var(--gris-azul);
  width: 100%;
  padding: 10px;
  text-align: center;
  border-top: 1px solid var(--azul-textos);
  margin-top: 20px;
}

h1,
h2,
h3 {
  color: var(--azul-textos);
  margin-top: 0;
}

h1 {
  font-size: 25px;
  border-bottom: 1px dashed var(--azul-textos);
  padding-bottom: 10px;
}
h2 {
  font-size: 18px;
}

.box {
  background-color: var(--gris-azul);
  border: 1px solid var(--azul-textos);
  padding: 10px;
  margin-bottom: 15px;
}

/* Pestañas de navegación interna */
.pestanas {
  margin-bottom: 15px;
  border-bottom: 1px solid #a49cba;
}
.pestana {
  margin-right: 15px;
  cursor: pointer;
  color: #0f2d52;
}
.pestana.activa {
  color: var(--azul-textos);
  font-weight: bold;
  border-bottom: 2px solid var(--azul-textos);
}

/* Layout de la fila del álbum */
.fila-album {
  display: flex;
  gap: 15px;
  align-items: center;
}

.portada-album img {
  width: 80px;
  height: 80px;
  border: 1px solid var(--azul-textos);
  display: block;
}

.detalles-album {
  flex: 1;
}

.titulo-album {
  margin: 0;
  font-size: 1.2rem;
}

.meta-album {
  font-size: 0.85rem;
  color: #0f2d52;
  font-style: italic;
}

.generos-album {
  font-size: 0.8rem;
  margin-top: 5px;
  color: #0f2d52;
}

/* Estadísticas a la derecha */
.estadisticas-album {
  display: flex;
  flex-direction: column;
  gap: 5px;
  text-align: right;
  min-width: 80px;
  background: rgba(0, 0, 0, 0.2);
  padding: 5px;
  border-radius: 4px;
}

.stat-group {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  font-size: 0.8rem;
}

.stat-label {
  color: #0f2d52;
}
.stat-value {
  color: #345d91;
  font-weight: bold;
}

/* Lista del Sidebar */
.lista-top {
  padding-left: 0;
  list-style: none;
}
.lista-top li {
  margin-bottom: 10px;
  border-bottom: 1px dashed #c2d6ea;
  padding-bottom: 5px;
}

fieldset {
  margin-top: 20px;
  border: 1px solid #ccc;
}

fieldset.principal {
  max-width: 400px;
  box-shadow: 15px 20px 10px rgba(1, 14, 27, 0.472);
  margin: 0 auto;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 20px;
}

legend {
  font-size: 12px;
  margin-bottom: 10px;
  padding: 0px;
}

label {
  display: block;
  margin-bottom: 3px;
  margin-top: 3px;
}

input[type='text'],
input[type='email'],
input[type='password'] {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8cc;
}

input[type='submit'],
[type='button'] {
  width: 100%;
  padding: 10px;
  background-color: #0056b3;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

input[type='submit'],
[type='button']:hover {
  width: 100%;
  padding: 10px;
  background-color: #004494;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

input[type='submit'],
[type='button']:active {
  width: 100%;
  padding: 10px;
  background-color: #003366;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
#crear {
  width: auto;
  min-width: 150px;
  background-color: #28a745;
  margin-top: 20px;
  float: right;
}

#crear:hover {
  background-color: #218838;
  width: auto;
}

#crear:active {
  background-color: #1e7e34;
  width: auto;
}
/* --- RESPONSIVE (MEDIA QUERY) --- */
@media only screen and (max-width: 800px) {
  #flex {
    flex-wrap: wrap;
  }

  aside {
    width: 100%;
    order: 1; /* Sidebar arriba en móvil o abajo según prefieras */
    border-left: none;
    border-bottom: 1px solid var(--azul-textos);
  }

  main {
    order: 2;
  }

  #navbar ul {
    flex-wrap: wrap;
  }

  .fila-album {
    flex-direction: column;
    text-align: center;
  }

  .estadisticas-album {
    width: 100%;
    flex-direction: row;
    justify-content: center;
    gap: 20px;
    text-align: center;
  }
}
</style>
