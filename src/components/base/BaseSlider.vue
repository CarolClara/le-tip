<template>
  <div class="base-slider">
    <label :for="id" class="base-slider__label">
      <span class="base-slider__label--text">{{ label }}</span>
      <v-chip class="base-slider__label--chip" color="color-primary" small>
        {{ chipLabel }}
      </v-chip>
    </label>
    <v-slider
      :id="id"
      v-model="model"
      :max="max"
      :min="min"
      class="base-slider__field"
      color="color-secondary"
      track-color="background-light-grey"
      @input="handleInput"
    >
      <template #prepend>{{ minLabel || min }}</template>
      <template #append>{{ maxLabel || max }}</template>
    </v-slider>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "BaseSlider",
  props: {
    min: { type: String, required: true },
    max: { type: String, required: true },
    value: { type: Number, required: true },
    label: { type: String, required: true },
    chipLabel: { type: String, required: true },
    minLabel: { type: String, default: undefined },
    maxLabel: { type: String, default: undefined },
  },
  data: () => ({
    model: undefined,
    id: "",
  }),
  created() {
    this.model = this.value;
    this.id = `tip-slider-${this.label.toLowerCase()}`;
  },
  methods: {
    handleInput() {
      this.$emit("input", this.model);
    },
  },
});
</script>

<style lang="scss" scoped>
.base-slider {
  &__label {
    &--text {
      margin-right: 8px;
    }
  }
}
</style>
