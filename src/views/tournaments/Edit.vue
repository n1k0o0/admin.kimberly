<template>
  <el-card v-loading="loading">
    <template #header>
      <h3>Редактирование {{ tournament.name }}</h3>
    </template>
    <el-row class="my-4">
      <el-col :span="6">
        <span>Укажите название</span>
        <el-input
          placeholder="Название"
          v-model="tournament.name"
        ></el-input>
      </el-col>
    </el-row>
    <country-city-selectors
      v-if="!loading"
      @city-selected="onCitySelected"
      :selected-country-id="tournament.country_id"
      :selected-city-id="tournament.city_id"
    />
    <el-row>
      <el-col :span="6">
        <span>Укажите дату и время начала</span>
        <el-date-picker
          v-model="tournament.started_at"
        ></el-date-picker>
      </el-col>
    </el-row>
    <el-row class="my-4">
      <el-col :span="6">
        <span>Укажите дату и время окончания</span>
        <el-date-picker
          v-model="tournament.ended_at"
        ></el-date-picker>
      </el-col>
    </el-row>
    <el-row class="my-3 flex-row-reverse">
      <el-button-group>
        <el-button @click="$router.push({name: 'tournaments'})">Отменить</el-button>
        <el-button
          type="primary"
          @click="onUpdateTournamentClicked"
        >
          Обновить
        </el-button>
      </el-button-group>
    </el-row>
  </el-card>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useLoadingState } from "../../composables/common/useLoadingState";
import { getTournament, updateTournament } from "../../services/tournaments/tournaments";
import { getPrintableTournaments } from "../../services/tournaments/Tournament";
import CountryCitySelectors from "../../components/common/CountryCitySelectors.vue";

export default {
  name: "Edit",
  components: { CountryCitySelectors },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const { loading, setLoaded, setLoading } = useLoadingState(false)

    let tournamentId = null
    let tournament = ref({});

    onMounted(async () => {
      try {
        tournamentId = route.params.id
        setLoading()
        const { data } = await getTournament(tournamentId)
        tournament.value = data
      } catch (e) {
        console.log(e)
      } finally {
        setLoaded()
      }
    })

    const onUpdateTournamentClicked = async () => {
      try {
        setLoading()
        await updateTournament(tournamentId, tournament.value)
        await router.push({ name: 'tournaments' })
      } catch (e) {
      } finally {
        setLoaded()
      }
    }
    const onCitySelected = (city) => tournament.value.city_id = city.value?.id

    const printableTypes = getPrintableTournaments()

    return {
      printableTypes,
      loading,
      tournament,
      onCitySelected,
      onUpdateTournamentClicked,
    }
  },
}
</script>

<style scoped>

</style>
