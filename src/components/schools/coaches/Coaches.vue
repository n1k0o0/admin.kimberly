<template>
  <coaches-table
    :coaches="coaches"
    @edit-coach="handleEditCoachClicked"
    @remove-coach="handleRemoveCoachClicked"
  />
  <el-button @click="showCreateCoachDialog = true">
    Создать тренера
  </el-button>
  <create-coach
    :visible="showCreateCoachDialog"
    @close="showCreateCoachDialog = false"
    @coach-created="handleCreateCoachClicked"
  />
  <edit-coach
    :visible="showEditCoachDialog"
    :coach="selectedCoach"
    @close="showEditCoachDialog = false"
    @coach-edited="handleCoachEdited"
  />
</template>

<script>
import { ref } from "vue";
import CoachesTable from "@/components/schools/coaches/CoachesTable.vue";
import CreateCoach from "@/components/schools/coaches/CreateCoach.vue";
import EditCoach from "@/components/schools/coaches/EditCoach.vue";

export default {
  name: "Coaches",
  components: { EditCoach, CreateCoach, CoachesTable },
  props: {
    coaches: {
      type: Array,
      default: () => [],
    }
  },
  emits: ['create-coach', 'edit-coach', 'remove-coach'],
  setup(_, { emit }) {
    const showCreateCoachDialog = ref(false);
    const showEditCoachDialog = ref(false);

    const selectedCoach = ref(null);
    const handleCreateCoachClicked = (coach) => {
      emit('create-coach', coach);
      showCreateCoachDialog.value = false;
    };

    const handleEditCoachClicked = (coach) => {
      selectedCoach.value = coach;
      showEditCoachDialog.value = true;
    }

    const handleCoachEdited = (coach) => emit('edit-coach', coach);
    const handleRemoveCoachClicked = (coach) => emit('remove-coach', coach);

    return {
      selectedCoach,
      showCreateCoachDialog,
      showEditCoachDialog,
      handleCreateCoachClicked,
      handleEditCoachClicked,
      handleRemoveCoachClicked,
      handleCoachEdited,
    };
  }
};
</script>

<style scoped>

</style>
