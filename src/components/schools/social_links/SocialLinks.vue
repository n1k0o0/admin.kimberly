<template>
  <social-links-table
    :social-links="socialLinks"
    @edit-social-link="handleSocialLinkEdit"
    @remove-social-link="handleSocialLinkRemove"
  />
  <el-button @click="showCreateSocialLinkDialog = true">
    Добавить ссылку
  </el-button>
  <create-social-link
    :visible="showCreateSocialLinkDialog"
    @close="showCreateSocialLinkDialog = false"
    @social-link-created="handleSocialLinkCreated"
  />
  <edit-social-link
    :visible="showEditSocialLnkDialog"
    :social-link="selectedSocialLink"
    @close="showEditSocialLnkDialog = false"
    @social-link-edited="handleSocialLinkEdited"
  />
</template>

<script>
import SocialLinksTable from "@/components/schools/social_links/SocialLinksTable.vue";
import CreateSocialLink from "@/components/schools/social_links/CreateSocialLink.vue";
import EditSocialLink from "@/components/schools/social_links/EditSocialLink.vue";

import { ref } from "vue";
export default {
  name: "SocialLinksList",
  components: { SocialLinksTable, CreateSocialLink, EditSocialLink, },
  props: {
    socialLinks: {
      type: Array,
      default: () => [],
    }
  },
  emits: ['create-social-link', 'edit-social-link', 'remove-social-link'],
  setup(props, {emit}) {
    const showCreateSocialLinkDialog = ref(false);
    const showEditSocialLnkDialog = ref(false);
    const selectedSocialLink = ref(null);


    const handleSocialLinkCreated = (socialLink) => {
      emit('create-social-link', socialLink);
      showCreateSocialLinkDialog.value = false;
    };
    const handleSocialLinkEdit = (socialLink) => {
      selectedSocialLink.value = socialLink;
      showEditSocialLnkDialog.value = true;
    };
    const handleSocialLinkEdited = (socialLink) => emit('edit-social-link', socialLink);
    const handleSocialLinkRemove = (socialLink) => emit('remove-social-link', socialLink);


    return {
      showCreateSocialLinkDialog,
      showEditSocialLnkDialog,
      selectedSocialLink,
      handleSocialLinkEdit,
      handleSocialLinkRemove,
      handleSocialLinkCreated,
      handleSocialLinkEdited,
    }
  }
};
</script>

<style scoped>

</style>
