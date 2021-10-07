<template>
  <el-card v-loading="loading">
    <template #header>
      <h3>Редактировать Игру</h3>
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
          :disabled="!game.league_id"
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
        :span="12"
        class="pb-4"
      >
        <el-select
          v-model="game.tournament_id"
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
        :span="12"
        class="pb-4"
      >
        <el-select
          v-model="game.stadium_id"
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
        :span="12"
        class="pb-4"
      >
        <el-select
          v-model="game.team_1_id"
          :disabled="!game.division_id"
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
          :disabled="!game.division_id || !game.team_1_id"
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
        />
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
          @click="onUpdateGameClicked"
        >
          Обновить
        </el-button>
      </el-button-group>
    </el-row>
  </el-card>
</template>

<script>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from "vue-router";
import { useLoadingState } from "@/composables/common/useLoadingState.js";
import { getGame,updateGame } from '@/services/games/gameService.js'
import { paginateTournaments } from '@/services/tournaments/tournaments.js'
import { paginateLeagues } from '@/services/leagues/leagueService.js'
import { paginateStadiums } from '@/services/stadiums/stadiums.js'
import { getTeams } from '@/services/schools/teams/teams.js'

export default {
  name: "Edit",
  setup() {
    const route = useRoute()
    const router = useRouter()
    const { loading, setLoaded, setLoading } = useLoadingState(false)

    let firstLoad=true
    let gameId = null
    let game = reactive({});
    const tournaments = ref([])
    const leagues = ref([])
    const stadiums = ref([])
    const teams = ref([])

    onMounted(async () => {
      try {
        gameId = route.params.id
        setLoading()
        const { data } = await getGame(gameId)
        const { data: { data: tournamentItems } } = await paginateTournaments({ city_id:data.league.city_id }, null, 0)
        const { data: { data: leagueItems } } = await paginateLeagues({ city_id:data.league.city_id }, null, 0)
        const { data: { data: stadiumItems } } = await paginateStadiums({ city_id:data.league.city_id }, null, 0)
        const { data: { data: teamItems, } } = await getTeams({ division_id:data.division_id }, null, 0)

        teams.value = teamItems
        leagues.value = leagueItems
        stadiums.value = stadiumItems
        tournaments.value = tournamentItems
        Object.assign(game, data)
        game.league_id=game.league.id
        setTimeout(()=>firstLoad=false,1000)
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
        await router.push({ name: 'calendar' })
      } catch (e) {
      } finally {
        setLoaded()
      }
    }
    const divisions = computed(
      () => leagues.value.filter(league => league.id===game.league_id)
        .map(function (lg) {
          return lg.divisions
        })
        .flat()
    )
    const secondTeams = computed(
      () => teams.value.filter(team => team.id !== game.team_1_id)
    )

    watch(
      () => game.league_id,
      (newName, prevName) => {

        if(!(divisions.value.map(e => e.id)).includes(game.division_id)){
          game.division_id=''
        }
      },
    )

    watch(
      () => game.division_id,
      async (newName, prevName) => {

        if (firstLoad)return
        if (game.division_id) {
          const { data: { data: teamItems, } } = await getTeams(game, null, 0)
          teams.value = teamItems
        } else {
          teams.value = []
        }
        game.team_1_id = ''
        game.team_2_id = ''
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
    }
  },
}
</script>

<style scoped>

</style>
