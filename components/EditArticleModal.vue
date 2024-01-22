<template>
  <div class="edit-modal">
    <div class="edit-modal-content">
      <h1>Редактировать статью</h1>
      <form @submit.prevent="handleEdit">
        <div class="form-group">
          <label for="title">Заголовок:</label>
          <input v-model="editedTitle" type="text" id="title" required />
        </div>
        <div class="form-group">
          <label for="content">Содержимое:</label>
          <div class="textarea-container">
            <textarea
              class="textarea"
              v-model="editedContent"
              id="content"
              required></textarea>
          </div>
        </div>
        <div>
          <button>Редактировать</button>
          <button @click="closeModal">Закрыть</button>
        </div>
      </form>
    </div>
    <AddArticleResponse :title="alertTitle" v-if="success || error" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const { isAdmin } = useAuth();

const { $csrfFetch } = useNuxtApp();

const props = defineProps({
  article: Object,
  isModal: Boolean,
});
const emit = defineEmits([
  'editModalClose',
  'fetchData',
  'editError',
  'editSuccess',
]);
const editedTitle = ref('');
const editedContent = ref('');
const token = localStorage.getItem('token');
const alertTitle = ref('');
const success = ref(false);
const error = ref(false);

onMounted(() => {
  if (props.article) {
    editedTitle.value = props.article.title;
    editedContent.value = props.article.content;
  }
});

const handleEdit = async () => {
  try {
    await $csrfFetch('/api/blog/update-article', {
      method: 'POST',
      body: {
        id: props.article.id,
        isAdmin: isAdmin,
        title: editedTitle.value,
        content: editedContent.value,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    alertTitle.value = 'Статья отредактирована';
    handleSuccess();
  } catch (error) {
    alertTitle.value = 'Ошибка при редактировании статьи';
    console.error('Ошибка при редактировании статьи:', error);
    emit('editError', alertTitle.value);
  }
  closeModal();
};

const handleSuccess = () => {
  emit('editSuccess', alertTitle.value);
  emit('fetchData');
};
const closeModal = () => {
  emit('editModalClose');
};
</script>

<style scoped>
.edit-modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.edit-modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  border-radius: 8px;
  width: 80%;
}

.edit-modal-content > h1 {
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
  margin-right: 15px;
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
</style>
