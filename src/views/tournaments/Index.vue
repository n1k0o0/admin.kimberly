<template>
  <el-card>
    <template #header>
      <h3>Турниры</h3>
      <el-row
        :gutter="2"
        justify="space-between"
      >
        <el-row />
        <el-row>
          <el-button
            type="primary"
            @click="$router.push({name: 'tournaments-create'})"
          >
            Создать
          </el-button>
        </el-row>
      </el-row>
    </template>
    <el-table
      v-loading="loading"
      :data="tournaments"
      :empty-text="'Нет данных'"
    >
      <el-table-column
        label="id"
        prop="id"
      />
      <el-table-column
        label="Название"
        prop="name"
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
        label="Статус"
        prop="status"
      >
        <template #default="scope">
          {{ getPrintableTournamentStatus(scope.row.status) }}
        </template>
      </el-table-column>
      <el-table-column
        label="Дата начала"
        prop="started_at"
      >
        <template #default="scope">
          {{ $moment(scope.row.started_at).locale('ru').format('YYYY-MM-DD') }}
        </template>
      </el-table-column>
      <el-table-column
        label="Дата завершения"
        prop="ended_at"
      >
        <template #default="scope">
          {{ $moment(scope.row.ended_at).locale('ru').format('YYYY-MM-DD') }}
        </template>
      </el-table-column>
      <el-table-column
        label="Управление"
        width="140"
      >
        <template #default="scope">
          <el-button
            icon="el-icon-edit"
            type="primary"
            @click="$router.push({name: 'tournaments-edit', params: {id: scope.row.id}})"
          />
          <el-popconfirm
            cancel-button-text="Отмена"
            confirm-button-text="Да"
            title="Вы действительно хотите удалить турнир?"
            @confirm="onRemoveTournamentClicked(scope.row.id)"
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
import usePagination from '@/composables/common/usePagination.js'
import { paginateTournaments, removeTournament } from '@/services/tournaments/tournaments.js'
import { getPrintableTournamentStatus } from '@/services/tournaments/Tournament.js'
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
    const tournaments = ref([])

    onMounted(async () => {
      const { data: { data: tournamentItems, meta } } = await paginateTournaments(search, currentPage.value)
      setPagination(meta)
      tournaments.value = tournamentItems
      setLoaded()
    })

    watch([search, currentPage], async () => {
      setLoading()
      try {
        const { data: { data: tournamentItems, meta } } = await paginateTournaments(search, currentPage.value)
        setPagination(meta)
        tournaments.value = tournamentItems
      } catch (e) {
      } finally {
        setLoaded()
      }
    })

    const onRemoveTournamentClicked = async (tournamentId) => {
      try {
        setLoading()
        await removeTournament(tournamentId)
        const { data: { data: tournamentItems, meta } } = await paginateTournaments(search, currentPage.value)
        tournaments.value = tournamentItems
        setPagination(meta)
      } catch (e) {
      } finally {
        setLoaded()
      }
    }
    const onCurrentPageUpdated = (page) => currentPage.value = page

    return {
      getPrintableTournamentStatus,
      search,
      tournaments,
      loading,
      onRemoveTournamentClicked,
      onCurrentPageUpdated,
      pagination,
      currentPage,
    }
  },
}
</script>

<style scoped>

</style>
