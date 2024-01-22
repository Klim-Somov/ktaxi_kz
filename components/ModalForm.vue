<template>
  <div v-if="isModalOpen" class="modal-overlay">
    <div v-if="isModalOpen" class="modal-overlay" @click="$emit('close')"></div>

    <div id="clickbox" class="modal-form">
      <div class="modal-content">
        <div @click="$emit('close')" class="closer">
          <img src="../assets/images/close.svg" alt="" />
        </div>
        <h2>{{ title }}</h2>
        <p @focusout="clicOut">{{ text }}</p>
        <div class="_error" v-if="v$.name.$error">
          {{ v$.name.$errors[0].$message }}
        </div>

        <input
          :class="{
            _error_border: v$.name.$error,
            '_succes-border ': !v$.name.$invalid,
          }"
          @change="v$.name.$touch"
          v-model="formData.name"
          placeholder="Имя" />

        <div class="_error" v-if="v$.phone.$error">
          {{ v$.phone.$errors[0].$message }}
        </div>
        <input
          :class="{
            _error_border: v$.phone.$error,
            '_succes-border ': !v$.phone.$invalid,
          }"
          v-maska
          data-maska="+7 (9##) ### ## ##"
          v-model="formData.phone"
          placeholder="Телефон" />

        <div class="_error" v-if="v$.email.$error">
          {{ v$.email.$errors[0].$message }}
        </div>
        <input
          :class="{
            _error_border: v$.email.$error,
            '_succes-border ': !v$.email.$invalid,
          }"
          @change="v$.email.$touch"
          v-if="isEmail"
          v-model="formData.email"
          placeholder="Почта" />

        <a @click="submit">Отправить заявку</a>
        <span
          >Нажимая на кнопку, вы соглашаетесь с «политикой
          конфиденциальности»</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { required, helpers, minLength, email } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { useYandexMetrika } from "#imports";

const props = defineProps([
  "title",
  "text",
  "isEmail",
  "isModalOpen",
  "btnInfo",
]);

const emit = defineEmits(["submit", "error", "close"]);

const { hit } = useYandexMetrika();

const { $csrfFetch } = useNuxtApp();

const formData = reactive({
  name: "",
  phone: "",
  email: "",
});

const rules = computed(() => {
  return {
    name: {
      required: helpers.withMessage("это поле обязательное", required),
      minLength: helpers.withMessage("минимум 3 символа", minLength(3)),
    },
    email: {
      email: helpers.withMessage("e-mail некорректный", email),
      minLength: helpers.withMessage("минимум 3 символа", minLength(3)),
    },
    phone: {
      required: helpers.withMessage("это поле обязательное", required),
      minLength: helpers.withMessage(
        "введите номер в формате +7 999 999 99 99",
        minLength(18)
      ),
    },
  };
});
const v$ = useVuelidate(rules, formData);

const submit = () => {
  v$.value.$validate();

  if (!v$.value.$invalid) {
    $csrfFetch("/api/contact", {
      method: "POST",
      body: {
        from: formData.name,
        phone: formData.phone,
        email: formData.email,
        button: props.btnInfo,
      },
    })
      .then(() => {
        emit("submit");
        hit("/gratitude");
      })
      .catch((e) => {
        emit("error");
        console.log(e);
      });
    formData.name = "";
    formData.phone = "";
    formData.email = "";
    v$.value.$reset();
  }
};
</script>

<style lang="scss">
.modal-overlay {
  z-index: 11;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(7px);

  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-form {
  z-index: 100;
  margin: 0 20px;
  max-width: 800px;
  border-radius: 50px;
  background: #fdfdfd;
  flex-grow: 1;
  border: none;
  width: 100%;
}

.modal-content {
  padding: 0 10px;
  text-align: center;
  align-items: center;
  justify-content: center;
  display: flex;
  h2 {
    margin-top: 50px;
    margin-bottom: 20px;
    color: #222328;
    text-align: center;
    font-size: 60px;
    font-weight: 400;
    @media (max-width: 600px) {
      margin-top: 55px;
      text-align: center;
      font-size: 18px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
  }
  p {
    color: #222328;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 30px;
    @media (max-width: 600px) {
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
  a {
    padding: 30px 0;
    flex-grow: 1;
    width: 100%;
    color: #f6f6f9 !important;
    font-size: 20px;
    max-width: 561px;
    font-weight: 500;
    line-height: normal;
    border-radius: 60px;
    background: #F19900;
    margin-bottom: 10px;
    transition: all 0.3s ease;
    &:hover {
      background: #FCAA1B;

    }
  }
  span {
    max-width: 450px;
    color: #a0a9b1;
    text-align: center;
    font-size: 13px;
    font-weight: 400;
    margin-bottom: 22px;
  }
  input {
    flex-grow: 1;
    width: 100%;
    padding: 23px 0px 23px 30px;
    margin-bottom: 10px;
    border-radius: 60px;
    border: 1px solid #e2e2e2;
    background: rgba(255, 255, 255, 0.3);
    max-width: 561px;
  }
}
</style>
