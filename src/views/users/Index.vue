<template>
  <el-card>
    <template #header>
      <h3>Пользователи</h3>
      <el-row
        :gutter="20"
      >
        <el-col :span="6">
          <el-input
            v-model="search.login"
            placeholder="Email"
          />
        </el-col>
        <el-col :span="6">
          <el-select
            v-model="search.types"
            multiple
            placeholder="Тип пользователя"
          >
            <el-option
              v-for="(type, key) in userTypes"
              :key="key"
              :label="type"
              :value="key"
            />
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-date-picker
            v-model="search.created_at_start"
            value-format="YYYY-MM-DD"
            placeholder="Создан от"
            type="date"
            @change="onCreatedAtStartChanged"
          />
        </el-col>
        <el-col :span="6">
          <el-date-picker
            v-model="search.created_at_end"
            value-format="YYYY-MM-DD"
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
          @click="$router.push({name: 'users-create'})"
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
        label="Email"
        prop="email"
      />
      <el-table-column
        :prop="'full_name'"
        label="Полное имя"
      />
      <el-table-column
        label="Школа"
      >
        <template #default="scope">
          <router-link
            v-if="scope.row.school"
            :to="`/schools/${scope.row.school.id}`"
            class="menu-link"
          >
            {{ scope.row.school.name }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        label="Тип"
      >
        <template #default="scope">
          {{ getPrintableUserType(scope.row.type) }}
        </template>
      </el-table-column>
      <el-table-column
        label="Статус"
      >
        <template #default="scope">
          {{ getPrintableUserStatus(scope.row.status) }}
        </template>
      </el-table-column>
      <el-table-column
        label="Дата создания"
        prop="created_at"
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
            icon="el-icon-edit"
            type="primary"
            @click="$router.push({name: 'users-edit', params: {id: scope.row.id}})"
          />
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
import {paginateUsers, removeUser} from '@/services/users/users.js'
import {onMounted, reactive, ref, watch} from 'vue'
import {useLoadingState} from '@/composables/common/useLoadingState.js'
import {getPrintableUserStatus, getPrintableUserType, getPrintableUserTypes} from '@/services/users/User.js'
import moment from 'moment'
import usePagination from '@/composables/common/usePagination'

export default {
  name: 'Index',
  setup() {
    const {loading, setLoaded, setLoading} = useLoadingState(true)
    const {pagination, setPagination, currentPage} = usePagination()
    const search = reactive({
      login: '',
      types: [],
      created_at_start: null,
      created_at_end: null,
    })
    const userTypes = getPrintableUserTypes()
    const users = ref([])

    onMounted(async () => {
      const {data: {data: userCollection, meta}} = await paginateUsers()
      setPagination(meta)
      users.value = userCollection
      setLoaded()
    })

    watch([search, currentPage], async () => {
      setLoading()
      try {
        const {data: {data: userCollection, meta}} = await paginateUsers(search, currentPage.value)
        setPagination(meta)
        users.value = userCollection
      } catch (e) {
      } finally {
        setLoaded()
      }
    })

    const onRemoveUserClicked = async (userId) => {
      try {
        setLoading()
        await removeUser(userId)
        await paginateUsers(search, currentPage.value)
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
      userTypes,
      getPrintableUserType,
      getPrintableUserStatus,
      loading,
      onCreatedAtStartChanged,
      onCreatedAtEndChanged,
      onRemoveUserClicked,
      onCurrentPageUpdated,
      pagination,
      currentPage,
    }
  },
}
</script>

<style scoped>

</style>
