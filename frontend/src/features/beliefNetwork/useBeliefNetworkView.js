import { ref, onMounted } from "vue";
import axios from "axios";

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
