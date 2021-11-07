<template>
  <div
    class="back_arrow"
    @click="$router.push({name: 'jury'})"
  >
    <svg
      width="36"
      height="24"
      viewBox="0 0 36 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.939339 10.9393C0.353554 11.5251 0.353554 12.4749 0.939339 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97918 12.6066 1.3934C12.0208 0.807609 11.0711 0.807609 10.4853 1.3934L0.939339 10.9393ZM36 10.5L2 10.5L2 13.5L36 13.5L36 10.5Z"
        fill="black"
      />
    </svg>
  </div>
  <h1 class="title">
    Выбрать матч
  </h1>
  <p class="search_info">
    {{ selectedCountry.name }} / {{ selectedCity.name }} / {{ stadiumName }} / {{ $moment(date).format('YYYY-MM-DD') }}
  </p>
  <el-row>
    <el-col
      :span="24"
      class="pb-4"
    >
      <el-input
        v-model="search.name"
        placeholder="Поиск"
        @input="searchGames"
      />
    </el-col>
  </el-row>
  <div v-loading="loading">
    <el-row
      v-for="game in games"
      :key="game.id"
      class="games"
      @click="$router.push({name: 'game-jury',params: {id:game.id}})"
    >
      <el-col
        :span="12"
        class="team"
      >
        {{ game.team_1.name }}
      </el-col>
      <el-col
        :span="12"
        class="team"
      >
        {{ game.team_2.name }}
      </el-col>
    </el-row>
  </div>
</template>

<script>
import useCountryAndCity from "@/composables/useCountryAndCity";
import useLocalStorage from "@/composables/common/useLocalStorage";
import {useLoadingState} from '@/composables/common/useLoadingState.js'
import {getAdminSchedule} from '@/services/games/gameService.js'
import {onMounted, reactive, ref} from "vue";

export default {
  name: "Games",
  setup() {
    const {loading, setLoaded, setLoading} = useLoadingState(true)
    const {selectedCountry,selectedCity,selectedCountryId, selectedCityId} = useCountryAndCity()

    const games = ref([])
    const {item:stadiumId} = useLocalStorage('selected_stadium')
    const {item:stadiumName} = useLocalStorage('selected_stadium_name')
    const {item:date} = useLocalStorage('selected_date')

    const search = reactive({
      city_id: selectedCityId,
      country_id: selectedCountryId,
      stadium_id: stadiumId,
      date: date,
      current_tournament:1,
    })

    const searchGames = async () => {
        setLoading()
        const {data: {data: gameItems, }} = await getAdminSchedule(search,null,null)
        games.value = gameItems
        setLoaded()
    }

    onMounted(async () => {
      await searchGames()
    })


    return {
      selectedCountry,
      selectedCity,
      date,
      stadiumName,
      games,
      searchGames,
      search,
      loading
    }

  },
}
</script>

<style scoped lang="scss">
.back_arrow{
  position: absolute;
  left: 20px;
  top: 20px;
  cursor: pointer;
}
.title{
  line-height: 24px;
  margin-bottom: 10px;
}
.search_info{
  color: #444444;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 10px;
}
.games{
  background-color: #DEE4E1;
  margin-bottom: 10px;

  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  .team{
    text-align: center;
    font-weight: 800;
    line-height: 24px;
    font-size: 14px;
    color: #444444;
    text-transform: uppercase;
    padding: 15px;
    align-self: center;
  }
  .team:first-child{
    border-right: 1px solid #A29A9A;
  }
}
</style>
