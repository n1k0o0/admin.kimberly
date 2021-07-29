<template>
  <div class="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">
    <a href="../../demo1/dist/index.html" class="mb-12">
      <img alt="Logo" src="assets/media/logos/logo-2.svg" class="h-45px">
    </a>
    <div class="w-lg-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto">
      <form class="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
            @submit.prevent="login">
        <div class="text-center mb-10">
          <h1 class="text-dark mb-3">Sign In to Metronic</h1>
          <div class="text-gray-400 fw-bold fs-4">New Here?
            <a href="javascript:;" class="link-primary fw-bolder">Create an Account</a></div>
        </div>
        <div class="fv-row mb-10 fv-plugins-icon-container">
          <label class="form-label fs-6 fw-bolder text-dark">Email</label>
          <input class="form-control form-control-lg form-control-solid"
                 v-model="data.form.email">
          <div class="fv-plugins-message-container invalid-feedback"></div></div>
        <div class="fv-row mb-10 fv-plugins-icon-container">
          <div class="d-flex flex-stack mb-2">
            <label class="form-label fw-bolder text-dark fs-6 mb-0">Password</label>
            <a href="javascript:;" class="link-primary fs-6 fw-bolder">Forgot Password ?</a>
          </div>
          <input class="form-control form-control-lg form-control-solid"
                 type="password"
                 autocomplete="off"
                 v-model="data.form.password">
          <div class="fv-plugins-message-container invalid-feedback"></div></div>
        <div class="text-center">
          <button type="submit" id="kt_sign_in_submit" class="btn btn-lg btn-primary w-100 mb-5">
            <span class="indicator-label">Continue</span>
            <span class="indicator-progress">Please wait...
									<span class="spinner-border spinner-border-sm align-middle ms-2"></span></span>
          </button>
        </div>
        <div></div></form>
    </div>
  </div>
</template>

<script setup>

import { reactive, onMounted, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const store = useStore();
const router = useRouter();

const data = reactive({
  form: {}
});

onMounted(async () => {
  await store.dispatch('auth/GET_AUTH_ME')
  if(store.getters['auth/GET_USER_ID']) {
    await router.push({name: 'applications'})
  }
})

onBeforeMount(() => {
  document.getElementById('kt_body').className = 'bg-dark'
})

const login = () => {
  store.dispatch('auth/LOGIN', data.form)
}

</script>