import useLocalStorage from "../../services/useLocalStorage";

const state = () => ({
  userPanel: false,
  countries: [],
  selected_country_id: JSON.parse(localStorage.getItem('selected_country')) ?? null,
  selected_city_id: JSON.parse(localStorage.getItem('selected_city')) ?? null,
})

const getters = {
  GET_USER_PANEL(state) {
    return state.userPanel
  },
  GET_SELECTED_COUNTRY(state) {
    return state.countries.find((countryItem) => countryItem.id === state.selected_country_id)
  },
  GET_SELECTED_CITY(state, getters) {
    const selectedCountry = getters.GET_SELECTED_COUNTRY
    if (!selectedCountry) {
      return null
    }
    return selectedCountry.cities.find((cityItem) => cityItem.id === state.selected_city_id)
  },
  GET_COUNTRIES(state) {
    return state.countries
  },
  GET_CITIES(state, getters) {
    return getters.GET_SELECTED_COUNTRY ? getters.GET_SELECTED_COUNTRY.cities : []
  },
}

const mutations = {
  INIT(state) {

  },
  SET_COUNTRIES(state, countries) {
    state.countries = countries
  },
  SET_SELECTED_COUNTRY(state, countryId) {
    state.selected_country_id = countryId
  },
  SET_SELECTED_CITY(state, cityId) {
    state.selected_city_id = cityId
  },
  CHANGE_USER_PANEL(state) {
    state.userPanel = !state.userPanel
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
