<template>
  <div class="tip-calc-resume-card">
    <v-card class="tip-calc-resume-card__field" outlined>
      <v-card-text class="tip-calc-resume-card__field__body">
        <v-list-item
          v-for="(item, index) in resume"
          :key="`${item.label.toLowerCase()}-${index}`"
          class="tip-calc-resume-card__field__body--list-item"
        >
          <v-list-item-content>
            <v-list-item-subtitle>{{ item.label }}</v-list-item-subtitle>
            <v-list-item-title>{{ item.value }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapState } from "pinia";
import { useTipStore } from "@/state/TipStore";

export default defineComponent({
  name: "TipCalculatorResumeCard",
  computed: {
    resume() {
      return [
        { label: "Conta", value: this.amount },
        { label: "Gorjeta", value: this.tipAmount },
        { label: "Total", value: this.total },
        { label: "Por pessoa", value: this.amountPerConsume },
        { label: "Em R$", value: this.tipBrlAmount },
      ];
    },
    ...mapState(useTipStore, ["amount", "tipBrlAmount"]),
    ...mapActions(useTipStore, ["total", "tipAmount", "amountPerConsume"]),
  },
});
</script>

<style lang="scss" scoped>
.tip-calc-resume-card {
  &__field {
    &__body {
      margin: auto;
    }
  }
}
</style>
