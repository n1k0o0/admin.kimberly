<template>
  <el-card v-loading="loading">
    <template #header>
      <h3>Редактирование {{ user.login }}</h3>
    </template>
    <el-row class="mb-4">
      <el-col :span="6">
        <span>Тип пользователя</span>
        <el-select
          v-model="user.type"
          class="d-block"
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
    </el-row>
    <el-row class="my-4">
      <el-col :span="6">
        <span>Логин</span>
        <el-input
          v-model="user.login"
          placeholder="Логин"
        />
      </el-col>
    </el-row>
    <el-row class="my-4">
      <el-col :span="6">
        <span>Фамилия</span>
        <el-input
          v-model="user.last_name"
          placeholder="Фамилия"
        />
      </el-col>
    </el-row>
    <el-row class="my-4">
      <el-col :span="6">
        <span>Имя</span>
        <el-input
          v-model="user.first_name"
          placeholder="Имя"
        />
      </el-col>
    </el-row>
    <el-row class="my-4">
      <el-col :span="6">
        <span>Отчество</span>
        <el-input
          v-model="user.patronymic"
          placeholder="Отчество"
        />
      </el-col>
    </el-row>
    <el-row class="my-4">
      <el-col :span="6">
        <span>Телефонный номер</span>
        <el-input
          v-model="user.phone"
          placeholder="Телефонный номер"
        />
      </el-col>
    </el-row>
    <el-row class="my-4">
      <el-col :span="6">
        <span>Новый пароль</span>
        <el-input
          v-model="newPassword"
          placeholder="Пароль"
          type="password"
        />
      </el-col>
    </el-row>
    <el-row class="my-3 flex-row-reverse">
      <el-button-group>
        <el-button @click="$router.push({name: 'internal-users'})">
          Отменить
        </el-button>
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
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getInternalUser, updateInternalUser } from "@/services/internal-users/internalUsers.js";
import { getPrintableInternalUserTypes } from "@/services/internal-users/InternalUser.js";
import { useLoadingState } from "@/composables/common/useLoadingState.js";

export default {
  name: "Edit",
  setup() {
    let internalUserId = null;
    let user = ref({});
    const newPassword = ref('');
    const route = useRoute();
    const router = useRouter();

    const { loading, setLoaded, setLoading } = useLoadingState(false);
    onMounted(async () => {
      try {
        internalUserId = route.params.id;
        setLoading();
        const { data } = await getInternalUser(internalUserId);
        user.value = data;
      } catch (e) {
      } finally {
        setLoaded();
      }
    });
    const onUpdateInternalUserClicked = async () => {
      try {
        setLoading();
        await updateInternalUser(internalUserId, user.value);
        await router.push({ name: 'internal-users' });
      } catch (e) {
      } finally {
        setLoaded();
      }
    };

    const internalUserTypes = getPrintableInternalUserTypes();

    return {
      newPassword,
      loading,
      user,
      onUpdateInternalUserClicked,
      internalUserTypes,
    };
  },
};
</script>

<style scoped>

</style>
