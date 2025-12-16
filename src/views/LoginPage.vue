<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center px-4">
    <div class="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
      <h1 class="text-3xl font-bold text-center text-gray-800 mb-8">Вход в FitMaster</h1>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Имя пользователя</label>
          <input 
            v-model="form.username" 
            type="text" 
            class="input-field"
            placeholder="admin или user1"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Пароль</label>
          <input 
            v-model="form.password" 
            type="password" 
            class="input-field"
            placeholder="•••••••"
          />
        </div>

        <div v-if="errorMessage" class="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <p class="text-red-700">{{ errorMessage }}</p>
        </div>

        <button 
          type="submit" 
          class="btn-primary w-full text-lg"
          :disabled="loading"
        >
          {{ loading ? 'Загрузка...' : 'Вход' }}
        </button>
      </form>

      <p class="text-center mt-6 text-gray-600">
        Нет аккаунта?
        <RouterLink to="/register" class="text-blue-500 font-medium hover:underline">
          Зарегистрируйтесь
        </RouterLink>
      </p>

      <div class="mt-8 pt-8 border-t border-gray-200">
        <p class="text-xs text-gray-500 mb-3">Тестовые учетные данные:</p>
        <ul class="text-xs text-gray-600 space-y-1">
          <li><strong>Администратор:</strong> admin / admin123</li>
          <li><strong>Пользователь:</strong> user1 / user123</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({ username: '', password: '' })
const errorMessage = ref('')
const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  errorMessage.value = ''

  const result = authStore.login(form.value.username, form.value.password)

  if (result.success) {
    const user = authStore.currentUser
    if (user.role === 'admin') {
      router.push('/admin')
    } else if (!user.completedTests) {
      router.push('/test')
    } else {
      router.push('/dashboard')
    }
  } else {
    errorMessage.value = result.error
  }

  loading.value = false
}
</script>
