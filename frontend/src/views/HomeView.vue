<script setup>
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { useSimulationParams } from '../features/simulationSettings/useSimulationParams.js'
console.log('HomeView loaded')
const router = useRouter()
const { country, selectedScenarioId, interventionStage, degree } = useSimulationParams()
function startSimulation() {
  if (!canStart.value) return
  // この時点で useSimulationParams の値が埋まっているので
  // DashboardView の SettingsPanel でも同じ値が使える
  router.push('/simulation')
}
function goAbout() {
  router.push('/about')
}
// v-model 用の computed ラッパ（そのまま共有ストアを触る）
const countryValue = computed({
  get: () => country.value,
  set: v => (country.value = v),
})
const scenarioIdValue = computed({
  get: () => selectedScenarioId.value,
  set: v => (selectedScenarioId.value = v),
})
const interventionStageValue = computed({
  get: () => interventionStage.value,
  set: v => (interventionStage.value = v),
})
const degreeValue = computed({
  get: () => degree.value,
  set: v => (degree.value = v),
})
// シナリオ11種類（ラベルは条件によって差し替え）
const scenarios = [
  { id: 1, label: '地球温暖化は科学者によるでっちあげで、実際は地球は温暖化していない' },
  { id: 2, label: 'ワクチンの有害な副作用は故意に公には隠されている' },
  { id: 3, label: '世界の出来事やルールを裏でコントロールしている一つの団体がある' },
  { id: 4, label: '在日外国人が政治家やマスコミを操っている' },
  { id: 5, label: '日本で起きたこれまでの大きな地震は人工地震である' },
  { id: 6, label: 'ヒト型爬虫類が、世界各国の指導者となり人類を支配している' },
  { id: 7, label: '新型コロナウイルスは実際には存在しない' },
  { id: 8, label: '9.11米国同時多発テロ事件には、米国政府が関与している' },
  { id: 9, label: '2020年の米国大統領選挙においてはバイデン陣営に選挙不正があった' },
  { id: 10, label: '政府が飛行機雲で有害物質を空から散布している（ケムトレイル）' },
  { id: 11, label: '（追加シナリオ）' },
]
const interventionStageLabel = computed(() => {
  switch (interventionStageValue.value) {
    case 'unaware':
      return 'for Unaware Users'
    case 'recognized':
      return 'for Recognized Users'
    case 'believing':
      return 'for Believing Users'
    default:
      return ''
  }
})

// 必須パラメータがそろっているときだけ Start を有効にする
const canStart = computed(
  () =>
    !!countryValue.value &&
    !!scenarioIdValue.value &&
    !!interventionStageValue.value,
)
</script>

<template>
  <div class="home">
    <header class="hero">
      <h1 class="title">
        Simulation of User Belief<br />
        Changes in Virtual SNS
      </h1>
      <p class="subtitle">
        Intuitively understand the process by which conspiracy theories spread
        due to differences in information environments.
      </p>

      <button class="about-btn" @click="goAbout">
        About
      </button>
    </header>

    <!-- パラメータ初期設定カード -->
    <main class="card">
      <!-- Country -->
      <section class="section">
        <h2 class="section-title">Choose country.</h2>
        <div class="row">
          <label>
            <input
              type="radio"
              value="US"
              v-model="countryValue"
            />
            <span>US</span>
          </label>
          <label>
            <input
              type="radio"
              value="JP"
              v-model="countryValue"
            />
            <span>JP</span>
          </label>
        </div>
      </section>

      <!-- Scenario -->
      <section class="section">
        <h2 class="section-title">Choose scenario.</h2>
        <ul class="scenario-list">
          <li
            v-for="scenario in scenarios"
            :key="scenario.id"
          >
            <label class="scenario-item">
              <input
                type="radio"
                :value="scenario.id"
                v-model="scenarioIdValue"
              />
              <span>{{ scenario.label }}</span>
            </label>
          </li>
        </ul>
      </section>

      <!-- Intervention situation -->
      <section class="section">
        <h2 class="section-title">Choose intervention situation.</h2>
        <div class="row">
          <label>
            <input
              type="radio"
              value="unaware"
              v-model="interventionStageValue"
            />
            <span>for Unaware Users</span>
          </label>
          <label>
            <input
              type="radio"
              value="recognized"
              v-model="interventionStageValue"
            />
            <span>for Recognized Users</span>
          </label>
          <label>
            <input
              type="radio"
              value="believing"
              v-model="interventionStageValue"
            />
            <span>for Believing Users</span>
          </label>
        </div>
      </section>

      <!-- Intervention degree -->
      <section class="section">
        <h2 class="section-title">Choose intervention degree.</h2>
        <p class="degree-caption">
          *“{{ interventionStageLabel }}” is selected.
        </p>
        <div class="degree-slider">
          <span>0.1</span>
          <input
            type="range"
            min="0.1"
            max="1.0"
            step="0.1"
            v-model.number="degreeValue"
          />
          <span>1.0</span>
        </div>
        <p class="degree-value">
          degree: {{ degreeValue.toFixed(1) }}
        </p>
      </section>

      <!-- Start ボタン -->
      <div class="actions">
        <button
          class="start-btn"
          :disabled="!canStart"
          @click="startSimulation"
        >
          Start simulation
        </button>
      </div>
    </main>
  </div>
</template>

<style scoped>
.home {
  min-height: 100vh;
  padding: 40px 16px 48px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero {
  text-align: center;
  margin-bottom: 32px;
}

.title {
  font-size: 32px;
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 12px;
}

.subtitle {
  font-size: 14px;
  color: #6b7280;
  max-width: 520px;
  margin: 0 auto 16px;
}

.about-btn {
  padding: 6px 16px;
  border-radius: 9999px;
  border: 1px solid #111827;
  background: #fff;
  font-size: 13px;
  cursor: pointer;
}

.card {
  width: 100%;
  max-width: 720px;
  background: #f4f4f5;
  border-radius: 24px;
  padding: 32px 24px 24px;
  box-sizing: border-box;
}

.actions {
  display: flex;
  justify-content: center;
  margin-top: 12px;
}

.section {
  margin-bottom: 28px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 16px;
}

.row {
  display: flex;
  justify-content: center;
  gap: 24px;
  font-size: 14px;
}

.section {
  margin-bottom: 28px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 16px;
}

.row {
  display: flex;
  justify-content: center;
  gap: 24px;
  font-size: 14px;
}

.row label {
  display: flex;
  align-items: center;
  gap: 6px;
}

.scenario-list {
  list-style: none;
  padding: 0 16px;
  margin: 0;
  font-size: 13px;
}

.scenario-item {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  margin-bottom: 6px;
}

.degree-caption {
  font-size: 12px;
  color: #6b7280;
  text-align: center;
  margin-bottom: 8px;
}

.degree-slider {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}

.degree-slider input[type='range'] {
  flex: 1;
}

.degree-value {
  font-size: 12px;
  text-align: right;
  margin-top: 4px;
  color: #4b5563;
}

.actions {
  display: flex;
  justify-content: center;
  margin-top: 12px;
}

.start-btn {
  padding: 10px 28px;
  border-radius: 9999px;
  border: none;
  background: #111827;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}

.start-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}
</style>
