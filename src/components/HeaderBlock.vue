<template>
  <div id="kt_header" style="" class="header align-items-stretch">
    <!--begin::Container-->
    <div class="container-fluid d-flex align-items-stretch justify-content-between">
      <!--begin::Aside mobile toggle-->
      <div class="d-flex align-items-center d-lg-none ms-n3 me-1" title="Show aside menu">
        <div class="btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px"
             id="kt_aside_mobile_toggle">
          <!--begin::Svg Icon | path: icons/duotone/Text/Menu.svg-->
          <span class="svg-icon svg-icon-2x mt-1">
										<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px"
                         height="24px" viewBox="0 0 24 24" version="1.1">
											<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
												<rect x="0" y="0" width="24" height="24"/>
												<rect fill="#000000" x="4" y="5" width="16" height="3" rx="1.5"/>
												<path
                          d="M5.5,15 L18.5,15 C19.3284271,15 20,15.6715729 20,16.5 C20,17.3284271 19.3284271,18 18.5,18 L5.5,18 C4.67157288,18 4,17.3284271 4,16.5 C4,15.6715729 4.67157288,15 5.5,15 Z M5.5,10 L18.5,10 C19.3284271,10 20,10.6715729 20,11.5 C20,12.3284271 19.3284271,13 18.5,13 L5.5,13 C4.67157288,13 4,12.3284271 4,11.5 C4,10.6715729 4.67157288,10 5.5,10 Z"
                          fill="#000000" opacity="0.3"/>
											</g>
										</svg>
									</span>
          <!--end::Svg Icon-->
        </div>
      </div>
      <!--end::Aside mobile toggle-->
      <!--begin::Mobile logo-->
      <div class="d-flex align-items-center flex-grow-1 flex-lg-grow-0">
        <a href="../../demo1/dist/index.html" class="d-lg-none">
          <img alt="Logo" src="assets/media/logos/logo-3.svg" class="h-30px"/>
        </a>
      </div>
      <!--end::Mobile logo-->
      <!--begin::Wrapper-->
      <div class="d-flex align-items-stretch justify-content-between flex-lg-grow-1">
        <!--begin::Navbar-->
        <div class="d-flex align-items-stretch" id="kt_header_nav">
          <!--begin::Menu wrapper-->
          <div class="header-menu align-items-stretch" data-kt-drawer="true" data-kt-drawer-name="header-menu"
               data-kt-drawer-activate="{default: true, lg: false}" data-kt-drawer-overlay="true"
               data-kt-drawer-width="{default:'200px', '300px': '250px'}" data-kt-drawer-direction="end"
               data-kt-drawer-toggle="#kt_header_menu_mobile_toggle" data-kt-swapper="true"
               data-kt-swapper-mode="prepend" data-kt-swapper-parent="{default: '#kt_body', lg: '#kt_header_nav'}">
            <!--begin::Menu-->
            <div
              class="menu menu-lg-rounded menu-column menu-lg-row menu-state-bg menu-title-gray-700 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-400 fw-bold my-5 my-lg-0 align-items-stretch"
              id="#kt_header_menu" data-kt-menu="true">
              <div class="menu-item me-lg-1">
                <a class="menu-link active py-3" href="../../demo1/dist/index.html">
                  <span class="menu-title">Dashboard</span>
                </a>
              </div>
              <div data-kt-menu-trigger="click" data-kt-menu-placement="bottom-start"
                   v-bind:class="{'show menu-dropdown': data.headerMenu['layouts']}"
                   class="menu-item menu-lg-down-accordion me-lg-1">
												<span class="menu-link py-3" @click.stop="toggleDropdown('layouts')">
													<span class="menu-title">Layouts</span>
													<span class="menu-arrow d-lg-none"></span>
												</span>
                <div class="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-rounded-0 py-lg-4 w-lg-225px"
                     v-if="data.headerMenu['layouts']"
                     @click.stop=""
                     v-bind:class="{'show': data.headerMenu['layouts']}"
                     data-popper-placement="bottom-start"
                     ref="layouts">
                  <div data-kt-menu-trigger="{default:'click', lg: 'hover'}" data-kt-menu-placement="right-start"
                       class="menu-item menu-lg-down-accordion">
														<span class="menu-link py-3">
															<span class="menu-icon">
																<!--begin::Svg Icon | path: icons/duotone/Shopping/Box2.svg-->
																<span class="svg-icon svg-icon-2">
																	<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                       width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
																		<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
																			<rect x="0" y="0" width="24" height="24"/>
																			<path
                                        d="M4,9.67471899 L10.880262,13.6470401 C10.9543486,13.689814 11.0320333,13.7207107 11.1111111,13.740321 L11.1111111,21.4444444 L4.49070127,17.526473 C4.18655139,17.3464765 4,17.0193034 4,16.6658832 L4,9.67471899 Z M20,9.56911707 L20,16.6658832 C20,17.0193034 19.8134486,17.3464765 19.5092987,17.526473 L12.8888889,21.4444444 L12.8888889,13.6728275 C12.9050191,13.6647696 12.9210067,13.6561758 12.9368301,13.6470401 L20,9.56911707 Z"
                                        fill="#000000"/>
																			<path
                                        d="M4.21611835,7.74669402 C4.30015839,7.64056877 4.40623188,7.55087574 4.5299008,7.48500698 L11.5299008,3.75665466 C11.8237589,3.60013944 12.1762411,3.60013944 12.4700992,3.75665466 L19.4700992,7.48500698 C19.5654307,7.53578262 19.6503066,7.60071528 19.7226939,7.67641889 L12.0479413,12.1074394 C11.9974761,12.1365754 11.9509488,12.1699127 11.9085461,12.2067543 C11.8661433,12.1699127 11.819616,12.1365754 11.7691509,12.1074394 L4.21611835,7.74669402 Z"
                                        fill="#000000" opacity="0.3"/>
																		</g>
																	</svg>
																</span>
                                <!--end::Svg Icon-->
															</span>
															<span class="menu-title">Toolbars</span>
															<span class="menu-arrow"></span>
														</span>
                    <div
                      class="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                      <div class="menu-item">
                        <a class="menu-link py-3" href="../../demo1/dist/layouts/toolbars/toolbar-1.html">
																	<span class="menu-bullet">
																		<span class="bullet bullet-dot"></span>
																	</span>
                          <span class="menu-title">Toolbar 1</span>
                        </a>
                      </div>
                      <div class="menu-item">
                        <a class="menu-link py-3" href="../../demo1/dist/layouts/toolbars/toolbar-2.html">
																	<span class="menu-bullet">
																		<span class="bullet bullet-dot"></span>
																	</span>
                          <span class="menu-title">Toolbar 2</span>
                        </a>
                      </div>
                      <div class="menu-item">
                        <a class="menu-link py-3" href="../../demo1/dist/layouts/toolbars/toolbar-3.html">
																	<span class="menu-bullet">
																		<span class="bullet bullet-dot"></span>
																	</span>
                          <span class="menu-title">Toolbar 3</span>
                        </a>
                      </div>
                      <div class="menu-item">
                        <a class="menu-link py-3" href="../../demo1/dist/layouts/toolbars/toolbar-4.html">
																	<span class="menu-bullet">
																		<span class="bullet bullet-dot"></span>
																	</span>
                          <span class="menu-title">Toolbar 4</span>
                        </a>
                      </div>
                      <div class="menu-item">
                        <a class="menu-link py-3" href="../../demo1/dist/layouts/toolbars/toolbar-5.html">
																	<span class="menu-bullet">
																		<span class="bullet bullet-dot"></span>
																	</span>
                          <span class="menu-title">Toolbar 5</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div data-kt-menu-trigger="{default:'click', lg: 'hover'}" data-kt-menu-placement="right-start"
                       class="menu-item menu-lg-dropdown">
														<span class="menu-link py-3">
															<span class="menu-icon">
																<!--begin::Svg Icon | path: icons/duotone/Home/Cupboard.svg-->
																<span class="svg-icon svg-icon-2">
																	<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                       width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
																		<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
																			<rect x="0" y="0" width="24" height="24"/>
																			<path
                                        d="M3.5,3 L9.5,3 C10.3284271,3 11,3.67157288 11,4.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L3.5,20 C2.67157288,20 2,19.3284271 2,18.5 L2,4.5 C2,3.67157288 2.67157288,3 3.5,3 Z M9,9 C8.44771525,9 8,9.44771525 8,10 L8,12 C8,12.5522847 8.44771525,13 9,13 C9.55228475,13 10,12.5522847 10,12 L10,10 C10,9.44771525 9.55228475,9 9,9 Z"
                                        fill="#000000" opacity="0.3"/>
																			<path
                                        d="M14.5,3 L20.5,3 C21.3284271,3 22,3.67157288 22,4.5 L22,18.5 C22,19.3284271 21.3284271,20 20.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,4.5 C13,3.67157288 13.6715729,3 14.5,3 Z M20,9 C19.4477153,9 19,9.44771525 19,10 L19,12 C19,12.5522847 19.4477153,13 20,13 C20.5522847,13 21,12.5522847 21,12 L21,10 C21,9.44771525 20.5522847,9 20,9 Z"
                                        fill="#000000"
                                        transform="translate(17.500000, 11.500000) scale(-1, 1) translate(-17.500000, -11.500000)"/>
																		</g>
																	</svg>
																</span>
                                <!--end::Svg Icon-->
															</span>
															<span class="menu-title">Aside</span>
															<span class="menu-arrow"></span>
														</span>
                    <div
                      class="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px">
                      <div class="menu-item">
                        <a class="menu-link py-3" href="../../demo1/dist/layouts/aside/light.html">
																	<span class="menu-bullet">
																		<span class="bullet bullet-dot"></span>
																	</span>
                          <span class="menu-title">Light Skin</span>
                        </a>
                      </div>
                      <div class="menu-item">
                        <a class="menu-link py-3" href="../../demo1/dist/layouts/aside/font-icons.html">
																	<span class="menu-bullet">
																		<span class="bullet bullet-dot"></span>
																	</span>
                          <span class="menu-title">Font Icons</span>
                        </a>
                      </div>
                      <div class="menu-item">
                        <a class="menu-link py-3" href="../../demo1/dist/layouts/aside/minimized.html">
																	<span class="menu-bullet">
																		<span class="bullet bullet-dot"></span>
																	</span>
                          <span class="menu-title">Minimized</span>
                        </a>
                      </div>
                      <div class="menu-item">
                        <a class="menu-link py-3" href="../../demo1/dist/layouts/aside/none.html">
																	<span class="menu-bullet">
																		<span class="bullet bullet-dot"></span>
																	</span>
                          <span class="menu-title">Without Aside</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div data-kt-menu-trigger="click" data-kt-menu-placement="bottom-start"
                   class="menu-item menu-lg-down-accordion me-lg-1">
												<span class="menu-link py-3">
													<span class="menu-title">Resources</span>
													<span class="menu-arrow d-lg-none"></span>
												</span>
                <div class="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-rounded-0 py-lg-4 w-lg-225px">
                  <div class="menu-item">
                    <a class="menu-link py-3" href="../../demo1/dist/documentation/base/utilities.html"
                       title="Check out over 200 in-house components, plugins and ready for use solutions"
                       data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-dismiss="click"
                       data-bs-placement="right">
															<span class="menu-icon">
																<!--begin::Svg Icon | path: icons/duotone/Layout/Layout-arrange.svg-->
																<span class="svg-icon svg-icon-2">
																	<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                       width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
																		<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
																			<rect x="0" y="0" width="24" height="24"/>
																			<path
                                        d="M5.5,4 L9.5,4 C10.3284271,4 11,4.67157288 11,5.5 L11,6.5 C11,7.32842712 10.3284271,8 9.5,8 L5.5,8 C4.67157288,8 4,7.32842712 4,6.5 L4,5.5 C4,4.67157288 4.67157288,4 5.5,4 Z M14.5,16 L18.5,16 C19.3284271,16 20,16.6715729 20,17.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,17.5 C13,16.6715729 13.6715729,16 14.5,16 Z"
                                        fill="#000000"/>
																			<path
                                        d="M5.5,10 L9.5,10 C10.3284271,10 11,10.6715729 11,11.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,11.5 C4,10.6715729 4.67157288,10 5.5,10 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,12.5 C20,13.3284271 19.3284271,14 18.5,14 L14.5,14 C13.6715729,14 13,13.3284271 13,12.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z"
                                        fill="#000000" opacity="0.3"/>
																		</g>
																	</svg>
																</span>
                                <!--end::Svg Icon-->
															</span>
                      <span class="menu-title">Components</span>
                    </a>
                  </div>
                  <div class="menu-item">
                    <a class="menu-link py-3" href="../../demo1/dist/documentation/getting-started.html"
                       title="Check out the complete documentation" data-bs-toggle="tooltip" data-bs-trigger="hover"
                       data-bs-dismiss="click" data-bs-placement="right">
															<span class="menu-icon">
																<!--begin::Svg Icon | path: icons/duotone/Home/Library.svg-->
																<span class="svg-icon svg-icon-2">
																	<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                       width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
																		<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
																			<rect x="0" y="0" width="24" height="24"/>
																			<path
                                        d="M5,3 L6,3 C6.55228475,3 7,3.44771525 7,4 L7,20 C7,20.5522847 6.55228475,21 6,21 L5,21 C4.44771525,21 4,20.5522847 4,20 L4,4 C4,3.44771525 4.44771525,3 5,3 Z M10,3 L11,3 C11.5522847,3 12,3.44771525 12,4 L12,20 C12,20.5522847 11.5522847,21 11,21 L10,21 C9.44771525,21 9,20.5522847 9,20 L9,4 C9,3.44771525 9.44771525,3 10,3 Z"
                                        fill="#000000"/>
																			<rect fill="#000000" opacity="0.3"
                                            transform="translate(17.825568, 11.945519) rotate(-19.000000) translate(-17.825568, -11.945519)"
                                            x="16.3255682" y="2.94551858" width="3" height="18" rx="1"/>
																		</g>
																	</svg>
																</span>
                                <!--end::Svg Icon-->
															</span>
                      <span class="menu-title">Documentation</span>
                    </a>
                  </div>
                  <div class="menu-item">
                    <a class="menu-link py-3" href="https://preview.keenthemes.com/metronic8/demo1/layout-builder.html"
                       title="Build your layout, preview and export HTML for server side integration"
                       data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-dismiss="click"
                       data-bs-placement="right">
															<span class="menu-icon">
																<!--begin::Svg Icon | path: icons/duotone/Interface/Settings-02.svg-->
																<span class="svg-icon svg-icon-2">
																	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                       fill="none">
																		<path opacity="0.25"
                                          d="M2 6.5C2 4.01472 4.01472 2 6.5 2H17.5C19.9853 2 22 4.01472 22 6.5V6.5C22 8.98528 19.9853 11 17.5 11H6.5C4.01472 11 2 8.98528 2 6.5V6.5Z"
                                          fill="#12131A"/>
																		<path
                                      d="M20 6.5C20 7.88071 18.8807 9 17.5 9C16.1193 9 15 7.88071 15 6.5C15 5.11929 16.1193 4 17.5 4C18.8807 4 20 5.11929 20 6.5Z"
                                      fill="#12131A"/>
																		<path opacity="0.25"
                                          d="M2 17.5C2 15.0147 4.01472 13 6.5 13H17.5C19.9853 13 22 15.0147 22 17.5V17.5C22 19.9853 19.9853 22 17.5 22H6.5C4.01472 22 2 19.9853 2 17.5V17.5Z"
                                          fill="#12131A"/>
																		<path
                                      d="M9 17.5C9 18.8807 7.88071 20 6.5 20C5.11929 20 4 18.8807 4 17.5C4 16.1193 5.11929 15 6.5 15C7.88071 15 9 16.1193 9 17.5Z"
                                      fill="#12131A"/>
																	</svg>
																</span>
                                <!--end::Svg Icon-->
															</span>
                      <span class="menu-title">Layout Builder</span>
                    </a>
                  </div>
                  <div class="menu-item">
                    <a class="menu-link py-3" href="../../demo1/dist/documentation/getting-started/changelog.html">
															<span class="menu-icon">
																<!--begin::Svg Icon | path: icons/duotone/Files/File.svg-->
																<span class="svg-icon svg-icon-2">
																	<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                       width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
																		<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
																			<polygon points="0 0 24 0 24 24 0 24"/>
																			<path
                                        d="M5.85714286,2 L13.7364114,2 C14.0910962,2 14.4343066,2.12568431 14.7051108,2.35473959 L19.4686994,6.3839416 C19.8056532,6.66894833 20,7.08787823 20,7.52920201 L20,20.0833333 C20,21.8738751 19.9795521,22 18.1428571,22 L5.85714286,22 C4.02044787,22 4,21.8738751 4,20.0833333 L4,3.91666667 C4,2.12612489 4.02044787,2 5.85714286,2 Z"
                                        fill="#000000" fill-rule="nonzero" opacity="0.3"/>
																			<rect fill="#000000" x="6" y="11" width="9" height="2" rx="1"/>
																			<rect fill="#000000" x="6" y="15" width="5" height="2" rx="1"/>
																		</g>
																	</svg>
																</span>
                                <!--end::Svg Icon-->
															</span>
                      <span class="menu-title">Changelog v8.0.20</span>
                    </a>
                  </div>
                </div>
              </div>
              <div data-kt-menu-trigger="click" data-kt-menu-placement="bottom-start"
                   class="menu-item menu-lg-down-accordion me-lg-1">
												<span class="menu-link py-3">
													<span class="menu-title">Mega Menu</span>
													<span class="menu-arrow d-lg-none"></span>
												</span>
                <div class="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown w-100 w-lg-600px p-5 p-lg-5">
                  <!--begin:Row-->
                  <div class="row" data-kt-menu-dismiss="true">
                    <!--begin:Col-->
                    <div class="col-lg-4 border-left-lg-1">
                      <div class="menu-inline menu-column menu-active-bg">
                        <div class="menu-item">
                          <a href="#" class="menu-link">
																		<span class="menu-bullet">
																			<span class="bullet bullet-dot"></span>
																		</span>
                            <span class="menu-title">Example link</span>
                          </a>
                        </div>
                        <div class="menu-item">
                          <a href="#" class="menu-link">
																		<span class="menu-bullet">
																			<span class="bullet bullet-dot"></span>
																		</span>
                            <span class="menu-title">Example link</span>
                          </a>
                        </div>
                        <div class="menu-item">
                          <a href="#" class="menu-link">
																		<span class="menu-bullet">
																			<span class="bullet bullet-dot"></span>
																		</span>
                            <span class="menu-title">Example link</span>
                          </a>
                        </div>
                        <div class="menu-item">
                          <a href="#" class="menu-link">
																		<span class="menu-bullet">
																			<span class="bullet bullet-dot"></span>
																		</span>
                            <span class="menu-title">Example link</span>
                          </a>
                        </div>
                        <div class="menu-item">
                          <a href="#" class="menu-link">
																		<span class="menu-bullet">
																			<span class="bullet bullet-dot"></span>
																		</span>
                            <span class="menu-title">Example link</span>
                          </a>
                        </div>
                      </div>
                    </div>
                    <!--end:Col-->
                    <!--begin:Col-->
                    <div class="col-lg-4 border-left-lg-1">
                      <div class="menu-inline menu-column menu-active-bg">
                        <div class="menu-item">
                          <a href="#" class="menu-link">
																		<span class="menu-bullet">
																			<span class="bullet bullet-dot"></span>
																		</span>
                            <span class="menu-title">Example link</span>
                          </a>
                        </div>
                        <div class="menu-item">
                          <a href="#" class="menu-link">
																		<span class="menu-bullet">
																			<span class="bullet bullet-dot"></span>
																		</span>
                            <span class="menu-title">Example link</span>
                          </a>
                        </div>
                        <div class="menu-item">
                          <a href="#" class="menu-link">
																		<span class="menu-bullet">
																			<span class="bullet bullet-dot"></span>
																		</span>
                            <span class="menu-title">Example link</span>
                          </a>
                        </div>
                        <div class="menu-item">
                          <a href="#" class="menu-link">
																		<span class="menu-bullet">
																			<span class="bullet bullet-dot"></span>
																		</span>
                            <span class="menu-title">Example link</span>
                          </a>
                        </div>
                        <div class="menu-item">
                          <a href="#" class="menu-link">
																		<span class="menu-bullet">
																			<span class="bullet bullet-dot"></span>
																		</span>
                            <span class="menu-title">Example link</span>
                          </a>
                        </div>
                      </div>
                    </div>
                    <!--end:Col-->
                    <!--begin:Col-->
                    <div class="col-lg-4 border-left-lg-1">
                      <div class="menu-inline menu-column menu-active-bg">
                        <div class="menu-item">
                          <a href="#" class="menu-link">
																		<span class="menu-bullet">
																			<span class="bullet bullet-dot"></span>
																		</span>
                            <span class="menu-title">Example link</span>
                          </a>
                        </div>
                        <div class="menu-item">
                          <a href="#" class="menu-link">
																		<span class="menu-bullet">
																			<span class="bullet bullet-dot"></span>
																		</span>
                            <span class="menu-title">Example link</span>
                          </a>
                        </div>
                        <div class="menu-item">
                          <a href="#" class="menu-link">
																		<span class="menu-bullet">
																			<span class="bullet bullet-dot"></span>
																		</span>
                            <span class="menu-title">Example link</span>
                          </a>
                        </div>
                        <div class="menu-item">
                          <a href="#" class="menu-link">
																		<span class="menu-bullet">
																			<span class="bullet bullet-dot"></span>
																		</span>
                            <span class="menu-title">Example link</span>
                          </a>
                        </div>
                        <div class="menu-item">
                          <a href="#" class="menu-link">
																		<span class="menu-bullet">
																			<span class="bullet bullet-dot"></span>
																		</span>
                            <span class="menu-title">Example link</span>
                          </a>
                        </div>
                      </div>
                    </div>
                    <!--end:Col-->
                  </div>
                  <!--end:Row-->
                </div>
              </div>
            </div>
            <!--end::Menu-->
          </div>
          <!--end::Menu wrapper-->
        </div>
        <!--end::Navbar-->
        <!--begin::Topbar-->
        <TopbarBlock></TopbarBlock>
        <!--end::Topbar-->
      </div>
      <!--end::Wrapper-->
    </div>
    <!--end::Container-->
  </div>
