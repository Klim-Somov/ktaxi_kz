<template>
  <div>
    <!-- header -->

    <header class="header" id="header">
      <div class="container">
        <div class="header_block">
          <div class="header_left">
            <div class="header_logo">
              <NuxtLink to="/">
                <img src="../assets/images/logo.svg" alt="" />
              </NuxtLink>
            </div>
            <div :class="{ 'modal-overlay': isMenu }"></div>
            <ul :class="{ active: isMenu }" class="header_menus">
              <!-- <li>
                <NuxtLink
                  :class="{ menuLinkActive: route.name === 'partners' }"
                  @click="isMenu = false"
                  to="/partners"
                  >Партнерам</NuxtLink
                >
              </li> -->
              <li>
                <NuxtLink
                  :class="{ menuLinkActive: route.name === 'drivers' }"
                  @click="isMenu = false"
                  to="/drivers"
                  >Водителям</NuxtLink
                >
              </li>
              <!-- <li>
                <NuxtLink
                  :class="{ menuLinkActive: route.name === 'tariffs' }"
                  @click="isMenu = false"
                  to="/tariffs"
                  >Тарифы</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  :class="{ menuLinkActive: route.name === 'crm' }"
                  @click="isMenu = false"
                  to="/crm"
                  >CRM PayTaxi</NuxtLink
                >
              </li> -->
              <li>
                <NuxtLink
                  :class="{ menuLinkActive: route.name === 'blog' }"
                  @click="isMenu = false"
                  to="/blog"
                  >Блог</NuxtLink
                >
              </li>

              <div class="header_phone header_phone-mob d-lg-none">
                <div @click="menuToggle" class="closer">
                  <img src="../assets/images/close.svg" alt="" />
                </div>
                <div class="connection-icons">
                  <a
                    href="https://t.me/+79128170001"
                    class="connection-item-icon connection-item-icon__telegram">
                    <Icon name="fa-brands:telegram" color="white" />
                  </a>
                  <a
                    href="https://api.whatsapp.com/send?phone=79128170001"
                    class="connection-item-icon connection-item-icon__wa">
                    <Icon name="fa-brands:whatsapp" color="white" />
                  </a>
                </div>
              </div>
              <div class="header_phone d-lg-none">
                <a href="mailto:info@paytaxi.ru">info@paytaxi.ru</a>
              </div>

              <li class="d-lg-none">
                <div class="driver_apps extra_apps-menu">
                  <!--  -->
                  <a
                    href="https://play.google.com/store/apps/details?id=ru.paytaxi.paytaxi"
                    class="extra_item-menu">
                    <div class="extra_img">
                      <img src="../assets/images/google_play.svg" alt="" />
                    </div>
                    <p class="extra_title">Google play</p>
                  </a>
                  <!--  -->
                  <a
                    href="https://apps.apple.com/ru/app/paytaxi/id1482597515"
                    class="extra_item-menu">
                    <div class="extra_img">
                      <img src="../assets/images/app_store.svg" alt="" />
                    </div>
                    <p class="extra_title">App store</p>
                  </a>
                  <!--  -->
                  <a
                    href="https://appgallery.huawei.com/#/app/C103349619"
                    class="extra_item-menu">
                    <div class="extra_img">
                      <img src="../assets/images/app_gallery.svg" alt="" />
                    </div>
                    <p class="extra_title">App Gallery</p>
                  </a>
                  <!--  -->
                  <a
                    href="https://apps.rustore.ru/app/ru.paytaxi.paytaxi"
                    class="extra_item">
                    <div class="extra_img">
                      <img src="../assets/images/ru_store_main.svg" alt="" />
                      <div class="active_img">
                        <img src="../assets/images/ru_store_hover.svg" alt="" />
                      </div>
                    </div>
                    <p class="extra_title">Ru Store</p>
                  </a>
                </div>
              </li>
            </ul>
          </div>
          <div class="header_phone d-none d-lg-block">
            <div class="connection-icons">
              <a
                href="https://t.me/+79128170001"
                class="connection-item-icon connection-item-icon__telegram">
                <Icon name="fa-brands:telegram" color="white" />
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=79128170001"
                class="connection-item-icon connection-item-icon__wa">
                <Icon name="fa-brands:whatsapp" color="white" />
              </a>
            </div>
          </div>
          <!-- hamburger_mobile -->
          <div @click="menuToggle" class="hamurger_menu d-lg-none">
            <a>
              <img src="../assets/images/mobile_hamburger.svg" alt="" />
            </a>
          </div>
        </div>
      </div>
    </header>
    <slot />

    <footer>
      <div class="container">
        <div class="footer_call">
          <div class="call_left">
            <p class="call_mini_title">Остались вопросы?</p>
            <h4 class="call_title">Оставьте заявку на обратный звонок</h4>
            <p class="call_subtitle">
              И наш менеджер свяжется с вами в течение часа
            </p>
          </div>
          <div class="call_right">
            <div class="call_form">
              <div class="_error" v-if="v$.name.$error">
                {{ v$.name.$errors[0].$message }}
              </div>

              <input
                :class="{
                  _error_border: v$.name.$error,
                  '_succes-border ': !v$.name.$invalid,
                }"
                @change="v$.name.$touch"
                v-model="formData.name"
                placeholder="Имя" />

              <div class="_error" v-if="v$.phone.$error">
                {{ v$.phone.$errors[0].$message }}
              </div>
              <input
                :class="{
                  _error_border: v$.phone.$error,
                  '_succes-border ': !v$.phone.$invalid,
                }"
                v-maska
                data-maska="+7 (9##) ### ## ##"
                v-model="formData.phone"
                placeholder="Телефон" />
              <button @click="onSubmit" class="call_send">
                Отправить заявку
              </button>
            </div>
            <Error v-if="error" />
          </div>
        </div>
        <div class="footer_block d-none d-sm-flex">
          <div class="footer_left">
            <div class="left_block">
              <div class="left_block_img">
                <img src="../assets/images/footer_logo.svg" alt="" />
              </div>
              <p class="left_block_year">© Paytaxi.ru 2023 г.</p>
              <p class="left_cards">
                ООО «Доступный город» <br />
                ИНН 6686079161 <br />
                ОГРН 1169658044742
              </p>
            </div>

            <div class="right_block">
              <ul class="right_block_list">
                <li>
                  <a href="#tariffs">Стоимость</a>
                </li>
                <li>
                  <a href="#learn">Обучение бизнесу</a>
                </li>
                <li>
                  <a href="#howtoget">Как получать водителей</a>
                </li>
              </ul>
              <img src="../assets/images/visa.png" alt="" />
              <img src="../assets/images/mastercard.png" alt="" />
              <p class="footer_rules">
                <NuxtLink class="policy" to="/agreement"
                  >Пользовательское соглашение
                </NuxtLink>
                <br />
                <NuxtLink class="policy" to="/policy"
                  >Политика конфиденциальности</NuxtLink
                >
              </p>
            </div>
          </div>
          <div class="footer_right">
            <a href="tel:+78006003043" class="footer_tel">+7 (800) 600 30-43</a>
            <a href="mailto:info@paytaxi.ru" class="footer_mail"
              >info@paytaxi.ru</a
            >
            <div class="footer_right_extra">
              <!--  -->
              <a
                href="https://play.google.com/store/apps/details?id=ru.paytaxi.paytaxi"
                class="extra_item">
                <div class="extra_img">
                  <img src="../assets/images/google_play.svg" alt="" />
                  <div class="active_img">
                    <img src="../assets/images/active_google.svg" alt="" />
                  </div>
                </div>
                <p class="extra_title">Google play</p>
              </a>
              <!--  -->
              <a
                href=" https://apps.apple.com/ru/app/paytaxi/id1482597515"
                class="extra_item">
                <div class="extra_img">
                  <img src="../assets/images/app_store.svg" alt="" />
                  <div class="active_img">
                    <img src="../assets/images/active_store.svg" alt="" />
                  </div>
                </div>
                <p class="extra_title">App store</p>
              </a>
              <!--  -->
              <a
                href="https://appgallery.huawei.com/#/app/C103349619"
                class="extra_item">
                <div class="extra_img">
                  <img src="../assets/images/app_gallery.svg" alt="" />
                  <div class="active_img">
                    <img src="../assets/images/active_app.svg" alt="" />
                  </div>
                </div>
                <p class="extra_title">App Gallery</p>
              </a>
              <!--  -->
              <a
                href="https://apps.rustore.ru/app/ru.paytaxi.paytaxi"
                class="extra_item">
                <div class="extra_img">
                  <img src="../assets/images/ru_store_main.svg" alt="" />
                  <div class="active_img">
                    <img src="../assets/images/ru_store_hover.svg" alt="" />
                  </div>
                </div>
                <p class="extra_title">Ru Store</p>
              </a>
              <div
                style="margin-top: 20px; margin-left: 10px; color: #a8a8a8"
                class="activities">
                <h4 style="text-align: center; margin-bottom: 20px">
                  Информация о видах деятельности
                </h4>
                <ul>
                  <li>
                    ООО "Доступный город" ИНН 6686079161, ОГРН 1169658044742
                  </li>
                  <li>
                    Основной ОКВЭД: 62.01 Разработка компьютерного программного
                    обеспечения
                  </li>
                  <li>Номер в реестре аккредитованных организаций: 21288</li>
                  <li>
                    Номер решения о государственной аккредитации:
                    АО-20220312-3799008502-3
                  </li>
                  <li>
                    Дата решения о государственной аккредитации: 14.03.2022
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="footer_block d-flex d-sm-none">
          <div class="footer_left">
            <div class="left_block">
              <div class="left_block_img">
                <img src="../assets/images/footer_logo.svg" alt="" />
              </div>
              <div class="footer_right">
                <a href="tel:+78006003043" class="footer_tel"
                  >+7 (800) 600 30-43</a
                >
                <a href="mailto:info@paytaxi.ru" class="footer_mail"
                  >info@paytaxi.ru</a
                >
              </div>
            </div>
            <div class="right_block">
              <ul class="right_block_list">
                <li>
                  <NuxtLink to="/tariffs">Стоимость</NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/partners">Обучение бизнесу</NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/partners">Как получать водителей</NuxtLink>
                </li>
              </ul>
              <img src="../assets/images/visa.png" alt="" />
              <img src="../assets/images/mastercard.png" alt="" />
            </div>
          </div>
          <div class="footer_right">
            <div class="footer_right_extra">
              <!--  -->
              <a
                href="https://play.google.com/store/apps/details?id=ru.paytaxi.paytaxi"
                class="extra_item">
                <div class="extra_img">
                  <img src="../assets/images/google_play.svg" alt="" />
                  <div class="active_img">
                    <img src="../assets/images/active_google.svg" alt="" />
                  </div>
                </div>
                <p class="extra_title">Google play</p>
              </a>
              <!--  -->

              <a
                href=" https://apps.apple.com/ru/app/paytaxi/id1482597515"
                class="extra_item">
                <div class="extra_img">
                  <img src="../assets/images/app_store.svg" alt="" />
                  <div class="active_img">
                    <img src="../assets/images/active_store.svg" alt="" />
                  </div>
                </div>
                <p class="extra_title">App store</p>
              </a>
              <!--  -->
              <a
                href="https://appgallery.huawei.com/#/app/C103349619"
                class="extra_item">
                <div class="extra_img">
                  <img src="../assets/images/app_gallery.svg" alt="" />
                  <div class="active_img">
                    <img src="../assets/images/active_app.svg" alt="" />
                  </div>
                </div>
                <p class="extra_title">App Gallery</p>
              </a>
              <a
                href="https://apps.rustore.ru/app/ru.paytaxi.paytaxi"
                class="extra_item">
                <div class="extra_img">
                  <img src="../assets/images/ru_store_main.svg" alt="" />
                  <div class="active_img">
                    <img src="../assets/images/ru_store_hover.svg" alt="" />
                  </div>
                </div>
                <p class="extra_title">Ru Store</p>
              </a>
            </div>
            <div class="right_block">
              <p class="footer_rules">
                <NuxtLink class="policy" to="/agreement"
                  >Пользовательское соглашение
                </NuxtLink>
                <br />
                <NuxtLink class="policy" to="/policy"
                  >Политика конфиденциальности</NuxtLink
                >
              </p>
            </div>
          </div>
          <div class="left_block">
            <p class="left_block_year">© Paytaxi.ru 2023 г.</p>

            <p class="left_cards">
              ООО «Доступный город» <br />
              ИНН 6686079161 <br />
              ОГРН 1169658044742
            </p>
          </div>
          <div style="margin-top: 20px; color: #a8a8a8" class="activities">
            <h4 style="text-align: center; margin-bottom: 20px">
              Информация о видах деятельности
            </h4>
            <ul>
              <li>ООО "Доступный город" ИНН 6686079161, ОГРН 1169658044742</li>
              <li>
                Основной ОКВЭД: 62.01 Разработка компьютерного программного
                обеспечения
              </li>
              <li>Номер в реестре аккредитованных организаций: 21288</li>
              <li>
                Номер решения о государственной аккредитации:
                АО-20220312-3799008502-3
              </li>
              <li>Дата решения о государственной аккредитации: 14.03.2022</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
    <div>
      <img
        src="https://mc.yandex.ru/watch/94896726"
        style="position: absolute; left: -9999px"
        alt="" />
    </div>
  </div>
