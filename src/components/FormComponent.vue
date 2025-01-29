<template>
  <div class="dynamic-form">
    <form @submit.prevent="onSubmit" class="form-group">
      <div v-for="(field) in fieldDefinitions" :key="field.id" class="form-field">
        <label :for="field.id">{{ field.label }}</label>
        <component
            :is="getComponentName(field)"
            :field="field"
            :modelValue="formData[field.id]"
            @update:modelValue="updateFormData($event, field.id)"
        />
      </div>
      <div class="button-container">
        <button type="submit" class="button primary">Guardar</button>
      </div>
    </form>
    <label id="result-label">Result:</label><br />
    <textarea id="result" rows="10" cols="50" disabled></textarea>
  </div>
</template>

<script setup>
import { ref, reactive, computed, defineAsyncComponent, isProxy, toRaw, watch, onBeforeMount } from 'vue';

const emit = defineEmits(['update:modelValue', 'formSubmit']);

const props = defineProps({
  fieldDefinitions: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: Object,
    default: () => ({}),
  },
});

const formData = reactive({});

onBeforeMount(() => {
  initializeFormData();
});

watch(() => props.modelValue, (newVal) => {
  Object.assign(formData, newVal);
}, { deep: true });

const initializeFormData = () => {
  props.fieldDefinitions.forEach((field) => {
    if (field.type === 'SelectUnselect') {
      formData[field.id] = field.options.filter(option => option.enabled).map(option => option.id) || [];
    } else {
      formData[field.id] = '';
    }
  });
};

const updateFormData = (value, fieldId) => {
  formData[fieldId] = value;
  emit('update:modelValue', { ...formData });
};

const onSubmit = () => {
  emit('formSubmit', toRaw(formData));
  document.querySelector('#result').value = JSON.stringify(toRaw(formData));
};

const getComponentName = (field) => {
  let compName = field.type.charAt(0).toUpperCase() + field.type.slice(1);
  compName = compName.replace(/[_-](\w)/g, (_, match) => match.toUpperCase());
  return defineAsyncComponent(() => import(`./fields/${compName}Field.vue`));
};
</script>

<style scoped>
/* Estilos (sin cambios) */
.form-group {
  margin-bottom: 1rem;
}

.is-invalid {
  border-color: red;
}

label {
  display: inline-block;
  width: 100px;
  margin-bottom: 10px;

  &#result-label {
    width: 100%;
    text-align: left;
  }
}
input, select, textarea {
  padding: 5px;
  width: 100%;
  margin-bottom: 10px;
}

[disabled] {
  cursor: not-allowed;
}
.button-container {
  text-align: center;
  margin-bottom: 20px;

  button {
    margin: auto;
  }
}
.form-field {
  display: flex;
  align-items: center;
}
</style>
