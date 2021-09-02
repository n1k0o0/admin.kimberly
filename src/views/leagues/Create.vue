<template>
  <el-card v-loading="loading">
    <template #header>
      <h3>Создать лигу</h3>
    </template>
    <el-row class="my-4">
      <el-col :span="6">
        <span>Укажите название</span>
        <el-input
          v-model="newLeague.name"
          placeholder="Название"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <span>Добавить дивизион</span>
        <el-row class="mb-5">
          <el-input
            v-model="newDivision.name"
            class="w-75"
            @keyup.enter="onAddDivisionClicked"
          />
          <el-button
            class="w-25"
            @click="onAddDivisionClicked"
          >
            Добавить
          </el-button>
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
                        icon="el-icon-delete"
                      />
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
        <el-button @click="$router.push({name: 'leagues'})">
          Отменить
        </el-button>
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
import { reactive } from "vue";
import { useLoadingState } from "@/composables/common/useLoadingState.js";
import { parseErrors } from "@/helpers.js";
import { useRouter } from "vue-router";
import { createLeague } from "@/services/leagues/leagueService.js";
import useCountryAndCity from "@/composables/useCountryAndCity.js";

export default {
  name: "Create",
  setup() {
    const router = useRouter();
    const { loading, setLoaded, setLoading } = useLoadingState(false);
    const { selectedCity } = useCountryAndCity();
    const newDivision = reactive({
      name: ''
    });
    const newLeague = reactive({
      name: '',
      city_id: selectedCity.value.id,
      divisions: [],
    });

    const onAddDivisionClicked = () => {
      const sameDivision = newLeague.divisions.find(divisionItem => divisionItem.name === newDivision.name);
      if (!sameDivision) {
        newLeague.divisions.push({ ...newDivision });
      }
      newDivision.name = '';
    };
    const onRemoveDivisionClicked = (division) => newLeague.divisions.splice(
      newLeague.divisions.find((divisionItem) => divisionItem === division),
      1
    );
    const onCreateLeagueClicked = async () => {
      try {
        setLoading();
        const { data } = await createLeague(newLeague);
        await router.push({ name: 'leagues' });
      } catch (e) {
        const errors = parseErrors(e.response.data.errors);
        console.log(errors);
      } finally {
        setLoaded();
      }
    };

    return {
      loading,
      newDivision,
      newLeague,
      onCreateLeagueClicked,
      onAddDivisionClicked,
      onRemoveDivisionClicked,
    };
  },
};
</script>

<style scoped>

</style>
