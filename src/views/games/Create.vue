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
          v-model="newGame.league_id"
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
          v-model="newGame.division_id"
          :disabled="!newGame.league_id"
          placeholder="Дивизион"
        >
          <el-option
            v-for="(division) in divisions"
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
      <el-col
        :span="9"
        class="pb-4"
      >
        <el-select
          v-model="newGame.team_1_id"
          :disabled="!newGame.division_id"
          placeholder="Команда 1"
        >
          <el-option
            v-for="(team) in teams"
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
          v-model="newGame.team_2_id"
          :disabled="!newGame.division_id || !newGame.team_1_id"
          placeholder="Команда 2"
        >
          <el-option
            v-for="(team) in secondTeams"
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
          v-model="newGame.started_at"
          format="MM-DD-YYYY HH:mm"
          placeholder="Дата и время начало игры"
          type="datetime"
        />
      </el-col>
    </el-row>
    <el-row
      :gutter="20"
      class="my-3 flex-row-reverse"
    >
      <el-button-group>
        <el-button @click="$router.push({name: 'tournaments'})">
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
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useLoadingState } from '@/composables/common/useLoadingState.js'
import { parseErrors } from '@/helpers.js'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { paginateTournaments } from '@/services/tournaments/tournaments.js'
import { paginateLeagues } from '@/services/leagues/leagueService.js'
import { paginateStadiums } from '@/services/stadiums/stadiums.js'
import { getTeams } from '@/services/schools/teams/teams.js'
import { createGame } from '@/services/games/gameService.js'
import useCountryAndCity from '@/composables/useCountryAndCity.js'

export default {
  name: 'Create',
  setup () {
    const router = useRouter()
    const store = useStore()
    const { loading, setLoaded, setLoading } = useLoadingState(false)
    const { selectedCityId, selectedCountryId } = useCountryAndCity()
    const newGame = reactive({
      city_id: selectedCityId,
      country_id: selectedCountryId,
    })
    const countries = computed(() => store.getters['general/GET_COUNTRIES'])
    const onCreateGameClicked = async () => {
      try {
        setLoading()
        const { data } = await createGame(newGame)
        await router.push({ name: 'calendar' })
      } catch (e) {
        const errors = parseErrors(e.response.data.errors)
        console.log(errors)
      } finally {
        setLoaded()
      }
    }

    const tournaments = ref([])
    const leagues = ref([])
    const stadiums = ref([])
    const teams = ref([])

    onMounted(async () => {
      const { data: { data: tournamentItems } } = await paginateTournaments(newGame, null, 0)
      const { data: { data: leagueItems } } = await paginateLeagues(newGame, null, 0)
      const { data: { data: stadiumItems } } = await paginateStadiums(newGame, null, 0)

      leagues.value = leagueItems
      stadiums.value = stadiumItems
      tournaments.value = tournamentItems

    })

    const divisions = computed(
      () => leagues.value.filter(league => league.id=== newGame.league_id)
        .map(function (lg) {
          return lg.divisions
        })
        .flat()
    )

    const secondTeams = computed(
      () => teams.value.filter(team => team.id !== newGame.team_1_id)
    )

    watch(
      () => newGame.league_id,
      (newName, prevName) => {
        newGame.division_id = ''
      },
    )
    watch(
      () => newGame.division_id,
      async (newName, prevName) => {
        if (newGame.division_id) {
          const { data: { data: teamItems, } } = await getTeams(newGame, null, 0)
          teams.value = teamItems
        } else {
          teams.value = []
          newGame.team_1_id = ''
          newGame.team_2_id = ''
        }
      },
    )
    watch(
      () => newGame.city_id,
      async (newName, prevName) => {
        const { data: { data: tournamentItems } } = await paginateTournaments(newGame, null, 0)
        const { data: { data: leagueItems } } = await paginateLeagues(newGame, null, 0)
        const { data: { data: stadiumItems } } = await paginateStadiums(newGame, null, 0)

        leagues.value = leagueItems
        stadiums.value = stadiumItems
        tournaments.value = tournamentItems
        newGame.league_id = []
        newGame.stadium_id = []
        newGame.tournament_id = []
      },
    )

    watch(
      () => newGame.team_1_id,
      async (newName, prevName) => {
        if (newName===newGame.team_2_id) newGame.team_2_id=''
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
    }
  },
}
</script>

<style scoped>

</style>
