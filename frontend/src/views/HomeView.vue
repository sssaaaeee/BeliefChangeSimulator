<script setup>
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import { useSimulationParams } from '../features/simulationSettings/useSimulationParams.js'
console.log('HomeView loaded')
const router = useRouter()
const { country, selectedScenarioId, interventionEnabled, interventionStage, degree } = useSimulationParams()
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
const interventionEnabledValue = computed({
  get: () => interventionEnabled.value,
  set: v => (interventionEnabled.value = v),
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
const jpScenarios = [
  { id: 1, label: '地球温暖化は科学者によるでっちあげで、実際は地球は温暖化していない' },
  { id: 2, label: 'ワクチンの有害な副作用は故意に公には隠されている' },
  { id: 3, label: '世界の出来事やルールを裏でコントロールしている一つの団体がある' },
  { id: 4, label: '在日外国人が政治家やマスコミを操っている' },
  { id: 5, label: '日本で起きたこれまでの大きな地震は人工地震である' },
  { id: 6, label: 'ヒト型爬虫類が、世界各国の指導者となり人類を支配している' },
  { id: 7, label: '新型コロナウイルスは実際には存在しない' },
  { id: 8, label: '人類は既に宇宙人と接触しているがこの事実は隠されている' },
  { id: 9, label: '9.11米国同時多発テロ事件には、米国政府が関与している' },
  { id: 10, label: '2020年の米国大統領選挙においてはバイデン陣営に選挙不正があった' },
  { id: 11, label: '政府が飛行機雲で有害物質を空から散布している（ケムトレイル）' },
]
const usScenarios = [
  { id: 1, label: 'The idea of man-made grobal warming is a hoax that was invented to deceive people.' },
  { id: 2, label: 'The truth about the harmful effects of vaccines is being deliberately hidden from the public.' },
  { id: 3, label: 'Regardless of who is officially in charge of governments and other organisations, there is a single group of people who secretly control events and rule the world together.' },
  { id: 4, label: 'The 1969 moon landings were faked.' },
  { id: 5, label: 'Humanoid reptiles are becoming leaders of various countries and controlling humanity.' },
  { id: 6, label: 'Democratic Party members are involved in organized criminal activities.' },
  { id: 7, label: 'Coronavirus is a myth created by some powerful forces, and the virus does not really exist.' },
  { id: 8, label: 'Humans have made contact with aliens and this fact has been deliberately hidden from the public.' },
  { id: 9, label: 'The US Government knowingly helped to make the 9/11 terrorist attacks happen in America on 11 September, 2001.' },
  { id: 10, label: 'There was electoral fraud by the Biden camp in the 2020 U.S. presidential election.' },
  { id: 11, label: 'The government is spraying harmful substances from the sky (chemtrails).' },
]
const scenarios = computed(() => {
  return countryValue.value === 'JP' ? jpScenarios : usScenarios
})
const interventionStageLabel = computed(() => {
  switch (interventionStageValue.value) {
    case 'Unrecognized':
      return 'for Unrecognized Users'
    case 'Recognized':
      return 'for Recognized Users'
    case 'Belief':
      return 'for Belief Users'
    default:
      return ''
  }
})

// on/off ボタンが on のときだけ 下のパラメータ選択を有効にする
const canSelect = computed(() => interventionEnabled.value)

// 必須パラメータがそろっているときだけ Start を有効にする
const canStart = computed(
  () =>
    (!!countryValue.value &&
    !!scenarioIdValue.value &&
      !!interventionStageValue.value) ||
    (!!countryValue.value &&
      !!scenarioIdValue.value &&
      !interventionEnabledValue.value)
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

      <!-- <button class="about-btn" @click="goAbout">
        About
      </button> -->
    </header>

    <!-- パラメータ初期設定カード -->
    <main class="card">
      <!-- Country -->
      <section class="section">
        <h2 class="section-title">Country.</h2>
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
        <h2 class="section-title">Conspiracy.</h2>
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

      <!-- Intervention on/off -->
      <section class="section">
        <h2 class="section-title">Intervention on/off.</h2>
        <div class="row">
          <label class="toggle-button">
            <input
              type="checkbox"
              v-model="interventionEnabledValue"
            />
          </label>
        </div>
      </section>

      <!-- Intervention situation -->
      <section class="section">
        <h2 class="section-title">Intervention situation.</h2>
        <div class="row">
          <label class="option">
            <input
              type="radio"
              value="Unrecognized"
              v-model="interventionStageValue"
              :disabled="!canSelect"
            />
            <span>for Unrecognized Users</span>
          </label>
          <label class="option">
            <input
              type="radio"
              value="Recognized"
              v-model="interventionStageValue"
              :disabled="!canSelect"
            />
            <span>for Recognized Users</span>
          </label>
          <label class="option">
            <input
              type="radio"
              value="Belief"
              v-model="interventionStageValue"
              :disabled="!canSelect"
            />
            <span>for Belief Users</span>
          </label>
        </div>
      </section>

      <!-- Intervention degree -->
      <section class="section">
        <h2 class="section-title">Intervention degree.</h2>
        <p class="degree-caption">
          *“{{ interventionStageLabel }}” is selected.
        </p>
        <div class="degree-slider">
          <span>strong</span>
          <input
            type="range"
            min="0.1"
            max="0.9"
            step="0.1"
            v-model.number="degreeValue"
            :disabled="!canSelect"
          />
          <span>weak</span>
        </div>
        <p class="degree-value">
          degree: {{ degreeValue.toFixed(1) }}
        </p>
      </section>

      <!-- Start ボタン -->
      <div class="actions">
        <button
          class="button-32 start-btn"
          :disabled="!canStart"
          @click="startSimulation"
        >
          Start simulation
        </button>
      </div>
    </main>

    <!-- <button class="button-32">ボタンデザイン</button> -->
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
  padding: 40px 60px 40px;
  box-sizing: border-box;
  position: relative;
  z-index: 0;
}

.actions {
  display: flex;
  justify-content: center;
  margin-top: 12px;
}

.section {
  margin-bottom: 50px;
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
  margin-bottom: 8px;
}

.scenario-item input[type="radio"] {
  margin-top: 3px;
  flex-shrink: 0;
}

.scenario-item span {
  line-height: 1.4;
}

/* on/off ボタンのレイアウト */
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

.toggle-button::before{
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

.toggle-button input {
  display: none;
}

.option:has(input:disabled) {
  opacity: 0.5;
  cursor: not-allowed;
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
  accent-color: #000000;
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
.button-32 {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 250px;
  margin:0 auto;
  padding: .9em 2em;
  overflow: hidden;
  border: 1px solid #000000;
  border-radius: 25px;
  background-color: #fff;
  color: #000000;
  font-size: 1em;
}

.button-32:hover:not(:disabled) {
  background-color: transparent;
  color: #fff;
}

.button-32::before {
  position: absolute;
  z-index: -1;
  transform: rotate(-30deg);
  width: 100%;
  height: 0;
  border-radius: 25px;
  background-color: #000000;
  content: '';
  transition: height .3s ease;
}

.button-32:hover:not(:disabled)::before {
  height: 350%;
}

.button-32::after {
  transform: rotate(45deg);
  width: 5px;
  height: 5px;
  margin-left: 10px;
  border-top: 2px solid #000000;
  border-right: 2px solid #000000;
  content: '';
}

.button-32:hover:not(:disabled)::after {
  border-color: #fff;
}
</style>
