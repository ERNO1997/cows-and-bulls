<script setup lang="ts">
import { ref } from "vue";
import { Game } from "@/core/game";
import { BuiltNumber } from "@/core/built-number";
import CustomKeyboard from "@/components/CustomKeyboard.vue";

const game = ref(new Game());

function createAttempt(attemptedNumber: BuiltNumber) {
  game.value.makeAttempt(attemptedNumber.digits);
}
</script>

<template>
  <div>
    <custom-keyboard
      style="margin-bottom: 16px"
      @submit-number="(value) => createAttempt(value)"
    />
    {{ game.attempts }}
  </div>
</template>

<style scoped></style>
