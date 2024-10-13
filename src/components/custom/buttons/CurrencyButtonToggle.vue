<template>
  <div class="currency-button-toggle">
    <div class="currency-button-toggle__card custom-card">
      <v-btn-toggle
        v-model="currentCurrency"
        borderless
        class="currency-button-toggle__card__toggle"
        @change="(value) => $emit('update:currency', value)"
      >
        <v-btn
          id="btn-currency-usd"
          :data-active="currentCurrency === 'usd'"
          class="currency-button-toggle__card__toggle__btn currency-button-toggle__card__toggle__btn-usd"
          value="usd"
        >
          <span
            class="currency-button-toggle__card__toggle__btn--label text--md"
          >
            USD
          </span>
          <v-icon
            class="currency-button-toggle__card__toggle__btn--icon icon--md"
          >
            mdi-currency-usd
          </v-icon>
        </v-btn>
        <v-btn
          :data-active="currentCurrency === 'eur'"
          class="currency-button-toggle__card__toggle__btn currency-button-toggle__card__toggle__btn-eur"
          value="eur"
        >
          <span
            class="currency-button-toggle__card__toggle__btn--label text--md label--md"
          >
            EUR
          </span>
          <v-icon
            class="currency-button-toggle__card__toggle__btn--icon icon--md"
          >
            mdi-currency-eur
          </v-icon>
        </v-btn>
      </v-btn-toggle>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "CurrencyButtonToggle",
  data() {
    return { currentCurrency: "usd" };
  },
});
</script>

<style lang="scss" scoped>
.currency-button-toggle {
  max-width: fit-content;
  margin: auto;

  &__card {
    padding: 4px;

    .v-btn-toggle::v-deep {
      border-radius: 8px;

      .v-btn {
        border-radius: 8px;
        border-style: none;
        font-size: 0.875rem;
        padding: 8px 16px;
        background-color: $background-light-grey;
        color: $color-secondary;

        &[data-active="true"] {
          background-color: $color-primary;
          font-weight: 600;

          &:hover {
            background-color: $color-primary;
          }
        }

        &:first-child {
          margin-right: 4px;
        }

        &:hover {
          background-color: transparentize($color-primary, 0.5);
        }

        &:focus {
          &::before {
            opacity: 0.1;
          }
        }

        &::before {
          transition: none;
        }

        &--label {
          text-transform: capitalize;
          margin-right: 4px;
        }

        &--active {
          opacity: unset;

          &::before {
            opacity: unset;
            background-color: transparent;
          }
        }
      }
    }
  }
}
</style>
