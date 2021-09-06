<template>
  <el-dialog
    :destroy-on-close="true"
    :model-value="visible"
    :width="'30%'"
    :before-close="handleClose"
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
            :color-id="editedTeam.color_id"
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
import { ref, watch } from "vue";
import TeamColorPicker from "@/components/schools/TeamColorPicker.vue";
import LeagueAndDivisionSelectors from "@/components/common/LeagueAndDivisionSelectors.vue";

export default {
  name: "EditTeam",
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
  },
  emits: ['close', 'team-edited'],
  setup(props, { emit }) {
    const editedTeam = ref({ ...props.team });
    watch(() => props.team, () => editedTeam.value = { ...props.team });

    const onLeagueSelected = (league) => editedTeam.value.league_id = league.id;
    const onDivisionSelected = (division) => editedTeam.value.division_id = division?.id ?? null;
    const onTeamColorClicked = (color) => editedTeam.value.color_id = color.id;
    const handleTeamEditClicked = () => {
      emit('team-edited', editedTeam);
      handleClose();
    };
    const handleClose = () => emit('close');

    return {
      editedTeam,
      onLeagueSelected,
      onDivisionSelected,
      onTeamColorClicked,
      handleClose,
      handleTeamEditClicked,
    };
  }
};
</script>

<style scoped>

</style>
