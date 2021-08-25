<template>
  <el-card v-loading="loading">
    <template #header>
      <h3>Редактирование лиги: {{ league.name }}</h3>
    </template>
    <el-row class="my-4">
      <el-col :span="6">
        <span>Укажите название</span>
        <el-input
          placeholder="Название"
          v-model="league.name"
        ></el-input>
      </el-col>
    </el-row>
    <el-row class="mb-4">
      <el-col :span="6">
        <span>Выберите страну</span>
        <el-select
          class="d-block"
          placeholder="Страна"
          v-model="league.country_id"
        >
          <el-option
            v-for="(country, key) in countries"
            :key="country.id"
            :value="country.id"
            :label="country.name"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row class="mb-4">
      <el-col :span="6">
        <span>Выберите город</span>
        <el-select
          class="d-block"
          placeholder="Город"
          v-model="league.city_id"
        >
          <el-option
            v-for="(city, key) in cities"
            :key="city.id"
            :value="city.id"
            :label="city.name"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <add-division v-if="!updatingDivision.id" @add-division="onDivisionAdded" />
        <el-row class="mb-5" v-if="updatingDivision.id">
          <el-input
            class="w-75"
            v-model="updatingDivision.name"
            @keyup.enter="onUpdateDivisionClicked"
          />
          <el-button class="w-25" @click="onUpdateDivisionClicked">Обновить</el-button>
        </el-row>
        <el-table
          :data="league.divisions"
          :empty-text="'Нет дивизионов'"
        >
          <el-table-column label="Список дивизионов">
            <el-table-column
              prop="name"
              label="Название"
            />
            <el-table-column
              label="Управление"
            >
              <template #default="scope">
                <el-button
                  @click="onEditDivisionClicked(scope.row)"
                  icon="fas fa-white fa-edit"
                  type="primary"
                />
                <el-popconfirm
                  title="Убрать дивизион?"
                  cancel-button-text="Отмена"
                  confirm-button-text="Да"
                  @confirm="onRemoveDivisionClicked(scope.row)"
                >
                  <template #reference>
                    <el-button icon="fa fa-white fa-times" type="danger"/>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row class="my-3 flex-row-reverse">
      <el-button-group>
        <el-button @click="$router.push({name: 'leagues'})">Отменить</el-button>
        <el-button
          type="primary"
          @click="onUpdateLeagueClicked"
        >
          Обновить
        </el-button>
      </el-button-group>
    </el-row>
  </el-card>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useLoadingState } from "../../composables/common/useLoadingState";
import { useStore } from "vuex";
import { getLeague, updateLeague } from "../../services/leagues/leagueService";
import { createDivision, removeDivision, updateDivision } from "../../services/divisions/divisionService";
import { parseErrors } from "../../helpers";
import AddDivision from "../../components/divisions/AddDivision.vue";

export default {
  name: "Edit",
  components: { AddDivision },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const { loading, setLoaded, setLoading } = useLoadingState(false)

    let leagueId = null
    let league = ref({
      name: '',
      divisions: [],
    });

    const countries = computed(() => store.getters["general/GET_COUNTRIES"])
    const selectedCountry = computed(() => store.getters["general/GET_COUNTRIES"].find((countryItem) => countryItem.id === league.value.country_id))
    const cities = computed(() => selectedCountry.value?.cities)
    onMounted(async () => {
      try {
        leagueId = route.params.id
        setLoading()
        const { data } = await getLeague(leagueId)
        league.value = data
      } catch (e) {
      } finally {
        setLoaded()
      }
    })

    const onDivisionAdded = async ({ division: newDivision }) => {
      try {
        const sameDivision = league.value.divisions.find(divisionItem => divisionItem.name === newDivision.name)
        if (sameDivision) {
          return
        }
        const { data: division } = await createDivision(leagueId, {...newDivision});
        league.value.divisions.push(division)
      } catch (e) {
        const errors = parseErrors(e.response.data.errors)
        console.log(errors)
      }
    }

    const updatingDivision = ref({
      id: null,
      name: '',
    })

    const onEditDivisionClicked = (division) => {
      updatingDivision.value.id = division.id
      updatingDivision.value.name = division.name
    }

    const onUpdateDivisionClicked = async () => {
      try {
        const division = league.value.divisions.find(divisionItem => divisionItem.id === updatingDivision.value.id)
        if (!division) {
          return
        }
        await updateDivision(updatingDivision.value.id, updatingDivision.value)
        division.name = updatingDivision.value.name
        updatingDivision.value.id = null
        updatingDivision.value.name = ''
      } catch (e) {
        const errors = parseErrors(e.response.data.errors)
        console.log(errors)
      }
    }

    const onRemoveDivisionClicked = async (division) => {
      console.log(division)
      try {
        const { data } = await removeDivision(division.id);
        const divisionIndex = league.value.divisions.findIndex(divisionItem => divisionItem.id === division.id)
        if (divisionIndex >= 0) {
          league.value.divisions.splice(divisionIndex, 1)
        }
      } catch (e) {
        const errors = parseErrors(e.response.data.errors)
        console.log(errors)
      }
    }

    const onUpdateLeagueClicked = async () => {
      try {
        setLoading()
        await updateLeague(leagueId, league.value)
        await router.push({ name: 'leagues' })
      } catch (e) {
      } finally {
        setLoaded()
      }
    }

    return {
      selectedCountry,
      countries,
      cities,
      loading,
      league,
      updatingDivision,
      onUpdateLeagueClicked,
      onDivisionAdded,
      onEditDivisionClicked,
      onUpdateDivisionClicked,
      onRemoveDivisionClicked,
    }
  },
}
</script>

<style scoped>

</style>
