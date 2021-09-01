<template>
  <el-row class="country-city-selector__league">
    <span>Выберите лигу</span>
  </el-row>
  <el-row>
    <el-select
      v-model="selectedLeagueId"
      class="d-block"
      placeholder="Лига"
    >
      <el-option
        v-for="(league) in availableLeagues"
        :key="league.id"
        :value="league.id"
        :label="league.name"
        no-data-text="Нет данных"
      />
    </el-select>
  </el-row>
  <el-row class="country-city-selector__division">
    <span>Выберите дивизион</span>
  </el-row>
  <el-row>
    <el-select
      v-model="selectedDivisionId"
      class="d-block"
      placeholder="Дивизион"
      no-data-text="Нет данных"
    >
      <el-option
        v-for="division in availableDivisions"
        :key="division.id"
        :value="division.id"
        :label="division.name"
      />
    </el-select>
  </el-row>
</template>

<script>
import { computed, ref, watch } from "vue";

export default {
  name: "LeagueAndDivisionSelectors",
  props: {
    leagues: {
      type: Array,
      default: () => [],
    },
    leagueId: {
      type: Number,
      default: null,
    },
    divisionId: {
      type: Number,
      default: null,
    }
  },
  emits: ['league-selected', 'division-selected', 'change'],
  setup(props, { emit }) {
    const availableLeagues = computed(() => props.leagues ?? []);
    const availableDivisions = computed(() => selectedLeague.value ? selectedLeague.value.divisions : []);

    const selectedLeagueId = ref(props.leagueId);
    const selectedDivisionId = ref(props.divisionId);

    const selectedLeague = computed(() => selectedLeagueId.value ? availableLeagues.value.find(leagueItem => leagueItem.id === selectedLeagueId.value) : null);
    const selectedDivision = computed(() => selectedDivisionId.value && selectedLeague.value?.divisions ? selectedLeague.value.divisions.find(divisionItems => divisionItems.id === selectedDivisionId.value) ?? null : null);

    watch(selectedLeagueId, () => selectedDivisionId.value = null);

    watch([selectedLeague, selectedDivision], () => emit('change', {
      league: selectedLeague,
      division: selectedDivision,
    }));

    watch(selectedLeague, (league) => emit('league-selected', league ?? null));
    watch(selectedDivision, (division) => emit('division-selected', division ?? null));

    return {
      availableLeagues,
      availableDivisions,
      selectedLeagueId,
      selectedDivisionId,
    };
  }
};
</script>

<style scoped lang="scss">
.country-city-selector {
  &__league {

  }

  &__division {

  }
}
</style>
