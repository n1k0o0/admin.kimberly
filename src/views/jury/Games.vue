<template>
  <div
    class="back_arrow"
    @click="$router.push({name: 'jury'})"
  >
    <svg
      width="30"
      height="30"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_102:601)">
        <path
          d="M22.5 26.25L15 19.5006L22.5 12.75"
          stroke="#181c32"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <rect
        x="0.25"
        y="0.25"
        width="39.5"
        height="39.5"
        rx="15.75"
        stroke="#181c32"
        stroke-width="0.5"
      />
      <defs>
        <clipPath id="clip0_102:601">
          <rect
            width="17"
            height="11"
            fill="black"
            transform="translate(25 11) rotate(90)"
          />
        </clipPath>
      </defs>
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
      <el-divider>Детали игры</el-divider>
      <el-col :span="24">
        <p class="text-center">
          {{ game.league?.name }} / {{ game.division?.name }} / {{ $moment(game.started_at).format('YYYY-MM-DD HH:mm') }}
        </p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import useCountryAndCity from "@/composables/useCountryAndCity";
import useLocalStorage from "@/composables/common/useLocalStorage";
import {useLoadingState} from '@/composables/common/useLoadingState.js'
import {getSchedule} from '@/services/games/gameService.js'
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
        const {data: {data: gameItems, }} = await getSchedule(search,null,null)
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
.el-divider{
  background-color: #444444;
  .el-divider__text{
    background-color: #DEE4E1!important;
  }
}

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
