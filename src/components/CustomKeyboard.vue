<script setup lang="ts">
import TypedNumber from "@/components/TypedNumber.vue";
import { ref } from "vue";
import { BuiltNumber } from "@/core/built-number";
import { useMagicKeys, whenever } from "@vueuse/core";

const emit = defineEmits(["submitNumber"]);

const currentNumber = ref<BuiltNumber>(BuiltNumber.empty());
const selectedIndex = ref<number>(0);

const keys = useMagicKeys();

function moveToNextDigitThatMatches(fn: (value: number) => boolean) {
  for (let i = selectedIndex.value + 1; i < 4; i++) {
    if (fn(currentNumber.value.digits[i])) {
      selectedIndex.value = i;
      return true;
    }
  }
  return false;
}

function moveToPreviousDigitThatMatches(fn: (value: number) => boolean) {
  for (let i = selectedIndex.value - 1; i >= 0; i--) {
    if (fn(currentNumber.value.digits[i])) {
      selectedIndex.value = i;
      return true;
    }
  }
  return false;
}

function typeNumber(digit: number) {
  if (
    selectedIndex.value !== undefined &&
    !currentNumber.value.digits.includes(digit) &&
    !(selectedIndex.value === 0 && digit === 0)
  ) {
    currentNumber.value.digits[selectedIndex.value] = digit;
    const isEmpty: (value: number) => boolean = (digit) => digit === -1;
    if (!moveToNextDigitThatMatches(isEmpty)) {
      moveToPreviousDigitThatMatches(isEmpty);
    }
  }
}

function deleteNumber() {
  if (selectedIndex.value !== undefined) {
    currentNumber.value.digits[selectedIndex.value] = -1;
    const isNotEmpty: (value: number) => boolean = (digit) => digit !== -1;
    if (!moveToPreviousDigitThatMatches(isNotEmpty)) {
      if (!moveToNextDigitThatMatches(isNotEmpty)) {
        selectedIndex.value = 0;
      }
    }
  }
}

function submitNumber() {
  if (currentNumber.value.digits.filter((digit) => digit === -1).length === 0) {
    emit("submitNumber", currentNumber.value);
  }
}

whenever(keys.arrowleft, (isPressed) => {
  if (isPressed && selectedIndex.value > 0) {
    selectedIndex.value = selectedIndex.value - 1;
  }
});

whenever(keys.arrowright, (isPressed) => {
  if (isPressed && selectedIndex.value < 3) {
    selectedIndex.value = selectedIndex.value + 1;
  }
});

whenever(keys["0"], (isPressed) => {
  if (isPressed) {
    typeNumber(0);
  }
});

whenever(keys["1"], (isPressed) => {
  if (isPressed) {
    typeNumber(1);
  }
});

whenever(keys["2"], (isPressed) => {
  if (isPressed) {
    typeNumber(2);
  }
});

whenever(keys["3"], (isPressed) => {
  if (isPressed) {
    typeNumber(3);
  }
});

whenever(keys["4"], (isPressed) => {
  if (isPressed) {
    typeNumber(4);
  }
});

whenever(keys["5"], (isPressed) => {
  if (isPressed) {
    typeNumber(5);
  }
});

whenever(keys["6"], (isPressed) => {
  if (isPressed) {
    typeNumber(6);
  }
});

whenever(keys["7"], (isPressed) => {
  if (isPressed) {
    typeNumber(7);
  }
});

whenever(keys["8"], (isPressed) => {
  if (isPressed) {
    typeNumber(8);
  }
});

whenever(keys["9"], (isPressed) => {
  if (isPressed) {
    typeNumber(9);
  }
});

whenever(keys.backspace, (isPressed) => {
  if (isPressed) {
    deleteNumber();
  }
});

whenever(keys.enter, (isPressed) => {
  if (isPressed) {
    submitNumber();
  }
});
</script>

<template>
  <div class="content">
    <typed-number
      v-model="currentNumber"
      v-model:selected-index="selectedIndex"
    />
    <div class="keyboard">
      <div class="button-row">
        <button
          v-for="digit in [1, 2, 3]"
          :key="`button${digit}`"
          @click="typeNumber(digit)"
        >
          {{ digit }}
        </button>
      </div>
      <div class="button-row">
        <button
          v-for="digit in [4, 5, 6]"
          :key="`button${digit}`"
          @click="typeNumber(digit)"
        >
          {{ digit }}
        </button>
      </div>
      <div class="button-row">
        <button
          v-for="digit in [7, 8, 9]"
          :key="`button${digit}`"
          @click="typeNumber(digit)"
        >
          {{ digit }}
        </button>
      </div>
      <div class="button-row">
        <button class="submit" @click="submitNumber()">OK</button>
        <button @click="typeNumber(0)">0</button>
        <button class="delete" @click="deleteNumber()">Delete</button>
      </div>

      keyboard
    </div>
  </div>
</template>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  max-width: 400px;
}

.keyboard {
  margin: 32px 0;
}

button {
  background-color: #00bd7e;
  border: none;
  border-radius: 8px;
  width: 100%;
  margin-right: 16px;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 8px 0;
  color: #282828;
}

button:hover {
  background-color: #008a4b;
}

button.submit {
  background-color: #007ebd;
}

button.submit:hover {
  background-color: #004b8a;
}

button.delete {
  background-color: #bd7e7e;
}

button.delete:hover {
  background-color: #8a4b4b;
}

.button-row {
  display: flex;
  padding-left: 16px;
  margin-bottom: 16px;
}
</style>
