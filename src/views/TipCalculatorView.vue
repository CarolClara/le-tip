<template>
  <div class="tip-calc-view-container">
    <div class="tip-calc-view-container__controls col-12 col-lg-6">
      <currency-button-toggle @update:currency="handleCurrencyChange" />
      <monetary-input
        :currency="tipStore.currency"
        @update:amount="handleValueChange"
      />

      <base-slider
        v-model="tipStore.tipPercent"
        :chip-label="`${tipStore.tipPercent}%`"
        label="Gorjeta"
        max="20"
        min="10"
      />

      <base-slider
        v-model="tipStore.consumerTotal"
        :chip-label="consumerTotalChipLabel"
        label="Pessoas"
        max="16"
        min="2"
        min-label="02"
      />
    </div>
    <template class="tip-calc-view-container__resume">
      <div
        v-if="!isMobile"
        class="tip-calc-view-container__resume__card col-12 col-lg-6"
      >
        <tip-calculator-resume-card />
      </div>

      <div v-else class="tip-calc-view-container__resume__drawer">
        <v-btn
          class="tip-calc-view-container__resume__drawer__btn"
          icon
          style="margin-top: auto; margin-left: auto"
          @click="openResume = !openResume"
        >
          <v-icon>mdi-chevron-right-circle</v-icon>
        </v-btn>
        <tip-resume-drawer v-model="openResume" />
      </div>
    </template>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapStores } from "pinia";

import { useTipStore } from "@/stores/TipStore";

import { BaseSlider } from "@/components/base";
import {
  CurrencyButtonToggle,
  MonetaryInput,
  TipCalculatorResumeCard,
  TipResumeDrawer,
} from "@/components/custom";

import { convertToBrlCurrency } from "@/services/ConvertService";

export default defineComponent({
  components: {
    BaseSlider,
    CurrencyButtonToggle,
    MonetaryInput,
    TipCalculatorResumeCard,
    TipResumeDrawer,
  },
  data: () => ({
    openResume: false,
  }),
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.mobile;
    },
    consumerTotalChipLabel() {
      return this.tipStore.consumerTotal < 10
        ? `0${this.tipStore.consumerTotal}`
        : "" + this.tipStore.consumerTotal;
    },
    ...mapStores(useTipStore),
  },
  methods: {
    handleCurrencyChange(currency) {
      this.tipStore.currency = currency;
    },
    handleValueChange(amount) {
      this.tipStore.amount = amount;
      this.getBrlAmount();
    },
    getBrlAmount() {
      this.tipStore.loading = true;
      convertToBrlCurrency({
        amount: parseFloat(this.tipStore.tipAmount()),
        currency: this.tipStore.currency,
      })
        .then((result) => {
          const [{ quoteAmount }] = result;
          this.tipStore.tipBrlAmount = quoteAmount;
        })
        .finally(() => {
          this.tipStore.loading = false;
        });
    },
  },
});
</script>

<style lang="scss" scoped>
.tip-calc-view-container {
  display: flex;
  flex-wrap: wrap;
  height: 100%;

  &__resume {
    &__drawer {
      align-self: flex-end;
      margin-left: auto;
    }
  }
}
</style>
