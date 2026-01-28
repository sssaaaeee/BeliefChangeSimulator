<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const checked = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
</script>

<template>
  <div class="checkbox-group">
    <h2 v-if="label" class="section-label">{{ label }}</h2>
    <div class="inline-options">
      <label class="option toggle-button">
        <input
          type="checkbox"
          v-model="checked"
          :disabled="disabled"
        />
      </label>
    </div>
  </div>
</template>

<style scoped>
.checkbox-group {
  margin-bottom: 16px;
}

.section-label {
  font-size: 12px;
  font-weight: 600;
  color: black;
  margin-bottom: 8px;
}

.inline-options {
  display: flex;
  gap: 12px;
}

.option {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.toggle-button {
  display: flex;
  align-items: center;
  position: relative;
  width: 80px;
  height: 40px;
  border-radius: 40px;
  box-sizing: content-box;
  background-color: #00000033;
  cursor: pointer;
}

.toggle-button:has(:checked) {
  background-color: #0080ff33;
}

.toggle-button::before {
  position: absolute;
  left: 4px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #000000;
  content: '';
}

.toggle-button:has(:checked)::before {
  left: 44px;
  background-color: #0080ff;
}

.toggle-button::after {
  position: absolute;
  left: 20px;
  transform: translateX(-50%);
  color: #fff;
  font-weight: 600;
  font-size: .8em;
  content: 'OFF';
}

.toggle-button:has(:checked)::after {
  left: 60px;
  content: 'ON';
}

.toggle-button input[type="checkbox"] {
  display: none;
}

.toggle-button input[type="checkbox"]:disabled {
  cursor: not-allowed;
}

.option:has(input:disabled) {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
