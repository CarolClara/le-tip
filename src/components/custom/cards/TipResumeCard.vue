<template>
  <div class="tip-resume">
    <div
      :class="{ 'tip-resume__card--flat': flat, 'custom-card': !flat }"
      class="tip-resume__card"
    >
      <div class="tip-resume__card__body">
        <v-list class="tip-resume__card__body__list">
          <v-list-item
            v-for="(item, index) in resume"
            :key="`resume-card-item-${index}`"
            class="tip-resume__card__body__list__item"
          >
            <v-list-item-content>
              <v-list-item-subtitle>{{ item.label }}</v-list-item-subtitle>
              <v-list-item-title>
                {{
                  maskMoney(
                    item.value.toString(),
                    currency.toUpperCase(),
                    true,
                    true
                  )
                }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item class="tip-resume__card__body__list__item">
            <v-list-item-content>
              <v-list-item-subtitle>Em R$</v-list-item-subtitle>
              <v-list-item-title>
                <v-skeleton-loader
                  v-if="loading"
                  max-width="96"
                  style="margin: auto"
                  type="text"
                />
                <template v-else>
                  {{ maskMoney(tipBrlAmount.toString(), "BRL", true, true) }}
                </template>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import { mapActions, mapState } from "pinia";
import { useTipStore } from "@/stores/TipStore";

import { maskMoney } from "@/utils/moneyMask";

export default defineComponent({
  name: "TipResumeCard",
  props: {
    flat: { type: Boolean, default: false },
  },
  methods: { maskMoney },
  computed: {
    resume() {
      return [
        { label: "Conta", value: this.amount },
        { label: "Gorjeta", value: this.tipAmount },
        { label: "Total", value: this.total },
        { label: "Por pessoa", value: this.amountPerConsume },
      ];
    },
    ...mapState(useTipStore, ["amount", "tipBrlAmount", "currency", "loading"]),
    ...mapActions(useTipStore, ["total", "tipAmount", "amountPerConsume"]),
  },
});
</script>

<style lang="scss" scoped>
.tip-resume {
  &__card {
    padding: 0 24px;
    width: fit-content;
    min-width: 24vw;
    margin: auto;

    &__body {
      &__list {
        &__item {
          text-align: center;

          .v-list-item__subtitle {
            font-size: 1rem;
          }

          .v-list-item__title {
            font-size: 1.125rem;
            font-weight: 400;
          }
        }
      }
    }
  }
}
</style>
