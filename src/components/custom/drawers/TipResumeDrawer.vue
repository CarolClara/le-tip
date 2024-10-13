<template>
  <div class="tip-resume-drawer">
    <v-navigation-drawer
      v-model="model"
      absolute
      bottom
      class="tip-resume-drawer__field"
      temporary
      @input="handleInput"
    >
      <tip-calculator-resume-card />
      <v-btn
        icon
        style="margin-top: auto; margin-left: auto"
        @click="model = !model"
      >
        <v-icon>mdi-chevron-left-circle</v-icon>
      </v-btn>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TipCalculatorResumeCard from "@/components/custom/cards/TipResumeCard.vue";

export default defineComponent({
  name: "TipResumeDrawer",
  components: { TipCalculatorResumeCard },
  props: {
    value: { type: Boolean, required: true },
  },
  data: () => ({
    model: false,
  }),
  created() {
    this.model = this.value;
  },
  methods: {
    handleInput() {
      this.$emit("input", this.model);
    },
  },
  watch: {
    value(newValue) {
      this.model = newValue;
    },
  },
});
</script>

<style lang="scss" scoped>
.tip-resume-drawer {
  .v-navigation-drawer {
    transition-property: transform, visibility, width, height;

    &--close {
      height: 0 !important;
    }

    &--open {
      max-height: 100%;
    }
  }
}
</style>
