<template>
  <div class="min-h-screen bg-gradient-to-b from-green-50 to-white">
    <!-- Header -->
    <header class="bg-gradient-to-r from-green-500 to-emerald-500 sticky top-0 z-10">
      <div class="max-w-4xl mx-auto px-4 py-4">
        <div class="flex justify-between items-center mb-4">
          <h1 class="text-2xl font-bold text-white">Тренировка</h1>
          <button
            @click="exitTraining"
            class="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition"
          >
            ← Назад
          </button>
        </div>
        <div class="bg-white/20 rounded-lg p-3">
          <div class="flex justify-between items-center text-white mb-2">
            <span>Прогресс</span>
            <span class="text-sm">{{ currentExerciseIndex + 1 }} из {{ totalExercises }}</span>
          </div>
          <div class="bg-white/30 h-2 rounded-full overflow-hidden">
            <div
              class="bg-white h-2 transition-all duration-300"
              :style="{ width: ((currentExerciseIndex + 1) / totalExercises * 100) + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main content -->
    <main class="max-w-4xl mx-auto px-4 py-8">
      <div v-if="!trainingCompleted">
        <!-- Current exercise -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <!-- Exercise image -->
          <div class="bg-gray-200 h-64 md:h-80 flex items-center justify-center">
            <img
              v-if="currentExercise.image"
              :src="currentExercise.image"
              :alt="currentExercise.name"
              class="w-full h-full object-cover"
            />
            <span v-else class="text-6xl">💪</span>
          </div>

          <!-- Exercise details -->
          <div class="p-6">
            <h2 class="text-3xl font-bold text-gray-800 mb-2">{{ currentExercise.name }}</h2>
            <p class="text-gray-600 mb-6">{{ currentExercise.description }}</p>

            <!-- Technique -->
            <div class="bg-blue-50 rounded-lg p-4 mb-6">
              <h3 class="font-bold text-gray-800 mb-2">📝 Техника выполнения</h3>
              <p class="text-gray-700">{{ currentExercise.technique }}</p>
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-3 gap-4 mb-6">
              <div class="bg-green-50 p-4 rounded-lg text-center">
                <div class="text-2xl font-bold text-green-600">{{ currentExercise.sets }}</div>
                <div class="text-sm text-gray-600">Подходов</div>
              </div>
              <div class="bg-blue-50 p-4 rounded-lg text-center">
                <div class="text-2xl font-bold text-blue-600">{{ currentExercise.reps }}</div>
                <div class="text-sm text-gray-600">Повторений</div>
              </div>
              <div class="bg-purple-50 p-4 rounded-lg text-center">
                <div class="text-2xl font-bold text-purple-600">{{ currentExercise.difficulty }}</div>
                <div class="text-sm text-gray-600">Сложность</div>
              </div>
            </div>

            <!-- Completion toggle -->
            <label class="flex items-center bg-gray-50 p-4 rounded-lg cursor-pointer mb-6">
              <input
                v-model="exerciseCompleted"
                type="checkbox"
                class="w-6 h-6 text-green-600 rounded"
              />
              <span class="ml-3 text-gray-800 font-medium">Упражнение выполнено</span>
            </label>
          </div>
        </div>

        <!-- Navigation -->
        <div class="flex gap-4">
          <button
            v-if="currentExerciseIndex > 0"
            @click="previousExercise"
            class="btn-secondary flex-1"
          >
            ← Назад
          </button>
          <button
            @click="nextExercise"
            :disabled="!exerciseCompleted"
            :class="!exerciseCompleted ? 'opacity-50 cursor-not-allowed' : ''"
            class="btn-primary flex-1"
          >
            {{ currentExerciseIndex === totalExercises - 1 ? 'Завершить ✓' : 'Далее →' }}
          </button>
        </div>
      </div>

      <!-- Completion screen -->
      <div v-else class="text-center">
        <div class="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div class="text-6xl mb-4">🎉</div>
          <h2 class="text-3xl font-bold text-gray-800 mb-4">Отлично!</h2>
          <p class="text-lg text-gray-600 mb-8">Тренировка завершена успешно</p>

          <div class="bg-green-50 rounded-lg p-6 mb-8">
            <p class="text-lg text-gray-600 mb-2">Время тренировки</p>
            <div class="text-4xl font-bold text-green-600">{{ trainingDuration }} мин</div>
          </div>

          <div class="bg-blue-50 rounded-lg p-6 mb-8">
            <p class="text-lg text-gray-600 mb-2">Заработано баллов</p>
            <div class="text-4xl font-bold text-blue-600">{{ earnedPoints }}</div>
          </div>

          <div class="bg-purple-50 rounded-lg p-6 mb-8">
            <p class="text-lg text-gray-600 mb-2">Новый уровень подготовки</p>
            <div class="text-3xl font-bold text-purple-600">{{ newLevel }}</div>
          </div>

          <button
            @click="finishTraining"
            class="btn-primary text-lg w-full"
          >
            Вернуться к главному меню →
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { useTrainingStore } from '../stores/trainingStore'
import { useExerciseStore } from '../stores/exerciseStore'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const trainingStore = useTrainingStore()
const exerciseStore = useExerciseStore()

const currentExerciseIndex = ref(0)
const exerciseCompleted = ref(false)
const trainingCompleted = ref(false)
const trainingStartTime = ref(Date.now())
const trainingDuration = ref(0)
const earnedPoints = ref(0)
const newLevel = ref('')

const programId = parseInt(route.params.id)
const program = trainingStore.trainingPrograms.find((p) => p.id === programId)

const totalExercises = computed(() => {
  return program?.exercises.length || 0
})

const currentExercise = computed(() => {
  const exerciseId = program?.exercises[currentExerciseIndex.value]
  return exerciseStore.exercises.find((e) => e.id === exerciseId) || {}
})

const nextExercise = () => {
  if (currentExerciseIndex.value < totalExercises.value - 1) {
    currentExerciseIndex.value++
    exerciseCompleted.value = false
  } else {
    completeTraining()
  }
}

const previousExercise = () => {
  if (currentExerciseIndex.value > 0) {
    currentExerciseIndex.value--
    exerciseCompleted.value = false
  }
}

const completeTraining = () => {
  trainingDuration.value = Math.round((Date.now() - trainingStartTime.value) / 60000)

  // Calculate new points
  const pointsPerMinute = 5
  earnedPoints.value = Math.floor(trainingDuration.value * pointsPerMinute / 10) * 10
  const newTotalPoints = authStore.currentUser.points + earnedPoints.value

  // Recalculate level
  const newLevelValue = Math.min(Math.ceil(newTotalPoints / 50), 3)
  newLevel.value = ['Начинающий', 'Любитель', 'Продвинутый'][newLevelValue - 1]

  // Update user data
  authStore.updateUserPoints(newTotalPoints)
  if (newLevelValue > authStore.currentUser.fitnessLevel) {
    authStore.updateFitnessLevel(newLevelValue)
  }

  // Record session
  trainingStore.completeSession(authStore.currentUser.id, programId, trainingDuration.value)

  trainingCompleted.value = true
}

const exitTraining = () => {
  router.push('/dashboard')
}

const finishTraining = () => {
  const needsReassessment = trainingStore.checkIfReassessmentNeeded(authStore.currentUser.id)
  
  if (needsReassessment) {
    authStore.updateReassessmentStatus(true)
    router.push('/reassessment')
  } else {
    router.push('/dashboard')
  }
}
</script>
