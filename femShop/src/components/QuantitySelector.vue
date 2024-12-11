<template>
   <div class="QuantitySelector">
        <span class="txt qty">Quantity:</span>
        <button @click="updateQuantity(quantity - 1)"
        :disabled="quantity <= 1">
        -
        </button>
        <span class="qtyn">{{ quantity }}</span>
        <button @click="updateQuantity(quantity + 1)">
        +
        </button>
    </div>
</template>
<script>
export default {
  name: "QuantitySelector",
  props: {
    modelValue: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    quantity: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
  methods: {
    updateQuantity(value) {
      const positiveValue = Math.max(1, Math.floor(value)); // Evitar valores negativos
      this.quantity = positiveValue;
    },
  },
};
</script>
<style>

</style>