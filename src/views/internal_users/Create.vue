<template>
  <el-card v-loading="loading">
    <template #header>
      <h3>Создать внутреннего пользователя</h3>
    </template>
    <el-row class="mb-4">
      <el-col :span="6">
        <span>Тип пользователя</span>
        <el-select
          class="d-block"
          v-model="newUser.type"
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
        <span>Придумайте логин</span>
        <el-input
          placeholder="Логин"
          v-model="newUser.login"
        ></el-input>
      </el-col>
    </el-row>
    <el-row class="my-4">
      <el-col :span="6">
        <span>Придумайте пароль</span>
        <el-input
          placeholder="Пароль"
          v-model="newUser.password"
          type="password"
        ></el-input>
      </el-col>
    </el-row>
    <el-row class="my-4">
      <el-col :span="6">
        <span>Укажите фамилию</span>
        <el-input
          placeholder="Фамилия"
          v-model="newUser.last_name"
        ></el-input>
      </el-col>
    </el-row>
    <el-row class="my-4">
      <el-col :span="6">
        <span>Укажите имя</span>
        <el-input
          placeholder="Имя"
          v-model="newUser.first_name"
        ></el-input>
      </el-col>
    </el-row>
    <el-row class="my-4">
      <el-col :span="6">
        <span>Укажите отчество</span>
        <el-input
          placeholder="Отчество"
          v-model="newUser.middle_name"
        ></el-input>
      </el-col>
    </el-row>
    <el-row class="my-4">
      <el-col :span="6">
        <span>Укажите телефонный номер</span>
        <el-input
          placeholder="Телефонный номер"
          v-model="newUser.phone"
        ></el-input>
      </el-col>
    </el-row>
    <el-row class="my-3 flex-row-reverse">
      <el-button-group>
        <el-button @click="$router.push({name: 'internal-users'})">Отменить</el-button>
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
import { reactive } from "vue";
import { getPrintableInternalUserTypes } from "../../services/internal-users/InternalUser";
import { createInternalUser } from "../../services/internal-users/internalUsers";
import { useLoadingState } from "../../composables/common/useLoadingState";
import { parseErrors } from "../../helpers";
import { useRouter } from "vue-router";

export default {
  name: "Create",
  setup() {
    const internalUserTypes = getPrintableInternalUserTypes()
    const { loading, setLoaded, setLoading } = useLoadingState(false)
    const newUser = reactive({
      login: '',
      password: '',
      first_name: '',
      last_name: '',
      middle_name: '',
      phone: '',
      type: null,
    })
    const router = useRouter()
    const onCreateInternalUserClicked = async () => {
      try {
        setLoading()
        const { data } = await createInternalUser(newUser)
        await router.push({name: 'internal-users'})
      } catch (e) {
        const errors = parseErrors(e.response.data.errors)
        console.log(errors)
      }
      finally {
        setLoaded()
      }

    }

    return {
      newUser,
      internalUserTypes,
      onCreateInternalUserClicked,
      loading,
    }
  },
}
</script>

<style scoped>

</style>
