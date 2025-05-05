import { createI18n } from 'vue-i18n';
import EN from '../assets/i18n/en';
import ES from '../assets/i18n/es';

const messages = {
  en: EN,
  es: ES,
};

// Crear instancia de Vue I18n
const i18n = createI18n({
  legacy: false, // Usar la API de composición
  locale: 'en', // Idioma predeterminado
  fallbackLocale: 'en', // Idioma de respaldo
  messages, // Traducciones
});

export default i18n;