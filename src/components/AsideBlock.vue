<template>
  <div
    id="kt_aside"
    class="aside aside-hoverable"
    data-kt-drawer="true"
    data-kt-drawer-name="aside"
    data-kt-drawer-activate="{default: true, lg: false}"
    data-kt-drawer-overlay="true"
    data-kt-drawer-width="{default:'200px', '300px': '250px'}"
    data-kt-drawer-direction="start"
    data-kt-drawer-toggle="#kt_aside_mobile_toggle"
  >
    <div
      id="kt_aside_logo"
      class="aside-logo flex-column-auto"
    >
      <a href="javascript:;">
        <img
          alt="Logo"
          src="../assets/logo.svg"
          class="h-15px logo w-50px h-50px"
        >
      </a>
    </div>

    <div class="aside-menu flex-column-fluid">
      <div
        id="kt_aside_menu_wrapper"
        class="hover-scroll-overlay-y my-5 my-lg-5"
        data-kt-scroll="true"
        data-kt-scroll-activate="{default: false, lg: true}"
        data-kt-scroll-height="auto"
        data-kt-scroll-dependencies="#kt_aside_logo, #kt_aside_footer"
        data-kt-scroll-wrappers="#kt_aside_menu"
        data-kt-scroll-offset="0"
      >
        <div
          id="#kt_aside_menu"
          class="menu menu-column menu-title-gray-800 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-500"
          data-kt-menu="true"
        >
          <div class="menu-item">
            <div class="menu-content pb-2">
              <span class="menu-section text-muted text-uppercase fs-8 ls-1 company-title">Kimberly</span>
            </div>
          </div>
          <div class="menu-item">
            <router-link
              class="menu-link"
              to="/leagues"
            >
              <span class="menu-icon">
                <span class="svg-icon svg-icon-2">
                  <i
                    class="fa fa-bolt"
                    aria-hidden="true"
                    style="color:white"
                  />
                </span>
              </span>
              <span class="menu-title">Лиги</span>
            </router-link>
          </div>
          <div class="menu-item">
            <router-link
              class="menu-link"
              to="/stadiums"
            >
              <span class="menu-icon">
                <span class="svg-icon svg-icon-2">
                  <i
                    class="fas fa-map-marked"
                    style="color:white"
                  />
                </span>
              </span>
              <span class="menu-title">Стадионы</span>
            </router-link>
          </div>
          <div class="menu-item">
            <router-link
              class="menu-link"
              to="/tournaments"
            >
              <span class="menu-icon">
                <span class="svg-icon svg-icon-2">
                  <i
                    class="fas fa-white fa-award"
                    style="color:white"
                  />
                </span>
              </span>
              <span class="menu-title">Турниры</span>
            </router-link>
          </div>
          <div class="menu-item">
            <router-link
              class="menu-link"
              to="/calendar"
            >
              <span class="menu-icon">
                <span class="svg-icon svg-icon-2">
                  <i class="fas fa-white fa-calendar-alt" />
                </span>
              </span>
              <span class="menu-title">Календарь</span>
            </router-link>
          </div>
          <hr>
          <div class="menu-item">
            <router-link
              class="menu-link"
              to="/users"
            >
              <span class="menu-icon">
                <span class="svg-icon svg-icon-1">
                  <i
                    class="fas fa-user-shield"
                    style="color:white"
                  />
                </span>
              </span>
              <span class="menu-title">Внешние пользователи</span>
            </router-link>
          </div>
          <div class="menu-item">
            <router-link
              class="menu-link"
              to="/internal-users"
            >
              <span class="menu-icon">
                <span class="svg-icon svg-icon-1">
                  <i
                    class="fas fa-user-shield"
                    style="color:white"
                  />
                </span>
              </span>
              <span class="menu-title">Внутренние пользователи</span>
            </router-link>
          </div>
          <div class="menu-item">
            <router-link
              class="menu-link"
              to="/schools"
            >
              <span class="menu-icon">
                <span class="svg-icon svg-icon-2">
                  <i class="fas fa-white fa-graduation-cap" />
                </span>
              </span>
              <span class="menu-title">Школы</span>
            </router-link>
          </div>
          <hr>
          <div class="menu-item">
            <router-link
              class="menu-link"
              to="/results"
            >
              <span class="menu-icon">
                <span class="svg-icon svg-icon-1">
                  <i
                    class="fas fa-user-shield"
                    style="color:white"
                  />
                </span>
              </span>
              <span class="menu-title">Результаты</span>
            </router-link>
          </div>
          <hr>
          <div class="menu-item">
            <router-link
              class="menu-link"
              to="/notifications"
            >
              <span class="menu-icon">
                <span class="svg-icon svg-icon-2">
                  <i class="fas fa-white fa-bell" />
                </span>
              </span>
              <span class="menu-title">Уведомления</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue';
import { useStore } from "vuex";

const store = useStore();

const user = computed(() => store.getters['auth/GET_USER']);

const logout = () => {
  store.dispatch('auth/LOGOUT')
}

const data = reactive({
  dd: {}
});

const toggleDropdown = (type) => {
  data.dd[type] = !data.dd[type];
};
</script>

<style scoped lang="scss">
.aside {
  background-color: $base-color-blue;

  .avatar {
    background-color: $base-color-orange;
  }
  .logout-button {
    color: $base-color-orange;
    font-size: 1.2rem;
  }
}

.aside-menu .menu-item {
  position: relative;
  a.menu-link {
    &.router-link-active {
      background-color: $base-color-orange;
      &:hover {
        span {
          color: $base-color-white !important;
        }
        i {
          color:  $base-color-white !important;
        }
      }
    }
    &:hover {
      color: $base-color-orange !important;
      .menu-title, i {
        color: $base-color-orange !important;
      }
    }

    .menu-title {
      color: $base-color-white !important;
      padding: 0 !important;
    }
  }
  .company-title {
    color: $base-color-white !important;
    font-size: 1.5rem !important;
  }
}
</style>
