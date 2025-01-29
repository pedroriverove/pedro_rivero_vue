<template>
  <div>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/micasino.png" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <FormComponent :fieldDefinitions="fieldDefinitions" @formSubmit="handleFormSubmit" />
</template>

<script setup lang="ts">
import FormComponent from './components/FormComponent.vue';

const fieldDefinitions = [
  {
    id: 'name',
    label: 'Nombre',
    type: 'Text',
    required: true,
  },
  {
    id: 'options',
    label: 'Options',
    type: 'SelectUnselect',
    options: [
      {
        id: '1',
        label: 'Option 1',
      },
      {
        id: '2',
        label: 'Option 2',
      },
      {
        id: '3',
        label: 'Option 3',
      },
    ],
    required: true,
  }
];

const handleFormSubmit = (formData) => {
  console.log('Datos del formulario:', formData);
};
</script>

<style lang="scss">
html, body {
  background-color: #222;
  margin: 0;
  padding: 0;
  min-height: 100vh;
}

body > div, #app {
  min-height: 100vh;
}
</style>

<style lang="scss" scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;

  &:hover {
    filter: drop-shadow(0 0 2em #646cffaa);

    &.vue {
      filter: drop-shadow(0 0 2em #e3bd00aa);
    }
  }
}

button {
  background-color: #000;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #333;
  }
}
</style>