<template>
  <el-dialog
    :destroy-on-close="true"
    :model-value="visible"
    :width="'30%'"
    title="Создание ссылки"
    :before-close="handleClose"
  >
    <el-row>
      <el-col :span="24">
        <social-link-types-selector
          v-model="socialLink.service"
          class="mb-3"
        />
        <el-input
          v-model="socialLink.link"
          placeholder="Ссылка"
        />
      </el-col>
    </el-row>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="$emit('close')">Отмена</el-button>
        <el-button
          type="primary"
          @click="onCreateSocialLinkClicked"
        >Создать</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ref } from "vue";
import SocialLinkTypesSelector from "@/components/common/SocialLinkTypesSelector.vue";

export default {
  name: "CreateSocialLink",
  components: { SocialLinkTypesSelector },
  props: {
    visible: {
      type: Boolean,
      default: false,
    }
  },
  emits: ['social-link-created', 'close'],
  setup(_, { emit }) {
    const socialLink = ref({
      service: '',
      link: '',
    });

    const clearFields = () => {
      socialLink.value = {
        service: '',
        link: '',
      };
    };

    const onCreateSocialLinkClicked = () => {
      emit('social-link-created', socialLink.value);
      clearFields();
    };

    const handleClose = () => {
      clearFields();
      emit('close');
    };

    return {
      socialLink,
      onCreateSocialLinkClicked,
      handleClose,
    };
  }
};
</script>

<style scoped>

</style>
