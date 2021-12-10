<template>
  <el-card v-loading="loading">
    <template #header>
      <h3>Редактирование лиги: {{ league.name }}</h3>
    </template>
    <el-row class="my-4">
      <el-col :span="12">
        <span>Укажите название</span>
        <el-input
          v-model="league.name"
          placeholder="Название"
        />
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <add-division
          v-if="!updatingDivision.id"
          @add-division="onDivisionAdded"
        />
        <el-row
          v-if="updatingDivision.id"
          class="mb-5"
        >
          <el-input
            v-model="updatingDivision.name"
            class="w-75"
            @keyup.enter="onUpdateDivisionClicked"
          />
          <el-button
            class="w-25"
            @click="onUpdateDivisionClicked"
          >
            Обновить
          </el-button>
        </el-row>
      </el-col>
      <el-col
        class="mt-n20"
        :span="12"
      >
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
                  icon="fas fa-white fa-edit"
                  type="primary"
                  @click="onEditDivisionClicked(scope.row)"
                />
                <el-popconfirm
                  title="Убрать дивизион?"
                  cancel-button-text="Отмена"
                  confirm-button-text="Да"
                  @confirm="onRemoveDivisionClicked(scope.row)"
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
          @click="onUpdateLeagueClicked"
        >
          Обновить
        </el-button>
      </el-button-group>
    </el-row>
  </el-card>
</template>

<script>
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useLoadingState} from "@/composables/common/useLoadingState.js";
import {getLeague, updateLeague} from "@/services/leagues/leagueService.js";
import {createDivision, removeDivision, updateDivision} from "@/services/divisions/divisionService.js";
import {parseErrors} from "@/helpers.js";
import AddDivision from "@/components/divisions/AddDivision.vue";

export default {
  name: "Edit",
  components: {AddDivision},
  setup() {
    const route = useRoute()
    const router = useRouter()
    const {loading, setLoaded, setLoading} = useLoadingState(false)

    let leagueId = null
    let league = ref({
      name: '',
      divisions: [],
    });

    onMounted(async () => {
      try {
        leagueId = route.params.id
        setLoading()
        const {data} = await getLeague(leagueId)
        league.value = data
      } catch (e) {
      } finally {
        setLoaded()
      }
    })

    const onDivisionAdded = async ({division: newDivision}) => {
      try {
        const sameDivision = league.value.divisions.find(divisionItem => divisionItem.name === newDivision.name)
        if (sameDivision) {
          return
        }
        const {data: division} = await createDivision(leagueId, {...newDivision});
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
      try {
        const {} = await removeDivision(division.id);
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
        const {} = await updateLeague(leagueId, league.value)
        await router.push({name: 'leagues'})
      } catch (e) {
      } finally {
        setLoaded()
      }
    }

    return {
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
