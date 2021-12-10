<template>
  <el-card v-loading="loading">
    <template #header>
      <h3>Создать внешнего пользователя</h3>
    </template>
    <el-row
      :gutter="10"
      class="my-4"
    >
      <el-col
        class="pb-4"
        :span="6"
      >
        <span>Укажите имя</span>
        <el-input
          v-model="newUser.first_name"
          placeholder="Имя"
        />
      </el-col>
      <el-col :span="6">
        <span>Укажите фамилию</span>
        <el-input
          v-model="newUser.last_name"
          placeholder="Фамилия"
        />
      </el-col>
      <el-col :span="6">
        <span>Укажите отчество</span>
        <el-input
          v-model="newUser.patronymic"
          placeholder="Отчество"
        />
      </el-col>
      <el-col :span="6">
        <span>Укажите телефонный номер</span>
        <el-input
          v-model="newUser.phone"
          placeholder="Телефонный номер"
        />
      </el-col>
      <el-col :span="6">
        <span>Укажите электронную почту</span>
        <el-input
          v-model="newUser.email"
          placeholder="Email"
          type="email"
        />
      </el-col>
      <el-col :span="6">
        <span>Название школы</span>
        <el-input
          v-model="newUser.name"
          placeholder="Имя"
        />
      </el-col>
      <el-col :span="6">
        <span>Придумайте пароль</span>
        <el-input
          v-model="newUser.password"
          placeholder="Пароль"
          type="password"
        />
      </el-col>
    </el-row>

    <el-row class="my-3 flex-row-reverse">
      <el-button-group>
        <el-button @click="$router.push({name: 'users'})">
          Отменить
        </el-button>
        <el-button
          type="primary"
          @click="onCreateUserClicked"
        >
          Создать
        </el-button>
      </el-button-group>
    </el-row>
  </el-card>
</template>

<script>
import {useLoadingState} from "@/composables/common/useLoadingState";
import {createUser} from '@/services/users/users.js'

import {reactive} from "vue";
import {useRouter} from "vue-router";
import useCountryAndCity from "@/composables/useCountryAndCity";

export default {
  name: "Create",
  setup() {
    const {loading, setLoaded, setLoading} = useLoadingState(false);
    const {selectedCityId} = useCountryAndCity()
    const router = useRouter()
    const newUser = reactive({
      city_id: selectedCityId,
      name: '',
      password: '',
      first_name: '',
      last_name: '',
      patronymic: '',
      phone: '',
      email: '',
    });

    const onCreateUserClicked = async () => {
      try {
        setLoading()
        const {data: schoolId} = await createUser(newUser)
        if (schoolId) {
          await router.push({name: 'schools-edit', params: {id: schoolId}})
        } else {
          await router.push({name: 'users'})
        }
      } catch (e) {
        console.log(e)
      } finally {
        setLoaded()
      }

    }


    return {
      newUser,
      loading,
      onCreateUserClicked
    };
  }
}
</script>

<style scoped>

</style>
