<template>
  <div class="container">
    <div class="add-article">
      <h1>Добавить новую статью</h1>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="title">Заголовок:</label>
          <input v-model="title" type="text" id="title" required />
        </div>
        <div class="form-group">
          <label for="content">Содержимое:</label>
          <div class="textarea-container">
            <textarea
              class="textarea"
              v-model="content"
              id="content"
              required></textarea>
          </div>
        </div>
        <button type="submit">Добавить статью</button>
      </form>
      <div class="delete-block__wrapper">
        <div v-for="article in data" :key="article.id" class="delete-block">
          <h2>{{ article.title }}</h2>
          <div class="delete-block__buttons">
            <button
              class="delete-btn"
              @click="handleDelete(article.id)"
              type="submit">
              х
            </button>

            <button class="edit-btn" @click="openModal(article)">
              <Icon name="tdesign:edit" color="white" />
            </button>
          </div>
        </div>
      </div>
      <div v-show="!isLoading" class="pagination">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="pagination-btn">
          &lt;
        </button>
        <span class="pagination-span"> {{ currentPage }}</span>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="pagination-btn">
          &gt;
        </button>
      </div>
    </div>
  </div>
  <AddArticleResponse :title="alertTitle" v-if="success || error" />

  <EditArticleModal
    v-if="isEditModal"
    :isModal="isEditModal"
    @editModalClose="isEditModal = false"
    @fetchData="fetchData"
    @editError="setModalTitleError"
    @editSuccess="setModalTitleSuccess"
    :article="selectedArticle" />

  <loader v-show="isLoading" />
</template>

<script setup>
import { useAuth } from '~/stores/auth';

definePageMeta({
  middleware: ['admin-guard'],
});
const { $csrfFetch } = useNuxtApp();
const { isAdmin } = useAuth();
const title = ref('');
const alertTitle = ref('');
const content = ref('');
const success = ref(false);
const error = ref(false);
const isEditModal = ref(false);
const isLoading = ref(true);
const selectedArticle = ref(null);
const limit = 10;
const currentPage = ref(1);
const data = ref([]);
const totalPages = ref(1);
const token = localStorage.getItem('token');

const setModalTitleSuccess = (v) => {
  alertTitle.value = v;
  handleSuccess();
};

const setModalTitleError = (v) => {
  alertTitle.value = v;
  handleError();
};

const handleError = () => {
  error.value = true;
  setTimeout(() => {
    error.value = false;
    fetchData();
  }, 3000);
};

const handleSuccess = (v) => {
  success.value = true;
  setTimeout(() => {
    success.value = false;
    fetchData();
  }, 3000);
};

const handleSubmit = async () => {
  try {
    await $csrfFetch('/api/blog/post-article', {
      method: 'POST',
      body: {
        title: title.value,
        content: content.value,
        isAdmin: isAdmin,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    alertTitle.value = 'Статья добавлена';
    handleSuccess();
  } catch (error) {
    alertTitle.value = 'Ошибка при добавлении статьи';
    console.error('Ошибка при добавлении статьи:', error);
    handleError();
  } finally {
    title.value = '';
    content.value = '';
  }
};

const handleDelete = async (id) => {
  try {
    await $csrfFetch('/api/blog/delete-article', {
      method: 'DELETE',
      body: {
        id: id,
        isAdmin: isAdmin,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    alertTitle.value = 'Статья удалена';
    handleSuccess();
    title.value = '';
    content.value = '';
  } catch (error) {
    alertTitle.value = 'Ошибка при удалении статьи';
    console.error('Ошибка при удалении статьи:', error);
    handleError();
  }
};

const openModal = (article) => {
  selectedArticle.value = article;
  isEditModal.value = true;
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

fetchData();
</script>

<style lang="scss" scoped>
.add-article {
  margin: 20px auto;
  max-width: 900px;
}
.add-article > h1 {
  padding: 20px 0;
  font-size: 1.5rem;
}
.form-group {
  margin-bottom: 15px;
}
label {
  display: block;
  margin-bottom: 5px;
}
input[type='text'],
textarea {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
button {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}

.textarea {
  overflow: hidden;

  height: auto;
  min-height: 120px;
  max-height: 100%;
  resize: none;
}
.delete-block {
  border-radius: 10px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  gap: 8px;
  input {
    max-width: 120px;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  &__wrapper {
    margin-top: 40px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  &__buttons {
    display: flex;
    gap: 8px;
  }
}
.delete-btn {
  background-color: rgb(255, 84, 84);
  &:hover {
    background-color: #ec1447 !important;
  }
}
</style>
