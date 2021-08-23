<template>

  <router-view v-if="!checkAuth && data.isLoading"/>

  <div v-if="checkAuth && data.isLoading" class="page d-flex flex-row flex-column-fluid">

    <AsideBlock></AsideBlock>

    <!--begin::Wrapper-->
    <div class="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">

      <HeaderBlock></HeaderBlock>

      <div class="content d-flex flex-column flex-column-fluid" id="kt_content">
        <el-container>
          <el-main>
              <router-view></router-view>
          </el-main>
        </el-container>
      </div>

      <FooterBlock></FooterBlock>
      <el-dialog
        title="Первоначальная настройка"
        v-model="countryAndCityModalShown"
        width="30%"
        :show-close="false"
      >
        <template #default>
          <div class="form-group">
            <label>Выберите страну, с которой будете работать</label>
          </div>
          <div class="form-group">
            <el-select
              v-model="selectedCountryId"
              placeholder="Страна"
            >
              <el-option
                v-for="country in countries"
                :value="country.id"
                :label="country.name"
                :key="country.id"
              >
              </el-option>
            </el-select>
          </div>
          <div class="form-group">
            <label>Выберите город, с которым будете работать</label>
          </div>
          <div class="form-group">
            <el-select
              v-model="selectedCityId"
              placeholder="Город"
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
import useCountryAndCity from "./composables/useCountryAndCity";

const store = useStore();

onMounted(() => {
  getMe()
})
const countryAndCityModalShown = ref(false);
const isLoading = false
const showUserPanel = computed(() => store.getters['GET_USER_PANEL'])
const data = reactive({ isLoading, showUserPanel, })
const { selectedCountry, selectedCity, selectedCountryId, selectedCityId, countries, cities } = useCountryAndCity()

const closeCountryAndCityModal = () => {
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
