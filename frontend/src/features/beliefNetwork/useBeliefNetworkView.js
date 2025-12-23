import { ref, onMounted } from "vue";
// import axios from "axios";
import { useSimulationParams } from "../simulationSettings/useSimulationParams";

const { country, selectedScenarioId, interventionEnabled, interventionStage, degree } = useSimulationParams()
console.log("Simulation Params:", country, selectedScenarioId, interventionEnabled, interventionStage, degree);

// シングルトン: 状態を関数外で定義して共有
const frames = ref([]);
const currentStep = ref(0); // 現在表示中のステップ
const totalSteps = ref(0); // 総ステップ数
const stateCounts = ref(null); // 各状態のノード数
const loading = ref(false); // ローディング状態(フラグ)
const error = ref(null);  // エラーメッセージ
const currentParams = ref(null); // 現在表示中のシミュレーションのパラメータスナップショット
const justLoaded = ref(false); // シミュレーションがロードされたばかりかのフラグ
let isMounted = false; // onMountedを一度だけ実行するフラグ

const fetchSimulation = async () => { // シミュレーションを再実行
  loading.value = true;
  error.value = null;

  const countryValue = country.value || 'US';
  const scenarioValue = selectedScenarioId.value || 1;
  const stageValue = interventionStage.value || 'Unrecognized';
  let interventionStageNum = 1;

  if (stageValue === 'Unrecognized') {
    interventionStageNum = 1;
  } else if (stageValue === 'Recognized') {
    interventionStageNum = 2;
  } else if (stageValue === 'Belief') {
    interventionStageNum = 3;
  }

  const degreeValue = degree.value || 0.1;

  // パラメータのスナップショットを保存
  currentParams.value = {
    country: countryValue,
    scenario: scenarioValue,
    interventionEnabled: interventionEnabled.value,
    interventionStage: stageValue,
    degree: degreeValue
  };

  try {
    const jsonPath = interventionEnabled.value
      ? `/metadata/${countryValue}_scenario${scenarioValue}_beta${interventionStageNum}_exposure_deg${degreeValue}.json`
      : `/metadata/${countryValue}_scenario${scenarioValue}_base.json`;
    console.log(`Fetching JSON from: ${jsonPath}`);
    const response = await fetch(jsonPath);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json_data = await response.json();
    frames.value = json_data.frames;
    totalSteps.value = json_data.total_steps;
    // 色ごとのノード数も取得
    if (frames.value.length > 0) {
      stateCounts.value = frames.value[0].state_counts;
      console.log("State counts for first frame:", stateCounts.value);
    }
    currentStep.value = 0;
    console.log(`Loaded ${totalSteps.value} frames from JSON`);
    justLoaded.value = true; // ロード完了フラグを立てる
  } catch (err) {
    console.error("Error fetching simulation JSON:", err);
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

const getCurrentFrame = () => { // 現在のステップの画像URLを取得
  if (frames.value.length > 0 && currentStep.value < frames.value.length) {
    console.log(`Getting frame for step ${currentStep.value}`);
    return `/webp/${currentParams.value.country}_scenario${currentParams.value.scenario}_${currentParams.value.interventionEnabled ? `beta${interventionStageNum}_exposure_deg${currentParams.value.degree}` : "base"}/${frames.value[currentStep.value].image_path}`;
  }
  return null;
};

const nextStep = () => {  // 次のステップへ
  if (currentStep.value < totalSteps.value - 1) {
    console.log(`Advancing from step ${currentStep.value} to ${currentStep.value + 1}`);
    currentStep.value++;
    updateStateCounts();
  }
};

const prevStep = () => {  // 前のステップへ
  if (currentStep.value > 0) {
    console.log(`Reversing from step ${currentStep.value} to ${currentStep.value - 1}`);
    currentStep.value--;
    updateStateCounts();
  }
};

const goToStep = (step) => {  // 指定したステップへ
  if (step >= 0 && step < totalSteps.value) {
    console.log(`Jumping to step ${step} from step ${currentStep.value}`);
    currentStep.value = step;
    updateStateCounts();
  }
};

const updateStateCounts = () => {
  if (frames.value.length > 0 && currentStep.value < frames.value.length) {
    stateCounts.value = frames.value[currentStep.value].state_counts;
  }
};

const resetView = () => {
  currentStep.value = 0;
  updateStateCounts();
};

export function useBeliefNetworkView() {
  // DashboardViewから明示的にfetchSimulationが呼ばれるので、
  // ここではonMountedフックを設定しない

  return {
    frames,
    currentStep,
    totalSteps,
    stateCounts,
    loading,
    error,
    currentParams,
    justLoaded,
    getCurrentFrame,
    nextStep,
    prevStep,
    goToStep,
    fetchSimulation,
    resetView,
  };
}

