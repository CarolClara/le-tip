<template>
  <div class="monetary-input">
    <label for="monetary-input">Total</label>
    <v-text-field
      id="monetary-input"
      v-model="model"
      :prepend-inner-icon="`mdi-currency-${currency}`"
      autocomplete="off"
      class="monetary-input__field"
      clearable
      color="secondary"
      outlined
      @blur="handleBlur"
    />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { maskMoney, rawValue, unmaskMoney } from "@/utils/moneyMask";

export default defineComponent({
  name: "MonetaryInput",
  props: {
    currency: {
      type: String,
      default: "usd",
    },
  },
  data: () => ({
    amount: "0",
    oldAmount: undefined,
    currencyLocale: {
      usd: "en-US",
      eur: "en-GB",
    },
  }),
  computed: {
    model: {
      get: function () {
        if (this.amount?.length > 0) {
          return this.handleMask(this.amount);
        }
        return this.amount;
      },
      set: function (newValue) {
        this.$data.amount = this.handleUnmask(newValue);
      },
    },
  },
  methods: {
    handleBlur() {
      if (this.amount === undefined || this.amount.length === 0) {
        this.model = "0";
      }

      this.handleEmit();
    },
    handleEmit() {
      this.$emit("update:amount", rawValue(this.model));
    },
    handleMask(monetaryValue) {
      return maskMoney(monetaryValue, this.currencyLocale[this.currency]);
    },
    handleUnmask(monetaryValue) {
      return unmaskMoney(monetaryValue);
    },
  },
  watch: {
    currency() {
      this.handleEmit();
    },
  },
});
</script>

<style lang="scss" scoped>
.monetary-input {
  margin-top: 16px;

  &__label {
    font-size: 12rem;
  }
}
</style>
