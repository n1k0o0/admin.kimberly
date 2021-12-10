const state = () => ({
  userPanel: false,
  firstSign: localStorage.getItem('firstSign')??false,
  countries: JSON.parse(localStorage.getItem('countries'))??[],
  selected_country_id: JSON.parse(localStorage.getItem('selected_country')) ?? null,
  selected_city_id: JSON.parse(localStorage.getItem('selected_city')) ?? null,
  selected_stadium_id: JSON.parse(localStorage.getItem('selected_stadium')) ?? null,
  selected_stadium_name: JSON.parse(localStorage.getItem('selected_stadium_name')) ?? null,
  selected_date: JSON.parse(localStorage.getItem('selected_date')) ?? null,
})

const getters = {
  GET_USER_PANEL(state) {
    return state.userPanel
  },
  GET_FIRST_SIGN(state) {
    return state.firstSign
  },
  GET_SELECTED_STADIUM(state) {
    return state.selected_stadium_id
  },
  GET_SELECTED_STADIUM_NAME(state) {
    return state.selected_stadium_name
  },
  GET_SELECTED_DATE(state) {
    return state.selected_date
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
  GET_COUNTRY_BY_ID(state, countryId) {
    return state.countries.find((countryItem) => countryItem.id === countryId)
  },
  GET_CITIES(state, getters) {
    return getters.GET_SELECTED_COUNTRY ? getters.GET_SELECTED_COUNTRY.cities : []
  },
}

const mutations = {
  SET_COUNTRIES(state, countries) {
    countries.unshift({id:null,name:'Все',cities:[]})
    countries.map(country=>{
      country.cities.unshift({id:null,name:'Все'})
    })
    localStorage.setItem('countries',JSON.stringify(countries))
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
