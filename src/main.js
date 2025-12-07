import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'


import apiClient from '@/api/axios'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

console.log('--- INICIANDO PRUEBA DE CONEXIÓN ---');
apiClient.get('/artistas')
  .then(response => {
    console.log('✅ CONEXIÓN EXITOSA! Datos recibidos:');
    console.log(response.data); // Aquí se imprimirá tu JSON
  })
  .catch(error => {
    console.error('❌ ERROR DE CONEXIÓN:', error);
  });
