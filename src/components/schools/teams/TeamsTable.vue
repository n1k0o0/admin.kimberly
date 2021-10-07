<template>
  <el-table
    class="teams-table"
    :data="teams"
    :empty-text="'Нет данных'"
  >
    <el-table-column
      label="Страна"
    >
      <template #default="scope">
        {{ scope.row.league.country?.name }}
      </template>
    </el-table-column>
    <el-table-column
      label="Город"
    >
      <template #default="scope">
        {{ scope.row.league.city?.name }}
      </template>
    </el-table-column>
    <el-table-column
      label="Лига"
      prop="league"
    >
      <template #default="scope">
        {{ scope.row.league.name }}
      </template>
    </el-table-column>
    <el-table-column
      label="Дивизион"
      prop="division"
    >
      <template #default="scope">
        {{ scope.row.division.name }}
      </template>
    </el-table-column>
    <el-table-column
      label="Цвет"
      prop="color"
    >
      <template #default="scope">
        {{ getPrintableColor(scope.row.color?.color) }}
      </template>
    </el-table-column>
    <el-table-column
      label="Управление"
      width="140"
    >
      <template #default="scope">
        <el-button
          type="primary"
          icon="el-icon-edit"
          @click="handleTeamEditClicked(scope.row)"
        />
        <el-popconfirm
          title="Вы действительно хотите удалить команду?"
          cancel-button-text="Отмена"
          confirm-button-text="Да"
          @confirm="handleTeamRemoveClicked(scope.row)"
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
import { getPrintableColor } from "@/services/common/colors/Color.js";

export default {
  name: "TeamsTable",
  props: {
    teams: {
      type: Array,
      default: () => [],
    }
  },
  emits: ['edit-team', 'remove-team'],

  setup(_, { emit }) {
    const handleTeamEditClicked = (team) => emit('edit-team', team);
    const handleTeamRemoveClicked = (team) => emit('remove-team', team);
    return {
      getPrintableColor,
      handleTeamEditClicked,
      handleTeamRemoveClicked,
    };
  }
};
</script>

<style scoped lang="scss">
.el-table {
  .teams-table {
  }
}
</style>
