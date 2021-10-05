<template>
  <div class="d-flex align-items-stretch flex-shrink-0 topbar_menu">
    <!--begin::Toolbar wrapper-->
    <div class="d-flex align-items-stretch flex-shrink-0">
      <!--begin::User-->
      <div
        id="kt_header_user_menu_toggle"
        class="d-flex align-items-center ms-1 ms-lg-3"
        style="position: relative"
      >
        <!--begin::Menu wrapper-->
        <div
          class="cursor-pointer symbol symbol-30px symbol-md-40px"
          @click.stop="toggleMenu('user')"
        >
          {{ user.full_name }}
          <img
            src="../assets/logo.svg"
            alt="metronic"
          >
        </div>
        <!--begin::Menu-->
        <div
          class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px"
          :class="{'show': data.menu['user']}"
          data-kt-menu="true"
          @click.stop=""
        >
          <!--begin::Menu item-->
          <div class="menu-item px-3">
            <div class="menu-content d-flex align-items-center px-3">
              <!--begin::Avatar-->
              <div class="symbol symbol-50px me-5">
                <img
                  alt="Logo"
                  src="../assets/logo.svg"
                >
              </div>
              <!--end::Avatar-->
              <!--begin::Username-->
              <div class="d-flex flex-column">
                <div class="fw-bolder d-flex align-items-center fs-5">
                  <span class="badge badge-light-success fw-bolder fs-8 px-2 py-1 ms-2">{{ user.patronymic }}</span>
                </div>
                <a
                  href="#"
                  class="fw-bold text-muted text-hover-primary fs-7"
                >{{ user.email }}</a>
              </div>
              <!--end::Username-->
            </div>
          </div>
          <!--end::Menu item-->
          <!--begin::Menu separator-->
          <div class="separator my-2" />
          <!--end::Menu separator-->
          <!--begin::Menu separator-->
          <!--          <div class="separator my-2" />-->
          <!--end::Menu separator-->
          <!--begin::Menu item-->
          <div class="menu-item px-5">
            <a
              class="menu-link px-5"
              @click.prevent="logout"
            >Выйти</a>
          </div>
          <!--end::Menu item-->
        </div>
        <!--end::Menu-->
        <!--end::Menu wrapper-->
      </div>
      <!--end::User -->
    </div>
    <!--end::Toolbar wrapper-->
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useStore } from 'vuex';
import useAuthentication from "@/composables/useAuthentication.js";

const store = useStore();

const data = reactive({
  menu: {}
});

const { logout, user } = useAuthentication();

const toggleMenu = (type) => {
  if (!type) {
    data.menu = {};
    return;
  }

  data.menu[type] = !data.menu[type];
};

document.addEventListener('click', () => toggleMenu());

</script>

<style>
.topbar_menu .show.menu-sub {
  z-index: 105;
  position: absolute;
  margin: 0px;
  right: 0;
  top: 65px;
}
</style>
