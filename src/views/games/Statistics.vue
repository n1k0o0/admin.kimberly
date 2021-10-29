<template>
  <el-card v-loading="loading">
    <template #header>
      <h3>Статистика Игры</h3>
    </template>
    <el-row
      :gutter="20"
      class=""
    >
      <el-col :span="6">
        <label>
          Status
          <el-select
            v-model="game.status"
            filterable
            :disabled="!isEditable"
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
          Start time
          <el-date-picker
            v-model="game.actual_start_time"
            format="DD-MM-YYYY HH:mm"
            value-format="YYYY-MM-DD HH:mm"
            type="datetime"
            :readonly="!isEditable"
          />
        </label>
      </el-col>
      <el-col :span="6">
        <label>
          Finish time
          <el-date-picker
            v-model="game.actual_finish_time"
            format="DD-MM-YYYY HH:mm"
            value-format="YYYY-MM-DD HH:mm"
            type="datetime"
            :readonly="!isEditable"
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
          Start time
          <el-date-picker
            v-model="pause.started_at"
            format="DD-MM-YYYY HH:mm"
            value-format="YYYY-MM-DD HH:mm"
            type="datetime"
            :readonly="!isEditable"
          />
        </label>
      </el-col>
      <el-col :span="6">
        <label>
          Finish time
          <el-date-picker
            v-model="pause.finished_at"
            format="DD-MM-YYYY HH:mm"
            value-format="YYYY-MM-DD HH:mm"
            type="datetime"
            :readonly="!isEditable"
          />
        </label>
      </el-col>
      <el-col
        :span="2"
      >
        <el-button
          icon="el-icon-delete"
          type="danger"
          :disabled="!isEditable"
          @click="removePause(pause.id,index)"
        />
      </el-col>
    </el-row>
    <el-row justify="end">
      <el-col span="24">
        <el-button
          type="primary"
          :disabled="!isEditable"
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
      <el-button-group v-show="!isEditable">
        <el-button @click="$router.push({name: 'results'})">
          Назад
        </el-button>
        <el-button
          v-show="!isEditable"
          type="primary"
          @click="isEditable=!isEditable"
        >
          Редактировать
        </el-button>
      </el-button-group>

      <el-button-group v-show="isEditable">
        <el-button @click="cancelEdit">
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
import {onMounted, reactive, ref} from 'vue'
import {useRoute, useRouter} from "vue-router";
import {useLoadingState} from "@/composables/common/useLoadingState.js";
import {getGame, getPrintableGameStatuses,updateGameStatistics} from '@/services/games/gameService.js';

export default {
  name: "Statistics",
  setup() {
    const route = useRoute()
    const router = useRouter()
    const {loading, setLoaded, setLoading} = useLoadingState(false)

    let firstLoad = true
    let isEditable = ref(false)
    let deletedItems = ref([])
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
      deletedItems.value.push(game.pauses[index])
      game.pauses.splice(index, 1);
    }
    let cancelEdit = ()=>{
      game.pauses=[...game.pauses,...deletedItems.value].sort((a, b) => a.id - b.id)
      deletedItems.value=[]
      isEditable=false
    }

    onMounted(async () => {
      try {
        gameId = route.params.id
        setLoading()
        const {data} = await getGame(gameId)

        Object.assign(game, data)
        game.removed_pause_ids=[]
        setTimeout(() => firstLoad = false, 1000)
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
      isEditable,
      game,
      gameStatuses,
      addPause,
      removePause,
      onUpdateStatisticsClicked,
      cancelEdit
    }
  },
}
</script>

<style scoped>

</style>
