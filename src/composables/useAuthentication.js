import { useStore } from "vuex";
import { computed } from "vue";
import useLocalStorage from "@/composables/common/useLocalStorage.js";

export default function useAuthentication() {
  const store = useStore();

  const user = computed(() => store.getters['auth/GET_USER']);
  const isLoggedIn = computed(() => !!user.value ?? false);

  const login = (login, password) => {
    useLocalStorage('selected_country').removeValue();
    useLocalStorage('selected_city').removeValue();
    store.dispatch('auth/LOGIN', { login, password });
  };

  const logout = () => {
    store.dispatch('auth/LOGOUT');
  };
  return {
    user,
    logout,
  };
}
