<template>
  <div class="container">
    <div class="call_form-login">
      <input v-model="userName" placeholder="Имя" />
      <input v-model="password" placeholder="Пароль" />
      <button @click="login" class="call_send">войти</button>
      <span class="login-error" v-show="_error">
        {{ _error }}
      </span>
      <!-- <button @click="registerUser" class="call_send">зарегистрировать</button> -->
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useAuth } from '~/stores/auth';
const { $csrfFetch } = useNuxtApp();
const userName = ref('');
const password = ref('');
const _error = ref('');
const router = useRouter();
const { setAuth, setAdmin } = useAuth();

const login = async () => {
  try {
    const body = {
      userName: userName.value,
      password: password.value,
    };
    const res = await $csrfFetch('/api/auth', {
      method: 'POST',
      body,
    });
    if (res.authenticated && res.redirect) {
      localStorage.setItem('token', res.token);
      setAdmin(res.is_admin);
      setAuth(true);
      router.push(res.redirect);
      userName.value = '';
      password.value = '';
      _error.value = '';
    }
  } catch (error) {
    _error.value = error.response._data.message;
  }
};

// const registerUser = async () => {
// const token = localStorage.getItem('token');
//   try {
//     const body = {
//       userName: userName.value,
//       password: password.value,
//     };
//     await $csrfFetch('/api/blog/insert-user', {
//       method: 'POST',
//       body,
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//     });

//   } catch (error) {
//     console.error(error);
//   }
// };
</script>

<style lang="scss">
.call_form-login {
  margin: 30px auto;
}
.login-error {
  color: red;
  text-align: center;
  margin-top: 15px;
}
</style>
