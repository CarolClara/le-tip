<template>
  <header class="app-header">
    <h1>Le/<span class="app-header--highlight">Tip</span></h1>
  </header>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppHeader",
});
</script>

<style lang="scss" scoped>
.app-header {
  margin: 8vh auto;

  &--highlight {
    color: $color-primary;
  }
}
</style>
