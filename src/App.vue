<script>
import { defineComponent } from "vue";
import AppHeader from "@/components/custom/headers/AppHeader.vue";

export default defineComponent({
  components: { AppHeader },
});
</script>

<template>
  <v-app>
    <app-header />
    <router-view />
  </v-app>
</template>

<style lang="scss">
#app {
  background-color: $background-light-grey;
  color: $color-secondary !important;
}
</style>
