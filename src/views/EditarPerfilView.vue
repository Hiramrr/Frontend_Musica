<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import HeaderComponente from '../components/HeaderComponente.vue'

const store = useAuthStore()
const router = useRouter()

//carga los datos del usuario en el store en el formulario de edicion
const formulario = reactive({
  nombre: store.usuario?.nombre || '',
  correo: store.usuario?.correo || '',
  fotoUrl: store.usuario?.fotoUrl || '',
})

//manda a llamar el metodo del store que se encarga de actualizar los datos del usuario
// le manda un arreglo con el nombre, correo y url de la foto
// true si es exitoso, false si fallo
async function guardarCambios() {
  const datosParaEnviar = {
    nombre: formulario.nombre,
    correo: formulario.correo,
    fotoUrl: formulario.fotoUrl,
  }

  const exito = await store.actualizarPerfil(datosParaEnviar)

  if (exito) {
    alert('Perfil actualizado correctamente')
    router.push('/perfil')
  } else {
    alert('Error: ' + (store.error || 'No se pudo actualizar'))
  }
}

function cancelar() {
  router.push('/perfil')
}

// elimina la cuenta del usuario, primero pide confirmacion de si el usuario quiere hacer eso
// si el usuario dice que si se manda a llamar el metodo del store que se encarga de eso
// le pasa la id del usuario
async function eliminarCuenta() {
  const confirmacion = window.confirm('Estas seguro? esto no se puede revertir btw')

  if (confirmacion) {
    try {
      await store.eliminarUsuario(store.usuario.id)
      alert('Tu cuenta ha sido eliminada.')
      router.push('/')
    } catch (error) {
      alert('Hubo un error al intentar eliminar la cuenta.')
    }
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
        <h1>Editar Perfil</h1>

        <a
          @click.prevent="cancelar()"
          style="display: block; text-align: center; margin-bottom: 10px; cursor: pointer"
        >
          Regresar al perfil
        </a>

        <fieldset class="principal">
          <div class="preview-container">
            <img
              :src="
                formulario.fotoUrl ||
                'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
              "
              class="preview-img"
              alt="Vista previa"
              @error="
                $event.target.src =
                  'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
              "
            />
          </div>

          <form @submit.prevent="guardarCambios">
            <label for="nombre">Nombre</label>
            <input v-model="formulario.nombre" type="text" id="nombre" required />

            <label for="email">Correo Electrónico</label>
            <input v-model="formulario.correo" type="email" id="email" required />

            <label for="foto">URL de Foto</label>
            <input v-model="formulario.fotoUrl" type="text" id="foto" placeholder="https://..." />

            <div class="botones-form">
              <input type="button" value="Cancelar" @click="cancelar()" id="cancelar-btn" />
              <input type="submit" value="Guardar Cambios" id="guardar-btn" />
            </div>
          </form>
        </fieldset>

        <div class="zona-peligro">
          <h3>Eliminar Cuenta</h3>
          <p>Si eliminas tu cuenta, perderás acceso a tus reseñas y configuraciones.</p>
          <button @click="eliminarCuenta()" class="btn-borrar-final">
            Eliminar mi cuenta definitivamente
          </button>
        </div>
      </main>
    </div>
    <footer>
      <p>Smart Rating</p>
    </footer>
  </div>
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
  color: var(--azul-textos);
  margin-top: 0;
  font-size: 25px;
  border-bottom: 1px dashed var(--azul-textos);
  padding-bottom: 10px;
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

footer {
  background-color: var(--gris-azul);
  width: 100%;
  padding: 10px;
  text-align: center;
  border-top: 1px solid var(--azul-textos);
  margin-top: 20px;
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
  background-color: #fff;
}

legend {
  font-size: 12px;
  margin-bottom: 10px;
  padding: 0px;
  font-weight: bold;
}

label {
  display: block;
  margin-bottom: 3px;
  margin-top: 10px;
  font-weight: bold;
}

input[type='text'],
input[type='email'] {
  width: 100%;
  padding: 8px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8cc;
  box-sizing: border-box;
}

.preview-container {
  text-align: center;
  margin-bottom: 15px;
  border-bottom: 1px dashed var(--azul-textos);
  padding-bottom: 15px;
}

.preview-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border: 1px solid var(--azul-textos);
  padding: 2px;
  background-color: #0352fc;
}

.botones-form {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

input[type='submit'],
input[type='button'] {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

/* Botón Guardar (Verde) */
#guardar-btn {
  background-color: #28a745;
  color: white;
  flex: 2; /* Ocupa más espacio */
}
#guardar-btn:hover {
  background-color: #218838;
}
#guardar-btn:active {
  background-color: #1e7e34;
}

#cancelar-btn {
  background-color: #db091e;
  color: white;
  flex: 1;
}
#cancelar-btn:hover {
  background-color: #b00616;
}

.zona-peligro {
  max-width: 400px;
  margin: 40px auto 0 auto;
  text-align: center;
  border-top: 2px dashed #db091e;
  padding-top: 20px;
}

.zona-peligro h3 {
  color: #db091e;
  font-size: 18px;
  margin-bottom: 5px;
}

.zona-peligro p {
  font-size: 12px;
  color: #555;
  margin-bottom: 15px;
}

.btn-borrar-final {
  background-color: transparent;
  border: 2px solid #db091e;
  color: #db091e;
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  transition: all 0.3s ease;
}

.btn-borrar-final:hover {
  background-color: #db091e;
  color: white;
}

@media only screen and (max-width: 800px) {
  #flex {
    flex-wrap: wrap;
  }
}
</style>
