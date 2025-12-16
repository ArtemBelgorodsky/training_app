<template>
  <div class="min-h-screen bg-gradient-to-b from-purple-50 to-white">
    <TopNavbar />

    <main class="max-w-4xl mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-8">📊 История всех тренировок</h1>

      <div v-if="allSessions.length > 0" class="space-y-4">
        <div class="bg-white rounded-xl shadow-md p-4 mb-6">
          <div class="grid grid-cols-3 gap-4">
            <div class="text-center">
              <div class="text-3xl font-bold text-blue-600">{{ allSessions.length }}</div>
              <p class="text-gray-600">Всего тренировок</p>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-green-600">{{ totalMinutes }}</div>
              <p class="text-gray-600">Минут спорта</p>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-purple-600">{{ totalPoints }}</div>
              <p class="text-gray-600">Заработано баллов</p>
            </div>
          </div>
        </div>

        <div
          v-for="session in allSessions"
          :key="session.id"
          class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
        >
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="text-lg font-bold text-gray-800">Тренировка</h3>
              <p class="text-gray-600">{{ formatDate(session.completedAt) }}</p>
            </div>
            <span class="bg-green-100 text-green-800 px-4 py-2 rounded-full font-bold">
              +{{ session.pointsEarned }} баллов
            </span>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-blue-50 p-3 rounded-lg">
              <p class="text-gray-600 text-sm">Длительность</p>
              <p class="text-2xl font-bold text-blue-600">{{ session.duration }} мин</p>
            </div>
            <div class="bg-purple-50 p-3 rounded-lg">
              <p class="text-gray-600 text-sm">Программа</p>
              <p class="text-2xl font-bold text-purple-600">#{{ session.programId }}</p>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="bg-white rounded-xl shadow-md p-8 text-center">
        <p class="text-2xl text-gray-600 mb-4">Пока нет завершенных тренировок</p>
        <RouterLink to="/dashboard" class="btn-primary">
          Начать первую тренировку
        </RouterLink>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { useTrainingStore } from '../stores/trainingStore'
import TopNavbar from '../components/TopNavbar.vue'

const authStore = useAuthStore()
const trainingStore = useTrainingStore()

const currentUser = computed(() => authStore.currentUser)

const allSessions = computed(() => {
  return trainingStore.userSessions
    .filter(s => s.userId === currentUser.value.id)
    .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
})

const totalMinutes = computed(() => {
  return allSessions.value.reduce((sum, s) => sum + s.duration, 0)
})

const totalPoints = computed(() => {
  return allSessions.value.reduce((sum, s) => sum + s.pointsEarned, 0)
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>
