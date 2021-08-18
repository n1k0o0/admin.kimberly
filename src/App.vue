<template>

  <router-view v-if="!checkAuth && data.isLoading"/>

  <div v-if="checkAuth && data.isLoading" class="page d-flex flex-row flex-column-fluid">

    <AsideBlock></AsideBlock>

    <!--begin::Wrapper-->
    <div class="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">

      <HeaderBlock></HeaderBlock>

      <div class="content d-flex flex-column flex-column-fluid" id="kt_content">
        <router-view></router-view>
      </div>

      <FooterBlock></FooterBlock>
      <el-dialog
        title="Tips"
        v-model="countryAndCityModalShown"
        width="30%"
      >
        <template #default>
          <div class="form-group">
            Выберите страну, с которой будете работать
            <el-select v-model="selectedCountryId">
              <el-option
                v-for="country in countries"
                :value="country.id"
                :label="country.name"
                :key="country.id"
              >
              </el-option>
            </el-select>

            <label>Выберите город, с которым будете работать</label>
            <el-select
              v-model="selectedCityId"
            >
              <el-option
                v-for="city in cities"
                :value="city.id"
                :label="city.name"
                :key="city.id"
              >
              </el-option>
            </el-select>
          </div>
        </template>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="closeCountryAndCityModal">Подтвердить</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
    <div class="p-toast p-component p-toast-top-right" style="z-index: 1000000;">
      <div></div>
    </div>
  </div>

</template>

<script setup>

import AsideBlock from './components/AsideBlock.vue'
import HeaderBlock from './components/HeaderBlock.vue'
import FooterBlock from './components/FooterBlock.vue'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useStore } from 'vuex'
import useLocalStorage from "./services/useLocalStorage";

const store = useStore();

onMounted(() => {
  getMe()
})
const countryAndCityModalShown = ref(false);
const isLoading = false
const countries = computed(() => store.getters["general/GET_COUNTRIES"])
const cities = computed(() => store.getters["general/GET_CITIES"])
let showUserPanel = computed(() => store.getters['GET_USER_PANEL'])
const selectedCountryId = useLocalStorage('selected_country', null)
const selectedCityId = useLocalStorage('selected_city', null)
const selectedCountry = computed(() => store.getters['general/GET_SELECTED_COUNTRY'])
const selectedCity = computed(() => store.getters['general/GET_SELECTED_CITY'])

watch(selectedCountryId, (newValue) => {
  console.log('Country', newValue)
  store.commit('general/SET_SELECTED_COUNTRY', newValue)
})
watch(selectedCityId, (newValue) => {
  console.log('City', newValue)
  store.commit('general/SET_SELECTED_CITY', newValue)
})
const data = reactive({ isLoading, showUserPanel, selectedCountry, selectedCity })
const closeCountryAndCityModal = () => {
  console.log(selectedCountry.value, selectedCity.value)
  if (selectedCountry.value && selectedCity.value) {
    countryAndCityModalShown.value = false
  }
}
const getMe = async () => {
  await store.dispatch('auth/GET_AUTH_ME')
  data.isLoading = true
  if (!selectedCountry.value || !selectedCity.value) {
    countryAndCityModalShown.value = true
  }
}

const checkAuth = computed(() => store.getters['auth/GET_USER_ID'])

</script>
