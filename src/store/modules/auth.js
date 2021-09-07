import api from "../../services/api";
import useLocalStorage from "../../composables/common/useLocalStorage";

const state = () => ({
  auth: false,
  test: false
});

const getters = {

  GET_USER_ID(state) {
    return state.auth ? state.auth.id : false;
  },

  GET_TEST(state) {
    return state.test ? state.test.data : [];
  },

  USER_NAME(state) {
    return state.auth.name ?? null;
  },

  GET_USER(state) {
    return state.auth ?? null;
  },
};

const mutations = {

  SET_AUTH(state, payload) {
    state.auth = payload;
  },

  SET_TEST(state, payload) {
    state.test = payload;
  }

};

const actions = {

  async GET_AUTH_ME({ commit, state }, payload) {
    const response = await api.post('/internal_users/me');
    if (response) {
      commit('SET_AUTH', response.data.user);
      commit('general/SET_COUNTRIES', response.data.countries, { root: true });
    }
  },

  async LOGIN({ commit, state }, payload) {
    await api.get(import.meta.env.VITE_BASE_API_URL + '/sanctum/csrf-cookie');
    await api.post(import.meta.env.VITE_BASE_API_URL + '/api/internal_users/issue-token', payload).then(({ data }) => {
      localStorage.setItem('token', data.access_token);
      window.location.href = '/';
    });
  },

  async LOGOUT({ commit, state }) {
    await api.post(import.meta.env.VITE_BASE_API_URL + '/api/internal_users/revoke-token').then(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('selected_country');
      localStorage.removeItem('selected_city');
      window.location.href = '/auth';
    });
  },

  async LOAD_TEST({ commit, state }) {
    const response = await api.get(import.meta.env.VITE_API_URL + '/users');
    if (response) {
      commit('SET_TEST', response.data);
    }
  },

};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};
