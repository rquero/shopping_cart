import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { loadFonts } from './plugins/webfontloader'
import apiClient from './plugins/axios'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createPinia } from 'pinia';
import i18n from './plugins/i18n';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
})

const pinia = createPinia();

const app = createApp(App)

app.config.globalProperties.$axios = apiClient

loadFonts()

app.use(router).use(i18n).use(vuetify).use(pinia).mount('#app')
