<template>
  <el-row class="mb-4">
    <el-col :span="6">
      <span>Выберите страну</span>
      <el-select
        class="d-block"
        v-model="selectedCountryId"
        placeholder="Страна"
      >
        <el-option
          v-for="(country, key) in countries"
          :key="country.id"
          :value="country.id"
          :label="country.name"
        ></el-option>
      </el-select>
    </el-col>
  </el-row>
  <el-row class="mb-4">
    <el-col :span="6">
      <span>Выберите город</span>
      <el-select
        class="d-block"
        v-model="selectedCityId"
        placeholder="Город"
      >
        <el-option
          v-for="city in cities"
          :key="city.id"
          :value="city.id"
          :label="city.name"
        ></el-option>
      </el-select>
    </el-col>
  </el-row>
</template>

<script>
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";

export default {
  name: "CountryCitySelectors",
  emits: ['city-selected'],
  props: {
    selectedCountryId: {
      required: false,
      default: () => null,
    },
    selectedCityId: {
      required: false,
      default: () => null,
    }
  },
  setup(props, {emit}) {
    const store = useStore()

    const countries = computed(() => store.getters["general/GET_COUNTRIES"])
    const selectedCountryId = ref(props.selectedCountryId)
    const selectedCityId = ref(props.selectedCountryId ? props.selectedCityId : null)

    const cities = computed(() => {
      if (selectedCountry && selectedCountry.value?.cities) {
        return selectedCountry.value.cities
      }

      return []
    })

    const selectedCountry = computed(() => {
      if (selectedCountryId.value) {
        return countries.value.find(countryItem => countryItem.id === selectedCountryId.value)
      }

      return null
    })
    watch(selectedCountry, () => {
      selectedCityId.value = null
    })

    const selectedCity = computed(() => {
      if (selectedCountry.value) {
        return selectedCountry.value.cities.find(cityItem => cityItem.id === selectedCityId.value) ?? null
      }

      return null
    })
    watch(selectedCity, () => {
      emit('city-selected', selectedCity)
    })

    return {
      countries,
      cities,
      selectedCountry,
      selectedCountryId,
      selectedCityId,
    }
  }
}
</script>

<style scoped>

</style>
