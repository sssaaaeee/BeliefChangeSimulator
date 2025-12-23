// パラメータの状態管理（ref, computed）
import { ref, watch } from 'vue'

// localStorageから値を復元（存在しなければデフォルト値）
const getStoredValue = (key, defaultValue) => {
  const stored = localStorage.getItem(key)
  return stored !== null ? JSON.parse(stored) : defaultValue
}

// 単純にモジュールスコープで持つ → 全コンポーネントで共有される
const country = ref(getStoredValue('sim_country', 'US'))
const selectedScenarioId = ref(getStoredValue('sim_scenarioId', 1))
const interventionEnabled = ref(getStoredValue('sim_interventionEnabled', false))
const interventionStage = ref(getStoredValue('sim_interventionStage', 'Unrecognized'))
const degree = ref(getStoredValue('sim_degree', 0.5))

// 値が変更されたらlocalStorageに保存
watch(country, (newValue) => {
  localStorage.setItem('sim_country', JSON.stringify(newValue))
})
watch(selectedScenarioId, (newValue) => {
  localStorage.setItem('sim_scenarioId', JSON.stringify(newValue))
})
watch(interventionEnabled, (newValue) => {
  localStorage.setItem('sim_interventionEnabled', JSON.stringify(newValue))
})
watch(interventionStage, (newValue) => {
  localStorage.setItem('sim_interventionStage', JSON.stringify(newValue))
})
watch(degree, (newValue) => {
  localStorage.setItem('sim_degree', JSON.stringify(newValue))
})

export function useSimulationParams() {
  return {
    country,
    selectedScenarioId,
    interventionEnabled,
    interventionStage,
    degree,
  }
}
