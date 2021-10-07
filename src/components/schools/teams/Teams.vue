<template>
  <teams-table
    :teams="teams"
    @edit-team="handleEditTeamClicked"
    @remove-team="handleRemoveTeamClicked"
  />
  <el-button @click="openCreateModal">
    Создать команду
  </el-button>
  <create-team
    :disabled-colors="disabledColors"
    :leagues="leagues"
    :visible="showCreateTeamDialog"
    @close="showCreateTeamDialog = false"
    @team-created="handleCreateTeamClicked"
  />
  <edit-team
    :disabled-colors="disabledEditColors"
    :leagues="leagues"
    :team="selectedTeam"
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
    let disabledEditColors = ref({})

    const selectedTeam = ref(null)
    const handleCreateTeamClicked = (team) => {
      emit('create-team', team)
      showCreateTeamDialog.value = false
    }

    const handleEditTeamClicked = (team) => {
      disabledEditColors.value = _.teams.map(el => el.color_id).filter(el => el !== team.color_id)
      selectedTeam.value = team
      showEditTeamDialog.value = true
    }

    const handleRemoveTeamClicked = (team) => emit('remove-team', team)
    const handleTeamEdited = (team) => emit('edit-team', team)
    const openCreateModal = () => {
      if (_.teams.length >= 3) {
        ElNotification({ type: 'error', title: 'Ошибка', message: 'Создано максимальное количество команд!' })
      } else showCreateTeamDialog.value = true

    }

    let disabledColors = computed(() => _.teams.map(el => el.color_id))

    return {
      showCreateTeamDialog,
      showEditTeamDialog,
      selectedTeam,
      disabledColors,
      disabledEditColors,
      openCreateModal,
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
