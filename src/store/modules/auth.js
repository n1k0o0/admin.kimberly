import api from "../../services/api";
import {InternalUserTypes} from '@/services/internal-users/InternalUser'

const state = () => ({
  auth: JSON.parse(localStorage.getItem('user'))??false,
  test: false
});

const getters = {

  GET_USER_ID(state) {
    return state.auth ? state.auth.id : false;
  },

  GET_USER_TYPE(state) {
    return state.auth ? state.auth.type : false;
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
    state.auth=payload
    localStorage.setItem('user',JSON.stringify(payload))
  },

  SET_TEST(state, payload) {
    state.test = payload;
  }

};

const actions = {

  async GET_AUTH_ME({ commit }) {
    const response = await api.post('/internal_users/me');
    if (response) {
      commit('SET_AUTH', response.data.user);
      commit('general/SET_COUNTRIES', response.data.countries, { root: true });
    }
  },

  async LOGIN({ commit, state,dispatch  }, payload) {
    await api.get(import.meta.env.VITE_BASE_API_URL + '/sanctum/csrf-cookie');
    await api.post('internal_users/issue-token', payload).then(async ({data}) => {
      localStorage.setItem('token', data.access_token);
      await dispatch('GET_AUTH_ME')
      if (state.auth.type===InternalUserTypes.jury){
        window.location.href = '/jury';
      }else {
        window.location.href = '/';
      }
    });
  },

  async LOGOUT({ }) {
    await api.post('internal_users/revoke-token').then(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('countries');
      localStorage.removeItem('selected_country');
      localStorage.removeItem('selected_city');
      localStorage.removeItem('tournament_id');
      localStorage.removeItem('tournaments');
      localStorage.removeItem('firstSign');
      localStorage.removeItem('selected_date');
      localStorage.removeItem('selected_stadium_name');
      localStorage.removeItem('selected_stadium');
      window.location.href = '/login';
    });
  },

  async LOAD_TEST({ commit }) {
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
