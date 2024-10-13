<template>
  <div class="tip-resume">
    <div
      :class="{ 'tip-resume__card--flat': flat, 'custom-card': !flat }"
      class="tip-resume__card"
    >
      <div class="tip-resume-card__body">
        <v-list class="tip-resume-card__body__list">
          <v-list-item
            v-for="(item, index) in resume"
            :key="`resume-card-item-${index}`"
            class="tip-resume-card__body__list__item"
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

          <v-list-item class="tip-resume-card__body__list__item">
            <v-list-item-content>
              <v-list-item-subtitle>Em R$</v-list-item-subtitle>
              <v-list-item-title>
                {{ maskMoney(tipBrlAmount.toString(), "BRL", true, true) }}
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
    ...mapState(useTipStore, ["amount", "tipBrlAmount", "currency"]),
    ...mapActions(useTipStore, ["total", "tipAmount", "amountPerConsume"]),
  },
});
</script>

<style lang="scss" scoped>
.tip-resume__card {
  padding: 0 24px;
  width: fit-content;
  margin: auto;
}
</style>
