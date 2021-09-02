<template>
  <el-dialog
    :destroy-on-close="true"
    :model-value="visible"
    :width="'30%'"
    title="Создание тренера"
  >
    <el-row>
      <el-col :span="24">
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
    </el-row>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="$emit('close')">Отмена</el-button>
        <el-button
          type="primary"
          @click="onCreateCoachClicked"
        >Создать</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { reactive, ref } from "vue";

export default {
  name: "CreateCoach",
  props: {
    visible: {
      type: Boolean,
      default: false,
    }
  },
  emits: ['coach-created', 'close'],
  setup(_, { emit }) {
    const coach = reactive({
      last_name: '',
      first_name: '',
      patronymic: '',
    });

    const onCreateCoachClicked = () => emit('coach-created', coach);
    return {
      coach,
      onCreateCoachClicked,
    };
  }
};
</script>

<style scoped>

</style>
