<template>
  <el-card>
    <template #header>
      <h3>Расписание</h3>
      <el-row
        :gutter="20"
      >
        <el-col
          :span="5"
          class="pb-5"
        >
          <el-select
            v-model="search.stadium_ids"
            filterable
            multiple
            placeholder="Стадион"
            @change="searchGames"
          >
            <el-option
              v-for="(stadium) in stadiums"
              :key="stadium.id"
              :label="stadium.title"
              :value="stadium.id"
            />
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-select
            v-model="search.tournament_ids"
            filterable
            multiple
            placeholder="Турнир"
            @change="searchGames"
          >
            <el-option
              v-for="(tournament) in tournaments"
              :key="tournament.id"
              :label="tournament.name"
              :value="tournament.id"
            />
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-select
            v-model="search.league_ids"
            filterable
            multiple
            placeholder="Лига"
            @change="searchGames"
          >
            <el-option
              v-for="(league) in leagues"
              :key="league.id"
              :label="league.name"
              :value="league.id"
            />
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-select
            v-model="search.division_ids"
            :disabled="!search.league_ids || !search.league_ids.length"
            filterable
            multiple
            placeholder="Дивизион"
            @change="searchGames"
          >
            <el-option
              v-for="(division) in divisions"
              :key="division.id"
              :label="division.name"
              :value="division.id"
            />
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-select
            v-model="search.team_ids"
            :disabled="!search.division_ids || !search.division_ids.length"
            filterable
            multiple
            placeholder="Команда"
            @change="searchGames"
          >
            <el-option
              v-for="(team) in teams"
              :key="team.id"
              :label="team.name"
              :value="team.id"
            />
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-date-picker
            v-model="search.date_from"
            format="DD-MM-YYYY"
            value-format="YYYY-MM-DD"
            placeholder="Дата начала матча"
            type="date"
            @change="searchGames"
          />
        </el-col>
        <el-col :span="5">
          <el-date-picker
            v-model="search.date_to"
            format="DD-MM-YYYY"
            value-format="YYYY-MM-DD"
            placeholder="Дата завершения матча"
            type="date"
            @change="searchGames"
          />
        </el-col>
      </el-row>
      <el-row
        :gutter="20"
        justify="end"
        style="margin-top: 15px;"
      >
        <el-col
          :span="3"
          class="d-flex justify-content-end"
        >
          <el-button
            type="primary"
            @click="$router.push({name: 'game-create'})"
          >
            Создать
          </el-button>
        </el-col>
      </el-row>
    </template>
    <games
      :games="games"
      :loading="loading"
      @remove-game="onRemoveGameClicked($event)"
    />
    <el-row justify="center">
      <el-pagination
        :current-page="currentPage"
        :hide-on-single-page="true"
        layout="prev, pager, next"
        v-bind="pagination"
        @update:current-page="onCurrentPageUpdated"
      />
    </el-row>
  </el-card>
</template>

<script>
import {computed, onMounted, reactive, ref, watch} from 'vue'
import {useLoadingState} from '@/composables/common/useLoadingState.js'
import usePagination from '@/composables/common/usePagination.js'
import {paginateTournaments} from '@/services/tournaments/tournaments.js'
import {paginateLeagues} from '@/services/leagues/leagueService.js'
import {paginateStadiums} from '@/services/stadiums/stadiums.js'
import {paginateGames, removeGame} from '@/services/games/gameService.js'
import {getPrintableTournamentStatus} from '@/services/tournaments/Tournament.js'
import {getTeams} from '@/services/schools/teams/teams.js'
import useCountryAndCity from '@/composables/useCountryAndCity.js'
import Games from '@/components/games/Games.vue'

