<template>
    <el-input
      v-for="link in socialLinks"
      :key="link.id"
      v-model="link.link"
    />
</template>

<script>
export default {
  name: "SocialLinksList",
  props: {
    socialLinks: {
      type: Array,
      default: () => [],
    }
  }
};
</script>

<style scoped>

</style>
