import { ref, onMounted } from "vue";
// import axios from "axios";
import { useSimulationParams } from "../simulationSettings/useSimulationParams";

const { country, selectedScenarioId, interventionStage, degree } = useSimulationParams()
console.log("Simulation Params:", country, selectedScenarioId, interventionStage, degree);

// シングルトン: 状態を関数外で定義して共有
const frames = ref([]);
const currentStep = ref(0); // 現在表示中のステップ
const totalSteps = ref(0); // 総ステップ数
const loading = ref(false); // ローディング状態(フラグ)
const error = ref(null);  // エラーメッセージ
let isMounted = false; // onMountedを一度だけ実行するフラグ

const fetchSimulation = async () => { // シミュレーションを再実行
  loading.value = true;
  error.value = null;

  const countryValue = country.value || 'US';
  const scenarioValue = selectedScenarioId.value || 1;
  const stageValue = interventionStage.value || 'unaware';
  let interventionStageNum = 1;

  if (stageValue === 'unaware') {
    interventionStageNum = 1;
  } else if (stageValue === 'recognized') {
    interventionStageNum = 2;
  } else if (stageValue === 'believing') {
    interventionStageNum = 3;
  }

  const degreeValue = degree.value || 0.1;

  try {
    const jsonPath = `/json/${countryValue}_scenario${scenarioValue}_beta${interventionStageNum}_exposure_deg${degreeValue}.json`;
    console.log(`Fetching JSON from: ${jsonPath}`);
    const response = await fetch(jsonPath);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json_data = await response.json();
    frames.value = json_data.frames;
    totalSteps.value = json_data.total_steps;
    currentStep.value = 0;
    console.log(`Loaded ${totalSteps.value} frames from JSON`);
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
    return `data:image/png;base64,${frames.value[currentStep.value].image}`;
  }
  return null;
};

const nextStep = () => {  // 次のステップへ
  if (currentStep.value < totalSteps.value - 1) {
    console.log(`Advancing from step ${currentStep.value} to ${currentStep.value + 1}`);
    currentStep.value++;
  }
};

const prevStep = () => {  // 前のステップへ
  if (currentStep.value > 0) {
    console.log(`Reversing from step ${currentStep.value} to ${currentStep.value - 1}`);
    currentStep.value--;
  }
};

const goToStep = (step) => {  // 指定したステップへ
  if (step >= 0 && step < totalSteps.value) {
    console.log(`Jumping to step ${step} from step ${currentStep.value}`);
    currentStep.value = step;
  }
};

export function useBeliefNetworkView() {
  // 最初の呼び出し時のみfetchSimulationを実行
  if (!isMounted) {
    isMounted = true;
    onMounted(() => {
      fetchSimulation();
    });
  }

  return {
    frames,
    currentStep,
    totalSteps,
    loading,
    error,
    getCurrentFrame,
    nextStep,
    prevStep,
    goToStep,
    fetchSimulation,
  };
}
