<template>
  <el-card>
    <template #header>
      <h3>Школы</h3>
      <el-row
        :gutter="2"
      >
        <el-col :span="4">
          <league-and-division-selectors
            :leagues="availableLeagues"
            @league-selected="onLeagueSelected"
            @division-selected="onDivisionSelected"
          />
        </el-col>
        <el-col :span="4">
          <span class="d-block">Поиск по названию</span>
          <el-input
            v-model="search.name"
            placeholder="Поиск"
            clearable
          />
        </el-col>
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
      />
      <el-table-column
        prop="name"
        label="Название"
      />
      <el-table-column
        label="Управление"
      >
        <template #default="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="$router.push({ name: 'schools-edit', params: { id: scope.row.id } })"
          />
          <el-popconfirm
            title="Вы действительно хотите удалить стадион?"
            cancel-button-text="Отмена"
            confirm-button-text="Да"
            @confirm="onRemoveSchoolClicked(scope.row.id)"
          >
            <template #reference>
              <el-button
                type="danger"
                icon="el-icon-delete"
              />
            </template>
          </el-popconfirm>
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
import { useLoadingState } from "@/composables/common/useLoadingState";
import usePagination from "@/composables/common/usePagination";
import { computed, onMounted, reactive, ref, watch } from "vue";
import LeagueAndDivisionSelectors from "@/components/common/LeagueAndDivisionSelectors.vue";
import { paginateSchools, removeSchool } from "@/services/schools/schools.js";
import useCountryAndCity from "@/composables/useCountryAndCity.js";

export default {
  name: "SchoolList",
  components: { LeagueAndDivisionSelectors },
  emits: ['school-selected'],
  setup() {
    const { selectedCity, selectedCityId } = useCountryAndCity();
    const { loading, setLoaded, setLoading } = useLoadingState(true);
    const { pagination, setPagination, currentPage } = usePagination();
    const availableLeagues = computed(() => selectedCity.value?.leagues);
    const schools = ref([]);

    const search = reactive({
      search: '',
      city_id: selectedCityId,
      league_id: null,
      division_id: null,
    });

    onMounted(async () => {
      try {
        setLoading();
        const { data: { data: schoolItems, meta } } = await paginateSchools(search);
        setPagination(meta);
        schools.value = schoolItems;
      } catch (e) {
      } finally {
        setLoaded();
      }
    });
    const onRemoveSchoolClicked = async (schoolId) => {
      try {
        setLoading();
        await removeSchool(schoolId);
        const { data: { data: schoolItems, meta } } = await paginateSchools(search, currentPage.value);
        setPagination(meta);
        schools.value = schoolItems;
      } catch (e) {
      } finally {
        setLoaded();
      }
    };
    const onLeagueSelected = (league) => search.league_id = league.id;
    const onDivisionSelected = (division) => search.division_id = division.id;
    const onCurrentPageUpdated = (page) => currentPage.value = page;
    watch([search, currentPage], async () => {
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
      availableLeagues,
      schools,
      pagination,
      currentPage,
      onRemoveSchoolClicked,
      onCurrentPageUpdated,
      onLeagueSelected,
      onDivisionSelected,
    };
  },
};
</script>

<style scoped>

</style>
