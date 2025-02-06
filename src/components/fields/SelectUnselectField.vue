<template>
  <div class="select-unselect-field">
    <div class="available-options">
      <h3>Available ({{ availableOptions.length }})</h3>
      <ul>
        <li v-for="option in availableOptions" :key="option.id" @click="toggleOption(option)">
          {{ option.label }}
        </li>
      </ul>
    </div>
    <div class="disabled-options">
      <h3>Disabled ({{ disabledOptions.length }})</h3>
      <ul>
        <li v-for="option in disabledOptions" :key="option.id" @click="toggleOption(option)">
          {{ option.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';

const props = defineProps({
  field: {
    type: Object,
    required: true,
  },
  modelValue: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['update:modelValue']);

const availableOptions = ref([]);
const disabledOptions = ref([]);

const initializeOptions = () => {
  disabledOptions.value = props.field.options.filter((option) => props.modelValue.includes(option.id));
  availableOptions.value = props.field.options.filter((option) => !props.modelValue.includes(option.id));
};

const toggleOption = (option) => {
  const isDisabled = disabledOptions.value.some((o) => o.id === option.id);
  if (isDisabled) {
    disabledOptions.value = disabledOptions.value.filter((o) => o.id !== option.id);
    availableOptions.value.push(option);
  } else {
    availableOptions.value = availableOptions.value.filter((o) => o.id !== option.id);
    disabledOptions.value.push(option);
  }
  updateParent();
};

const updateParent = () => {
  const selectedIds = disabledOptions.value.map((option) => option.id);
  emit('update:modelValue', selectedIds);
};

onMounted(() => {
  initializeOptions();
});

watch(() => props.modelValue, () => {
  initializeOptions();
}, { deep: true });
</script>

<style lang="scss" scoped>
.select-unselect-field {
  display: flex;
  gap: 20px;

  .available-options,
  .disabled-options {
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
    width: 275px;

    h3 {
      color: white;
      margin-bottom: 10px;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        padding: 8px;
        cursor: pointer;
        border-bottom: 1px solid #444;
        color: white;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: #444;
        }

        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
}
</style>