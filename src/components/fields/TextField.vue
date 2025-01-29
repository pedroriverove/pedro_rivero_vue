<template>
  <input
      :type="field.type || 'text'"
      :name="field.id"
      :disabled="field.disabled ?? null"
      :value="modelValue"
      @input="handleInput"
  />
</template>

<script setup>
import { defineEmits, defineProps } from 'vue';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  field: {
    type: Object,
    required: true,
  },
  modelValue: {
    type: [String, Number, Boolean, Object, Array],
    default: '',
  },
});

const handleInput = (event) => {
  const value = event.target.value;
  emit('update:modelValue', value); // Emitir el valor actualizado
};
</script>

<style scoped>
input {
  background: black;
  border-width: 1px;
  padding: 10px;
  color: white;
  border: 1px solid #333;
  width: 100%;
  margin-bottom: 10px;
}
</style>