</template>
<script setup>
import { required, helpers, minLength } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';

const { $csrfFetch } = useNuxtApp();
const formData = reactive({
  name: '',
  phone: '',
  email: '',
});

const rules = computed(() => {
  return {
    name: {
      required: helpers.withMessage('это поле обязательное', required),
      minLength: helpers.withMessage('минимум 3 символа', minLength(3)),
    },
    phone: {
      required: helpers.withMessage('это поле обязательное', required),
      minLength: helpers.withMessage(
        'введите номер в формате +7 999 999 99 99',
        minLength(18)
      ),
    },
  };
});
const router = useRouter();
const route = useRoute();
const isMenu = ref(false);
const error = ref(false);

const handleModalError = () => {
  error.value = true;
  setTimeout(() => {
    error.value = false;
  }, 3500);
};

const handleModalSubmit = () => {
  router.push({ path: '/gratitude' });
  isModalOpen.value = false;
};

const v$ = useVuelidate(rules, formData);

const onSubmit = () => {
  v$.value.$validate();
  if (formData.phone.length >= 18 && formData.name.length >= 3) {
    $csrfFetch('/api/contact', {
      method: 'POST',
      body: {
        from: formData.name,
        phone: formData.phone,
        email: '',
        button: 'Отправить заявку (подвал)',
      },
    })
      .then(() => {
        handleModalSubmit();
      })
      .catch((e) => {
        handleModalError();
        console.log(e);
      });
    formData.name = '';
    formData.phone = '';
  }
  v$.value.$reset();
};

const menuToggle = () => {
  isMenu.value = !isMenu.value;
};
</script>
<style></style>
