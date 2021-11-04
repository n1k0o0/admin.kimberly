<template>
  <el-card v-loading="loading">
    <template #header>
      <h3>Статистика Игры</h3>
    </template>
    <el-row>
      <el-col :span="24">
        <h4>{{ game.team_1?.name }} - {{ game.team_2?.name }} ( {{ game.tournament?.name }}, {{ game.stadium?.title }} ) </h4>
      </el-col>
    </el-row>
    <el-divider />
    <el-row
      :gutter="20"
      class=""
    >
      <el-col :span="6">
        <label>
          Статус
          <el-select
            v-model="game.status"
            filterable
          >
            <el-option
              v-for="(status,key) in gameStatuses"
              :key="key"
              :label="status"
              :value="key"
            />
          </el-select>
        </label>
      </el-col>
      <el-col :span="6">
        <label>
          Дата начала
          <el-date-picker
            v-model="game.actual_start_time"
            format="DD-MM-YYYY HH:mm"
            type="datetime"
            editable
          />
        </label>
      </el-col>
      <el-col :span="6">
        <label>
          Дата завершения
          <el-date-picker
            v-model="game.actual_finish_time"
            format="DD-MM-YYYY HH:mm"
            type="datetime"
            editable
          />
        </label>
      </el-col>
    </el-row>
    <el-divider />
    <h4>Game Pauses</h4>
    <el-row
      v-for="(pause,index) in game.pauses"
      :key="pause.id"
      :gutter="20"
      align="bottom"
    >
      <el-col :span="6">
        <label>
          Дата начала
          <el-date-picker
            v-model="pause.started_at"
            format="DD-MM-YYYY HH:mm"
            type="datetime"
            editable
          />
        </label>
      </el-col>
      <el-col :span="6">
        <label>
          Дата завершения
          <el-date-picker
            v-model="pause.finished_at"
            format="DD-MM-YYYY HH:mm"
            type="datetime"
            editable
          />
        </label>
      </el-col>
      <el-col
        :span="2"
      >
        <el-button
          icon="el-icon-delete"
          type="danger"
          @click="removePause(pause.id,index)"
        />
      </el-col>
    </el-row>
    <el-row justify="end">
      <el-col span="24">
        <el-button
          type="primary"
          @click="addPause"
        >
          Добавить паузу
        </el-button>
      </el-col>
    </el-row>
    <el-divider />
    <el-row
      :gutter="20"
      class="my-3 flex-row-reverse"
    >
      <el-button-group>
        <el-button @click="$router.push({name: 'results'})">
          Отменить
        </el-button>
        <el-button
          type="primary"
          @click="onUpdateStatisticsClicked"
        >
          Обновить
        </el-button>
      </el-button-group>
    </el-row>
  </el-card>
</template>

<script>
import {onMounted, reactive} from 'vue'
import {useRoute, useRouter} from "vue-router";
import {useLoadingState} from "@/composables/common/useLoadingState.js";
import {getGame, getPrintableGameStatuses,updateGameStatistics} from '@/services/games/gameService.js';

export default {
  name: "Statistics",
  setup() {
    const route = useRoute()
    const router = useRouter()
    const {loading, setLoaded, setLoading} = useLoadingState(false)

    let gameId = null
    let game = reactive({});
    const gameStatuses = getPrintableGameStatuses()
    let addPause = () => {
      game.pauses.push({
        id: null, started_at: null, finished_at: null
      })
    }
    let removePause = (id, index) => {
      if (id)game.removed_pause_ids.push(id)
      game.pauses.splice(index, 1);
    }


    onMounted(async () => {
      try {
        gameId = route.params.id
        setLoading()
        const {data} = await getGame(gameId)

        Object.assign(game, data)
        game.removed_pause_ids=[]
      } catch (e) {
        console.log(e.message)
      } finally {
        setLoaded()
      }
    })

    let onUpdateStatisticsClicked = async ()=>{
      try {
        setLoading()
        await updateGameStatistics(gameId, game)
        await router.push({ name: 'results' })
      } catch (e) {
      } finally {
        setLoaded()
      }
    }

    return {
      loading,
      game,
      gameStatuses,
      addPause,
      removePause,
      onUpdateStatisticsClicked,
    }
  },
}
</script>

<style scoped>

</style>
