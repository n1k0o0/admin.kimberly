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

    <template v-if="withGoals">
      <el-table-column
        label="Goals 1"
      >
        <template #default="scope">
          {{ scope.row.team_1_goals ?? 0 }}
        </template>
      </el-table-column>
      <el-table-column
        label="Goals 2"
      >
        <template #default="scope">
          {{ scope.row.team_2_goals ?? 0 }}
        </template>
      </el-table-column>
    </template>

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
        {{ gameStatus(scope.row.status) }}
      </template>
    </el-table-column>

    <el-table-column
      label="Управление"
      width="140"
      class-name="actions"
    >
      <template #default="scope">
        <el-button
          icon="el-icon-more"
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
        <el-button
          v-if="withGoals"
          icon="el-icon-edit"
          type="primary"
          @click="$router.push({name: 'game-statistics', params: {id: scope.row.id}})"
        />
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import {getPrintableGameStatus} from "@/services/games/gameService";

export default {
  name: 'Games',
  props: {
    games: {
      type: Array,
      default: () => [],
    },
    withGoals: {
      type: Boolean,
      default: false,
    }
  },
  emits: ['remove-game', 'edit-game'],
  setup() {
    const gameStatus = (type) => getPrintableGameStatus(type)
    return {
      gameStatus
    }
  }
}
</script>

<style scoped>

</style>
