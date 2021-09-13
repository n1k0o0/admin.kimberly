<template>
  <el-card>
    <template #header>
      <el-row
        :gutter="2"
        justify="space-between"
      >
        <el-row />
        <el-row>
          <el-button
            type="primary"
            @click="$router.push({name: 'game-create'})"
          >
            Создать
          </el-button>
        </el-row>
      </el-row>
    </template>
    <games :games="[]" />
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
import { onMounted, reactive, ref, watch } from "vue";
import { useLoadingState } from "@/composables/common/useLoadingState.js";
import usePagination from "@/composables/common/usePagination.js";
import { paginateTournaments, removeTournament } from "@/services/tournaments/tournaments.js";
import { getPrintableTournamentStatus } from "@/services/tournaments/Tournament.js";
import useCountryAndCity from "@/composables/useCountryAndCity.js";
import Games from "@/components/games/Games.vue";

export default {
  name: "Index",
  components: { Games },
  setup() {
    const { loading, setLoaded, setLoading } = useLoadingState(true);
    const { pagination, setPagination, currentPage } = usePagination();
    const { selectedCityId } = useCountryAndCity();
    const search = reactive({
      city_id: selectedCityId,
    });
    const tournaments = ref([]);

    onMounted(async () => {
      const { data: { data: tournamentItems, meta } } = await paginateTournaments();
      setPagination(meta);
      tournaments.value = tournamentItems;
      setLoaded();
    });

    watch([search, currentPage], async () => {
      setLoading();
      try {
        const { data: { data: tournamentItems, meta } } = await paginateTournaments(search, currentPage.value);
        setPagination(meta);
        tournaments.value = tournamentItems;
      } catch (e) {
      } finally {
        setLoaded();
      }
    });

    const onRemoveTournamentClicked = async (tournamentId) => {
      try {
        setLoading();
        await removeTournament(tournamentId);
        const { data: { data: tournamentItems, meta } } = await paginateTournaments(search, currentPage.value);
        tournaments.value = tournamentItems;
        setPagination(meta);
      } catch (e) {
      } finally {
        setLoaded();
      }
    };
    const onCurrentPageUpdated = (page) => currentPage.value = page;

    return {
      getPrintableTournamentStatus,
      search,
      tournaments,
      loading,
      onRemoveTournamentClicked,
      onCurrentPageUpdated,
      pagination,
      currentPage,
    };
  },
};
</script>

<style scoped>

</style>
