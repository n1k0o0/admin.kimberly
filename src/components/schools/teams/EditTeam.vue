<template>
  <el-dialog
    :destroy-on-close="true"
    :model-value="visible"
    :width="'30%'"
    title="Редактирование команды"
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
          <team-color-picker @color-selected="onTeamColorClicked" />
        </el-col>
      </el-col>
    </el-row>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="$emit('close')">Отмена</el-button>
        <el-button
          type="primary"
        >Создать</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { reactive } from "vue";

export default {
  name: "EditTeam",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    team: {
      type: Object,
      required: true,
    },
  },
  emits: ['close'],
  setup(props, {emit}) {
    const editedTeam = reactive({ ...props.team })
    return {
      editedTeam,
    };
  }
};
</script>

<style scoped>

</style>
