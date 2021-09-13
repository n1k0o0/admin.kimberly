<template>
  <el-table
    v-loading="loading"
    :data="games"
    :empty-text="'Нет данных'"
  >
    <el-table-column
      prop="id"
      label="id"
    />
    <el-table-column
      prop="name"
      label="Название"
    />
    <el-table-column
      label="Страна"
    >
      <template #default="scope">
        {{ scope.row.country.name }}
      </template>
    </el-table-column>
    <el-table-column
      label="Город"
    >
      <template #default="scope">
        {{ scope.row.city.name }}
      </template>
    </el-table-column>
    <el-table-column
      prop="status"
      label="Статус"
    >
      <template #default="scope">
        {{ getPrintableTournamentStatus(scope.row.status) }}
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
          title="Вы действительно хотите удалить стадион?"
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
    return {}
  }
};
</script>

<style scoped>

</style>
