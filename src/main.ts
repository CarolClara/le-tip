import Vue from "vue";
import App from "./App.vue";

import router from "./router";

import { createPinia, PiniaVuePlugin } from "pinia";

import vuetify from "./vuetify";

Vue.use(PiniaVuePlugin);

new Vue({
  router,
  pinia: createPinia(),
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
