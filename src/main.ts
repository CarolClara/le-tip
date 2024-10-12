import Vue from "vue";
import App from "./App.vue";

import { createPinia, PiniaVuePlugin } from "pinia";

import vuetify from "./vuetify";
import router from "./router";

Vue.use(PiniaVuePlugin);

new Vue({
  router,
  pinia: createPinia(),
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
