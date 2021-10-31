<template>
  <el-dialog
    :before-close="handleClose"
    :destroy-on-close="true"
    :model-value="visible"
    :width="'30%'"
    title="Редактирование команды"
  >
    <el-row>
      <el-col :span="24">
        <el-col>
          <league-and-division-selectors
            :division-id="editedTeam.division_id"
            :league-id="editedTeam.league_id"
            :leagues="leagues"
            @league-selected="onLeagueSelected"
            @division-selected="onDivisionSelected"
          />
        </el-col>
        <el-col>
          <team-color-picker
            :disabled="!editedTeam.division_id"
            :color-id="editedTeam.color_id"
            :disabled-colors="disabledColors"
            @color-selected="onTeamColorClicked"
          />
        </el-col>
      </el-col>
    </el-row>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="$emit('close')">Отмена</el-button>
        <el-button
          type="primary"
          @click="handleTeamEditClicked"
        >Обновить</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { computed, ref, watch } from 'vue'
import TeamColorPicker from '@/components/common/TeamColorPicker.vue'
import LeagueAndDivisionSelectors from '@/components/common/LeagueAndDivisionSelectors.vue'

export default {
  name: 'EditTeam',
  components: { TeamColorPicker, LeagueAndDivisionSelectors },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    team: {
      type: Object,
      default: null,
    },
    leagues: {
      type: Array,
      default: () => []
    },
    teams: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['close', 'team-edited'],
  setup (props, { emit }) {
    const editedTeam = ref({ ...props.team })
    watch(() => props.team, () => editedTeam.value = { ...props.team })

    const onLeagueSelected = (league) => editedTeam.value.league_id = league.id
    const onDivisionSelected = (division) => editedTeam.value.division_id = division?.id ?? null
    const onTeamColorClicked = (color) => editedTeam.value.color_id = color?.id||null
    const handleTeamEditClicked = () => {
      emit('team-edited', editedTeam)
      handleClose()
    }
    const handleClose = () => emit('close')

    const disabledColors = computed(
      () => props.teams.filter(el=>el.division_id===editedTeam.value.division_id && el.id!==props.team.id).map(el=>el.color_id)
    )

    return {
      editedTeam,
      disabledColors,
      onLeagueSelected,
      onDivisionSelected,
      onTeamColorClicked,
      handleClose,
      handleTeamEditClicked,
    }
  }
}
</script>

<style scoped>

</style>
