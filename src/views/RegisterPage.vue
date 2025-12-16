<template>
  <div class="min-h-screen bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center px-4">
    <div class="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
      <h1 class="text-3xl font-bold text-center text-gray-800 mb-8">Регистрация</h1>

      <form @submit.prevent="handleRegister" class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Полное имя</label>
          <input 
            v-model="form.name" 
            type="text" 
            class="input-field"
            placeholder="Ваше имя"
          />
          <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input 
            v-model="form.email" 
            type="email" 
            class="input-field"
            placeholder="example@mail.com"
          />
          <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Имя пользователя</label>
          <input 
            v-model="form.username" 
            type="text" 
            class="input-field"
            placeholder="username"
          />
          <p v-if="errors.username" class="text-red-500 text-sm mt-1">{{ errors.username }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Пароль</label>
          <input 
            v-model="form.password" 
            type="password" 
            class="input-field"
            placeholder="Минимум 6 символов"
          />
          <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Подтверждение пароля</label>
          <input 
            v-model="form.confirmPassword" 
            type="password" 
            class="input-field"
            placeholder="Повторите пароль"
          />
        </div>

        <button 
          type="submit" 
          class="btn-primary w-full text-lg"
          :disabled="loading"
        >
          {{ loading ? 'Загрузка...' : 'Зарегистрироваться' }}
        </button>
      </form>

      <p class="text-center mt-6 text-gray-600">
        Уже есть аккаунт?
        <RouterLink to="/login" class="text-green-600 font-medium hover:underline">
          Войти
        </RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  name: '',
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
})

const errors = ref({})
const loading = ref(false)

const validateForm = () => {
  errors.value = {}

  if (!form.value.name) errors.value.name = 'Имя обязательно'
  if (!form.value.email) errors.value.email = 'Email обязателен'
  if (!form.value.username) errors.value.username = 'Имя пользователя обязательно'
  if (!form.value.password || form.value.password.length < 6) {
    errors.value.password = 'Пароль должен быть не менее 6 символов'
  }
  if (form.value.password !== form.value.confirmPassword) {
    errors.value.password = 'Пароли не совпадают'
  }

  return Object.keys(errors.value).length === 0
}

const handleRegister = async () => {
  if (!validateForm()) return

  loading.value = true
  const result = authStore.register(
    form.value.username,
    form.value.password,
    form.value.name,
    form.value.email
  )

  if (result.success) {
    router.push('/test')
  } else {
    errors.value.username = result.error
  }

  loading.value = false
}
</script>
