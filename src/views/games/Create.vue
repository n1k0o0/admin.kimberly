<template>
  <el-card v-loading="loading">
    <template #header>
      <h3>Создать Игру</h3>
    </template>
    <el-row
      :gutter="10"
      class="my-4"
    >
      <el-col
        :span="9"
        class="pb-4"
      >
        <el-select
          v-model="newGame.tournament_id"
          placeholder="Турнир"
        >
          <el-option
            v-for="(tournament) in tournaments"
            :key="tournament.id"
            :label="tournament.name"
            :value="tournament.id"
          />
        </el-select>
      </el-col>
      <el-col
        :span="9"
        class="pb-4"
      >
        <el-select
          v-model="newGame.stadium_id"
          placeholder="Стадион"
        >
          <el-option
            v-for="(stadium) in stadiums"
            :key="stadium.id"
            :label="stadium.title"
            :value="stadium.id"
          />
        </el-select>
      </el-col>
      <el-divider />

      <el-row
        v-for="(game,index) in newGame.games"
        :key="index"
        :gutter="20"
      >
        <el-col
          :span="9"
          class="pb-4"
        >
          <el-select
            v-model="game.league_id"
            placeholder="Лига"
          >
            <el-option
              v-for="(league) in leagues"
              :key="league.id"
              :label="league.name"
              :value="league.id"
            />
          </el-select>
        </el-col>
        <el-col
          :span="9"
          class="pb-4"
        >
          <el-select
            v-model="game.division_id"
            :disabled="!game.league_id"
            placeholder="Дивизион"
            @change="changeDivision(game.division_id,index)"
          >
            <el-option
              v-for="(division) in divisions(game.league_id)"
              :key="division.id"
              :label="division.name"
              :value="division.id"
            />
          </el-select>
        </el-col>
        <el-col
          :span="9"
          class="pb-4"
        >
          <el-select
            v-model="game.team_1_id"
            :disabled="!game.division_id"
            placeholder="Команда 1"
            @change="changeFirstTeam(index)"
          >
            <el-option
              v-for="(team) in teams[index]"
              :key="team.id"
              :label="team.name"
              :value="team.id"
            />
          </el-select>
        </el-col>
        <el-col
          :span="9"
          class="pb-4"
        >
          <el-select
            v-model="game.team_2_id"
            :disabled="!game.division_id || !game.team_1_id"
            placeholder="Команда 2"
          >
            <el-option
              v-for="(team) in secondTeams(game.team_1_id,index)"
              :key="team.id"
              :label="team.name"
              :value="team.id"
            />
          </el-select>
        </el-col>
        <el-col
          :span="9"
          class="pb-4"
        >
          <el-date-picker
            v-model="game.started_at"
            format="DD-MM-YYYY HH:mm"
            value-format="YYYY-MM-DD HH:mm"
            placeholder="Дата и время начало игры"
            type="datetime"
            editable
            :time-arrow-control="true"
          />
        </el-col>
        <el-col v-if="index>0">
          <el-button
            type="warning"
            @click="removeGame(index)"
          >
            Удалить игру
          </el-button>
        </el-col>
        <el-divider />
      </el-row>
      <el-col>
        <el-button
          type="primary"
          @click="addGame"
        >
          Добавить игру
        </el-button>
      </el-col>
    </el-row>
    <el-row
      :gutter="20"
      class="my-3 flex-row-reverse"
    >
      <el-button-group>
        <el-button @click="$router.push({name: 'calendar'})">
          Отменить
        </el-button>
        <el-button
          type="primary"
          @click="onCreateGameClicked"
        >
          Создать
        </el-button>
      </el-button-group>
    </el-row>
  </el-card>
</template>

<script>
import {computed, onMounted, reactive, ref, watch} from 'vue'
import {useLoadingState} from '@/composables/common/useLoadingState.js'
import {parseErrors} from '@/helpers.js'
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
import {getCurrentTournament} from '@/services/tournaments/tournaments.js'
import {paginateLeagues} from '@/services/leagues/leagueService.js'
import {paginateStadiums} from '@/services/stadiums/stadiums.js'
import {getTeams} from '@/services/schools/teams/teams.js'
import {createGame} from '@/services/games/gameService.js'
import useCountryAndCity from '@/composables/useCountryAndCity.js'

export default {
  name: 'Create',
  setup() {
    const router = useRouter()
    const store = useStore()
    const {loading, setLoaded, setLoading} = useLoadingState(false)
    const {selectedCityId, selectedCountryId} = useCountryAndCity()

    const countries = computed(() => store.getters['general/GET_COUNTRIES'])
    const onCreateGameClicked = async () => {
      try {
        setLoading()
        const {}=await createGame(newGame)
        await router.push({name: 'calendar'})
      } catch (e) {
        const errors = parseErrors(e.response?.data?.errors)
        console.log(errors)
      } finally {
        setLoaded()
      }
    }
    const tournaments = ref([])
    const leagues = ref([])
    const stadiums = ref([])
    const teams = ref([])

    const newGame = reactive({
      city_id: selectedCityId,
      country_id: selectedCountryId,
      tournament_id: '',
      games: [{}]
    })

    onMounted(async () => {
      const {data: tournamentItems} = await getCurrentTournament(newGame)
      const {data: {data: leagueItems}} = await paginateLeagues(newGame, null, 0)
      const {data: {data: stadiumItems}} = await paginateStadiums(newGame, null, 0)
      leagues.value = leagueItems
      stadiums.value = stadiumItems
      tournaments.value = [tournamentItems]
      newGame.tournament_id = tournaments.value[0].id
    })

    let divisions = (id) => {
      return leagues.value.filter(league => league.id === id)
        .map(function (lg) {
          return lg.divisions
        })
        .flat()
    }

    let changeDivision = async (divisionId, index) => {
      newGame.games[index].team_1_id = null
      newGame.games[index].team_2_id = null
      const {data: {data: teamItems,}} = await getTeams({division_id: divisionId}, null, 0)
      teams.value[index] = teamItems

    }

    let changeFirstTeam = async (index) => {
      newGame.games[index].team_2_id = null
    }

    let secondTeams = (teamId, index) => teams.value[index]?.filter(team => team.id !== teamId)

    let addGame = () => {
      newGame.games.push({})
    }
    let removeGame = (index) => {
      newGame.games.splice(index, 1)
    }

    watch(
      () => newGame.city_id,
      async () => {
        const {data: tournamentItems} = await getCurrentTournament(newGame)
        const {data: {data: leagueItems}} = await paginateLeagues(newGame, null, 0)
        const {data: {data: stadiumItems}} = await paginateStadiums(newGame, null, 0)
        leagues.value = leagueItems
        stadiums.value = stadiumItems
        tournaments.value = tournamentItems
        newGame.league_id = []
        newGame.stadium_id = []
        newGame.tournament_id = []
      },
    )


    return {
      newGame,
      loading,
      tournaments,
      leagues,
      divisions,
      stadiums,
      teams,
      secondTeams,
      countries,
      onCreateGameClicked,
      changeDivision,
      changeFirstTeam,
      addGame,
      removeGame
    }
  },
}
</script>

<style scoped>

</style>
