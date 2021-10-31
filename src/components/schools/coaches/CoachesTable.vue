<template>
  <el-table
    class="teams-table"
    :data="coaches"
    :empty-text="'Нет данных'"
  >
    <el-table-column
      label="Полное имя"
    >
      <template #default="scope">
        {{ getCoachFullName(scope.row) }}
      </template>
    </el-table-column>
    <el-table-column
      label="Управление"
    >
      <template #default="scope">
        <el-button
          type="primary"
          icon="el-icon-edit"
          @click="onEditCoachClicked(scope.row)"
        />
        <el-popconfirm
          title="Вы действительно хотите удалить тренера?"
          cancel-button-text="Отмена"
          confirm-button-text="Да"
          @confirm="onRemoveCoachClicked(scope.row)"
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
export default {
  name: "CoachesTable",
  props: {
    coaches: {
      type: Array,
      default: () => [],
    }
  },
emits: ['edit-coach', 'remove-coach'],

  setup(_, { emit }) {
    const getCoachFullName = (coach) => `${ coach.last_name } ${ coach.first_name } ${ coach.patronymic }`;
    const onEditCoachClicked = (coach) => emit('edit-coach', coach);
    const onRemoveCoachClicked = (coach) => emit('remove-coach', coach);
    return {
      getCoachFullName,
      onEditCoachClicked,
      onRemoveCoachClicked,
    };
  }
};
</script>

<style scoped>

</style>
