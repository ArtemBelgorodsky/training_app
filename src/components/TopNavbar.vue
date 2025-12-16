<template>
  <header class="bg-white shadow-md sticky top-0 z-20">
    <div class="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
      <RouterLink to="/dashboard" class="flex items-center gap-2">
        <span class="text-3xl">💪</span>
        <span class="text-xl font-bold text-gray-800 hidden sm:inline">FitMaster</span>
      </RouterLink>

      <nav class="flex items-center gap-4">
        <RouterLink
          v-if="currentUser.role === 'admin'"
          to="/admin"
          class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
        >
          Панель администратора
        </RouterLink>
        <RouterLink
          to="/dashboard"
          class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
        >
          Главная
        </RouterLink>
        <button
          @click="logout"
          class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Выход
        </button>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const currentUser = computed(() => authStore.currentUser)

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>
