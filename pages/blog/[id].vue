<template>
  <div class="container">
    <div class="article-block-page">
      <Loader v-show="isLoading" />
      <h1 class="blog-title">{{ article?.title }}</h1>
      <div v-show="article" class="article-block-text">
        <p v-html="article?.content"></p>
      </div>
    </div>
  </div>
</template>
<script setup>
const route = useRoute();
const article = ref(null);
const isLoading = ref(true);

const fetchArticle = async () => {
  const articleId = route.params.id;
  try {
    isLoading.value = true;
    const { data } = await useAsyncData('article', () =>
      $fetch(`/api/blog/${articleId}`)
    );
    article.value = data.value;
  } catch (error) {
    console.error('Ошибка получения статьи', error);
  } finally {
    isLoading.value = false;
  }
};
fetchArticle();
</script>
