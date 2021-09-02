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
<!--            <div-->
<!--              id="kt_aside_toggle"-->
<!--              class="btn btn-icon w-auto px-0 btn-active-color-primary aside-toggle"-->
<!--              data-kt-toggle="true"-->
<!--              data-kt-toggle-state="active"-->
<!--              data-kt-toggle-target="body"-->
<!--              data-kt-toggle-name="aside-minimize"-->
<!--              @click="toggleDropdown"-->
<!--            >-->
<!--              <span class="svg-icon svg-icon-1 rotate-180">-->
<!--                <svg-->
<!--                  xmlns="http://www.w3.org/2000/svg"-->
<!--                  xmlns:xlink="http://www.w3.org/1999/xlink"-->
<!--                  width="24px"-->
<!--                  height="24px"-->
<!--                  viewBox="0 0 24 24"-->
<!--                  version="1.1"-->
<!--                >-->
<!--                  <g-->
<!--                    stroke="none"-->
<!--                    stroke-width="1"-->
<!--                    fill="none"-->
<!--                    fill-rule="evenodd"-->
<!--                  >-->
<!--                    <polygon points="0 0 24 0 24 24 0 24" />-->
<!--                    <path-->
<!--                      d="M5.29288961,6.70710318 C4.90236532,6.31657888 4.90236532,5.68341391 5.29288961,5.29288961 C5.68341391,4.90236532 6.31657888,4.90236532 6.70710318,5.29288961 L12.7071032,11.2928896 C13.0856821,11.6714686 13.0989277,12.281055 12.7371505,12.675721 L7.23715054,18.675721 C6.86395813,19.08284 6.23139076,19.1103429 5.82427177,18.7371505 C5.41715278,18.3639581 5.38964985,17.7313908 5.76284226,17.3242718 L10.6158586,12.0300721 L5.29288961,6.70710318 Z"-->
<!--                      fill="#000000"-->
<!--                      fill-rule="nonzero"-->
<!--                      transform="translate(8.999997, 11.999999) scale(-1, 1) translate(-8.999997, -11.999999)"-->
<!--                    />-->
<!--                    <path-->
<!--                      d="M10.7071009,15.7071068 C10.3165766,16.0976311 9.68341162,16.0976311 9.29288733,15.7071068 C8.90236304,15.3165825 8.90236304,14.6834175 9.29288733,14.2928932 L15.2928873,8.29289322 C15.6714663,7.91431428 16.2810527,7.90106866 16.6757187,8.26284586 L22.6757187,13.7628459 C23.0828377,14.1360383 23.1103407,14.7686056 22.7371482,15.1757246 C22.3639558,15.5828436 21.7313885,15.6103465 21.3242695,15.2371541 L16.0300699,10.3841378 L10.7071009,15.7071068 Z"-->
<!--                      fill="#000000"-->
<!--                      fill-rule="nonzero"-->
<!--                      opacity="0.5"-->
<!--                      transform="translate(15.999997, 11.999999) scale(-1, 1) rotate(-270.000000) translate(-15.999997, -11.999999)"-->
<!--                    />-->
<!--                  </g>-->
<!--                </svg>-->
<!--              </span>-->
<!--            </div>-->
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
          <div class="menu-item">
            <router-link
              class="menu-link"
              to="/results"
            >
              <span class="menu-icon">
                <span class="svg-icon svg-icon-2">
                  <i class="fas fa-white fa-flag-checkered" />
                </span>
              </span>
              <span class="menu-title">Результаты</span>
            </router-link>
          </div>
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
          <hr />
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
