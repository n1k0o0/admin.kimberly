<template>
  <el-table
    v-loading="loading"
    :data="games"
    :empty-text="'Нет данных'"
  >
    <el-table-column
      label="Страна"
    >
      <template #default="scope">
        {{ scope.row.league.country.name }}
      </template>
    </el-table-column>
    <el-table-column
      label="Город"
    >
      <template #default="scope">
        {{ scope.row.league.city.name }}
      </template>
    </el-table-column>

    <el-table-column
      label="Турнир"
    >
      <template #default="scope">
        {{ scope.row.tournament.name }}
      </template>
    </el-table-column>
    <el-table-column
      label="Лига"
    >
      <template #default="scope">
        {{ scope.row.league.name }}
      </template>
    </el-table-column>
    <el-table-column
      label="Дивизион"
    >
      <template #default="scope">
        {{ scope.row.division.name }}
      </template>
    </el-table-column>

    <el-table-column
      label="Дата начало"
    >
      <template #default="scope">
        {{ $moment(scope.row.started_at).locale('ru').format('YYYY-MM-DD') }}
      </template>
    </el-table-column>
    <el-table-column
      label="Время начало"
    >
      <template #default="scope">
        {{ $moment(scope.row.started_at).locale('ru').format('HH:mm') }}
      </template>
    </el-table-column>

    <el-table-column
      label="Team 1"
    >
      <template #default="scope">
        {{ scope.row.team_1.name }}
      </template>
    </el-table-column>
    <el-table-column
      label="Team 2"
    >
      <template #default="scope">
        {{ scope.row.team_2.name }}
      </template>
    </el-table-column>

    <el-table-column
      label="Стадион"
    >
      <template #default="scope">
        {{ scope.row.stadium.title }}
      </template>
    </el-table-column>
    <el-table-column
      label="Статус"
      prop="status"
    >
      <template #default="scope">
        {{ tournamentStatus(scope.row.status) }}
      </template>
    </el-table-column>

    <el-table-column
      label="Управление"
      width="140"
    >
      <template #default="scope">
        <el-button
          icon="el-icon-edit"
          type="primary"
          @click="$router.push({name: 'games-edit', params: {id: scope.row.id}})"
        />
        <el-popconfirm
          cancel-button-text="Отмена"
          confirm-button-text="Да"
          title="Вы действительно хотите удалить игру?"
          @confirm="$emit('remove-game', scope.row)"
        >
          <template #reference>
            <el-button
              icon="el-icon-delete"
              type="danger"
            />
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { getPrintableTournamentStatus } from '@/services/tournaments/Tournament.js'

export default {
  name: 'Games',
  props: {
    games: {
      type: Array,
      default: () => [],
    }
  },
  emits: ['remove-game', 'edit-game'],
  setup () {
    const tournamentStatus = (type) => getPrintableTournamentStatus(type)
    return {
      tournamentStatus
    }
  }
}
</script>

<style scoped>

</style>
