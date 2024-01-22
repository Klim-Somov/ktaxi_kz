// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['bootstrap/dist/css/bootstrap.min.css', '@/assets/scss/main.scss'],
  modules: [
    'nuxt-swiper',
    'nuxt-csurf',
    'nuxt-yandex-metrika',
    '@pinia/nuxt',
    'nuxt-icon',
  ],
  yandexMetrika: {
    id: '95914516',
  },
  app: {
    head: {
      title: 'PayTaxi',
    },
  },

  csurf: {
    cookie: {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
    },
    methodsToProtect: ['POST', 'PUT', 'PATCH'],
    encryptAlgorithm: 'aes-256-cbc',
  },
  runtimeConfig: {
    mailport: 25,
    mailhost: 'smtp',
    mailfrom: 'info@paytaxi.ru',
    mailto: 'info@paytaxi.ru',
    secret_key: process.env.SECRET_KEY,
    public: {
      site: 'https://paytaxi.ru/',
      phone: '',
    },
  },
});
