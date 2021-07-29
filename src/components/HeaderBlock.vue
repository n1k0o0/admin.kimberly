<template>

  <div id="kt_header" class="header header-fixed">
    <!--begin::Container-->
    <div class="container-fluid d-flex align-items-stretch justify-content-between">
      <!--begin::Header Menu Wrapper-->
      <div id="kt_header_menu_wrapper" class="header-menu-wrapper header-menu-wrapper-left">
        <!--begin::Header Menu-->
        <div id="kt_header_menu" class="header-menu header-menu-mobile header-menu-layout-default">
          <!--begin::Header Nav-->
          <ul class="menu-nav">
            <li class="menu-item" v-bind:class="{'menu-item-here': $route.name === 'agencies'}">
              <router-link :to="{name: 'agencies'}" class="menu-link">
                <span class="menu-text">Агентства</span>
                <i class="menu-arrow"></i>
              </router-link>
            </li>
            <li class="menu-item" v-bind:class="{'menu-item-here': $route.name === 'clients'}">
              <router-link :to="{name: 'clients'}" class="menu-link">
                <span class="menu-text">Клиенты</span>
                <i class="menu-arrow"></i>
              </router-link>
            </li>
            <li aria-haspopup="true"
                class="menu-item menu-item-open menu-item-submenu menu-item-rel menu-item-open-dropdown"
                data-menu-toggle="click" tabindex="0"
                v-bind:class="{'menu-item-hover': headerMenu['handbook']}">
              <a class="menu-link menu-toggle" href="javascript:;"
                 @click.stop="toggleDropdown('handbook')">
                <span class="menu-text">Справочники</span>
                <i class="menu-arrow"></i>
              </a>
              <div class="menu-submenu menu-submenu-classic menu-submenu-left">
                <ul class="menu-subnav">
                  <li aria-haspopup="true" class="menu-item"
                      v-bind:class="{'menu-item-active': $route.name === 'cities'}">
                    <router-link :to="{name: 'cities'}" class="menu-link">
                      <i class="menu-bullet menu-bullet-dot">
                        <span></span>
                      </i>
                      <span class="menu-text">Города</span>
                    </router-link>
                  </li>
                  <li aria-haspopup="true" class="menu-item menu-item-submenu" data-menu-toggle="hover"
                      v-bind:class="{'menu-item-hover': subMenu['hotels']}"
                      @mouseenter="toggleSubmenu('hotels')"
                      @mouseleave="toggleSubmenu('hotels')"
                  >
                    <a class="menu-link menu-toggle" href="javascript:;">
                      <i class="menu-bullet menu-bullet-dot">
                        <span></span>
                      </i>
                      <span class="menu-text">Гостиницы</span>
                      <i class="menu-arrow"></i>
                    </a>
                    <div class="menu-submenu menu-submenu-classic menu-submenu-right">
                      <ul class="menu-subnav">
                        <li aria-haspopup="true" class="menu-item"
                            v-bind:class="{'menu-item-active': $route.name === 'hotels'}">
                          <router-link :to="{name: 'hotels'}" class="menu-link">
                            <i class="menu-bullet menu-bullet-dot">
                              <span></span>
                            </i>
                            <span class="menu-text">Отели</span>
                          </router-link>
                        </li>
                        <li aria-haspopup="true" class="menu-item menu-item-submenu" data-menu-toggle="hover"
                            v-bind:class="{'menu-item-hover': subMenu['rooms']}"
                            @mouseenter="toggleSubmenu('rooms')"
                            @mouseleave="toggleSubmenu('rooms')"
                        >
                          <a class="menu-link menu-toggle" href="javascript:;">
                            <i class="menu-bullet menu-bullet-dot">
                              <span></span>
                            </i>
                            <span class="menu-text">Номера</span>
                            <i class="menu-arrow"></i>
                          </a>
                          <div class="menu-submenu menu-submenu-classic menu-submenu-right">
                            <ul class="menu-subnav">
                              <li aria-haspopup="true" class="menu-item"
                                  v-bind:class="{'menu-item-active': $route.name === 'room-services'}">
                                <router-link :to="{name: 'room-services'}" class="menu-link">
                                  <i class="menu-bullet menu-bullet-dot">
                                    <span></span>
                                  </i>
                                  <span class="menu-text">Сервисы</span>
                                </router-link>
                              </li>
                              <li aria-haspopup="true" class="menu-item"
                                  v-bind:class="{'menu-item-active': $route.name === 'room-equipment'}">
                                <router-link :to="{name: 'room-equipment'}" class="menu-link">
                                  <i class="menu-bullet menu-bullet-dot">
                                    <span></span>
                                  </i>
                                  <span class="menu-text">Оборудование</span>
                                </router-link>
                              </li>
                              <li aria-haspopup="true" class="menu-item"
                                  v-bind:class="{'menu-item-active': $route.name === 'room-furniture'}">
                                <router-link :to="{name: 'room-furniture'}" class="menu-link">
                                  <i class="menu-bullet menu-bullet-dot">
                                    <span></span>
                                  </i>
                                  <span class="menu-text">Мебель</span>
                                </router-link>
                              </li>
                              <li aria-haspopup="true" class="menu-item"
                                  v-bind:class="{'menu-item-active': $route.name === 'room-bathroom'}">
                                <router-link :to="{name: 'room-bathroom'}" class="menu-link">
                                  <i class="menu-bullet menu-bullet-dot">
                                    <span></span>
                                  </i>
                                  <span class="menu-text">Санузел</span>
                                </router-link>
                              </li>


                              <li aria-haspopup="true" class="menu-item menu-item-submenu" data-menu-toggle="hover"
                                  v-bind:class="{'menu-item-hover': subMenu['categories']}"
                                  @mouseenter="toggleSubmenu('categories')"
                                  @mouseleave="toggleSubmenu('categories')"
                              >
                                <a class="menu-link menu-toggle" href="javascript:;">
                                  <i class="menu-bullet menu-bullet-dot">
                                    <span></span>
                                  </i>
                                  <span class="menu-text">Название</span>
                                  <i class="menu-arrow"></i>
                                </a>
                                <div class="menu-submenu menu-submenu-classic menu-submenu-right">
                                  <ul class="menu-subnav">
                                    <li aria-haspopup="true" class="menu-item"
                                        v-bind:class="{'menu-item-active': $route.name === 'room-types'}">
                                      <router-link :to="{name: 'room-types'}" class="menu-link">
                                        <i class="menu-bullet menu-bullet-dot">
                                          <span></span>
                                        </i>
                                        <span class="menu-text">Тип</span>
                                      </router-link>
                                    </li>
                                    <li aria-haspopup="true" class="menu-item"
                                        v-bind:class="{'menu-item-active': $route.name === 'room-places'}">
                                      <router-link :to="{name: 'room-places'}" class="menu-link">
                                        <i class="menu-bullet menu-bullet-dot">
                                          <span></span>
                                        </i>
                                        <span class="menu-text">Кол-во мест</span>
                                      </router-link>
                                    </li>
                                    <li aria-haspopup="true" class="menu-item"
                                        v-bind:class="{'menu-item-active': $route.name === 'room-descriptions'}">
                                      <router-link :to="{name: 'room-descriptions'}" class="menu-link">
                                        <i class="menu-bullet menu-bullet-dot">
                                          <span></span>
                                        </i>
                                        <span class="menu-text">Описание</span>
                                      </router-link>
                                    </li>
                                  </ul>
                                </div>
                              </li>




                            </ul>
                          </div>
                        </li>
                        <li aria-haspopup="true" class="menu-item"
                            v-bind:class="{'menu-item-active': $route.name === 'hotel-meals'}">
                          <router-link :to="{name: 'hotel-meals'}" class="menu-link">
                            <i class="menu-bullet menu-bullet-dot">
                              <span></span>
                            </i>
                            <span class="menu-text">Питание</span>
                          </router-link>
                        </li>
                        <li aria-haspopup="true" class="menu-item"
                            v-bind:class="{'menu-item-active': $route.name === 'hotel-accommodations'}">
                          <router-link :to="{name: 'hotel-accommodations'}" class="menu-link">
                            <i class="menu-bullet menu-bullet-dot">
                              <span></span>
                            </i>
                            <span class="menu-text">Условия проживания</span>
                          </router-link>
                        </li>
                        <li aria-haspopup="true" class="menu-item"
                            v-bind:class="{'menu-item-active': $route.name === 'hotel-services'}">
                          <router-link :to="{name: 'hotel-services'}" class="menu-link">
                            <i class="menu-bullet menu-bullet-dot">
                              <span></span>
                            </i>
                            <span class="menu-text">Услуги</span>
                          </router-link>
                        </li>
                        <li aria-haspopup="true" class="menu-item"
                            v-bind:class="{'menu-item-active': $route.name === 'hotel-promotions'}">
                          <router-link :to="{name: 'hotel-promotions'}" class="menu-link">
                            <i class="menu-bullet menu-bullet-dot">
                              <span></span>
                            </i>
                            <span class="menu-text">Акции</span>
                          </router-link>
                        </li>
                        <li aria-haspopup="true" class="menu-item"
                            v-bind:class="{'menu-item-active': $route.name === 'hotel-directions'}">
                          <router-link :to="{name: 'hotel-directions'}" class="menu-link">
                            <i class="menu-bullet menu-bullet-dot">
                              <span></span>
                            </i>
                            <span class="menu-text">Направления</span>
                          </router-link>
                        </li>
                        <li aria-haspopup="true" class="menu-item"
                            v-bind:class="{'menu-item-active': $route.name === 'hotel-infrastructure-types'}">
                          <router-link :to="{name: 'hotel-infrastructure-types'}" class="menu-link">
                            <i class="menu-bullet menu-bullet-dot">
                              <span></span>
                            </i>
                            <span class="menu-text">Типы инфраструктур</span>
                          </router-link>
                        </li>
                        <li aria-haspopup="true" class="menu-item"
                            v-bind:class="{'menu-item-active': $route.name === 'hotel-infrastructures'}">
                          <router-link :to="{name: 'hotel-infrastructures'}" class="menu-link">
                            <i class="menu-bullet menu-bullet-dot">
                              <span></span>
                            </i>
                            <span class="menu-text">Инфраструктура</span>
                          </router-link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li aria-haspopup="true" class="menu-item menu-item-submenu" data-menu-toggle="hover"
                      v-bind:class="{'menu-item-hover': subMenu['tours']}"
                      @mouseenter="toggleSubmenu('tours')"
                      @mouseleave="toggleSubmenu('tours')"
                  >
                    <a class="menu-link menu-toggle" href="javascript:;">
                      <i class="menu-bullet menu-bullet-dot">
                        <span></span>
                      </i>
                      <span class="menu-text">Экскурсионые туры</span>
                      <i class="menu-arrow"></i>
                    </a>
                    <div class="menu-submenu menu-submenu-classic menu-submenu-right">
                      <ul class="menu-subnav">
                        <li aria-haspopup="true" class="menu-item"
                            v-bind:class="{'menu-item-active': $route.name === 'excursion-tour-categories'}">
                          <router-link :to="{name: 'excursion-tour-categories'}" class="menu-link">
                            <i class="menu-bullet menu-bullet-dot">
                              <span></span>
                            </i>
                            <span class="menu-text">Категории</span>
                          </router-link>
                        </li>
                        <li aria-haspopup="true" class="menu-item"
                            v-bind:class="{'menu-item-active': $route.name === 'tour-services'}">
                          <router-link :to="{name: 'tour-services'}" class="menu-link">
                            <i class="menu-bullet menu-bullet-dot">
                              <span></span>
                            </i>
                            <span class="menu-text">Услуги</span>
                          </router-link>
                        </li>
                        <li aria-haspopup="true" class="menu-item"
                            v-bind:class="{'menu-item-active': $route.name === 'excursion-tour-trade-offers'}">
                          <router-link :to="{name: 'excursion-tour-trade-offers'}" class="menu-link">
                            <i class="menu-bullet menu-bullet-dot">
                              <span></span>
                            </i>
                            <span class="menu-text">Торговые предложения</span>
                          </router-link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <!--                  <li aria-haspopup="true" class="menu-item"-->
                  <!--                      v-bind:class="{'menu-item-active': $route.name === 'routes'}">-->
                  <!--                    <router-link :to="{name: 'routes'}" class="menu-link">-->
                  <!--                      <i class="menu-bullet menu-bullet-dot">-->
                  <!--                        <span></span>-->
                  <!--                      </i>-->
                  <!--                      <span class="menu-text">Маршруты</span>-->
                  <!--                    </router-link>-->
                  <!--                  </li>-->
                  <li aria-haspopup="true" class="menu-item"
                      v-bind:class="{'menu-item-active': $route.name === 'transportation'}">
                    <router-link :to="{name: 'transportation'}" class="menu-link">
                      <i class="menu-bullet menu-bullet-dot">
                        <span></span>
                      </i>
                      <span class="menu-text">Транспорт</span>
                    </router-link>
                  </li>
                  <li aria-haspopup="true" class="menu-item"
                      v-bind:class="{'menu-item-active': $route.name === 'transports'}">
                    <router-link :to="{name: 'transports'}" class="menu-link">
                      <i class="menu-bullet menu-bullet-dot">
                        <span></span>
                      </i>
                      <span class="menu-text">Автобусные перевозки</span>
                    </router-link>
                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item" v-bind:class="{'menu-item-here': $route.name === 'applications'}">
              <router-link :to="{name: 'applications'}" class="menu-link">
                <span class="menu-text">Заявки</span>
                <i class="menu-arrow"></i>
              </router-link>
            </li>
          </ul>
          <!--end::Header Nav-->
        </div>
        <!--end::Header Menu-->
      </div>
      <!--end::Header Menu Wrapper-->
      <HeaderTopbar></HeaderTopbar>
    </div>
    <!--end::Container-->
  </div>

</template>

<script>
import HeaderTopbar from "./HeaderTopbar.vue";


export default {
  components: {
    HeaderTopbar
  },
  data: function () {
    return {
      headerMenu: [],
      subMenu: []
    }
  },
  methods: {
    toggleDropdown(type) {
      if (!type) {
        this.headerMenu = [];
        return
      }
      this.headerMenu[type] = !this.headerMenu[type]
    },
    toggleSubmenu(type) {
      if (!type) {
        this.subMenu = [];
      }
      else {
        if (type !== 'rooms' && type !== 'categories') {
          this.subMenu = []
        }
      }
      if (type === 'categories' && this.subMenu[type]){  setTimeout(()=>{
        this.subMenu[type] = !this.subMenu[type]
      }, 750)} else {
        this.subMenu[type] = !this.subMenu[type]

      }
    }
  },
  created() {
    document.addEventListener('click', () => this.toggleDropdown());
    document.addEventListener('click', () => this.toggleSubmenu());
  }
}
</script>