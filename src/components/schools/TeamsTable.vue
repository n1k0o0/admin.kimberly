<template>
  <el-table
    class="teams-table"
    :data="teams"
    :empty-text="'Нет данных'"
    @row-click="onTeamClicked"
  >
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
        {{ scope.row.color.color }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "TeamsTable",
  props: {
    teams: {
      type: Array,
      default: () => [],
    }
  },
emits: ['team-clicked'],
  setup(_, {emit}) {
    const getRowStyle = ({ row }) => {
      return {
        'background-color': row.color.rgb ?? '',
        color: 'white',
      }
    }
    const onTeamClicked = (team) => emit('team-clicked', team);
    return {
      getRowStyle,
      onTeamClicked,
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
