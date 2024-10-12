<template>
  <div class="tip-view-container">
    <div class="tip-view-container--item">
      <currency-button-toggle @update:currency="handleCurrencyChange" />
      <monetary-input :currency="currency" @update:value="handleValueChange" />

      <base-slider
        v-model="tipPercent"
        :chip-label="`${tipPercent}%`"
        label="Gorjeta"
        max="20"
        min="10"
      />

      <base-slider
        v-model="consumerTotal"
        :chip-label="consumerTotalChipLabel"
        label="Pessoas"
        max="16"
        min="2"
        min-label="02"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import { BaseSlider } from "@/components/base";
import { CurrencyButtonToggle, MonetaryInput } from "@/components/custom";

export default defineComponent({
  components: { BaseSlider, CurrencyButtonToggle, MonetaryInput },
  data: () => ({
    currency: "usd",
    amount: undefined,
    tipPercent: 10,
    consumerTotal: 2,
  }),
  methods: {
    handleCurrencyChange(currency) {
      this.currency = currency;
    },
    handleValueChange(amount) {
      this.amount = amount;
    },
  },
  computed: {
    consumerTotalChipLabel() {
      return this.consumerTotal < 10
        ? `0${this.consumerTotal}`
        : this.consumerTotal;
    },
  },
});
</script>

<style lang="scss" scoped>
.tip-view-container {
  display: grid;
  grid-template-columns: 50%;

  &--item {
    padding: 16px 128px;
  }
}
</style>
