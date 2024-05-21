import './assets/main.css'
import 'primevue/resources/themes/aura-light-teal/theme.css'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'

const app = createApp(App)

app.use(PrimeVue)
app.use(ToastService)
app.use(createPinia())
app.use(router)

app.component('Toast', Toast)

app.mount('#app')
