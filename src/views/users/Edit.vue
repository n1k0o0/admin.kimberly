<template>
  <el-card v-loading="loading">
    <template #header>
      <h3>Редактирование {{ user.login }}</h3>
      <el-row
        :gutter="2"
        justify="space-between"
      >
        <el-row/>
        <el-row>
          <el-select
            v-model="user.status"
            placeholder="Статус"
            @change="handleUserStatusChanged"
          >
            <el-option
              v-for="(userType, key) in userStatuses"
              :key="key"
              :label="userType"
              :value="key"
            />
          </el-select>
        </el-row>
      </el-row>
    </template>
    <el-row class="mb-4">
      <el-col :span="6">
        <span class="d-block h4">Тип пользователя</span>
        <el-select
          v-model="user.type"
          class="d-block"
          placeholder="Тип пользователя"
        >
          <el-option
            v-for="(type, key) in userTypes"
            :key="key"
            :value="key"
            :label="type"
          />
        </el-select>
      </el-col>
    </el-row>
    <el-row
      class="flex-column"
    >
      <span class="d-block h4">Аватар</span>
      <single-image-uploader
        :image="user.avatar"
        :hide-upload-icon="!!user.avatar"
        :on-remove="handleAvatarRemoved"
        :on-change="handleAvatarChanged"
      />
    </el-row>
    <el-row class="my-4">
      <el-col :span="6">
        <span class="d-block h4">Логин</span>
        <el-input
          v-model="user.email"
          :debounce="1000"
          placeholder="Email"
          @input="handleUserEmailChanged"
        />
      </el-col>
    </el-row>
    <el-row class="my-4">
      <el-col :span="6">
        <span class="d-block h4">Фамилия</span>
        <el-input
          v-model="user.last_name"
          placeholder="Фамилия"
          :debounce="1000"
          @input="handleUserLastNameChanged"
        />
      </el-col>
    </el-row>
    <el-row class="my-4">
      <el-col :span="6">
        <span class="d-block h4">Имя</span>
        <el-input
          v-model="user.first_name"
          placeholder="Имя"
          :debounce="1000"
          @input="handleUserFirstNameChanged"
        />
      </el-col>
    </el-row>
    <el-row class="my-4">
      <el-col :span="6">
        <span class="d-block h4">Отчество</span>
        <el-input
          v-model="user.patronymic"
          placeholder="Отчество"
          :debounce="1000"
          @input="handleUserPatronymicChanged"
        />
      </el-col>
    </el-row>
    <el-row class="my-4">
      <el-col :span="6">
        <span class="d-block h4">Телефонный номер</span>
        <el-input
          v-model="user.phone"
          :debounce="1000"
          placeholder="Телефонный номер"
          @input="handleUserPhoneChanged"
        />
      </el-col>
    </el-row>
    <el-row class="my-4">
      <el-col :span="6">
        <span class="d-block h4">Новый пароль</span>
        <el-input
          v-model="newPassword"
          placeholder="Пароль"
          type="password"
        />
      </el-col>
    </el-row>
    <el-row class="my-3 flex-row-reverse">
      <el-button-group>
        <el-button @click="$router.push({name: 'users'})">
          К списку пользователей
        </el-button>
      </el-button-group>
    </el-row>
  </el-card>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useLoadingState } from "@/composables/common/useLoadingState.js";
import { getPrintableUserStatuses, getPrintableUserTypes } from "@/services/users/User.js";
import { getUser, updateUser, uploadUserAvatar } from "@/services/users/users.js";
import SingleImageUploader from "@/components/common/SingleImageUploader.vue";

export default {
  name: "Edit",
  components: {
    SingleImageUploader,
  },
  setup() {
    let userId = null;
    let user = ref({});
    const route = useRoute();

    const userStatuses = getPrintableUserStatuses();
    const userTypes = getPrintableUserTypes();

    const { loading, setLoaded, setLoading } = useLoadingState(false);
    onMounted(async () => {
      try {
        userId = route.params.id;
        setLoading();
        const { data } = await getUser(userId);
        user.value = data;
      } catch (e) {
      } finally {
        setLoaded();
      }
    });

    const updateUserFields = async (fields) => {
      try {
        setLoading();
        await updateUser(userId, fields);
      } catch (e) {
      } finally {
        setLoaded();
      }
    };

    const handleUserPhoneChanged = () => updateUserFields({ phone: user.value.phone });
    const handleUserEmailChanged = () => updateUserFields({ email: user.value.email });
    const handleUserFirstNameChanged = () => updateUserFields({ first_name: user.value.first_name });
    const handleUserLastNameChanged = () => updateUserFields({ last_name: user.value.last_name });
    const handleUserPatronymicChanged = () => updateUserFields({ patronymic: user.value.patronymic });
    const handleUserStatusChanged = () => updateUserFields({ status: user.value.status });

    const handleAvatarRemoved = async (file) => {
      user.value.avatar = null;
    };

    const handleAvatarChanged = async (file, fileList) => {
      try {
        setLoading();
        await uploadUserAvatar(userId, file.raw);
        user.value.avatar = file;
      } catch (e) {
        console.log(e);
      } finally {
        setLoaded();
      }
    };

    return {
      handleAvatarRemoved,
      handleAvatarChanged,
      handleUserPhoneChanged,
      handleUserEmailChanged,
      handleUserFirstNameChanged,
      handleUserLastNameChanged,
      handleUserPatronymicChanged,
      handleUserStatusChanged,
      loading,
      user,
      userTypes,
      userStatuses,
    };
  },
};
</script>

<style scoped>

</style>
