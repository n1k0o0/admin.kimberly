import { loadLeagues, paginateLeagues } from "@/services/leagues/leagueService.js";

const state = () => ({
  leagues: [],
})

const getters = {
  GET_LEAGUES(state) {
    return state.leagues
  }
}

const mutations = {
  SET_LEAGUES(state, leagues) {
    state.leagues = leagues
  }
}

const actions = {
  LOAD_LEAGUES({ commit }, payload) {
    try {
      const { data } = loadLeagues(payload)
      commit('SET_LEAGUES', data)
    } catch (e) {

    }
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
