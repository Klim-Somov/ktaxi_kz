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
  
        <div class="modal_person">
          <img src="../assets/images/zayavka_person.svg" alt="" />
        </div>
        <p class="zayavka_title">{{props.title}}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
    title: String,
});

</script>

<style lang="scss">
.zayavka_modal-s-getback {
  img {
    height: 30px;
    cursor: pointer;
  }
}
</style>
