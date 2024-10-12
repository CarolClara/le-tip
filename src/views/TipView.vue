<template>
  <div class="tip-view-container">
    <div class="tip-view-container--item">
      <currency-button-toggle @update:currency="handleCurrencyChange" />
      <monetary-input :currency="currency" @update:value="handleValueChange" />

      <label for="tip-slider">
        <span>Gorjeta </span>
        <v-chip color="color-primary" small>{{ tipPercent }}%</v-chip>
      </label>
      <v-slider
        id="tip-slider"
        v-model="tipPercent"
        color="color-secondary"
        max="20"
        min="10"
        track-color="background-light-grey"
      >
        <template #prepend>10</template>
        <template #append>20</template>
      </v-slider>

      <label for="consumer-slider">
        <span>Pessoas </span>
        <v-chip color="color-primary" small>
          {{ consumerTotal < 10 ? `0${consumerTotal}` : consumerTotal }}
        </v-chip>
      </label>
      <v-slider
        id="consumer-slider"
        v-model="consumerTotal"
        color="color-secondary"
        max="16"
        min="2"
        track-color="background-light-grey"
      >
        <template #prepend>02</template>
        <template #append>16</template>
      </v-slider>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { CurrencyButtonToggle, MonetaryInput } from "@/components";

export default defineComponent({
  components: { CurrencyButtonToggle, MonetaryInput },
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
