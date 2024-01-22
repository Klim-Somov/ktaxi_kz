<template>
  <div class="modal-overlay">
    <div style="width: 100%">
      <div
        style="
           {
            background: #F19900;
          }
        "
        class=" zayavka_modal-s">
        <a @click="getBack" class="zayavka_modal-s-getback">
          <img src="../assets/images/back_arrow.svg" alt="" />
        </a>

        <div class="modal_person">
          <img src="../assets/images/zayavka_person.svg" alt="" />
        </div>
        <p class="zayavka_title">Спасибо за заявку!</p>
        <p class="zayavka_desc">Мы свяжемся с вами в ближайшее время!</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["getBack"]);
const getBack = () => {
  emit("getBack");
};
</script>

<style lang="scss">
.zayavka_modal-s-getback {
  img {
    height: 30px;
    cursor: pointer;
  }
}
</style>
