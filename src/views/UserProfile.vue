<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-white">
    <TopNavbar />

    <main class="max-w-4xl mx-auto px-4 py-8">
      <!-- Profile card -->
      <UserProfile :user="currentUser" />

      <!-- Progress chart -->
      <div class="mt-8">
        <ProgressChart :user="currentUser" />
      </div>

      <!-- Training history -->
      <div class="bg-white rounded-xl shadow-md p-6 mt-8">
        <h3 class="text-2xl font-bold text-gray-800 mb-6">📋 История тренировок</h3>
        
        <div v-if="recentSessions.length > 0" class="space-y-4">
          <div
            v-for="session in recentSessions"
            :key="session.id"
            class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
          >
            <div>
              <p class="font-medium text-gray-800">Программа {{ session.programId }}</p>
              <p class="text-sm text-gray-600">{{ formatDate(session.completedAt) }}</p>
            </div>
            <div class="text-right">
              <p class="font-bold text-green-600">+{{ session.pointsEarned }} баллов</p>
              <p class="text-sm text-gray-600">{{ session.duration }} минут</p>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-8 text-gray-600">
          Нет завершенных тренировок. Начните первую тренировку!
        </div>
      </div>

      <!-- Level up offer -->
      <div v-if="canLevelUp" class="mt-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl shadow-lg p-6 text-white">
        <h3 class="text-2xl font-bold mb-2">🚀 Поздравляем!</h3>
        <p class="mb-4">Вы готовы к следующему уровню подготовки. Получите более сложную программу тренировок!</p>
        <button
          @click="upgradeTier"
          class="px-6 py-3 bg-white text-green-600 rounded-lg font-bold hover:bg-gray-100 transition"
        >
          Перейти на следующий уровень
        </button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { useTrainingStore } from '../stores/trainingStore'
import TopNavbar from '../components/TopNavbar.vue'
import UserProfile from '../components/UserProfile.vue'
import ProgressChart from '../components/ProgressChart.vue'

const router = useRouter()
const authStore = useAuthStore()
const trainingStore = useTrainingStore()

const currentUser = computed(() => authStore.currentUser)

const recentSessions = computed(() => {
  return trainingStore.userSessions
    .filter(s => s.userId === currentUser.value.id)
    .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
    .slice(0, 10)
})

const canLevelUp = computed(() => {
  if (currentUser.value.fitnessLevel >= 3) return false
  const nextLevelThreshold = (currentUser.value.fitnessLevel + 1) * 50
  return currentUser.value.points >= nextLevelThreshold
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

const upgradeTier = () => {
  const newLevel = currentUser.value.fitnessLevel + 1
  if (newLevel <= 3) {
    authStore.updateFitnessLevel(newLevel)
    const newProgram = trainingStore.createTrainingProgram(currentUser.value.id, newLevel)
    currentUser.value.currentProgram = newProgram
    router.push('/dashboard')
  }
}
</script>
