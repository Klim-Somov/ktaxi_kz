<script setup lang="ts">
const swiper = useSwiper();
</script>

<template>
  <div class="partner_arrows">
    <div @click="swiper.slidePrev()" class="partner_prev">
      <img src="../assets/images/partner_prev.svg" alt="" />
    </div>
    <div @click="swiper.slideNext()" class="partner_next">
      <img src="../assets/images/partner_next.svg" alt="" />
    </div>
  </div>
</template>
