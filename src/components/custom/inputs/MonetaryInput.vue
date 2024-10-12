<template>
  <div class="monetary-input">
    <label for="monetary-input">Total</label>
    <v-text-field
      id="monetary-input"
      v-model="model"
      :prepend-inner-icon="`mdi-currency-${currency}`"
      autocomplete="off"
      class="monetary-input__field"
      color="secondary"
      outlined
      @blur="handleBlur"
      @focus="handleFocus"
    />
  </div>
</template>

<script>
import { defineComponent } from "vue";

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
          return this.maskMoneyFormat(this.amount);
        }
        return this.amount;
      },
      set: function (newValue) {
        this.$data.amount = this.unmaskMoneyFormat(newValue);
      },
    },
  },
  methods: {
    handleFocus() {
      this.oldAmount = this.amount;
      this.model = undefined;
    },
    handleBlur() {
      if (this.amount === undefined || this.amount.length === 0) {
        this.model = this.oldAmount;
      }

      this.$emit("update:value", this.maskMoneyFormat(this.amount));
    },
    maskMoneyFormat(monetaryValue) {
      if (monetaryValue?.length > 0) {
        return Intl.NumberFormat(this.currencyLocale[this.currency], {
          minimumFractionDigits: 2,
        }).format(parseFloat(monetaryValue) / 100);
      }
    },
    unmaskMoneyFormat(monetaryValue) {
      if (monetaryValue?.length > 0) {
        const value = monetaryValue.toLocaleString();
        return value
          .replaceAll(".", "")
          .replace(",", "")
          .replace(/[^0-9,.-]/g, "");
      }
    },
  },
  watch: {
    currency() {
      this.$emit("update:value", this.maskMoneyFormat(this.amount));
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
