import useLocalStorage from "./useLocalStorage";
import { useStore } from "vuex";
import { computed, watch } from "vue";

export default function useCountryAndCity(country=null, city=null) {
  const store = useStore()

  const { item: selectedCountryId, removeValue: removeCountryId } = useLocalStorage('selected_country', country)
  const { item: selectedCityId, removeValue: removeCityId } = useLocalStorage('selected_city', city)
  if (selectedCountryId) {
    store.commit('general/SET_SELECTED_COUNTRY', selectedCountryId)
  }
  if (selectedCityId) {
    store.commit('general/SET_SELECTED_CITY', selectedCityId)
  }

  const selectedCountry = computed(() => store.getters['general/GET_SELECTED_COUNTRY'])
  const selectedCity = computed(() => store.getters['general/GET_SELECTED_CITY'])

  const countries = computed(() => store.getters["general/GET_COUNTRIES"])
  const cities = computed(() => store.getters["general/GET_CITIES"])

  watch(selectedCountryId, (newSelectedCountryId) => store.commit('general/SET_SELECTED_COUNTRY', newSelectedCountryId))
  watch(selectedCityId, (newSelectedCityId) => store.commit('general/SET_SELECTED_CITY', newSelectedCityId))

  const resetCountryAndCity = () => {
    removeCountryId()
    removeCityId()
  }

  return {
    countries,
    cities,
    selectedCountryId,
    selectedCityId,
    selectedCountry,
    selectedCity,
    resetCountryAndCity,
  }
}
