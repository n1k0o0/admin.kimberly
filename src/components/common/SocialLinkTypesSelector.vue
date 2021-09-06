<template>
  <el-select
    model-value="socialLinkService"
    class="d-block"
    placeholder="Социальная сеть"
    @change="onSocialLinkServiceSelected"
  >
    <el-option
      v-for="(key, service) in services"
      :key="key"
      :value="service"
      :label="key"
    />
  </el-select>
</template>

<script>
import { getPrintableSocialLinkServices } from "@/services/common/social-links/SocialLink.js";

export default {
  name: "SocialLinkTypesSelector",
  props: {
    socialLinkService: {
      type: String,
      default: null,
    }
  },
  emits: ['social-link-service-changed'],
  setup(_, { emit }) {
    const services = getPrintableSocialLinkServices();
    const onSocialLinkServiceSelected = (service) => emit('social-link-service-changed', services[service]);

    return {
      services,
      onSocialLinkServiceSelected,
    };
  }
};
</script>

<style scoped>

</style>
