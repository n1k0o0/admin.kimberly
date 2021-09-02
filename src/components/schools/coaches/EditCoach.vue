<template>
  <el-dialog
    :destroy-on-close="true"
    :model-value="visible"
    :width="'30%'"
    title="Редактирование тренера"
  >
    <el-row>
      <el-col :span="24">
        <el-input
          v-model="editedCoach.last_name"
          class="mb-3"
          placeholder="Фамилия"
        />
        <el-input
          v-model="editedCoach.first_name"
          class="mb-3"
          placeholder="Имя"
        />
        <el-input
          v-model="editedCoach.patronymic"
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
          @click="handleCoachEditClicked"
        >Создать</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { reactive, ref } from "vue";

export default {
  name: "EditCoach",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    coach: {
      type: Object,
      required: true,
    }
  },
  emits: ['close', 'coach-edited'],
  setup(props, {emit}) {
    console.log(props.coach);
    const editedCoach = ref(props.coach)
    console.log(editedCoach.value);
    const handleCoachEditClicked = () => console.log(editedCoach)
    return {
      editedCoach,
      handleCoachEditClicked,
    };
  }
};
</script>

<style scoped>

</style>
