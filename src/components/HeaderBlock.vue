<template>
  <div id="kt_header" style="" class="header align-items-stretch">
    <div class="container-fluid d-flex align-items-stretch justify-content-between">
      <div class="d-flex align-items-center d-lg-none ms-n3 me-1" title="Show aside menu">
        <div class="btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px"
             id="kt_aside_mobile_toggle">
          <span class="svg-icon svg-icon-2x mt-1">
										<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px"
                         height="24px" viewBox="0 0 24 24" version="1.1">
											<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
												<rect x="0" y="0" width="24" height="24"/>
												<rect fill="#000000" x="4" y="5" width="16" height="3" rx="1.5"/>
												<path
                          d="M5.5,15 L18.5,15 C19.3284271,15 20,15.6715729 20,16.5 C20,17.3284271 19.3284271,18 18.5,18 L5.5,18 C4.67157288,18 4,17.3284271 4,16.5 C4,15.6715729 4.67157288,15 5.5,15 Z M5.5,10 L18.5,10 C19.3284271,10 20,10.6715729 20,11.5 C20,12.3284271 19.3284271,13 18.5,13 L5.5,13 C4.67157288,13 4,12.3284271 4,11.5 C4,10.6715729 4.67157288,10 5.5,10 Z"
                          fill="#000000" opacity="0.3"/>
											</g>
										</svg>
									</span>
        </div>
      </div>
      <div class="d-flex align-items-center flex-grow-1 flex-lg-grow-0">
        <a href="../../demo1/dist/index.html" class="d-lg-none">
          <img alt="Logo" src="assets/media/logos/logo-3.svg" class="h-30px"/>
        </a>
      </div>
      <div class="d-flex align-items-stretch justify-content-between flex-lg-grow-1">
        <div class="d-flex align-items-stretch" id="kt_header_nav">
          <div class="header-menu align-items-stretch" data-kt-drawer="true" data-kt-drawer-name="header-menu"
               data-kt-drawer-activate="{default: true, lg: false}" data-kt-drawer-overlay="true"
               data-kt-drawer-width="{default:'200px', '300px': '250px'}" data-kt-drawer-direction="end"
               data-kt-drawer-toggle="#kt_header_menu_mobile_toggle" data-kt-swapper="true"
               data-kt-swapper-mode="prepend" data-kt-swapper-parent="{default: '#kt_body', lg: '#kt_header_nav'}">
            <el-select
              v-model="selectedCountryId"
            >
              <el-option
                v-for="country in countries"
                :value="country.id"
                :label="country.name"
                :key="country.id"
              >
              </el-option>
            </el-select>
            <el-select
              v-if="selectedCountry"
              v-model="selectedCityId"
            >
              <el-option
                v-for="city in selectedCountry.cities"
                :value="city.id"
                :label="city.name"
                :key="city.id"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <TopbarBlock></TopbarBlock>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, } from 'vue'
import {useStore} from 'vuex'
import useCountryAndCity from "../useCountryAndCity";
  const data = reactive({
    headerMenu: {},
    subMenu: {},
  })
  const store = useStore()

  const {selectedCountry, selectedCountryId, selectedCityId, countries, cities} = useCountryAndCity()

  const toggleDropdown = (type) => {
    if (!type) {
      data.headerMenu = {};
      return
    }
    data.headerMenu[type] = !data.headerMenu[type]
  }

  const toggleSubmenu = (type) => {
    if (!type) {
      this.subMenu = [];
    } else {
      if (type !== 'rooms' && type !== 'categories') {
        this.subMenu = []
      }
    }
    if (type === 'categories' && this.subMenu[type]) {
      setTimeout(() => {
        this.subMenu[type] = !this.subMenu[type]
      }, 750)
    } else {
      this.subMenu[type] = !this.subMenu[type]

    }
  }

  onMounted(() => {

  })

</script>

<style>
  .header-menu .show.menu-dropdown {
    position: relative;
  }
  .header-menu .show.menu-sub {
    z-index: 105;
    position: absolute;
    inset: 0px auto auto 0px;
    margin: 0px;
    transform: translate(0, 65px);
  }
</style>
