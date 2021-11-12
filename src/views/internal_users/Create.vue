<template>
  <el-card v-loading="loading">
    <template #header>
      <h3>Создать внутреннего пользователя</h3>
    </template>
    <el-row class="mb-4">
      <el-col :span="6">
        <span>Тип пользователя</span>
        <el-select
          v-model="newUser.type"
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
        <span>Придумайте логин</span>
        <el-input
          v-model="newUser.login"
          placeholder="Логин"
        />
      </el-col>
    </el-row>
    <el-row class="my-4">
      <el-col :span="6">
        <span>Придумайте пароль</span>
        <el-input
          v-model="newUser.password"
          placeholder="Пароль"
          type="password"
        />
      </el-col>
    </el-row>
    <el-row class="my-4">
      <el-col :span="6">
        <span>Укажите фамилию</span>
        <el-input
          v-model="newUser.last_name"
          placeholder="Фамилия"
        />
      </el-col>
    </el-row>
    <el-row class="my-4">
      <el-col :span="6">
        <span>Укажите имя</span>
        <el-input
          v-model="newUser.first_name"
          placeholder="Имя"
        />
      </el-col>
    </el-row>
    <el-row class="my-4">
      <el-col :span="6">
        <span>Укажите отчество</span>
        <el-input
          v-model="newUser.patronymic"
          placeholder="Отчество"
        />
      </el-col>
    </el-row>
    <el-row class="my-4">
      <el-col :span="6">
        <span>Укажите телефонный номер</span>
        <el-input
          v-model="newUser.phone"
          placeholder="Телефонный номер"
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
          @click="onCreateInternalUserClicked"
        >
          Создать
        </el-button>
      </el-button-group>
    </el-row>
  </el-card>
</template>

<script>
import {reactive} from "vue";
import {getPrintableInternalUserTypes} from "@/services/internal-users/InternalUser.js";
import {createInternalUser} from "@/services/internal-users/internalUsers.js";
import {useLoadingState} from "@/composables/common/useLoadingState.js";
import {parseErrors} from "@/helpers.js";
import {useRouter} from "vue-router";

export default {
  name: "Create",
  setup() {
    const internalUserTypes = getPrintableInternalUserTypes();
    const {loading, setLoaded, setLoading} = useLoadingState(false);
    const newUser = reactive({
      login: '',
      password: '',
      first_name: '',
      last_name: '',
      patronymic: '',
      phone: '',
      type: null,
    });
    const router = useRouter();
    const onCreateInternalUserClicked = async () => {
      try {
        setLoading();
        const {} = await createInternalUser(newUser);
        await router.push({name: 'internal-users'});
      } catch (e) {
        const errors = parseErrors(e.response.data.errors);
        console.log(errors);
      } finally {
        setLoaded();
      }
    };

    return {
      newUser,
      internalUserTypes,
      onCreateInternalUserClicked,
      loading,
    };
  },
};
</script>

<style scoped>

</style>
