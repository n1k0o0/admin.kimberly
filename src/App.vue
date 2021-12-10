<template>
  <router-view v-if="!user?.type" />
  <!--  Admin-->
  <div
    v-if="user?.type===InternalUserTypes.admin"
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
  <!--  Jury-->
  <div
    v-if="user?.type===InternalUserTypes.jury"
    class="jury_page d-flex flex-column flex-column-fluid m-4"
  >
    <TopbarBlock class="justify-content-end p-4" />
    <router-view />
  </div>
</template>

<script setup>

import AsideBlock from '@/components/AsideBlock.vue'
import HeaderBlock from '@/components/HeaderBlock.vue'
import FooterBlock from '@/components/FooterBlock.vue'
import TopbarBlock from '@/components/TopbarBlock.vue'
import { computed, onMounted, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import useCountryAndCity from "@/composables/useCountryAndCity";
import {useRoute, useRouter} from "vue-router";
import {InternalUserTypes} from '@/services/internal-users/InternalUser'
import useLocalStorage from '@/composables/common/useLocalStorage';

const store = useStore();

onMounted(() => {
  if (!store.getters['general/GET_FIRST_SIGN']) {
    countryAndCityModalShown.value = true
    localStorage.setItem('firstSign', '1')
  }
})
const route = useRoute()
const router = useRouter()
const countryAndCityModalShown = ref(false);
const isLoading = false
const showUserPanel = computed(() => store.getters['general/GET_USER_PANEL'])
const data = reactive({ isLoading, showUserPanel, })
const { selectedCountry, selectedCity, selectedCountryId, selectedCityId, countries, cities } = useCountryAndCity()

const closeCountryAndCityModal = () => {
  if (selectedCountry.value && selectedCity.value) {
    countryAndCityModalShown.value = false
  }
}

const {item:user} = useLocalStorage('user',null)
</script>
