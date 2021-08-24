<template>
  <el-card v-loading="loading">
    <template #header>
      <h3>Создать стадион</h3>
    </template>
    <el-row class="my-4">
      <el-col :span="6">
        <span>Укажите название</span>
        <el-input
          placeholder="Название"
          v-model="newStadium.title"
        ></el-input>
      </el-col>
    </el-row>
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
          v-model="newStadium.city_id"
          placeholder="Город"
        >
          <el-option
            v-for="(city, key) in selectedCountry.cities"
            :key="city.id"
            :value="city.id"
            :label="city.name"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row class="my-4">
      <el-col :span="6">
        <span>Укажите адрес</span>
        <el-input
          placeholder="Адрес"
          v-model="newStadium.address"
        ></el-input>
      </el-col>
    </el-row>
    <el-row class="my-3 flex-row-reverse">
      <el-button-group>
        <el-button @click="$router.push({name: 'stadiums'})">Отменить</el-button>
        <el-button
          type="primary"
          @click="onCreateStadiumClicked"
        >
          Создать
        </el-button>
      </el-button-group>
    </el-row>
  </el-card>
</template>

<script>
import { computed, reactive, ref } from "vue";
import { useLoadingState } from "../../composables/common/useLoadingState";
import { parseErrors } from "../../helpers";
import { useRouter } from "vue-router";
import { createStadium } from "../../services/stadiums/stadiums";
import { useStore } from "vuex";

export default {
  name: "Create",
  setup() {
    const router = useRouter()
    const store = useStore()
    const { loading, setLoaded, setLoading } = useLoadingState(false)
    const newStadium = reactive({
      title: '',
      city_id: '',
      address: '',
    })
    const countries = computed(() => store.getters["general/GET_COUNTRIES"])
    const selectedCountryId = ref(null)
    const selectedCountry = computed(() => countries.value.find((countryItem) => countryItem.id !== selectedCountryId))
    const onCreateStadiumClicked = async () => {
      try {
        setLoading()
        const { data } = await createStadium(newStadium)
        await router.push({name: 'stadiums'})
      } catch (e) {
        const errors = parseErrors(e.response.data.errors)
        console.log(errors)
      }
      finally {
        setLoaded()
      }
    }

    return {
      loading,
      countries,
      selectedCountryId,
      selectedCountry,
      newStadium,
      onCreateStadiumClicked,
    }
  },
}
</script>

<style scoped>

</style>
