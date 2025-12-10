import { ref, onMounted } from "vue";
import axios from "axios";
import { useSimulationParams } from "../simulationSettings/useSimulationParams";

const { country, selectedScenarioId, interventionStage, degree } = useSimulationParams()
console.log("Simulation Params:", country, selectedScenarioId, interventionStage, degree);

export function useBeliefNetworkView() {
  const frames = ref([]);
  const currentStep = ref(0); // 現在表示中のステップ
  const totalSteps = ref(0); // 総ステップ数
  const loading = ref(false); // ローディング状態(フラグ)
  const error = ref(null);  // エラーメッセージ

  const fetchSimulation = () => { // シミュレーションを再実行
    loading.value = true;
    error.value = null;

    axios.post("http://localhost:5001/run", {
      country: country.value,
      selectedScenarioId: selectedScenarioId.value,
      interventionStage: interventionStage.value,
      degree: degree.value,
    })
      .then((response) => {
        if (response.data.success) {
          frames.value = response.data.frames;
          totalSteps.value = response.data.total_steps;
          currentStep.value = 0;
          console.log(`Loaded ${totalSteps.value} frames`);
        } else {
          error.value = response.data.error || "Unknown error";
        }
      })
      .catch((err) => {
        console.error("Error fetching simulation:", err);
        error.value = err.message;
      })
      .finally(() => {
        loading.value = false;
      });
  };

  const getCurrentFrame = () => { // 現在のステップの画像URLを取得
    if (frames.value.length > 0 && currentStep.value < frames.value.length) {
      return `data:image/png;base64,${frames.value[currentStep.value].image}`;
    }
    return null;
  };

  const nextStep = () => {  // 次のステップへ
    if (currentStep.value < totalSteps.value - 1) {
      currentStep.value++;
    }
  };

  const prevStep = () => {  // 前のステップへ
    if (currentStep.value > 0) {
      currentStep.value--;
    }
  };

  const goToStep = (step) => {  // 指定したステップへ
    if (step >= 0 && step < totalSteps.value) {
      currentStep.value = step;
    }
  };

  onMounted(() => {
    fetchSimulation();
  });

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
