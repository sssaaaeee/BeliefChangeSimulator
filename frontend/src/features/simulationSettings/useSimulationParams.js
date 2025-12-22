// パラメータの状態管理（ref, computed）
import { ref } from 'vue'

// 単純にモジュールスコープで持つ → 全コンポーネントで共有される
const country = ref(null)
const selectedScenarioId = ref(null) // 1〜11
const interventionEnabled = ref(true)
const interventionStage = ref(null)
const degree = ref(0.5) // 0.1〜1.0 のどこか

export function useSimulationParams() {
  return {
    country,
    selectedScenarioId,
    interventionEnabled,
    interventionStage,
    degree,
  }
}
