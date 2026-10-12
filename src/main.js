import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Material from '@primeuix/themes/material'
import { Avatar, Button, Card, Checkbox, Column, DataTable, Drawer, Image, InputNumber, Message, ProgressSpinner, Select, SelectButton, Toolbar } from 'primevue'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import App from './App.vue'
import router from './router.js'
import i18n from './i18n.js'
const app = createApp(App)
app.use(createPinia()).use(router).use(i18n).use(PrimeVue, { theme: { preset: Material, options: { darkModeSelector: false } }, ripple: true })
const components = { avatar: Avatar, button: Button, card: Card, checkbox: Checkbox, column: Column, 'data-table': DataTable, drawer: Drawer, image: Image, 'input-number': InputNumber, message: Message, 'progress-spinner': ProgressSpinner, select: Select, 'select-button': SelectButton, toolbar: Toolbar }
Object.entries(components).forEach(([name, component]) => app.component(`pv-${name}`, component))
app.mount('#app')
