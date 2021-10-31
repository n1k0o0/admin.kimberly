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
        <span class="d-block h5">Укажите фамилию</span>
        <el-input
          v-model="editedCoach.last_name"
          class="mb-3"
          placeholder="Фамилия"
        />
        <span class="d-block h5">Укажите имя</span>
        <el-input
          v-model="editedCoach.first_name"
          class="mb-3"
          placeholder="Имя"
        />
        <span class="d-block h5">Укажите отчество</span>
        <el-input
          v-model="editedCoach.patronymic"
          class="mb-3"
          placeholder="Отчество"
        />
        <span class="d-block h5">Загрузите аватар</span>
        <single-image-uploader
          :image="avatar"
          :hide-upload-icon="!!avatar"
          :on-remove="handleAvatarRemoved"
          :on-change="handleAvatarChanged"
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
import SingleImageUploader from "@/components/common/SingleImageUploader.vue";

export default {
  name: "EditCoach",
  components: {
    SingleImageUploader,
  },
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
    const avatar = ref(null);

    watch(() => props.coach, () => {
      editedCoach.value = { ...props.coach };
      avatar.value = props.coach.avatar;
    });

    const handleAvatarRemoved = (file) => avatar.value = null;

    const handleAvatarChanged = async (file, fileList) => {
      avatar.value = file;
      editedCoach.value.avatar = file.raw;
    };

    const handleCoachEditClicked = () => {
      emit('coach-edited', editedCoach);
      handleClose();
    };

    const handleClose = () => emit('close');

    return {
      editedCoach,
      avatar,
      handleAvatarRemoved,
      handleAvatarChanged,
      handleClose,
      handleCoachEditClicked,
    };
  }
};
</script>

<style scoped>

</style>
