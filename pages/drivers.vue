<template>
  <section class="hero" id="driver_hero">
    <div class="container">
      <div class="hero_block">
        <div class="hero_left position-relative">
          <h4 class="hero_left_title">Работайте с лучшими парками страны</h4>
          <div class="driver_phone">
            <img
              class="d-none d-md-block"
              src="../assets/images/driver_phone.png"
              alt="" />
            <img
              class="d-md-none"
              src="../assets/images/driver_hero_mobile.png"
              alt="" />
          </div>
          <div class="driver_wrapper">
            <div class="driver_hero_item">
              <div class="driver_icon">
                <img src="../assets/images/driver_hero_icon.svg" alt="" />
              </div>
              <p class="driver_text">
                Воспользуйтесь автоматической регистрацией в нашем приложении
              </p>
            </div>
          </div>
        </div>
        <div class="hero_right">
          <div class="partner_img">
            <img src="../assets/images/driver_right_img.png" alt="" />
          </div>
        </div>
      </div>
      <div class="driver_hero_bottom">
        <p class="driver_hero_desc">
          Зарегистрируйтесь в нашем приложении, и менеджер таксопарка-партнера
          свяжется с вами
        </p>
        <div class="driver_apps">
          <!--  -->
          <a
            href="https://play.google.com/store/apps/details?id=ru.paytaxi.paytaxi"
            class="extra_item extra_item-driver">
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
            class="extra_item extra_item-driver">
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
            class="extra_item extra_item-driver">
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
            class="extra_item extra_item-driver">
            <div class="extra_img">
              <img src="../assets/images/ru_store_main.svg" alt="" />
              <div class="active_img">
                <img src="../assets/images/ru_store_hover.svg" alt="" />
              </div>
            </div>
            <p class="extra_title">Ru Store</p>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- advantages section -->
  <section class="advantages">
    <div class="container">
      <h3 class="advantages_title">
        Автоматическая регистрация водителей доступна только надежным
        паркам-партнерам, а это значит
      </h3>

      <div
        class="swiper advantages_block advantages_swiper d-sm-none"
        id="mobile_advan_swiper">
        <div class="swiper-wrapper">
          <Swiper
            class="swiper-cards"
            :width="350"
            :modules="[SwiperAutoplay, SwiperEffectCards]"
            :slides-per-view="1"
            :loop="true"
            :effect="'cards'"
            :autoplay="{
              delay: 2000,
              disableOnInteraction: true,
            }">
            <SwiperSlide>
              <div class="swiper-slide">
                <!--  -->
                <div class="advantage_item advantage_item1">
                  <div class="advan_img">
                    <img src="../assets/images/advantages1.png" alt="" />
                  </div>
                  <p class="advan_name">Моментальные выплаты</p>
                  <p class="advan_desc">
                    Моментальные выплаты реальны и всегда доступны для вас 24/7
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div class="swiper-slide">
                <!--  -->
                <div class="advantage_item advantage_item2">
                  <div class="advan_img">
                    <img src="../assets/images/advantages2.png" alt="" />
                  </div>
                  <p class="advan_name">
                    Прозрачные <br />
                    комиссии
                  </p>
                  <p class="advan_desc">Честные и прозрачные комиссии</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide
              ><div class="swiper-slide">
                <!--  -->
                <div class="advantage_item advantage_item3">
                  <div class="advan_img">
                    <img src="../assets/images/advantages3.png" alt="" />
                  </div>
                  <p class="advan_name">Личный менеджер</p>
                  <p class="advan_desc">
                    У вас есть менеджер парка, который поможет вам решать
                    вопросы с агрегатором
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide
              ><div class="swiper-slide">
                <!--  -->
                <div class="advantage_item advantage_item4">
                  <div class="advan_img">
                    <img src="../assets/images/advantages4.png" alt="" />
                  </div>
                  <p class="advan_name">Делегируете «текучку»</p>
                  <p class="advan_desc">
                    Вы только работаете и зарабатываете, «текучку» парки берут
                    на себя
                  </p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div class="advantages_block d-none d-sm-flex">
        <!--  -->
        <div class="advantage_item advantage_item1">
          <div class="advan_img">
            <img src="../assets/images/advantages1.png" alt="" />
          </div>
          <p class="advan_name">Моментальные выплаты</p>
          <p class="advan_desc">
            Моментальные выплаты реальны и всегда доступны для вас 24/7
          </p>
        </div>
        <!--  -->
        <div class="advantage_item advantage_item2">
          <div class="advan_img">
            <img src="../assets/images/advantages2.png" alt="" />
          </div>
          <p class="advan_name">Прозрачные комиссии</p>
          <p class="advan_desc">Честные и прозрачные комиссии</p>
        </div>
        <!--  -->
        <div class="advantage_item advantage_item3">
          <div class="advan_img">
            <img src="../assets/images/advantages3.png" alt="" />
          </div>
          <p class="advan_name">Личный менеджер</p>
          <p class="advan_desc">
            У вас есть менеджер парка, который поможет вам решать вопросы с
            агрегатором
          </p>
        </div>
        <!--  -->
        <div class="advantage_item advantage_item4">
          <div class="advan_img">
            <img src="../assets/images/advantages4.png" alt="" />
          </div>
          <p class="advan_name">Делегируете «текучку»</p>
          <p class="advan_desc">
            Вы только работаете и зарабатываете, «текучку» парки берут на себя
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
const metaTitle = "Моментальные выплаты водителям такси с PayTax";
const metaDescription =
  "Моментальные выплаты реальны и всегда доступны для вас 24/7. Честные и прозрачные комиссии. У вас есть менеджер парка, который поможет вам решать вопросы с агрегатором. Вы только работаете и зарабатываете, «текучку» парки берут на себя.";

useHead({
  meta: [
    {
      name: "title",
      content: metaTitle,
    },
    {
      name: "description",
      content: metaDescription,
    },
  ],
});
</script>
