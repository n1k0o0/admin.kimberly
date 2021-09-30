<template>
  <el-card>
    <template #header>
      <h3>Стадионы</h3>
      <el-row
        :gutter="2"
        justify="space-between"
      >
        <el-row/>
        <el-row>
          <el-button
            type="primary"
            @click="$router.push({name: 'stadiums-create'})"
          >
            Создать
          </el-button>
        </el-row>
      </el-row>
    </template>
    <el-table
      v-loading="loading"
      :data="stadiums"
      :empty-text="'Нет данных'"
    >
      <el-table-column
        label="id"
        prop="id"
      />
      <el-table-column
        label="Название"
        prop="title"
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
        label="Адрес"
        prop="address"
      />
      <el-table-column
        label="Управление"
      >
        <template #default="scope">
          <el-button
            icon="el-icon-edit"
            type="primary"
            @click="$router.push({name: 'stadiums-edit', params: {id: scope.row.id}})"
          />
          <el-popconfirm
            cancel-button-text="Отмена"
            confirm-button-text="Да"
            title="Вы действительно хотите удалить стадион?"
            @confirm="onRemoveStadiumClicked(scope.row.id)"
          >
            <template #reference>
              <el-button
                icon="el-icon-delete"
                type="danger"
              />
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-row justify="center">
      <el-pagination
        :hide-on-single-page="true"
        layout="prev, pager, next"
        v-bind="pagination"
        @update:current-page="onCurrentPageUpdated"
      />
    </el-row>
  </el-card>
</template>

<script>
import { onMounted, reactive, ref, watch } from 'vue'
import { useLoadingState } from '@/composables/common/useLoadingState.js'
import usePagination from '@/composables/common/usePagination'
import { paginateStadiums, removeStadium } from '@/services/stadiums/stadiums.js'
import useCountryAndCity from '@/composables/useCountryAndCity.js'

export default {
  name: 'Index',
  setup () {
    const { loading, setLoaded, setLoading } = useLoadingState(true)
    const { pagination, setPagination, currentPage } = usePagination()
    const { selectedCityId, selectedCountryId } = useCountryAndCity()
    const search = reactive({
      city_id: selectedCityId,
      country_id: selectedCountryId,
    })
    const stadiums = ref([])

    onMounted(async () => {
      const { data: { data: stadiumItems, meta } } = await paginateStadiums(search)
      setPagination(meta)
      stadiums.value = stadiumItems
      setLoaded()
    })

    watch([search, currentPage], async () => {
      setLoading()
      try {
        const { data: { data: stadiumItems, meta } } = await paginateStadiums(search, currentPage.value)
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
        const { data: { data: stadiumItems, meta } } = await paginateStadiums(search, currentPage.value)
        stadiums.value = stadiumItems
        setPagination(meta)
      } catch (e) {} finally {
        setLoaded()
      }
    }
    const onCurrentPageUpdated = (page) => currentPage.value = page

    return {
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
