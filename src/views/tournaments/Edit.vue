<template>
  <el-card v-loading="loading">
    <template #header>
      <h3>Редактирование {{ tournament.name }}</h3>
      <el-row
        :gutter="2"
        justify="space-between"
      >
        <el-row />
        <el-row>
          <el-select
            v-model="tournament.status"
            placeholder="Статус"
            @change="handleTournamentStatusChanged"
          >
            <el-option
              v-for="(userType, key) in printableStatuses"
              :key="key"
              :label="userType"
              :value="key"
            />
          </el-select>
        </el-row>
      </el-row>
    </template>
    <el-row class="my-4">
      <el-col :span="6">
        <span>Укажите название</span>
        <el-input
          v-model="tournament.name"
          placeholder="Название"
        />
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="6">
        <span>Укажите дату и время начала</span>
        <el-date-picker
          v-model="tournament.started_at"
          value-format="YYYY-MM-DD"
        />
      </el-col>
    </el-row>
    <el-row class="my-4">
      <el-col :span="6">
        <span>Укажите дату и время окончания</span>
        <el-date-picker
          v-model="tournament.ended_at"
          value-format="YYYY-MM-DD"
        />
      </el-col>
    </el-row>
    <el-row class="my-3 flex-row-reverse">
      <el-button-group>
        <el-button @click="$router.push({name: 'tournaments'})">
          Отменить
        </el-button>
        <el-button
          type="primary"
          @click="onUpdateTournamentClicked"
        >
          Обновить
        </el-button>
      </el-button-group>
    </el-row>
  </el-card>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLoadingState } from '@/composables/common/useLoadingState.js'
import { getTournament, updateTournament, updateTournamentStatus } from '@/services/tournaments/tournaments.js'
import { getPrintableTournamentStatuses } from '@/services/tournaments/Tournament.js'

export default {
  name: 'Edit',
  setup () {
    const route = useRoute()
    const router = useRouter()
    const { loading, setLoaded, setLoading } = useLoadingState(false)

    let tournamentId = null
    let tournament = ref({})

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
        setLoading()
        await updateTournamentStatus(tournamentId, status)
        tournament.value.status = status
      } catch (e) {
        console.log(e)
      } finally {
        setLoaded()
      }
    }

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
