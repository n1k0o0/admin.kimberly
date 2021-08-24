<template>
  <el-card v-loading="loading">
    <template #header>
      <h3>Редактирование {{ stadium.title }}</h3>
    </template>
    <el-row class="my-4">
      <el-col :span="6">
        <span>Укажите название</span>
        <el-input
          placeholder="Название"
          v-model="stadium.title"
        ></el-input>
      </el-col>
    </el-row>
    <el-row class="mb-4">
      <el-col :span="6">
        <span>Выберите страну</span>
        <el-select
          class="d-block"
          placeholder="Страна"
          v-model="stadium.country_id"
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
          placeholder="Город"
          v-model="stadium.city_id"
        >
          <el-option
            v-for="(city, key) in cities"
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
          v-model="stadium.address"
        ></el-input>
      </el-col>
    </el-row>
    <el-row class="my-3 flex-row-reverse">
      <el-button-group>
        <el-button @click="$router.push({name: 'stadiums'})">Отменить</el-button>
        <el-button
          type="primary"
          @click="onUpdateStadiumClicked"
        >
          Обновить
        </el-button>
      </el-button-group>
    </el-row>
  </el-card>
</template>

<script>
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useLoadingState } from "../../composables/common/useLoadingState";
import { getStadium, updateStadium } from "../../services/stadiums/stadiums";
import { useStore } from "vuex";

export default {
  name: "Edit",
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    let stadiumId = null
    let stadium = ref({});

    const countries = computed(() => store.getters["general/GET_COUNTRIES"])
    const { loading, setLoaded, setLoading } = useLoadingState(false)

    const selectedCountry = computed(() => store.getters["general/GET_COUNTRIES"].find((countryItem) => countryItem.id === stadium.value.country_id))
    const cities = computed(() => selectedCountry.value?.cities)
    onMounted(async () => {
      try {
        stadiumId = route.params.id
        setLoading()
        const {data} = await getStadium(stadiumId)
        stadium.value = data
      } catch (e) {
        console.log(e)
      } finally {
        setLoaded()
      }
    })
    const onUpdateStadiumClicked = async () => {
      try {
        setLoading()
        await updateStadium(stadiumId, stadium.value)
        await router.push({ name: 'stadiums' })
      } catch (e) {
      } finally {
        setLoaded()
      }
    }

    return {
      selectedCountry,
      countries,
      cities,
      loading,
      stadium,
      onUpdateStadiumClicked,
    }
  },
}
</script>

<style scoped>

</style>
