<template>
  <el-row class="mb-5">
    <el-input
      class="w-75"
      v-model="newDivision.name"
      placeholder="Дивизион"
      @keyup.enter="addDivision"
    />
    <el-button class="w-25" @click="addDivision">Добавить</el-button>
  </el-row>
</template>

<script>
import { ref } from "vue";

export default {
  name: "AddDivision",
  setup(_, { emit }) {
    const newDivision = ref({
      name: '',
    })
    const addDivision = () => {
      emit('add-division', { division: newDivision.value })
      newDivision.value.name = ''
    }

    return {
      newDivision,
      addDivision,
    }
  }
}
</script>

<style scoped>

</style>
