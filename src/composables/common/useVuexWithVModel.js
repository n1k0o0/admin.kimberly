import { computed } from "vue";
import { useStore } from "vuex";

export default function useVuexWithVModel(getter, mutation) {
  const store = useStore()
  const value = computed({
    get() {
      return store.getters[getter]
    },
    set(newValue) {
      store.commit(mutation, newValue)
    }
  })

  return {
    value
  }
}
