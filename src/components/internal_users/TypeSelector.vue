<template>
  <el-select
    multiple
  >
    <el-option></el-option>
    <el-option></el-option>
  </el-select>
</template>

<script>
import { getPrintableInternalUserTypes } from "../../services/internal-users/InternalUser";

export default {
  name: "InternalUserTypeSelector",
  setup() {
  }
}
</script>

<style scoped>

</style>
