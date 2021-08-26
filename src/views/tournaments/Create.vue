<template>
  <el-card v-loading="loading">
    <template #header>
      <h3>Создать турнир</h3>
    </template>
    <el-row class="my-4">
      <el-col :span="6">
        <span>Укажите название</span>
        <el-input
          placeholder="Название"
          v-model="newTournament.name"
        ></el-input>
      </el-col>
    </el-row>
    <country-city-selectors
      @city-selected="onCitySelected"
    />
    <el-row class="my-4">
      <el-col :span="6">
        <span>Укажите дату и время начала</span>
        <el-date-picker
          placeholder="Дата и время начала"
          v-model="newTournament.started_at"
        ></el-date-picker>
      </el-col>
    </el-row>
    <el-row class="my-4">
      <el-col :span="6">
        <span>Укажите дату и время окончания</span>
        <el-date-picker
          placeholder="Дата и время окончания"
          v-model="newTournament.ended_at"
        ></el-date-picker>
      </el-col>
    </el-row>
    <el-row class="my-3 flex-row-reverse">
      <el-button-group>
        <el-button @click="$router.push({name: 'tournaments'})">Отменить</el-button>
        <el-button
          type="primary"
          @click="onCreateTournamentClicked"
        >
          Создать
        </el-button>
      </el-button-group>
    </el-row>
  </el-card>
</template>

<script>
import { computed, reactive, ref } from "vue";
import { useLoadingState } from "../../composables/common/useLoadingState";
import { parseErrors } from "../../helpers";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { createTournament } from "../../services/tournaments/tournaments";
import CountryCitySelectors from "../../components/common/CountryCitySelectors.vue";

export default {
  name: "Create",
  components: { CountryCitySelectors },
  setup() {
    const router = useRouter()
    const store = useStore()
    const { loading, setLoaded, setLoading } = useLoadingState(false)
    const newTournament = reactive({
      name: '',
      city_id: '',
      started_at: null,
      ended_at: null,
    })
    const countries = computed(() => store.getters["general/GET_COUNTRIES"])
    const onCitySelected = (city) => newTournament.city_id = city.value?.id
    const onCreateTournamentClicked = async () => {
      try {
        setLoading()
        const { data } = await createTournament(newTournament)
        await router.push({name: 'tournaments'})
      } catch (e) {
        const errors = parseErrors(e.response.data.errors)
        console.log(errors)
      } finally {
        setLoaded()
      }
    }

    return {
      loading,
      onCitySelected,
      countries,
      newTournament,
      onCreateTournamentClicked,
    }
  },
}
</script>

<style scoped>

</style>
