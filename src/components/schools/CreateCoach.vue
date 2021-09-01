<template>
  <el-row>
    <el-col>
      <el-input
        v-model="coach.last_name"
        class="mb-3"
        placeholder="Фамилия"
      />
      <el-input
        v-model="coach.first_name"
        class="mb-3"
        placeholder="Имя"
      />
      <el-input
        v-model="coach.patronymic"
        class="mb-3"
        placeholder="Отчество"
      />
    </el-col>
    <el-col>
      <el-button @click="onCreateCoachClicked">
        Добавить
      </el-button>
    </el-col>
  </el-row>
</template>

<script>
import { reactive } from "vue";

export default {
  name: "CreateCoach",
emits: ['coach-created'],
  setup(_, {emit}) {
    const coach = reactive({
      last_name: '',
      first_name: '',
      patronymic: '',
    })

    const onCreateCoachClicked = () => emit('coach-created', coach)
    return {
      coach,
      onCreateCoachClicked
    }
  }
};
</script>

<style scoped>

</style>
