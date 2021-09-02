<template>
  <el-table
    class="social-links-table"
    :data="socialLinks"
    :empty-text="'Нет данных'"
  >
    <el-table-column
      label="Сервис"
    >
      <template #default="scope">
        {{ getPrintableSocialLinkService(scope.row.service) }}
      </template>
    </el-table-column>
    <el-table-column
      label="Ссылка"
      prop="link"
    >
      <template #default="scope">
        <a :href="scope.row.link">
          {{ scope.row.link }}
        </a>
      </template>
    </el-table-column>
    <el-table-column
      label="Управление"
    >
      <template #default="scope">
        <el-button
          type="primary"
          icon="el-icon-edit"
          @click="handleSocialLinkEditClicked(scope.row)"
        />
        <el-popconfirm
          title="Вы действительно хотите удалить команду?"
          cancel-button-text="Отмена"
          confirm-button-text="Да"
          @confirm="handleSocialLinkRemoveClicked(scope.row)"
        >
          <template #reference>
            <el-button
              type="danger"
              icon="el-icon-delete"
            />
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { getPrintableSocialLinkService } from "@/services/common/social-links/SocialLink.js";

export default {
  name: "SocialLinksList",
  props: {
    socialLinks: {
      type: Array,
      default: () => [],
    }
  },
  emits: ['edit-social-link-clicked', 'remove-social-link-clicked'],
  setup(props, {emit}) {
    console.log(props.socialLinks);
    const handleSocialLinkEditClicked = (socialLink) => emit('edit-social-link-clicked', socialLink);
    const handleSocialLinkRemoveClicked = (socialLink) => emit('remove-social-link-clicked', socialLink);
    return {
      getPrintableSocialLinkService,
      handleSocialLinkEditClicked,
      handleSocialLinkRemoveClicked,
    }
  }
};
</script>

<style scoped>

</style>
