<script setup>
import { computed } from 'vue'
import { useSimulationParams } from '../../simulationSettings/useSimulationParams.js'

// 親（Dashboard）へ送るイベント
const emit = defineEmits(['restart', 'help'])

const { country, selectedScenarioId, interventionStage, degree } =
  useSimulationParams()

// v-model 用のラッパ
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
// シナリオ11個（文言は必要に応じて修正）
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

const degreeDisplay = computed(() => degreeValue.value.toFixed(1))

const onClickRestart = () => emit('restart')
const onClickHelp = () => emit('help')
const onClickHidden = () => emit('hidden')
</script>

<template>
<div class="settings-panel-wrapper">
  <div class="settings-root">
    <header class="settings-header">
      <h1 class="settings-title">Settings</h1>
      <div class="header-buttons">
        <button class="help-btn" @click="onClickHelp">?</button>
        <button class="hidden-btn" @click="onClickHidden">←</button>
      </div>
    </header>

    <!--country-->
    <section class="section">
      <h2 class="section-label">country</h2>
      <div class="inline-options">
        <label class="option">
          <input
            type="radio"
            value="US"
            v-model="countryValue"
          />
          <span>US</span>
        </label>
        <label class="option">
          <input
            type="radio"
            value="JP"
            v-model="countryValue"
          />
          <span>JP</span>
        </label>
      </div>
    </section>

    <!--scenario-->
    <section class="section">
      <h2 class="section-label">conspiracy</h2>
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

    <!--intervention situation-->
    <section class="section">
      <h2 class="section-label">intervention</h2>
      <div class="inline-options">
        <label class="option">
          <input
            type="radio"
            value="Unrecognized"
            v-model="interventionStageValue"
          />
          <span>for Unrecognized Users</span>
        </label>
        <label class="option">
          <input
            type="radio"
            value="Recognized"
            v-model="interventionStageValue"
          />
          <span>for Recognized Users</span>
        </label>
        <label class="option">
          <input
            type="radio"
            value="Belief"
            v-model="interventionStageValue"
          />
          <span>for Belief Users</span>
        </label>
      </div>
    </section>

    <!--degree-->
    <section class="section">
      <h2 class="section-label">degree</h2>
      <div class="degree-row">
        <span class="degree-min">strong</span>
        <input
          class="degree-slider"
          type="range"
          min="0.1"
          max="0.9"
          step="0.1"
          v-model.number="degreeValue"
        />
        <span class="degree-max">weak</span>
      </div>
      <p class="degree-value">degree: {{ degreeDisplay }}</p>
    </section>

    <!-- フッター用の余白 -->
    <div class="spacer"></div>
  </div>

  <div class="footer">
    <button
      class="restart-btn"
      type="button"
      @click="onClickRestart"
    >
      Restart Simulation
    </button>
  </div>
</div>
</template>

<style scoped>
.settings-panel-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.settings-root {
  flex: 1;
  display: flex;
  flex-direction: column;
  font-size: 13px;
  overflow-y: auto;
  padding: 25px;
}

/* 上のタイトル行 */
.settings-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.settings-title {
  font-size: 18px;
  font-weight: 600;
}

.help-btn {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background: #111827;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
}

.help-btn:hover {
  /* 少し大きくする */
  transform: scale(1.1);
  /* スムーズに拡大 */
  transition: transform 0.2s;
}

.header-buttons {
  display: flex;
  gap: 8px;
  margin-right: -25px;
}

.hidden-btn {
  width: 40px;
  height: 28px;
  border-radius: 8px 0 0 8px;
  border: none;
  background: #111827;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.hidden-btn:hover {
  background: #374151;
}

/* 各ブロック */
.section {
  margin-bottom: 16px;
}

.section-label {
  font-size: 12px;
  text-transform: lowercase;
  margin-bottom: 4px;
}

/* country / intervention の横並び */
.inline-options {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.option {
  display: flex;
  align-items: center;
  gap: 6px;
}

/* scenario リスト */
.scenario-list {
  list-style: none;
  margin: 0;
  padding: 0;
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

/* degree スライダー */
.degree-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.degree-slider {
  flex: 1;
  accent-color: #000000;
}

.degree-min,
.degree-max {
  font-size: 11px;
  color: #6b7280;
}

.degree-value {
  font-size: 11px;
  text-align: right;
  color: #4b5563;
  margin-top: 4px;
}

/* フッター用の余白 */
.spacer {
  height: 120px;
  flex-shrink: 0;
}

/* フッタの Restart ボタン */
.footer {
  margin: 0 auto;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
}

.restart-btn {
  width: 90%;
  height: 40px;
  padding: 8px 0;
  border-radius: 9999px;
  background: black;
  border: solid 1px black;
  color: white;
  font-size: 13px;
  cursor: pointer;
  margin-top: 30px;
}
</style>