export default {
  name: 'Index',
  components: {Games},
  setup() {
    const {loading, setLoaded, setLoading} = useLoadingState(true)
    const {pagination, setPagination, currentPage} = usePagination()
    const {selectedCityId, selectedCountryId} = useCountryAndCity()
    const search = reactive({
      city_id: selectedCityId,
      country_id: selectedCountryId,
    })
    const tournaments = ref([])
    const leagues = ref([])
    const stadiums = ref([])
    const games = ref([])
    const teams = ref([])

    onMounted(async () => {
      setLoading()

      const {data: {data: tournamentItems}} = await paginateTournaments(search, null, 0)
      const {data: {data: leagueItems}} = await paginateLeagues(search, null, 0)
      const {data: {data: stadiumItems}} = await paginateStadiums(search, null, 0)

      await searchGames()
      leagues.value = leagueItems
      stadiums.value = stadiumItems
      tournaments.value = tournamentItems

      setLoaded()
    })

    watch(
      () => search.league_ids,
      () => {
        if (search.league_ids && search.league_ids.length) {

          if (search.division_ids && search.division_ids.length) {
            search.division_ids = search.division_ids.filter(function (el) {
              return divisions.value.map(e => e.id)
                .indexOf(el) !== -1
            })
          }

        } else {
          search.division_ids = []
        }
      },
    )
    watch(
      () => search.division_ids,
      async () => {
        if (search.division_ids && search.division_ids.length) {
          const {data: {data: teamItems,}} = await getTeams(search, null, 0)
          teams.value = teamItems
          if (search.team_ids && search.team_ids.length) {
            search.team_ids = search.team_ids.filter(function (el) {
              return teams.value.map(e => e.id)
                .indexOf(el) !== -1
            })
          }
        } else {
          teams.value = []
          search.team_ids = []
        }
      },
    )
    watch(
      () => search.city_id,
      async () => {
        const {data: {data: tournamentItems}} = await paginateTournaments(search, null, 0)
        const {data: {data: leagueItems}} = await paginateLeagues(search, null, 0)
        const {data: {data: stadiumItems}} = await paginateStadiums(search, null, 0)

        leagues.value = leagueItems
        stadiums.value = stadiumItems
        tournaments.value = tournamentItems
        search.league_ids = []
        search.stadium_ids = []
        search.tournament_ids = []
        games.value = []
        setPagination({current_page: 0, total: 0, per_page: 0})
        await searchGames()
      },
    )

    watch([currentPage], async () => {
      setLoading()
      if (currentPage.value > 0) {
        try {
          setLoading()
          const {data: {data: gameItems, meta}} = await paginateGames(search, currentPage.value)
          games.value = gameItems
          setPagination(meta)
        } catch (e) {
        } finally {
          setLoaded()
        }
      }
    })

    const divisions = computed(
      () => leagues.value.filter(league => search.league_ids.includes(league.id))
        .map(function (lg) {
          return lg.divisions
        })
        .flat()
    )

    const searchGames = async () => {
      try {
        setLoading()
        const {data: {data: gameItems, meta}} = await paginateGames(search)
        games.value = gameItems
        setPagination(meta)
      } catch (e) {
      } finally {
        setLoaded()
      }
    }
    const onCurrentPageUpdated = (page) => currentPage.value = page
    const updateOnChangeSearch = () => {
      try {
        setLoading()
        search.league_ids = search.league_ids.filter(function (el) {
          return leagues.value.map(e => e.id)
            .indexOf(el) !== -1
        })
        search.division_ids = search.division_ids.filter(function (el) {
          return divisions.value.map(e => e.id)
            .indexOf(el) !== -1
        })
      } catch (e) {
      } finally {
        setLoaded()
      }
    }
    const onRemoveGameClicked = async (game) => {
      try {
        setLoading()
        await removeGame(game.id)
        const {data: {data: gameItems, meta}} = await paginateGames(search)
        games.value = gameItems
        setPagination(meta)
      } catch (e) {
      } finally {
        setLoaded()
      }
    }

    return {
      getPrintableTournamentStatus,
      search,
      searchGames,
      tournaments,
      leagues,
      divisions,
      stadiums,
      games,
      teams,
      loading,
      onCurrentPageUpdated,
      onRemoveGameClicked,
      pagination,
      currentPage,
    }
  },
}
</script>

<style scoped>

</style>
