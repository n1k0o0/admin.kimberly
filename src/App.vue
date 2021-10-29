<template>
  <router-view v-if="!checkAuth && data.isLoading" />

  <div
    v-if="checkAuth && data.isLoading"
    class="page d-flex flex-row flex-column-fluid"
  >
    <AsideBlock />

    <!--begin::Wrapper-->
    <div
      id="kt_wrapper"
      class="wrapper d-flex flex-column flex-row-fluid"
    >
      <HeaderBlock />

      <div
        id="kt_content"
        class="content d-flex flex-column flex-column-fluid"
      >
        <el-container>
          <el-main>
            <router-view />
          </el-main>
        </el-container>
      </div>

      <FooterBlock />
      <el-dialog
        v-model="countryAndCityModalShown"
        title="Первоначальная настройка"
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
                :key="country.id"
                :value="country.id"
                :label="country.name"
              />
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
                :key="city.id"
                :value="city.id"
                :label="city.name"
              />
            </el-select>
          </div>
        </template>
        <template #footer>
          <span class="dialog-footer">
            <el-button
              type="primary"
              @click="closeCountryAndCityModal"
            >Подтвердить</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
    <div
      class="p-toast p-component p-toast-top-right"
      style="z-index: 1000000;"
    >
      <div />
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
import {useRoute, useRouter} from "vue-router";

const store = useStore();

onMounted(() => {
  getMe()
})
const route = useRoute()
const router = useRouter()
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
  if (!localStorage.getItem('firstSign') && router.currentRoute.value.path!=='/auth') {
    countryAndCityModalShown.value = true
    localStorage.setItem('firstSign', '1')
  }
}

const checkAuth = computed(() => store.getters['auth/GET_USER_ID'])

</script>
