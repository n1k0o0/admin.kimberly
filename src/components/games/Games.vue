<template>
  <el-table
    v-loading="loading"
    :data="games"
    :empty-text="'Нет данных'"
  >
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
      label="Лига"
    >
      <template #default="scope">
        {{ scope.row.league.name }}
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
      label="Страна"
    >
      <template #default="scope">
        {{ scope.row.stadium.country.name }}
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
      prop="status"
      label="Статус"
    >
      <template #default="scope">
        {{ tournamentStatus(scope.row.status) }}
      </template>
    </el-table-column>
    <el-table-column
      label="Управление"
    >
      <template #default="scope">
        <el-button
          type="primary"
          icon="el-icon-edit"
          @click="$emit('edit-game', scope.row)"
        />
        <el-popconfirm
          title="Вы действительно хотите удалить игру?"
          cancel-button-text="Отмена"
          confirm-button-text="Да"
          @confirm="$emit('remove-game', scope.row)"
        >
          <template #reference>
            <el-button
              type="danger"
              icon="el-icon-delete"
            />
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { getPrintableTournamentStatus } from "@/services/tournaments/Tournament.js";
export default {
  name: "Games",
  props: {
    games: {
      type: Array,
      default: () => [],
    }
  },
emits: ['remove-game', 'edit-game'],
  setup() {
    const tournamentStatus = (type)=>getPrintableTournamentStatus(type)
    return {
      tournamentStatus
    }
  }
};
</script>

<style scoped>

</style>
