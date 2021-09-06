<template>
  <teams-table
    :teams="teams"
    @edit-team="handleEditTeamClicked"
    @remove-team="handleRemoveTeamClicked"
  />
  <el-button @click="showCreateTeamDialog = true">
    Создать команду
  </el-button>
  <create-team
    :visible="showCreateTeamDialog"
    :leagues="availableLeagues"
    @close="showCreateTeamDialog = false"
    @team-created="handleCreateTeamClicked"
  />
  <edit-team
    :visible="showEditTeamDialog"
    :leagues="availableLeagues"
    :team="selectedTeam"
    @close="showEditTeamDialog = false"
    @team-edited="handleTeamEdited"
  />
</template>

<script>
import TeamsTable from "@/components/schools/teams/TeamsTable.vue";
import CreateTeam from "@/components/schools/teams/CreateTeam.vue";
import EditTeam from "@/components/schools/teams/EditTeam.vue";
import useCountryAndCity from "@/composables/useCountryAndCity.js";
import { computed, ref } from "vue";

export default {
  name: "Teams",
  components: { CreateTeam, EditTeam, TeamsTable },
  props: {
    league: {
      type: Array,
      default: () => [],
    },
    teams: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['create-team', 'edit-team', 'remove-team'],
  setup(_, {emit}) {
    const { selectedCity } = useCountryAndCity();
    const availableLeagues = computed(() => selectedCity.value?.leagues ?? []);
    const showCreateTeamDialog = ref(false);
    const showEditTeamDialog = ref(false);

    const selectedTeam = ref(null);
    const handleCreateTeamClicked = (team) => {
      emit('create-team', team);
      showCreateTeamDialog.value = false;
    };

    const handleEditTeamClicked = (team) => {
      selectedTeam.value = team;
      showEditTeamDialog.value = true;
    }

    const handleRemoveTeamClicked = (team) => emit('remove-team', team);
    const handleTeamEdited = (team) => emit('edit-team', team);

    return {
      showCreateTeamDialog,
      showEditTeamDialog,
      availableLeagues,
      selectedTeam,
      handleRemoveTeamClicked,
      handleTeamEdited,
      handleEditTeamClicked,
      handleCreateTeamClicked,
    };
  }
};
</script>

<style scoped>

</style>
