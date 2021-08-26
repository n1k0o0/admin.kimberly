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
    <country-city-selectors
      v-if="!loading"
      @city-selected="onCitySelected"
      :selected-country-id="stadium.country_id"
      :selected-city-id="stadium.city_id"
    />
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
import CountryCitySelectors from "../../components/common/CountryCitySelectors.vue";

export default {
  name: "Edit",
  components: { CountryCitySelectors },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    let stadiumId = null
    let stadium = ref({});

    const { loading, setLoaded, setLoading } = useLoadingState(false)

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

    const onCitySelected = (city) => stadium.value.city_id = city.value?.id
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
      loading,
      stadium,
      onCitySelected,
      onUpdateStadiumClicked,
    }
  },
}
</script>

<style scoped>

</style>
