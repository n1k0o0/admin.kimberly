import { ref } from "vue";

export function useLoadingState(initial=true) {
  const loading = ref(initial)

  const setLoaded = () => loading.value = false
  const setLoading = () => loading.value = true

  return {
    loading,
    setLoaded,
    setLoading,
  }
}
