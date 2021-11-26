<template>
  <el-card>
    <template #header>
      <h3>Уведомления</h3>
      <el-row
        :gutter="2"
        justify="space-between"
      >
        <el-row :gutter="20">
          <el-col :span="6">
            <el-input
              v-model="search.name"
              placeholder="Инициатор"
            />
          </el-col>
          <el-col :span="6">
            <el-input
              v-model="search.object"
              placeholder="Объект"
            />
          </el-col>
          <el-col :span="6">
            <el-date-picker
              v-model="search.dateFrom"
              placeholder="Создан от"
              format="MM-DD-YYYY HH:mm"
              value-format="YYYY-MM-DD HH:mm"
              type="datetime"
            />
          </el-col>
          <el-col :span="6">
            <el-date-picker
              v-model="search.dateTo"
              placeholder="Создан по"
              format="MM-DD-YYYY HH:mm"
              value-format="YYYY-MM-DD HH:mm"
              type="datetime"
            />
          </el-col>
        </el-row>
      </el-row>
    </template>

    <el-table
      v-loading="loading"
      :data="notifications"
      style="width: 100%"
    >
      <el-table-column type="expand">
        <template #default="props">
          <p>Пользователь : {{ props.row.properties.user.first_name }} {{ props.row.properties.user.last_name }}</p>
          <p>Тип пользователя : {{ getPrintableUserType(props.row.properties.user.type) }}</p>
          <p>Тел. : {{ props.row.properties.user.phone }}</p>
          <p>Объект ID : {{ props.row.subject_id }}</p>
          <p v-if="props.row.properties.data.first_name || props.row.properties.data.name">
            Объект : {{ props.row.properties.data.first_name || props.row.properties.data.name }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        label="ID"
        prop="id"
        width="100"
      />
      <el-table-column
        label="Инициатор"
        prop="properties.user.first_name"
      >
        <template #default="scope">
          {{ scope.row.properties.user?.first_name +' '+ scope.row.properties.user?.last_name }}
        </template>
      </el-table-column>
      <el-table-column
        label="Объект"
        prop="log_name"
      />
      <el-table-column
        label="Событие"
        prop="description"
      />
      <el-table-column
        label="Когда"
      >
        <template #default="scope">
          {{ $moment(scope.row.created_at).locale('ru').format('YYYY-MM-DD HH:mm') }}
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
import { getNotifications } from '@/services/notifications/notificationService.js'
import { onMounted, reactive, ref, watch } from 'vue'
import { useLoadingState } from '@/composables/common/useLoadingState.js'
import usePagination from '@/composables/common/usePagination'
import { getPrintableUserType } from "@/services/internal-users/InternalUser";

export default {
  name: 'Index',
  setup () {
    const { loading, setLoaded, setLoading } = useLoadingState(true)
    const { pagination, setPagination, currentPage } = usePagination()
    const search = reactive({
      object: '',
      name: '',
      dateFrom: null,
      dateTo: null,
    })
    const notifications = ref([])

    onMounted(async () => {
      setLoading()
      const { data: { data: userCollection, meta } } = await getNotifications()
      setPagination(meta)
      notifications.value= userCollection
      setLoaded()
    })

    watch([search, currentPage], async () => {
      setLoading()
      try {
        const { data: { data: notificationsData, meta } } = await getNotifications(search, currentPage.value)
        setPagination(meta)
        notifications.value=notificationsData
      } catch (e) {
      } finally {
        setLoaded()
      }
    })

    const onCurrentPageUpdated = (page) => currentPage.value = page

    return {
      search,
      notifications,
      loading,
      onCurrentPageUpdated,
      pagination,
      currentPage,
      getPrintableUserType,
    }
  },
}
</script>

<style scoped>

</style>
