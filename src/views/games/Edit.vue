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
        :span="12"
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
        :span="12"
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
        :span="12"
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
        :span="12"
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
        :span="12"
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
        :span="12"
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
        :span="12"
        class="pb-4"
      >
        <el-date-picker
          v-model="newGame.started_at"
          format="MM-DD-YYYY HH:mm"
          placeholder="Дата и время начало турнира"
          type="datetime"
        />
      </el-col>
      <el-col
        :span="12"
        class="pb-4"
      >
        <el-date-picker
          v-model="newGame.finished_at"
          format="MM-DD-YYYY HH:mm"
          placeholder="Дата и время завершения турнира"
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
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useLoadingState } from "@/composables/common/useLoadingState.js";
import { getTournament, updateTournament, updateTournamentStatus } from "@/services/tournaments/tournaments.js";
import { getPrintableTournamentStatuses } from "@/services/tournaments/Tournament.js";

export default {
  name: "Edit",
  setup() {
    const route = useRoute()
    const router = useRouter()
    const { loading, setLoaded, setLoading } = useLoadingState(false)

    let tournamentId = null
    let tournament = ref({});

    onMounted(async () => {
      try {
        tournamentId = route.params.id
        setLoading()
        const { data } = await getTournament(tournamentId)
        tournament.value = data
      } catch (e) {
        console.log(e)
      } finally {
        setLoaded()
      }
    })

    const onUpdateTournamentClicked = async () => {
      try {
        setLoading()
        await updateTournament(tournamentId, tournament.value)
        await router.push({ name: 'tournaments' })
      } catch (e) {
      } finally {
        setLoaded()
      }
    }

    const handleTournamentStatusChanged = async (status) => {
      try {
        setLoading();
        await updateTournamentStatus(tournamentId, status);
        tournament.value.status = status;
      } catch (e) {
        console.log(e);
      } finally {
        setLoaded();
      }
    };

    const printableStatuses = getPrintableTournamentStatuses()

    return {
      printableStatuses,
      loading,
      tournament,
      onUpdateTournamentClicked,
      handleTournamentStatusChanged,
    }
  },
}
</script>

<style scoped>

</style>
