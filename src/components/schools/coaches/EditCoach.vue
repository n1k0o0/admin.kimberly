<template>
  <el-dialog
    :destroy-on-close="true"
    :model-value="visible"
    :width="'30%'"
    :before-close="handleClose"
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
        >Обновить</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ref, watch } from "vue";

export default {
  name: "EditCoach",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    coach: {
      type: Object,
      default: null,
    }
  },
  emits: ['close', 'coach-edited'],
  setup(props, { emit }) {
    const editedCoach = ref({});
    watch(() => props.coach, () => editedCoach.value = { ...props.coach });

    const handleCoachEditClicked = () => {
      emit('coach-edited', editedCoach);
      handleClose();
    };
    const handleClose = () => emit('close');

    return {
      editedCoach,
      handleClose,
      handleCoachEditClicked,
    };
  }
};
</script>

<style scoped>

</style>
