<template>
  <el-row
    :gutter="20"
    class="country-city-selector"
  >
    <el-col
      :span="12"
      class="country-city-selector__league"
    >
      <span class="d-block">Выберите лигу</span>
      <el-select
        v-model="selectedLeagueId"
        :clearable="clearable"
        class="d-block"
        placeholder="Лига"
      >
        <el-option
          v-for="(league) in availableLeagues"
          :key="league.id"
          :label="league.name"
          :value="league.id"
          no-data-text="Нет данных"
        />
      </el-select>
    </el-col>
    <el-col
      :span="12"
      class="country-city-selector__division"
    >
      <span>Выберите дивизион</span>
      <el-select
        v-model="selectedDivisionId"
        :clearable="clearable"
        class="d-block"
        no-data-text="Нет данных"
        placeholder="Дивизион"
      >
        <el-option
          v-for="division in availableDivisions"
          :key="division.id"
          :label="division.name"
          :value="division.id"
        />
      </el-select>
    </el-col>
  </el-row>
</template>

<script>
import { computed, ref, watch } from 'vue'

export default {
  name: 'LeagueAndDivisionSelectors',
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
    },
    clearable: {
      type: Boolean,
      default: false,
    }
  },
  emits: ['league-selected', 'division-selected', 'change'],
  setup (props, { emit }) {
    const availableLeagues = computed(() => props.leagues ?? [])
    const availableDivisions = computed(() => selectedLeague.value ? selectedLeague.value.divisions : [])

    const selectedLeagueId = ref(props.leagueId)
    const selectedDivisionId = ref(props.divisionId)

    const selectedLeague = computed(() => selectedLeagueId.value ? availableLeagues.value.find(leagueItem => leagueItem.id === selectedLeagueId.value) : null)
    const selectedDivision = computed(() => selectedDivisionId.value && selectedLeague.value?.divisions ? selectedLeague.value.divisions.find(divisionItems => divisionItems.id === selectedDivisionId.value) ?? null : null)

    watch(selectedLeagueId, () => selectedDivisionId.value = null)

    watch([selectedLeague, selectedDivision], () => emit('change', {
      league: selectedLeague,
      division: selectedDivision,
    }))

    watch(selectedLeague, (league) => emit('league-selected', league ?? null))
    watch(selectedDivision, (division) => emit('division-selected', division ?? null))

    return {
      availableLeagues,
      availableDivisions,
      selectedLeagueId,
      selectedDivisionId,
    }
  }
}
</script>

<style lang="scss" scoped>
.country-city-selector {
  &__league {

  }

  &__division {

  }
}
</style>
