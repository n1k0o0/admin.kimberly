<template>
  <el-dialog
    :destroy-on-close="true"
    :model-value="visible"
    :width="'30%'"
    title="Создание тренера"
    :before-close="handleClose"
  >
    <el-row>
      <el-col :span="24">
        <span class="d-block h5">Укажите фамилию</span>
        <el-input
          v-model="coach.last_name"
          class="mb-3"
          placeholder="Фамилия"
        />
        <span class="d-block h5">Укажите имя</span>
        <el-input
          v-model="coach.first_name"
          class="mb-3"
          placeholder="Имя"
        />
        <span class="d-block h5">Укажите отчество</span>
        <el-input
          v-model="coach.patronymic"
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
          @click="onCreateCoachClicked"
        >Создать</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ref } from "vue";
import SingleImageUploader from "@/components/common/SingleImageUploader.vue";

export default {
  name: "CreateCoach",
  components: {
    SingleImageUploader,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    }
  },
  emits: ['coach-created', 'close'],
  setup(_, { emit }) {
    const coach = ref({
      last_name: '',
      first_name: '',
      patronymic: '',
      avatar: null,
    });
    const avatar = ref(null);

    const handleAvatarRemoved = (file) => avatar.value.avatar = null;

    const handleAvatarChanged = async (file, fileList) => {
      avatar.value = file;
      coach.value.avatar = file.raw;
    };

    const clearFields = () => {
      coach.value = {
        last_name: '',
        first_name: '',
        patronymic: '',
        avatar: null,
      };
    };

    const onCreateCoachClicked = () => {
      emit('coach-created', coach.value);
      clearFields();
    };

    const handleClose = () => {
      clearFields();
      emit('close');
    };

    return {
      coach,
      avatar,
      handleAvatarRemoved,
      handleAvatarChanged,
      onCreateCoachClicked,
      handleClose,
    };
  }
};
</script>

<style scoped>

</style>
