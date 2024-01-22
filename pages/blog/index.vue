<template>
  <div class="container">
    <h1 class="blog-title">Блог</h1>
    <div class="blog">
      <loader v-show="isLoading" />
      <div v-for="article in data" :key="article.id">
        <NuxtLink :to="getPath(article.id)">
          <img src="../../assets/images/about_bg.png" alt="Article Image" />
          <h2>{{ article.title }}</h2>
          <p>{{ formatDate(article.created_at) }}</p>
        </NuxtLink>
      </div>
    </div>
    <div v-show="!isLoading" class="pagination">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="pagination-btn"
      >
        &lt;
      </button>
      <span class="pagination-span"> {{ currentPage }}</span>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="pagination-btn"
      >
        &gt;
      </button>
    </div>
  </div>
</template>

<script setup>
import { format } from 'date-fns';

const isLoading = ref(true);
const limit = 10;
const currentPage = ref(1);
const data = ref([]);
const totalPages = ref(1);

const formatDate = (dateString) => {
  if (!dateString) return '';
  const dateObject = new Date(dateString);
  return format(dateObject, 'dd.MM.yyyy');
};

const getPath = (id) => {
  return `/blog/${id}`;
};

const fetchData = async () => {
  isLoading.value = true;
  try {
    const res = await useAsyncData('data', () =>
      $fetch(`/api/blog?page=${currentPage.value}&limit=${limit}`)
    );
    data.value = res.data.value.rows;
    totalPages.value = Math.ceil(res.data.value.totalCount / limit);
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

const nextPage = () => {
  currentPage.value++;
  fetchData();
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchData();
  }
};



 fetchData()



</script>

<style>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
}

.pagination-btn {
  padding: 8px 16px;
  margin: 0 4px;
  border: 1px solid #333;
  background-color: #fff;
  color: #333;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s;
}

.pagination-btn:hover {
  background-color: #333;
  color: #fff;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-span {
  margin: 0 8px;
}
</style>
