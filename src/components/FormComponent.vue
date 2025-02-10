<template>
  <div class="dynamic-form">
    <form @submit.prevent="onSubmit" class="form-group">
      <div v-for="field in fieldDefinitions" :key="field.id" class="form-field">
        <label :for="field.id">{{ field.label }}</label>
        <component
          :is="getComponentName(field)"
          :field="field"
          :modelValue="formData[field.id]"
          @update:modelValue="updateFormData($event, field.id)"
        />
      </div>
      <div class="button-container">
        <button type="submit" class="form-button">Guardar</button>
      </div>
    </form>
    <div class="result-container">
      <label for="result" id="result-label">Result</label>
      <textarea id="result" rows="10" cols="50" disabled></textarea>
    </div>
  </div>
</template>

<script setup>
import {
  reactive,
  defineAsyncComponent,
  toRaw,
  watch,
  onBeforeMount,
} from 'vue'

const emit = defineEmits(['update:modelValue', 'formSubmit'])

const props = defineProps({
  fieldDefinitions: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: Object,
    default: () => ({}),
  },
})

const formData = reactive({})

onBeforeMount(() => {
  initializeFormData()
})

watch(
  () => props.modelValue,
  (newVal) => {
    Object.assign(formData, newVal)
  },
  { deep: true },
)

const initializeFormData = () => {
  props.fieldDefinitions.forEach((field) => {
    if (field.type === 'SelectUnselect') {
      formData[field.id] =
        field.options
          .filter((option) => option.enabled)
          .map((option) => option.id) || []
    } else {
      formData[field.id] = ''
    }
  })
}

const updateFormData = (value, fieldId) => {
  formData[fieldId] = value
  emit('update:modelValue', { ...formData })
}

const onSubmit = () => {
  emit('formSubmit', toRaw(formData))
  document.querySelector('#result').value = JSON.stringify(toRaw(formData))
}

const getComponentName = (field) => {
  let compName = field.type.charAt(0).toUpperCase() + field.type.slice(1)
  compName = compName.replace(/[_-](\w)/g, (_, match) => match.toUpperCase())
  return defineAsyncComponent(() => import(`./fields/${compName}Field.vue`))
}
</script>

<style lang="scss" scoped>
.dynamic-form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;

  .form-group {
    width: 100%;
  }

  .form-field {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 1rem;
  }

  label {
    color: white;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    width: 100%;
    text-align: left;
  }

  input,
  select {
    background-color: #000;
    color: white;
    border: 1px solid #333;
    padding: 10px;
    width: 100%;
    margin-bottom: 10px;
  }

  .button-container {
    text-align: center;
    width: 100%;
    margin-top: 1rem;

    .form-button {
      background-color: #000;
      color: white;
      border: none;
      padding: 10px 20px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      cursor: pointer;
      border-radius: 4px;

      &:hover {
        background-color: #333;
      }
    }
  }

  .result-container {
    width: 100%;
    margin-top: 1rem;

    #result-label {
      color: white;
      font-size: 1rem;
      margin-bottom: 0.5rem;
      display: block;
      text-align: left;
    }

    #result {
      background-color: #666;
      color: white;
      border: 1px solid #333;
      padding: 10px;
      width: 100%;
      margin-bottom: 10px;
    }
  }
}
</style>
