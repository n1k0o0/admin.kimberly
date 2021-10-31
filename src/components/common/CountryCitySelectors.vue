<template class="country-city-selector">
  <el-row>
    <el-row class="country-city-selector__country">
      <span>Выберите страну</span>
    </el-row>
    <el-row>
      <el-select
        v-model="selectedCountryId"
        class="d-block w-100"
        placeholder="Страна"
        clearable
      >
        <el-option
          v-for="country in availableCountries"
          :key="country.id"
          :value="country.id"
          :label="country.name"
        />
      </el-select>
    </el-row>
    <el-row class="country-city-selector__city">
      <span>Выберите город</span>
    </el-row>
    <el-row>
      <el-select
        v-model="selectedCityId"
        class="d-block w-100"
        placeholder="Город"
        clearable
      >
        <el-option
          v-for="city in availableCities"
          :key="city.id"
          :value="city.id"
          :label="city.name"
        />
      </el-select>
    </el-row>
  </el-row>
</template>

<script>
import { computed, ref, watch } from "vue";

export default {
  name: "CountryCitySelectors",
  props: {
    countries: {
      type: Array,
      default: () => [],
    },
    countryId: {
      type: Number,
      default: null,
    },
    cityId: {
      type: Number,
      default: null,
    }
  },
  emits: ['city-selected', 'country-selected'],
  setup(props, { emit }) {
    const availableCountries = computed(() => props.countries ?? []);
    const availableCities = computed(() => selectedCountry.value ? selectedCountry.value.cities : []);

    const selectedCountryId = ref(props.countryId);
    const selectedCityId = ref(props.cityId);

    const selectedCountry = computed(() => selectedCountryId.value ? availableCountries.value.find(countryItem => countryItem.id === selectedCountryId.value) : null);
    const selectedCity = computed(() => selectedCityId.value && selectedCountry.value?.cities ? selectedCountry.value.cities.find(cityItem => cityItem.id === selectedCityId.value) ?? null : null);

    watch(selectedCountryId, () => selectedCityId.value = null);

    watch(selectedCountry, (country) => emit('country-selected', country));
    watch(selectedCity, (city) => emit('city-selected', city));

    return {
      availableCountries,
      availableCities,
      selectedCountry,
      selectedCountryId,
      selectedCityId,
    };
  }
};
</script>

<style lang="scss">
.country-city-selector {
  &__country {

  }

  &__city {

  }
}
</style>
