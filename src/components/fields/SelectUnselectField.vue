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
      this.disabledOptions = this.field.options.filter((option) => this.modelValue.includes(option.id));
      this.availableOptions = this.field.options.filter((option) => !this.modelValue.includes(option.id));
    },
    toggleOption(option) {
      const isDisabled = this.disabledOptions.some((o) => o.id === option.id);
      if (isDisabled) {
        this.disabledOptions = this.disabledOptions.filter((o) => o.id !== option.id);
        this.availableOptions.push(option);
      } else {
        this.availableOptions = this.availableOptions.filter((o) => o.id !== option.id);
        this.disabledOptions.push(option);
      }
      this.updateParent();
    },
    updateParent() {
      const selectedIds = this.disabledOptions.map((option) => option.id);
      this.$emit("update:modelValue", selectedIds);
    },
  },
};
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