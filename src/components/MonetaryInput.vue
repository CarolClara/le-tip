<template>
  <div class="monetary-input">
    <label for="monetary-input">Total</label>
    <v-text-field
      id="monetary-input"
      v-model="model"
      :prepend-inner-icon="`mdi-currency-${currency}`"
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
    maskedMonetaryValue: "0",
    oldValue: undefined,
    currencyLocale: {
      usd: "en-US",
      eur: "en-GB",
    },
  }),
  computed: {
    model: {
      get: function () {
        if (this.maskedMonetaryValue?.length > 0) {
          return this.maskMoneyFormat(this.maskedMonetaryValue);
        }
        return this.maskedMonetaryValue;
      },
      set: function (newValue) {
        this.$data.maskedMonetaryValue = this.unmaskMoneyFormat(newValue);
      },
    },
  },
  methods: {
    handleFocus() {
      this.oldValue = this.maskedMonetaryValue;
      this.model = undefined;
    },
    handleBlur() {
      if (
        this.maskedMonetaryValue === undefined ||
        this.maskedMonetaryValue.length === 0
      ) {
        this.model = this.oldValue;
      }

      this.$emit(
        "update:value",
        this.maskMoneyFormat(this.maskedMonetaryValue)
      );
    },
    maskMoneyFormat(monetaryValue) {
      if (monetaryValue?.length > 0) {
        return Intl.NumberFormat("en-US", {
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
      this.$emit(
        "update:value",
        this.maskMoneyFormat(this.maskedMonetaryValue)
      );
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
