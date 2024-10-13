import { defineStore } from "pinia";

export const useTipStore = defineStore("tip", {
  state: () => ({
    amount: 0,
    consumerTotal: 2,
    currency: "usd",
    loading: false,
    tipBrlAmount: 0,
    tipPercent: 10,
  }),
  actions: {
    tipAmount() {
      if (this.amount > 0) {
        return (this.amount * (this.tipPercent / 100)).toFixed(2);
      }
      return "0";
    },
    amountPerConsume() {
      if (this.amount > 0) {
        const totalRaw = parseFloat(this.total());
        return (totalRaw / this.consumerTotal).toFixed(2);
      }
      return this.amount;
    },
    total() {
      const amountRaw = parseFloat(this.tipAmount());
      return (this.amount + amountRaw).toFixed(2);
    },
  },
});
