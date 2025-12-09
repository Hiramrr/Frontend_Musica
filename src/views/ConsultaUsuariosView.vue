<script setup>
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useUsuariosStore } from '../stores/usuarios'
import HeaderComponente from '../components/HeaderComponente.vue'

const usuariosStore = useUsuariosStore()

onMounted(() => {
  usuariosStore.obtenerTodos()
})
</script>

<template>
  <div id="container">
    <div id="headerArea">
      <HeaderComponente />
    </div>

    <div id="flex">
      <main>
        <h1>Comunidad</h1>

        <p class="intro-text">
          <strong>Usuarios registrados</strong>
        </p>

        <div v-if="usuariosStore.cargando" class="cargando">Cargando comunidad...</div>

        <div v-else-if="usuariosStore.error" class="error">
          {{ usuariosStore.error }}
        </div>

        <div v-else>
          <div
            v-for="usuario in usuariosStore.listaUsuarios"
            :key="usuario.id"
            class="box fila-usuario"
          >
            <div class="portada-usuario">
              <img
                :src="
                  usuario.fotoUrl ||
                  usuario.foto_url ||
                  'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
                "
                alt="Avatar"
              />
            </div>

            <div class="detalles-usuario">
              <h2>
                <RouterLink :to="'/usuario/' + usuario.id">
                  {{ usuario.nombre }}
                </RouterLink>
              </h2>

              <div class="meta-usuario"><strong>Correo:</strong> {{ usuario.correo }}</div>
            </div>

            <div class="stat-group">
              <RouterLink :to="'/usuario/' + usuario.id" class="btn-ver-perfil">
                Ver Perfil
              </RouterLink>
            </div>
          </div>
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
h1 {
  color: var(--azul-textos);
  font-size: 25px;
  border-bottom: 1px dashed var(--azul-textos);
  padding-bottom: 10px;
  margin-top: 0;
}
footer {
  background-color: var(--gris-azul);
  padding: 10px;
  text-align: center;
  border-top: 1px solid var(--azul-textos);
  margin-top: 20px;
}

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
.intro-text {
  margin-bottom: 20px;
  color: #0f2d52;
}

.box {
  background-color: var(--gris-azul);
  border: 1px solid var(--azul-textos);
  padding: 10px;
  margin-bottom: 15px;
}

.fila-usuario {
  display: flex;
  gap: 15px;
  align-items: center;
}

.portada-usuario img {
  width: 80px;
  height: 80px;
  border: 1px solid var(--azul-textos);
  display: block;
  object-fit: cover;
  background-color: #fff;
}

.detalles-usuario {
  flex: 1;
}

.detalles-usuario h2 {
  margin: 0;
  font-size: 1.2rem;
}

.detalles-usuario a {
  color: var(--azul-textos);
  text-decoration: none;
  font-weight: bold;
}
.detalles-usuario a:hover {
  text-decoration: underline;
  color: #a49cba;
}

.meta-usuario {
  font-size: 0.85rem;
  color: #0f2d52;
  font-style: italic;
  margin-top: 5px;
}

.generos-usuario {
  font-size: 0.8rem;
  margin-top: 5px;
  color: #0f2d52;
}

.estadisticas-usuario {
  display: flex;
  flex-direction: column;
  gap: 5px;
  text-align: right;
  min-width: 90px;
  background: rgba(0, 0, 0, 0.05);
  padding: 8px;
  border-radius: 4px;
}

.stat-group {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  font-size: 0.8rem;
  align-items: center;
}

.stat-label {
  color: #0f2d52;
}
.stat-value {
  color: #345d91;
  font-weight: bold;
}

.btn-ver-perfil {
  font-size: 0.75rem;
  background-color: var(--azul-textos);
  color: white !important;
  padding: 3px 8px;
  border-radius: 3px;
  text-decoration: none;
  display: inline-block;
  margin-top: 5px;
}
.btn-ver-perfil:hover {
  background-color: #1a5bb5;
}

.cargando,
.error {
  text-align: center;
  padding: 20px;
  font-style: italic;
  color: #666;
}

/* Responsive */
@media only screen and (max-width: 600px) {
  .fila-usuario {
    flex-direction: column;
    text-align: center;
  }
  .estadisticas-usuario {
    width: 100%;
    flex-direction: row;
    justify-content: center;
    text-align: center;
  }
}
</style>
