<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-white">
    <!-- Header -->
    <header class="bg-white shadow-sm sticky top-0 z-10">
      <div class="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">Привет, {{ currentUser.name }}!</h1>
          <p class="text-gray-600">Уровень: {{ getLevelName(currentUser.fitnessLevel) }}</p>
        </div>
        <button
          @click="logout"
          class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Выход
        </button>
      </div>
    </header>

    <!-- Уведомление о переоценке после 2 недель тренировок -->
    <div v-if="showReassessmentNotification" class="bg-yellow-50 border-b-4 border-yellow-500 p-4">
      <div class="max-w-4xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-3">
          <span class="text-3xl">📈</span>
          <div>
            <p class="font-bold text-yellow-900">Время переоценки!</p>
            <p class="text-sm text-yellow-800">Вы тренировались 2 недели. Пройдите тест, чтобы повысить уровень подготовки.</p>
          </div>
        </div>
        <button
          @click="goToReassessment"
          class="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition font-medium whitespace-nowrap ml-4"
        >
          Пройти тест →
        </button>
      </div>
    </div>

    <!-- Уведомление об автоматической тренировке -->
    <div v-if="autoTrainingCompleted" class="bg-green-50 border-b-4 border-green-500 p-4">
      <div class="max-w-4xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-3">
          <span class="text-3xl">💪</span>
          <div>
            <p class="font-bold text-green-900">Автоматическая тренировка выполнена!</p>
            <p class="text-sm text-green-800">
              {{ lastAutoTrainingSession ? `Продолжительность: ${lastAutoTrainingSession.duration} мин, +${lastAutoTrainingSession.pointsEarned} баллов` : 'Тренировка по расписанию завершена' }}
            </p>
          </div>
        </div>
        <button
          @click="autoTrainingCompleted = false"
          class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition font-medium"
        >
          ✓
        </button>
      </div>
    </div>

    <!-- Main content -->
    <main class="max-w-4xl mx-auto px-4 py-8">
      <!-- Quick navigation -->
      <div class="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
        <RouterLink to="/dashboard" class="card text-center hover:shadow-lg transition cursor-pointer">
          <div class="text-3xl mb-2">🏠</div>
          <p class="font-medium text-gray-800 text-sm">Главная</p>
        </RouterLink>
        <RouterLink to="/profile" class="card text-center hover:shadow-lg transition cursor-pointer">
          <div class="text-3xl mb-2">👤</div>
          <p class="font-medium text-gray-800 text-sm">Профиль</p>
        </RouterLink>
        <RouterLink to="/history" class="card text-center hover:shadow-lg transition cursor-pointer">
          <div class="text-3xl mb-2">📊</div>
          <p class="font-medium text-gray-800 text-sm">История</p>
        </RouterLink>
        <!-- кнопка рекомендаций -->
        <button @click="showRecommendations = true" class="card text-center hover:shadow-lg transition cursor-pointer bg-purple-50 border-2 border-purple-200">
          <div class="text-3xl mb-2">💡</div>
          <p class="font-medium text-gray-800 text-sm">Рекомендации</p>
        </button>
        <!-- кнопка для ручной переоценки -->
        <button @click="goToReassessment" class="card text-center hover:shadow-lg transition cursor-pointer bg-blue-50 border-2 border-blue-200">
          <div class="text-3xl mb-2">⚡</div>
          <p class="font-medium text-gray-800 text-sm">Переоценка</p>
        </button>
        <RouterLink v-if="currentUser.role === 'admin'" to="/admin" class="card text-center hover:shadow-lg transition cursor-pointer">
          <div class="text-3xl mb-2">⚙️</div>
          <p class="font-medium text-gray-800 text-sm">Админ</p>
        </RouterLink>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div class="card">
          <div class="text-gray-600 text-sm">Баллы</div>
          <div class="text-3xl font-bold text-blue-600">{{ currentUser.points }}</div>
        </div>
        <div class="card">
          <div class="text-gray-600 text-sm">Тренировок</div>
          <div class="text-3xl font-bold text-green-600">{{ userProgress.totalSessions }}</div>
        </div>
        <div class="card">
          <div class="text-gray-600 text-sm">Минут тренировок</div>
          <div class="text-3xl font-bold text-purple-600">{{ userProgress.totalMinutes }}</div>
        </div>
      </div>

      <!-- Current program -->
      <div v-if="currentUser.currentProgram" class="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">📋 Ваша программа</h2>
        <div class="space-y-4">
          <div>
            <h3 class="text-lg font-bold text-gray-800">{{ currentUser.currentProgram.name }}</h3>
            <p class="text-gray-600">{{ currentUser.currentProgram.description }}</p>
          </div>
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-blue-50 p-4 rounded-lg">
              <p class="text-sm text-gray-600">Расписание</p>
              <p class="font-bold text-gray-800">{{ currentUser.currentProgram.schedule }}</p>
            </div>
            <div class="bg-green-50 p-4 rounded-lg">
              <p class="text-sm text-gray-600">Длительность</p>
              <p class="font-bold text-gray-800">{{ currentUser.currentProgram.duration }} недель</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Exercises -->
      <div class="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">💪 Упражнения программы</h2>
        <div v-if="programExercises.length > 0" class="space-y-4">
          <div
            v-for="exercise in programExercises"
            :key="exercise.id"
            class="border-l-4 border-blue-500 pl-4 py-2"
          >
            <div class="flex justify-between items-start mb-2">
              <div>
                <h3 class="font-bold text-gray-800">{{ exercise.name }}</h3>
                <p class="text-sm text-gray-600">{{ exercise.targetGroup }}</p>
              </div>
              <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                Сложность: {{ exercise.difficulty }}
              </span>
            </div>
            <div class="text-sm text-gray-600 mb-3">
              <p>{{ exercise.sets }} подходов × {{ exercise.reps }} повторений</p>
              <p class="mt-1">{{ exercise.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Start training -->
      <div class="sticky bottom-4">
        <button
          @click="startTraining"
          class="btn-primary w-full text-lg py-4 shadow-lg"
        >
          🚀 Начать тренировку
        </button>
      </div>
    </main>

    <!-- Модальное окно рекомендаций -->
    <RecommendationsModal
      :isOpen="showRecommendations"
      :userLevel="currentUser.fitnessLevel"
      @close="showRecommendations = false"
    />
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { useTrainingStore } from '../stores/trainingStore'
import { useExerciseStore } from '../stores/exerciseStore'
import { RouterLink } from 'vue-router'
import RecommendationsModal from '../components/RecommendationsModal.vue'

// Состояние для модального окна рекомендаций
const showRecommendations = ref(false)

const router = useRouter()
const authStore = useAuthStore()
const trainingStore = useTrainingStore()
const exerciseStore = useExerciseStore()

const currentUser = computed(() => authStore.currentUser)
const showReassessmentNotification = ref(false)
const autoTrainingCompleted = ref(false)
const lastAutoTrainingSession = ref(null)

const userProgress = computed(() => {
  return trainingStore.getUserProgress(currentUser.value.id)
})

const programExercises = computed(() => {
  if (!currentUser.value.currentProgram) return []
  return exerciseStore.exercises.filter((e) =>
    currentUser.value.currentProgram.exercises.includes(e.id)
  )
})

const getLevelName = (level) => {
  const names = { 1: 'Начинающий', 2: 'Любитель', 3: 'Продвинутый' }
  return names[level] || 'Неизвестно'
}

const logout = () => {
  authStore.logout()
  router.push('/login')
}

const startTraining = () => {
  router.push({
    name: 'TrainingSession',
    params: { id: currentUser.value.currentProgram?.id || 1 },
  })
}

const checkReassessmentNeeded = () => {
  if (currentUser.value && currentUser.value.role === 'user') {
    const needsReassessment = trainingStore.checkIfReassessmentNeeded(currentUser.value.id)
    showReassessmentNotification.value = needsReassessment
  }
}

const goToReassessment = () => {
  authStore.updateReassessmentStatus(true)
  router.push('/reassessment')
}

onMounted(() => {
  checkReassessmentNeeded()
  
  // Запускаем автоматическую симуляцию тренировок
  if (currentUser.value && currentUser.value.role === 'user') {
    const sessions = trainingStore.runAutoTraining(currentUser.value.id, authStore)
    
    // Если были выполнены автоматические тренировки, обновляем интерфейс
    if (sessions.length > 0) {
      // Сохраняем информацию о последней тренировке
      lastAutoTrainingSession.value = sessions[0]
      autoTrainingCompleted.value = true
      
      // Обновляем статистику
      userProgress.value = trainingStore.getUserProgress(currentUser.value.id)
    }
  }
})
</script>
