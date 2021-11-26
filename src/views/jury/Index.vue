<template>
  <div
    class="jury d-grid justify-content-center align-center"
  >
    <div>
      <h2 class="pb-10">
        Текущий турнир
      </h2>
      <el-row :gutter="10">
        <el-col class="pb-5">
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
        </el-col>
        <el-col class="pb-5">
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
        </el-col>
        <el-col class="pb-5">
          <el-select
            v-model="stadiumId"
            placeholder="Стадион"
          >
            <el-option
              v-for="city in stadiums"
              :key="city.id"
              :value="city.id"
              :label="city.title"
            />
          </el-select>
        </el-col>
        <el-col class="pb-5">
          <el-date-picker
            v-model="date"
            format="DD-MM-YYYY"
            value-format="YYYY-MM-DD"
            placeholder="Дата"
            type="date"
          />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-button
            type="primary"
            :disabled="!stadiumId || !date"
            @click="$router.push({name: 'games-jury'})"
          >
            Перейти
          </el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import useCountryAndCity from "@/composables/useCountryAndCity";
import useLocalStorage from "@/composables/common/useLocalStorage";
import {useLoadingState} from '@/composables/common/useLoadingState.js'
import {paginateStadiums} from '@/services/stadiums/stadiums.js'
import {onMounted, reactive, ref, watch} from "vue";

export default {
  name: "Index",
  setup() {
    const { setLoaded, setLoading} = useLoadingState(true)
    const {selectedCountryId, selectedCityId, countries, cities} = useCountryAndCity()
    const search = reactive({
      city_id: selectedCityId,
      country_id: selectedCountryId,
    })
    const stadiums = ref([])
    const {item:stadiumId} = useLocalStorage('selected_stadium',null)
    const {item:stadiumName} = useLocalStorage('selected_stadium_name',null)
    const {item:date} = useLocalStorage('selected_date',null)

    const searchStadium=async ()=>{
      setLoading()
      const {data: {data: stadiumItems}} = await paginateStadiums(search, null, 0)
      stadiums.value = stadiumItems
      setLoaded()
    }

    onMounted(async () => {
      setLoading()
      await searchStadium()
      setLoaded()
    })


    watch(
      [search],
      async () => {
        stadiumId.value=null
        await searchStadium()
      },
    )
    watch(
      [stadiumId],
      async () => {
        stadiumName.value=stadiums.value.find(x => x.id === stadiumId.value).title
      },
    )

    return {
      selectedCityId,
      selectedCountryId,
      countries,
      cities,
      stadiumId,
      date,
      stadiums
    }

  },
}
</script>

<style scoped>
.jury {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
}
</style>
