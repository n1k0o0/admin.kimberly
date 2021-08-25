<template>
  <el-card v-loading="loading">
    <template #header>
      <h3>Создать лигу</h3>
    </template>
    <el-row class="my-4">
      <el-col :span="6">
        <span>Укажите название</span>
        <el-input
          placeholder="Название"
          v-model="newLeague.name"
        ></el-input>
      </el-col>
    </el-row>
    <el-row class="mb-4">
      <el-col :span="6">
        <span>Выберите страну</span>
        <el-select
          class="d-block"
          v-model="selectedCountryId"
          placeholder="Страна"
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
          v-model="newLeague.city_id"
          placeholder="Город"
        >
          <el-option
            v-for="(city, key) in selectedCountry.cities"
            :key="city.id"
            :value="city.id"
            :label="city.name"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <span>Добавить дивизион</span>
        <el-row class="mb-5">
          <el-input
            class="w-75"
            v-model="newDivision.name"
            @keyup.enter="onAddDivisionClicked"
          />
          <el-button class="w-25" @click="onAddDivisionClicked">Добавить</el-button>
        </el-row>
        <el-table
          :data="newLeague.divisions"
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
                <el-button-group>
                  <el-popconfirm
                    title="Убрать дивизион?"
                    cancel-button-text="Отмена"
                    confirm-button-text="Да"
                    @confirm="onRemoveDivisionClicked(scope.row)"
                  >
                    <template #reference>
                      <el-button
                        type="danger"
                      >
                        Удалить
                      </el-button>
                    </template>
                  </el-popconfirm>
                </el-button-group>
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
          @click="onCreateLeagueClicked"
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
import { createLeague } from "../../services/leagues/leagueService";

export default {
  name: "Create",
  setup() {
    const router = useRouter()
    const store = useStore()
    const { loading, setLoaded, setLoading } = useLoadingState(false)
    const newDivision = reactive({
      name: ''
    })
    const newLeague = reactive({
      name: '',
      city_id: '',
      divisions: [],
    })

    const countries = computed(() => store.getters["general/GET_COUNTRIES"])
    const selectedCountryId = ref(null)
    const selectedCountry = computed(() => countries.value.find((countryItem) => countryItem.id !== selectedCountryId))

    const onAddDivisionClicked = () => {
      const sameDivision = newLeague.divisions.find(divisionItem => divisionItem.name === newDivision.name)
      if (!sameDivision) {
        newLeague.divisions.push({ ...newDivision })
      }
      newDivision.name = ''
    }
    const onRemoveDivisionClicked = (division) => newLeague.divisions.splice(
      newLeague.divisions.find((divisionItem) => divisionItem === division),
      1
    )
    const onCreateLeagueClicked = async () => {
      try {
        setLoading()
        const { data } = await createLeague(newLeague)
        await router.push({ name: 'leagues' })
      } catch (e) {
        const errors = parseErrors(e.response.data.errors)
        console.log(errors)
      } finally {
        setLoaded()
      }
    }

    return {
      loading,
      countries,
      selectedCountryId,
      selectedCountry,
      newDivision,
      newLeague,
      onCreateLeagueClicked,
      onAddDivisionClicked,
      onRemoveDivisionClicked,
    }
  },
}
</script>

<style scoped>

</style>
