<template>
  <el-row class="mb-5" v-if="updatingDivision.id">
    <el-input
      class="w-75"
      v-model="updatingDivision.name"
      @keyup.enter="onUpdateDivisionClicked"
    />
    <el-button class="w-25" @click="onUpdateDivisionClicked">Обновить</el-button>
  </el-row>
</template>

<script>
export default {
  name: "EditDivision"
}
</script>

<style scoped>

</style>
