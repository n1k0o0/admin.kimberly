<template>
  <el-dialog
    :destroy-on-close="true"
    :model-value="visible"
    :width="'30%'"
    :before-close="handleClose"
    title="Редактирование ссылки"
  >
    <el-row>
      <el-col :span="24">
        <social-link-types-selector
          v-model="editedSocialLink.service"
          class="mb-3"
        />
        <el-input
          v-model="editedSocialLink.link"
          placeholder="Ссылка"
        />
      </el-col>
    </el-row>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="$emit('close')">Отмена</el-button>
        <el-button
          type="primary"
          @click="handleSocialLinkEditClicked"
        >Обновить</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ref, watch } from "vue";
import SocialLinkTypesSelector from "@/components/common/SocialLinkTypesSelector.vue";

export default {
  name: "EditSocialLink",
  components: { SocialLinkTypesSelector },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    socialLink: {
      type: Object,
      default: null,
    }
  },
  emits: ['close', 'social-link-edited'],
  setup(props, { emit }) {
    const editedSocialLink = ref({});
    watch(() => props.socialLink, () => editedSocialLink.value = { ...props.socialLink });

    const handleSocialLinkEditClicked = () => {
      emit('social-link-edited', editedSocialLink);
      handleClose();
    };
    const handleClose = () => emit('close');

    return {
      editedSocialLink,
      handleClose,
      handleSocialLinkEditClicked,
    };
  }
};
</script>

<style scoped>

</style>
