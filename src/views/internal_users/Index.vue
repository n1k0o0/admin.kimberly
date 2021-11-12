<template>
  <el-card>
    <template #header>
      <h3>Внутренние пользователи</h3>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input
            v-model="search.login"
            placeholder="Логин"
          />
        </el-col>
        <el-col :span="6">
          <el-select
            v-model="search.types"
            multiple
            placeholder="Тип пользователя"
          >
            <el-option
              v-for="(type, key) in internalUserTypes"
              :key="key"
              :value="key"
              :label="type"
            />
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-date-picker
            v-model="search.created_at_start"
            type="date"
            placeholder="Создан от"
            @change="onCreatedAtStartChanged"
          />
        </el-col>
        <el-col :span="6">
          <el-date-picker
            v-model="search.created_at_end"
            placeholder="Создан по"
            type="date"
            @change="onCreatedAtEndChanged"
          />
        </el-col>
      </el-row>
      <el-row
        class="my-3 flex-row-reverse"
      >
        <el-button
          type="primary"
          @click="$router.push({name: 'internal-users-create'})"
        >
          Создать
        </el-button>
      </el-row>
    </template>
    <el-table
      v-loading="loading"
      :data="users"
      :empty-text="'Нет данных'"
    >
      <el-table-column
        prop="login"
        label="Логин"
      />
      <el-table-column
        label="Тип"
      >
        <template #default="scope">
          {{ getPrintableUserType(scope.row.type) }}
        </template>
      </el-table-column>
      <el-table-column
        label="Полное имя"
        :prop="'full_name'"
      />
      <el-table-column
        prop="created_at"
        label="Дата создания"
      >
        <template #default="scope">
          {{ $moment.unix(scope.row.created_at).locale('ru').format('YYYY-MM-DD hh:mm') }}
        </template>
      </el-table-column>
      <el-table-column
        label="Управление"
        width="140"
      >
        <template #default="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="$router.push({name: 'internal-users-edit', params: {id: scope.row.id}})"
          />
          <el-popconfirm
            v-if="scope.row.type!=='super_admin'"
            title="Вы действительно хотите удалить пользователя?"
            cancel-button-text="Отмена"
            confirm-button-text="Да"
            @confirm="onRemoveInternalUserClicked(scope.row.id)"
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
import {
  paginateInternalUsers,
  removeInternalUser,
} from "@/services/internal-users/internalUsers";
import {onMounted, reactive, ref, watch} from "vue";
import {useLoadingState} from "@/composables/common/useLoadingState";
import {getPrintableInternalUserTypes, getPrintableUserType} from "@/services/internal-users/InternalUser";
import moment from "moment";
import usePagination from "@/composables/common/usePagination";

export default {
  name: "Index",
  setup() {
    const {loading, setLoaded, setLoading} = useLoadingState(true)
    const {pagination, setPagination, currentPage} = usePagination()
    const search = reactive({
      login: '',
      types: [],
      created_at_start: '',
      created_at_end: '',
    })
    const internalUserTypes = getPrintableInternalUserTypes()
    const users = ref([]);

    onMounted(async () => {
      const {data: {data: internalUsers, meta}} = await paginateInternalUsers();
      setPagination(meta)
      users.value = internalUsers
      setLoaded()
    })

    watch([search, currentPage], async () => {
      setLoading()
      try {
        const {data: {data: internalUsers, meta}} = await paginateInternalUsers(search, currentPage.value);
        setPagination(meta)
        users.value = internalUsers
      } catch (e) {
      } finally {
        setLoaded()
      }
    })

    const onRemoveInternalUserClicked = async (internalUserId) => {
      try {
        setLoading()
        await removeInternalUser(internalUserId)
        const {data: {data: internalUsers, meta}} = await paginateInternalUsers(search, currentPage.value);
        setPagination(meta)
        users.value = internalUsers
      } catch (e) {
      } finally {
        setLoaded()
      }
    }
    const onCurrentPageUpdated = (page) => currentPage.value = page
    const onCreatedAtStartChanged = (datetime) => search.created_at_start = moment(datetime).format('YYYY-MM-DD')
    const onCreatedAtEndChanged = (datetime) => search.created_at_end = moment(datetime).format('YYYY-MM-DD')

    return {
      search,
      users,
      internalUserTypes,
      getPrintableUserType,
      loading,
      onCreatedAtStartChanged,
      onCreatedAtEndChanged,
      onRemoveInternalUserClicked,
      onCurrentPageUpdated,
      pagination,
      currentPage,
    }
  },
}
</script>

<style scoped>

</style>
