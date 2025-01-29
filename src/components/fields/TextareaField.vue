<template>
  <textarea
      :id="field.id"
      :value="modelValue"
      @input="handleInput"
  ></textarea>
</template>

<script setup>
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
  emit('update:modelValue', value);
};
</script>

<style scoped>
textarea {
  background-color: #444 !important;
  color: white;
  border: 1px solid #333;
  padding: 10px;
  width: 100%;
  margin-bottom: 10px;
}
</style>