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
          v-for="firstTeamsPlayer in firstTeamsPlayers"
          :key="firstTeamsPlayer.id"
          :gutter="10"
        >
          <el-col :span="6">
            <el-row :gutter="5">
              <el-col :span="16">
                <el-input
                  v-model="firstTeamsPlayer.player.first_name"
                  class="pb-4"
                  readonly
                />
              </el-col>
              <el-col :span="8">
                <el-button
                  type="primary"
                  icon="el-icon-plus"
                  circle
                  @click="addGoal(firstTeamsPlayer.player.id)"
                />
              </el-col>
            </el-row>
          </el-col>
          <el-col
            v-for="(goal,index) in firstTeamsPlayer.goals"
            :key="index"
            :span="5"
          >
            <el-row :gutter="5">
              <el-col :span="14">
                <el-input
                  v-model="firstTeamsPlayer.goals[index]"
                  class="pb-4"
                  readonly
                />
              </el-col>
              <el-col :span="10">
                <el-popconfirm
                  title="Вы действительно хотите удалить гол?"
                  @confirm="deleteGoal(firstTeamsPlayer.player.id,goal)"
                >
                  <template #reference>
                    <el-button
                      type="danger"
                      icon="el-icon-delete"
                      circle
                    />
                  </template>
                </el-popconfirm>
              </el-col>
            </el-row>
          </el-col>
          <el-divider />
        </el-row>
      </el-col>
      <el-col :span="12">
        <h6>
          {{ game.team_2.name }}
        </h6>
        <el-row
          v-for="secondTeamsPlayer in secondTeamsPlayers"
          :key="secondTeamsPlayer.id"
          :gutter="10"
        >
          <el-col :span="6">
            <el-col :span="16">
              <el-input
                v-model="secondTeamsPlayer.player.first_name"
                class="pb-4"
                readonly
              />
            </el-col>
            <el-col :span="8">
              <el-button
                type="primary"
                icon="el-icon-plus"
                circle
                @click="addGoal(secondTeamsPlayer.player.id)"
              />
            </el-col>
          </el-col>
          <el-col
            v-for="(goal,index) in secondTeamsPlayer.goals"
            :key="index"
            :span="5"
          >
            <el-row :gutter="5">
              <el-col :span="14">
                <el-input
                  v-model="secondTeamsPlayer.goals[index]"
                  class="pb-4"
                  readonly
                />
              </el-col>
              <el-col :span="10">
                <el-popconfirm
                  title="Вы действительно хотите удалить гол?"
                  @confirm="deleteGoal(secondTeamsPlayer.player.id,goal)"
                >
                  <template #reference>
                    <el-button
                      type="danger"
                      icon="el-icon-delete"
                      circle
                    />
                  </template>
                </el-popconfirm>
              </el-col>
            </el-row>
          </el-col>
          <el-divider />
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
      </el-button-group>
    </el-row>
  </el-card>
</template>

<script>
import {computed, onMounted, reactive, ref} from 'vue'
import {useRoute} from "vue-router";
import {useLoadingState} from "@/composables/common/useLoadingState.js";
import {getGame, deleteGoalAdmin, addGoalAdmin} from '@/services/games/gameService.js'
import {paginateTournaments} from '@/services/tournaments/tournaments.js'
import {paginateLeagues} from '@/services/leagues/leagueService.js'
import {paginateStadiums} from '@/services/stadiums/stadiums.js'
import {getTeams} from '@/services/schools/teams/teams.js'
import {ElMessageBox} from "element-plus";

export default {
  name: "Edit",
  setup(target) {
    const route = useRoute()
    const {loading, setLoaded, setLoading} = useLoadingState(false)

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
    let secondTeamsPlayers = ref({})
    let firstTeamsPlayers = ref({})

    onMounted(async () => {
      try {
        gameId = route.params.id
        setLoading()
        const {data} = await getGame(gameId)
        firstTeamsPlayers.value = data.players.filter(player => player.team_id === data.team_1_id && player.player)
        secondTeamsPlayers.value = data.players.filter(player => player.team_id === data.team_2_id && player.player)
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

      } catch (e) {
        console.log(e.message)
      } finally {
        setLoaded()
      }
    })

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

    const deleteGoal = async (playerId, goalMinute) => {
      try {
        setLoading()
        await deleteGoalAdmin(game.id, {player_id: playerId, minute: goalMinute})
        const {data} = await getGame(gameId)
        firstTeamsPlayers.value = data.players.filter(player => player.team_id === data.team_1_id && player.player)
        secondTeamsPlayers.value = data.players.filter(player => player.team_id === data.team_2_id && player.player)
      } catch (e) {
      } finally {
        setLoaded()
      }
    }

    const addGoal = async (playerId) => {
      ElMessageBox.prompt('Введите минуту в которой был забит гол', 'Добавить гол', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        inputPattern:
          /\b([1-9]|[1-9][0-9]|1[01][0-9]|12[0-9]|130)\b/,
        inputErrorMessage: 'Введите целое число',
      })
        .then(async ({value}) => {
          setLoading()
          await addGoalAdmin(game.id, {player_id: playerId, minute: value})
          const {data} = await getGame(gameId)
          firstTeamsPlayers.value = data.players.filter(player => player.team_id === data.team_1_id && player.player)
          secondTeamsPlayers.value = data.players.filter(player => player.team_id === data.team_2_id && player.player)
        })
        .catch(() => {
        }).finally(() => {
        setLoaded()
      })

    }


    return {
      loading,
      game,
      tournaments,
      leagues,
      divisions,
      stadiums,
      teams,
      secondTeams,
      firstTeamsPlayers,
      secondTeamsPlayers,
      deleteGoal,
      addGoal
    }
  },
}
</script>

<style scoped>

</style>
