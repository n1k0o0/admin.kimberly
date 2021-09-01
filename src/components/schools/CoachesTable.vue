<template>
  <el-table
    class="teams-table"
    :data="coaches"
    :empty-text="'Нет данных'"
    @row-click="onCoachClicked"
  >
    <el-table-column
      label="Полное имя"
    >
      <template #default="scope">
        {{ getCoachFullName(scope.row) }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "CoachesTable",
  props: {
    coaches: {
      type: Array,
      default: () => [],
    }
  },
  setup(_, {emit}) {
    const getCoachFullName = (coach) => `${coach.last_name} ${coach.first_name} ${coach.patronymic}`
    const onCoachClicked = (coach) => emit('coach-clicked', coach)
    return {
      getCoachFullName,
      onCoachClicked,
    }
  }
};
</script>

<style scoped>

</style>