</template>

<script setup>

  import TopbarBlock from './TopbarBlock.vue'
  import { reactive, onMounted } from 'vue'

  const data = reactive({
    headerMenu: {},
    subMenu: {},
  })

  const toggleDropdown = (type) => {
    if (!type) {
      data.headerMenu = {};
      return
    }
    data.headerMenu[type] = !data.headerMenu[type]
  }

  const toggleSubmenu = (type) => {
    if (!type) {
      this.subMenu = [];
    } else {
      if (type !== 'rooms' && type !== 'categories') {
        this.subMenu = []
      }
    }
    if (type === 'categories' && this.subMenu[type]) {
      setTimeout(() => {
        this.subMenu[type] = !this.subMenu[type]
      }, 750)
    } else {
      this.subMenu[type] = !this.subMenu[type]

    }
  }

  onMounted(() => {

  })

  document.addEventListener('click', () => toggleDropdown())

  // document.addEventListener('click', (event) => {
  //   if(event.target.getAttribute('class') !== 'menu-title') {
  //     toggleDropdown()
  //   }
  // });
</script>

<style>
  .header-menu .show.menu-dropdown {
    position: relative;
  }
  .header-menu .show.menu-sub {
    z-index: 105;
    position: absolute;
    inset: 0px auto auto 0px;
    margin: 0px;
    transform: translate(0, 65px);
  }
</style>
