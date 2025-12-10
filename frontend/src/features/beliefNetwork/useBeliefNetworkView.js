import { ref, onMounted } from "vue";
import axios from "axios";
import { useSimulationParams } from "../simulationSettings/useSimulationParams";

const { country, selectedScenarioId, interventionStage, degree } = useSimulationParams()
console.log("Simulation Params:", country, selectedScenarioId, interventionStage, degree);

export function useBeliefNetworkView() {
  const output = ref(null);

  onMounted(() => {
    axios.post("http://localhost:5001/run")
      .then((response) => {
        console.log("Python output:", response.data.output);
        output.value = response.data.output;
      })
      .catch((error) => {
        console.error(error);
      });
  });

  return {
    output,
  };
}
