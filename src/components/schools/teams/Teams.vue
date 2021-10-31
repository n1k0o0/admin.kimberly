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
    :teams="teams"
    :leagues="leagues"
    :visible="showCreateTeamDialog"
    @close="showCreateTeamDialog = false"
    @team-created="handleCreateTeamClicked"
  />
  <edit-team
    :leagues="leagues"
    :team="selectedTeam"
    :teams="teams"
    :visible="showEditTeamDialog"
    @close="showEditTeamDialog = false"
    @team-edited="handleTeamEdited"
  />
</template>

<script>
import TeamsTable from '@/components/schools/teams/TeamsTable.vue'
import CreateTeam from '@/components/schools/teams/CreateTeam.vue'
import EditTeam from '@/components/schools/teams/EditTeam.vue'
import { useLoadingState } from '@/composables/common/useLoadingState.js'

import { computed, ref } from 'vue'
import { ElNotification } from 'element-plus'

export default {
  name: 'Teams',
  components: { CreateTeam, EditTeam, TeamsTable },
  props: {
    leagues: {
      type: Array,
      default: () => [],
    },
    teams: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['create-team', 'edit-team', 'remove-team'],
  setup (_, { emit }) {
    const { loading, setLoaded, setLoading } = useLoadingState(false)
    const availableLeagues = ref({})
    const showCreateTeamDialog = ref(false)
    const showEditTeamDialog = ref(false)

    const selectedTeam = ref(null)
    const handleCreateTeamClicked = (team) => {
      emit('create-team', team)
      showCreateTeamDialog.value = false
    }

    const handleEditTeamClicked = (team) => {
      selectedTeam.value = team
      showEditTeamDialog.value = true
    }

    const handleRemoveTeamClicked = (team) => emit('remove-team', team)
    const handleTeamEdited = (team) => emit('edit-team', team)


    return {
      showCreateTeamDialog,
      showEditTeamDialog,
      selectedTeam,
      handleRemoveTeamClicked,
      handleTeamEdited,
      handleEditTeamClicked,
      handleCreateTeamClicked,
    }
  }
}
</script>

<style scoped>

</style>
