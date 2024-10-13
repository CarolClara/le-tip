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
      <div class="tip-resume-drawer__field__body">
        <tip-resume-card class="tip-resume-drawer__field__body__card" flat />
        <v-btn
          class="tip-resume-drawer__field__body__btn"
          icon
          @click="model = !model"
        >
          <v-icon>mdi-chevron-left-circle</v-icon>
        </v-btn>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import TipResumeCard from "@/components/custom/cards/TipResumeCard.vue";

export default defineComponent({
  name: "TipResumeDrawer",
  components: { TipResumeCard },
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
  &__field {
    &__body {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
    }
  }

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
