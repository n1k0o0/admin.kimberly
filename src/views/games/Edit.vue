<template>
  <el-card v-loading="loading">
    <template #header>
      <h3>Базовая информацию по игре</h3>
    </template>
    <el-row
      :gutter="10"
      class="my-4"
    >
      <el-col
        :span="12"
        class="pb-4"
      >
        <el-select
          v-model="game.league_id"
          placeholder="Лига"
          disabled
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
        :span="12"
        class="pb-4"
      >
        <el-select
          v-model="game.division_id"
          placeholder="Дивизион"
          disabled
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
        :span="12"
        class="pb-4"
      >
        <el-select
          v-model="game.tournament_id"
          placeholder="Турнир"
          disabled
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
        :span="12"
        class="pb-4"
      >
        <el-select
          v-model="game.stadium_id"
          placeholder="Стадион"
          disabled
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
        :span="12"
        class="pb-4"
      >
        <el-select
          v-model="game.team_1_id"
          disabled
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
        :span="12"
        class="pb-4"
      >
        <el-select
          v-model="game.team_2_id"
          disabled
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
        :span="12"
        class="pb-4"
      >
        <el-date-picker
          v-model="game.started_at"
          format="DD-MM-YYYY HH:mm"
          placeholder="Дата и время начало турнира"
          type="datetime"
          disabled
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <h4>Составы и Голы</h4>
      </el-col>
      <el-divider />
      <el-col :span="12">
        <h6>
          {{ game.team_1.name }}
        </h6>
        <el-row
          v-for="firstTeamsGoal in firstTeamsGoals"
          :key="firstTeamsGoal.id"
          :gutter="10"
        >
          <el-col :span="11">
            <el-input
              v-if="firstTeamsGoal.player"
              v-model="firstTeamsGoal.player.first_name"
              class="pb-4"
              readonly
            />
          </el-col>
          <el-col
            :span="11"
            class="pb-4"
          >
            <el-input
              v-if="firstTeamsGoal.player"
              v-model="firstTeamsGoal.goals"
              readonly
            />
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <h6>
          {{ game.team_2.name }}
        </h6>
        <el-row
          v-for="secondTeamsGoal in secondTeamsGoals"
          :key="secondTeamsGoal.id"
          :gutter="10"
        >
          <el-col :span="11">
            <el-input
              v-if="secondTeamsGoal.player"
              v-model="secondTeamsGoal.player.first_name"
              class="pb-4"
              readonly
            />
          </el-col>
          <el-col :span="11">
            <el-input
              v-if="secondTeamsGoal.player"
              v-model="secondTeamsGoal.goals"
              class="pb-4"
              readonly
            />
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row
      :gutter="20"
      class="my-3 flex-row-reverse"
    >
      <el-button-group>
        <el-button @click="$router.go(-1)">
          Назад
        </el-button>
        <!--        <el-button-->
        <!--          type="primary"-->
        <!--          @click="onUpdateGameClicked"-->
        <!--        >-->
        <!--          Обновить-->
        <!--        </el-button>-->
      </el-button-group>
    </el-row>
  </el-card>
</template>

<script>
import {computed, onMounted, reactive, ref, watch} from 'vue'
import {useRoute, useRouter} from "vue-router";
import {useLoadingState} from "@/composables/common/useLoadingState.js";
import {getGame, updateGame} from '@/services/games/gameService.js'
import {paginateTournaments} from '@/services/tournaments/tournaments.js'
import {paginateLeagues} from '@/services/leagues/leagueService.js'
import {paginateStadiums} from '@/services/stadiums/stadiums.js'
import {getTeams} from '@/services/schools/teams/teams.js'

export default {
  name: "Edit",
  setup() {
    const route = useRoute()
    const router = useRouter()
    const {loading, setLoaded, setLoading} = useLoadingState(false)

    let firstLoad = true
    let gameId = null
    let game = reactive({
      team_1: [],
      team_2: [],
      players: {
        player: [],
        goals: [],
      }
    });
    const tournaments = ref([])
    const leagues = ref([])
    const stadiums = ref([])
    const teams = ref([])
    const players = ref([
      player=> reactive({
        first_name:''
      })
    ])

    onMounted(async () => {
      try {
        gameId = route.params.id
        setLoading()
        const {data} = await getGame(gameId)
        const {data: {data: tournamentItems}} = await paginateTournaments({city_id: data.league.city_id}, null, 0)
        const {data: {data: leagueItems}} = await paginateLeagues({city_id: data.league.city_id}, null, 0)
        const {data: {data: stadiumItems}} = await paginateStadiums({city_id: data.league.city_id}, null, 0)
        const {data: {data: teamItems,}} = await getTeams({division_id: data.division_id}, null, 0)

        teams.value = teamItems
        leagues.value = leagueItems
        stadiums.value = stadiumItems
        tournaments.value = tournamentItems
        Object.assign(game, data)
        game.league_id = game.league.id
        players.value = data.players
        setTimeout(() => firstLoad = false, 1000)
      } catch (e) {
        console.log(e.message)
      } finally {
        setLoaded()
      }
    })

    const onUpdateGameClicked = async () => {
      try {
        setLoading()
        await updateGame(gameId, game)
        await router.push({name: 'calendar'})
      } catch (e) {
      } finally {
        setLoaded()
      }
    }
    const divisions = computed(
      () => leagues.value.filter(league => league.id === game.league_id)
        .map(function (lg) {
          return lg.divisions
        })
        .flat()
    )
    const secondTeams = computed(
      () => teams.value.filter(team => team.id !== game.team_1_id)
    )

    const firstTeamsGoals = computed(
      () => players.value.filter(player => player.team_id === game.team_1_id && player.player)
    )

    const secondTeamsGoals = computed(
      () => players.value.filter(player => player.team_id === game.team_2_id && player.player)
    )

    watch(
      () => game.league_id,
      (newName, prevName) => {

        if (!(divisions.value.map(e => e.id)).includes(game.division_id)) {
          game.division_id = ''
        }
      },
    )

    watch(
      () => game.division_id,
      async (newName, prevName) => {

        if (firstLoad) return
        if (game.division_id) {
          const {data: {data: teamItems,}} = await getTeams(game, null, 0)
          teams.value = teamItems
        } else {
          teams.value = []
        }
        game.team_1_id = ''
        game.team_2_id = ''
      },
    )

    watch(
      () => game.team_1_id,
      async (newName, prevName) => {
        if (newName === game.team_2_id) game.team_2_id = ''
      },
    )

    return {
      loading,
      game,
      tournaments,
      leagues,
      divisions,
      stadiums,
      teams,
      secondTeams,
      onUpdateGameClicked,
      firstTeamsGoals,
      secondTeamsGoals,
    }
  },
}
</script>

<style scoped>

</style>
