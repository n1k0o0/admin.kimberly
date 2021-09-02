<template>
  <el-table
    class="social-links-table"
    :data="coaches"
    :empty-text="'Нет данных'"
    @row-click="onSocialLinkClicked"
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
        <a :href="scope.row.country.link">
          {{ scope.row.country.link }}
        </a>
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
  emits: ['social-links-clicked'],
  setup(_, {emit}) {
    const onSocialLinkClicked = (row) => emit('social-links-clicked', row)
    return {
      getPrintableSocialLinkService,
      onSocialLinkClicked
    }
  }
};
</script>

<style scoped>

</style>
