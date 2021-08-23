<template>
  <el-card v-loading="loading">
    <template #header>
      <h3>Редактирование {{ user.login }}</h3>
    </template>
    <el-row class="mb-4">
      <el-col :span="6">
        <span>Тип пользователя</span>
        <el-select
          class="d-block"
          v-model="user.type"
          placeholder="Тип пользователя"
        >
          <el-option
            v-for="(type, key) in internalUserTypes"
            :key="key"
            :value="key"
            :label="type"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row class="my-4">
      <el-col :span="6">
        <span>Логин</span>
        <el-input
          placeholder="Логин"
          v-model="user.login"
        ></el-input>
      </el-col>
    </el-row>
    <el-row class="my-4">
      <el-col :span="6">
        <span>Фамилия</span>
        <el-input
          placeholder="Фамилия"
          v-model="user.last_name"
        ></el-input>
      </el-col>
    </el-row>
    <el-row class="my-4">
      <el-col :span="6">
        <span>Имя</span>
        <el-input
          placeholder="Имя"
          v-model="user.first_name"
        ></el-input>
      </el-col>
    </el-row>
    <el-row class="my-4">
      <el-col :span="6">
        <span>Отчество</span>
        <el-input
          placeholder="Отчество"
          v-model="user.middle_name"
        ></el-input>
      </el-col>
    </el-row>
    <el-row class="my-4">
      <el-col :span="6">
        <span>Телефонный номер</span>
        <el-input
          placeholder="Телефонный номер"
          v-model="user.phone"
        ></el-input>
      </el-col>
    </el-row>
    <el-row class="my-4">
      <el-col :span="6">
        <span>Новый пароль</span>
        <el-input
          placeholder="Пароль"
          v-model="newPassword"
          type="password"
        ></el-input>
      </el-col>
    </el-row>
    <el-row class="my-3 flex-row-reverse">
      <el-button-group>
        <el-button @click="$router.push({name: 'internal-users'})">Отменить</el-button>
        <el-button
          type="primary"
          @click="onUpdateInternalUserClicked"
        >
          Обновить
        </el-button>
      </el-button-group>
    </el-row>
  </el-card>
</template>

<script>
import { getInternalUser, paginateInternalUsers, updateInternalUser } from "../../services/internal-users/internalUsers";
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getPrintableInternalUserTypes } from "../../services/internal-users/InternalUser";
import { useLoadingState } from "../../composables/common/useLoadingState";

export default {
  name: "Edit",
  setup() {
    let internalUserId = null
    let user = ref({});
    const newPassword = ref('');
    const route = useRoute()
    const router = useRouter()

    const { loading, setLoaded, setLoading } = useLoadingState(false)
    onMounted(async () => {
      try {
        internalUserId = route.params.id
        setLoading()
        const {data} = await getInternalUser(internalUserId)
        user.value = data
      } catch (e) {
      } finally {
        setLoaded()
      }
    })
    const onUpdateInternalUserClicked = async () => {
      try {
        setLoading()
        await updateInternalUser(internalUserId, user.value)
        await router.push({ name: 'internal-users' })
      } catch (e) {
      } finally {
        setLoaded()
      }
    }

    const internalUserTypes = getPrintableInternalUserTypes()

    return {
      loading,
      user,
      onUpdateInternalUserClicked,
      internalUserTypes,
    }
  },
}
</script>

<style scoped>

</style>
