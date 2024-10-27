<script setup lang="ts">
const emit = defineEmits(["selected"]);

const props = defineProps({
  digit: { type: Number, required: true },
  selected: { type: Boolean, default: false },
});
</script>

<template>
  <div
    class="digit"
    :class="{ selected: selected }"
    @click="$emit('selected')"
    @keydown="console.log('lol')"
  >
    {{ digit === -1 ? "" : digit }}
  </div>
</template>

<style scoped>
.digit {
  height: 70px;
  width: 50px;
  background-color: #282828;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  font-size: 1.5rem;
  font-weight: bold;
  margin-right: 16px;
}

.selected {
  box-shadow: #00bd7e 0 0 0 2px;
}
</style>
