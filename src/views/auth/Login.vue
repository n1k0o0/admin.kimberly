<template>
  <div class="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">
    <a href="javascript:;" class="mb-12">
      <img alt="Logo" src="../../assets/logo.svg" class="h-45px">
    </a>
    <div class="login-form w-lg-500px rounded shadow-sm p-10 p-lg-15 mx-auto">
      <form class="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
            @submit.prevent="login">
        <div class="text-center mb-10">
          <h1 class="text-white mb-3">Вход</h1>
        </div>
        <div class="fv-row mb-10 fv-plugins-icon-container">
          <label class="form-label fs-6 fw-bolder text-white">Email/Логин</label>
          <input class="form-control form-control-lg form-control-solid"
                 v-model="data.form.email">
          <div class="fv-plugins-message-container invalid-feedback"></div>
        </div>
        <div class="fv-row mb-10 fv-plugins-icon-container">
          <div class="d-flex flex-stack mb-2">
            <label class="form-label fw-bolder text-white fs-6 mb-0">Пароль</label>
          </div>
          <input class="form-control form-control-lg form-control-solid"
                 type="password"
                 autocomplete="off"
                 v-model="data.form.password">
          <div class="fv-plugins-message-container invalid-feedback"></div>
        </div>
        <div class="text-center">
          <button type="submit" id="kt_sign_in_submit" class="btn btn-lg btn-login btn-primary w-100 mb-5">
            <span class="indicator-label">Войти</span>
            <span class="indicator-progress">Минутку...
									<span class="spinner-border spinner-border-sm align-middle ms-2"></span></span>
          </button>
        </div>
        <div></div>
      </form>
    </div>
  </div>
</template>

<script setup>

import { onBeforeMount, onMounted, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import useLocalStorage from "@/composables/common/useLocalStorage.js";

const store = useStore();
const router = useRouter();

const data = reactive({
  form: {}
});

onMounted(async () => {
  if (store.getters['auth/GET_USER_ID']) {
    await router.push({ name: 'dashboard' })
  }
})

onBeforeMount(() => {

})

const login = () => {
  useLocalStorage('selected_country').removeValue();
  useLocalStorage('selected_city').removeValue();
  store.dispatch('auth/LOGIN', data.form)
}

</script>
<style lang="scss">
.login-form {
  background-color: $base-color-blue;
  color: white;
  .btn.btn-login {
    background-color: $base-color-orange;
  }
}
</style>
