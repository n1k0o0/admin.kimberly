<template>
  <el-row>
    <el-col>
      <league-and-division-selectors
        :leagues="leagues"
        @league-selected="onLeagueSelected"
        @division-selected="onDivisionSelected"
      />
    </el-col>
    <el-col>
      <team-color-picker @color-selected="onTeamColorClicked" />
    </el-col>
    <el-col>
      <el-button @click="onCreateTeamClicked">
        Добавить
      </el-button>
    </el-col>
  </el-row>
</template>

<script>
import { reactive } from "vue";
import LeagueAndDivisionSelectors from "@/components/common/LeagueAndDivisionSelectors.vue";
import TeamColorPicker from "@/components/schools/TeamColorPicker.vue";

export default {
  name: "CreateTeam",
  components: {
    TeamColorPicker,
    LeagueAndDivisionSelectors,
  },
  props: {
    leagues: {
      type: Array,
      default: () => []
    },
  },
  emits: ['team-created'],
  setup(_, { emit }) {
    const team = reactive({
      league_id: null,
      division_id: null,
      color_id: null,
    });

    const onLeagueSelected = (league) => team.league_id = league.id;
    const onDivisionSelected = (division) => team.division_id = division?.id ?? null;
    const onTeamColorClicked = (color) => team.color_id = color.id;
    const onCreateTeamClicked = () => emit('team-created', team);

    return {
      team,
      onLeagueSelected,
      onDivisionSelected,
      onTeamColorClicked,
      onCreateTeamClicked,
    };
  }
};
</script>

<style scoped>

</style>
