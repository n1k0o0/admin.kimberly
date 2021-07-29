<template>

  <router-view v-if="!checkAuth && data.isLoading"/>

  <div v-if="checkAuth && data.isLoading" class="page d-flex flex-row flex-column-fluid">

    <AsideBlock></AsideBlock>

    <!--begin::Wrapper-->
    <div class="wrapper d-flex flex-column flex-row-fluid" id="kt_wrapper">

      <HeaderBlock></HeaderBlock>

      <div class="content d-flex flex-column flex-column-fluid" id="kt_content">
        <router-view></router-view>
      </div>

      <FooterBlock></FooterBlock>

    </div>
    <div class="p-toast p-component p-toast-top-right" style="z-index: 1000000;">
      <div></div>
    </div>
  </div>

</template>

<script setup>

  import {onMounted, computed, defineAsyncComponent, reactive} from 'vue'
  import AsideBlock from './components/AsideBlock.vue'
  import HeaderBlock from './components/HeaderBlock.vue'
  import FooterBlock from './components/FooterBlock.vue'
  import {useStore} from 'vuex'

  const store = useStore();

  onMounted(() => {
    getMe()
  })

  const isLoading = false
  let showUserPanel = computed(() => store.getters['GET_USER_PANEL'])

  const data = reactive({isLoading, showUserPanel})

  const getMe = async () => {
    await store.dispatch('auth/GET_AUTH_ME')
    data.isLoading = true
  }

  const checkAuth = computed(() => store.getters['auth/GET_USER_ID'])

</script>
