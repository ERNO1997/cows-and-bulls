<script setup lang="ts">
import type { PropType } from "vue";
import type { BuiltNumber } from "@/core/built-number";
import TypedDigit from "@/components/TypedDigit.vue";
import { ref } from "vue";

const currentNumber = defineModel({
  type: Object as PropType<BuiltNumber>,
  required: true,
});
const selectedDigit = defineModel("selectedIndex", {
  type: Number,
  default: undefined,
});

function selectDigit(index: number) {
  console.log("select" + index);
  selectedDigit.value = index;
}

function handleKeyDown(event: KeyboardEvent) {
  console.log(event);
}
</script>

<template>
  <div class="typedNumber" @keydown="handleKeyDown">
    <typed-digit
      v-for="(digit, index) in currentNumber.digits"
      :key="`digit${index}`"
      :digit="digit"
      :selected="index === selectedDigit"
      @selected="selectDigit(index)"
    />
  </div>
</template>

<style scoped>
.typedNumber {
  display: flex;
  min-width: 280px;
  justify-content: center;
  padding-left: 16px;
  width: 100%;
}
</style>
