<template>
  <el-dialog
    :before-close="handleClose"
    :destroy-on-close="true"
    :model-value="visible"
    :width="'30%'"
    title="Создание команды"
  >
    <el-row>
      <el-col :span="24">
        <el-col>
          <league-and-division-selectors
            :leagues="leagues"
            @league-selected="onLeagueSelected"
            @division-selected="onDivisionSelected"
          />
        </el-col>
        <el-col>
          <team-color-picker
            :disabled="!team.division_id"
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
          @click="onCreateTeamClicked"
        >Создать</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ref } from 'vue'
import LeagueAndDivisionSelectors from '@/components/common/LeagueAndDivisionSelectors.vue'
import TeamColorPicker from '@/components/common/TeamColorPicker.vue'

export default {
  name: 'CreateTeam',
  components: {
    TeamColorPicker,
    LeagueAndDivisionSelectors,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    leagues: {
      type: Array,
      default: () => [],
    },
    teams: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['team-created', 'close'],
  setup (_, { emit }) {
    const team = ref({
      league_id: null,
      division_id: null,
      color_id: null,
    })

    let disabledColors=ref([])

    const onLeagueSelected = (league) => team.value.league_id = league.id
    const onDivisionSelected = (division) => {
      team.value.division_id = division?.id ?? null
      disabledColors.value=_.teams.filter(el=>el.division_id===division?.id).map(el=>el.color_id)
    }
    const onTeamColorClicked = (color) => team.value.color_id = color?.id
    const onCreateTeamClicked = () => {
      emit('team-created', team.value)
      clearFields()
    }
    const clearFields = () => {
      team.value = {
        league_id: null,
        division_id: null,
        color_id: null,
      }
    }

    const handleClose = () => {
      clearFields()
      emit('close')
    }

    return {
      team,
      disabledColors,
      onLeagueSelected,
      onDivisionSelected,
      onTeamColorClicked,
      onCreateTeamClicked,
      handleClose,
    }
  }
}
</script>

<style scoped>

</style>
