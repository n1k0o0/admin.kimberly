<template>
  <el-card>
    <template #header>
      <h3>Школы</h3>
      <el-row
        :gutter="2"
        justify="space-between"
      >
        <el-row>
          <el-col :span="12">
            <country-city-selectors
              :countries="availableCountries"
              @country-selected="onCountrySelected"
              @city-selected="onCitySelected"
            />
          </el-col>
          <el-col :span="12">
            <league-and-division-selectors
              :leagues="availableLeagues"
              @league-selected="onLeagueSelected"
              @division-selected="onDivisionSelected"
            />
          </el-col>
        </el-row>
        <el-row class="mt-5">
          <el-input
            v-model="search.name"
            placeholder="Поиск"
            clearable
          />
        </el-row>
      </el-row>
    </template>
    <el-table
      v-loading="loading"
      :data="schools"
      :empty-text="'Нет данных'"
    >
      <el-table-column
        prop="id"
        label="id"
        width="100"
      />
      <el-table-column
        prop="name"
        label="Название"
      />
      <el-table-column
        label="Управление"
      >
        <template #default="scope">
          <el-button-group>
            <el-button
              @click="onSchoolClicked(scope.row.id)"
            >
              Изменить
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <el-row justify="center">
      <el-pagination
        layout="prev, pager, next"
        :hide-on-single-page="true"
        v-bind="pagination"
        @update:current-page="onCurrentPageUpdated"
      />
    </el-row>
  </el-card>
</template>

<script>
import { useStore } from "vuex";
import { useLoadingState } from "@/composables/common/useLoadingState";
import usePagination from "@/composables/common/usePagination";
import { computed, onMounted, reactive, ref, watch } from "vue";
import CountryCitySelectors from "@/components/common/CountryCitySelectors.vue";
import LeagueAndDivisionSelectors from "@/components/common/LeagueAndDivisionSelectors.vue";
import { paginateSchools } from "@/services/schools/schools.js";
import { loadLeagues } from "@/services/leagues/leagueService.js";
import { useRoute } from "vue-router";

export default {
  name: "SchoolList",
  components: { LeagueAndDivisionSelectors, CountryCitySelectors },
  emits: ['school-selected'],
  setup(_, { emit }) {
    const store = useStore();
    const route = useRoute();
    const { loading, setLoaded, setLoading } = useLoadingState(true);
    const { pagination, setPagination, currentPage } = usePagination();
    const availableCountries = computed(() => store.getters["general/GET_COUNTRIES"]);
    const availableLeagues = ref([]);
    const schools = ref([]);

    const search = reactive({
      search: '',
      country_id: null,
      city_id: null,
      league_id: null,
      division_id: null,
    });

    onMounted(async () => {
      try {
        const { data: { data: schoolItems, meta } } = await paginateSchools();
        setPagination(meta);
        schools.value = schoolItems;
      } catch (e) {
      } finally {
        setLoaded();
      }
    });

    const onSchoolClicked = (schoolId) => emit('school-selected', schoolId);
    const onCountrySelected = (country) => search.country_id = country.id;
    const onCitySelected = async (city) => {
      search.city_id = city.id;
      const { data } = await loadLeagues({ city_id: city.id });
      availableLeagues.value = data.data;
    };

    const onLeagueSelected = (league) => search.league_id = league.id;
    const onDivisionSelected = (division) => search.division_id = division.id;
    const onCurrentPageUpdated = (page) => currentPage.value = page;

    watch([search, currentPage], async () => {
      console.log(search);
      setLoading();
      try {
        const { data: { data: schoolItems, meta } } = await paginateSchools(search, currentPage.value);
        setPagination(meta);
        schools.value = schoolItems;
      } catch (e) {
      } finally {
        setLoaded();
      }
    });

    return {
      search,
      loading,
      availableCountries,
      availableLeagues,
      schools,
      pagination,
      currentPage,
      onSchoolClicked,
      onCurrentPageUpdated,
      onCountrySelected,
      onCitySelected,
      onLeagueSelected,
      onDivisionSelected,
    };
  },
};
</script>

<style scoped>

</style>
