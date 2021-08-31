<template>
  <el-row>
    <el-col :span="12">
      <school-list @school-selected="onSelectedSchool" />
    </el-col>
    <el-col :span="12">
      <router-view />
    </el-col>
  </el-row>
</template>

<script>


import SchoolList from "@/components/schools/SchoolList.vue";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "Index",
  components: {
    SchoolList
  },
  setup() {
    const router = useRouter()
    const selectedSchoolId = ref(null);
    const onSelectedSchool = (schoolId) => selectedSchoolId.value = schoolId;

    watch(selectedSchoolId, (schoolId) => router.push({ name: 'schools-edit', params: { id: schoolId }}))

    return {
      onSelectedSchool,
      selectedSchoolId,
    };
  },
};
</script>

<style scoped>

</style>
