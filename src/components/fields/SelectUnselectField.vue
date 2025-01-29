<template>
  <div class="select-unselect-field">
    <div class="available-options">
      <h3>Available</h3>
      <ul>
        <li v-for="option in availableOptions" :key="option.id" @click="toggleOption(option)">
          {{ option.label }}
        </li>
      </ul>
    </div>
    <div class="disabled-options">
      <h3>Disabled</h3>
      <ul>
        <li v-for="option in disabledOptions" :key="option.id" @click="toggleOption(option)">
          {{ option.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    field: {
      type: Object,
      required: true,
    },
    modelValue: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      availableOptions: [],
      disabledOptions: [],
    };
  },
  mounted() {
    this.initializeOptions();
  },
  watch: {
    modelValue: {
      handler() {
        this.initializeOptions();
      },
      deep: true
    }
  },
  methods: {
    initializeOptions() {
      this.availableOptions = this.field.options.filter((option) => this.modelValue.includes(option.id));
      this.disabledOptions = this.field.options.filter((option) => !this.modelValue.includes(option.id));
    },
    toggleOption(option) {
      const isAvailable = this.availableOptions.some((o) => o.id === option.id);
      if (isAvailable) {
        this.availableOptions = this.availableOptions.filter((o) => o.id !== option.id);
        this.disabledOptions.push(option);
      } else {
        this.disabledOptions = this.disabledOptions.filter((o) => o.id !== option.id);
        this.availableOptions.push(option);
      }
      this.updateParent();
    },
    updateParent() {
      const selectedIds = this.availableOptions.map((option) => option.id);
      this.$emit("update:modelValue", selectedIds);
    },
  },
};
</script>

<style scoped>
.select-unselect-field {
  display: flex;
  gap: 20px;
}

.available-options,
.disabled-options {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  width: 50%;
  /* Ajusta según tus necesidades */
}

.available-options ul,
.disabled-options ul {
  list-style: none;
  padding: 0;
}

.available-options li,
.disabled-options li {
  padding: 5px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
}

.available-options li:hover {
  background-color: #f0f0f0;
}

.disabled-options li:hover {
  background-color: #f0f0f0;
}

h3 {
  margin-top: 0;
  font-size: 1.2em;
}
</style>
