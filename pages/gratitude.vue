<template>
  <div>
    <Success @getBack="getBack" />
  </div>
</template>

<script setup>
const router = useRouter();

const getBack = () => {
  router.back();
};
</script>
