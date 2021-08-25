<template>
  <el-card>
    <template #header>
      <h3>Стадионы</h3>
      <el-row
        :gutter="2"
        justify="space-between"
      >
        <el-row>
          <el-col :span="6">
            <el-select
              multiple
              v-model="search.country_ids"
              placeholder="Страна"
            >
              <el-option
                v-for="(country) in countries"
                :key="country.id"
                :value="country.id"
                :label="country.name"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select
              multiple
              v-model="search.city_ids"
              placeholder="Город"
            >
              <el-option
                v-for="(city) in selectedCountry.cities"
                :key="city.id"
                :value="city.id"
                :label="city.name"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-button
            @click="$router.push({name: 'stadiums-create'})"
            type="primary"
          >
            Создать
          </el-button>
        </el-row>
      </el-row>
    </template>
    <el-table
      :data="stadiums"
      v-loading="loading"
      :empty-text="'Нет данных'"
    >
      <el-table-column
        prop="id"
        label="id"
      />
      <el-table-column
        prop="title"
        label="Название"
      />
      <el-table-column
        label="Страна"
      >
        <template #default="scope">
          {{ scope.row.country.name }}
        </template>
      </el-table-column>
      <el-table-column
        label="Город"
      >
        <template #default="scope">
          {{ scope.row.city.name }}
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="Адрес"
      >
      </el-table-column>
      <el-table-column
        label="Управление"
      >
        <template #default="scope">
          <el-button-group>
            <el-button
              type="success"
              @click="$router.push({name: 'stadiums-edit', params: {id: scope.row.id}})"
            >
              Редактировать
            </el-button>
              <el-popconfirm
                title="Вы действительно хотите удалить стадион?"
                cancel-button-text="Отмена"
                confirm-button-text="Да"
                @confirm="onRemoveStadiumClicked(scope.row.id)"
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
    </el-table>
    <el-row justify="center">
    <el-pagination
      layout="prev, pager, next"
      :hide-on-single-page="true"
      @update:current-page="onCurrentPageUpdated"
      v-bind="pagination"
    ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useLoadingState } from "../../composables/common/useLoadingState";
import usePagination from "../../composables/common/usePagination";
import { paginateStadiums, removeStadium } from "../../services/stadiums/stadiums";
import { useStore } from "vuex";

export default {
  name: "Index",
  setup() {
    const store = useStore()
    const { loading, setLoaded, setLoading } = useLoadingState(true)
    const { pagination, setPagination, currentPage } = usePagination()
    const countries = computed(() => store.getters["general/GET_COUNTRIES"])
    const selectedCountryId = ref(null)
    const selectedCountry = computed(() => countries.value.find((countryItem) => countryItem.id !== selectedCountryId))
    const search = reactive({
      country_ids: [],
      city_ids: '',
    })
    const stadiums = ref([]);

    onMounted(async () => {
      const { data: {data: stadiumItems, meta}} = await paginateStadiums();
      setPagination(meta)
      stadiums.value = stadiumItems
      setLoaded()
    })

    watch([search, currentPage], async () => {
      setLoading()
      try {
        const { data: {data: stadiumItems, meta}} = await paginateStadiums(search, currentPage.value);
        setPagination(meta)
        stadiums.value = stadiumItems
      } catch (e) {
      } finally {
        setLoaded()
      }
    })

    const onRemoveStadiumClicked = async (stadiumId) => {
      try {
        setLoading()
        await removeStadium(stadiumId)
        const { data: {data: stadiumItems, meta}} = await paginateStadiums(search, currentPage.value)
        stadiums.value = stadiumItems
        setPagination(meta)
      } catch (e) {}
      finally {
        setLoaded()
      }
    }
    const onCurrentPageUpdated = (page) => currentPage.value = page

    return {
      countries,
      selectedCountry,
      search,
      stadiums,
      loading,
      onRemoveStadiumClicked,
      onCurrentPageUpdated,
      pagination,
      currentPage,
    }
  },
}
</script>

<style scoped>

</style>
