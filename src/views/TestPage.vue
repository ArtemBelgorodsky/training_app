<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-white">
    <!-- Header -->
    <header class="bg-white shadow-sm sticky top-0 z-10">
      <div class="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 class="text-xl font-bold text-gray-800">Тест уровня подготовки</h1>
        <div class="text-sm text-gray-600">
          Вопрос {{ currentQuestion + 1 }} из {{ trainingStore.testQuestions.length }}
        </div>
      </div>
      <!-- Progress bar -->
      <div class="bg-gray-200 h-1">
        <div 
          class="bg-blue-500 h-1 transition-all duration-300"
          :style="{ width: ((currentQuestion + 1) / trainingStore.testQuestions.length * 100) + '%' }"
        ></div>
      </div>
    </header>

    <!-- Main content -->
    <main class="max-w-2xl mx-auto px-4 py-8">
      <div v-if="!testCompleted">
        <!-- Current question -->
        <div class="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 class="text-xl md:text-2xl font-bold text-gray-800 mb-8">
            {{ question.question }}
          </h2>

          <!-- Options for multiple choice -->
          <div class="space-y-3">
            <button
              v-for="option in question.options"
              :key="option.value"
              @click="selectAnswer(option)"
              :class="[
                'w-full p-4 rounded-lg border-2 transition-all duration-200 text-left font-medium',
                selectedAnswer?.value === option.value
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-gray-50 text-gray-800 border-gray-200 hover:border-blue-300'
              ]"
            >
              {{ option.text }}
            </button>
          </div>
        </div>

        <!-- Navigation -->
        <div class="flex gap-4">
          <button
            v-if="currentQuestion > 0"
            @click="previousQuestion"
            class="btn-secondary flex-1"
          >
            ← Назад
          </button>
          <button
            @click="nextQuestion"
            :disabled="!selectedAnswer"
            :class="!selectedAnswer ? 'opacity-50 cursor-not-allowed' : ''"
            class="btn-primary flex-1"
          >
            {{ currentQuestion === trainingStore.testQuestions.length - 1 ? 'Завершить' : 'Далее' }} →
          </button>
        </div>
      </div>

      <!-- Results -->
      <div v-else class="text-center">
        <div class="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h2 class="text-3xl font-bold text-gray-800 mb-4">🎉 Спасибо!</h2>
          <p class="text-xl text-gray-600 mb-8">Тест завершен</p>

          <div class="bg-blue-50 rounded-lg p-6 mb-6">
            <div class="text-5xl font-bold text-blue-600 mb-2">{{ testResult.points }}</div>
            <p class="text-lg text-gray-600">Баллов подготовленности</p>
          </div>

          <div class="bg-green-50 rounded-lg p-6 mb-8">
            <div class="text-3xl font-bold text-green-600 mb-2">Уровень {{ testResult.level }}</div>
            <p class="text-lg text-gray-600">
              {{
                testResult.level === 1
                  ? 'Начинающий'
                  : testResult.level === 2
                  ? 'Любитель'
                  : 'Продвинутый'
              }}
            </p>
          </div>

          <button
            @click="completeTest"
            class="btn-primary text-lg w-full"
          >
            Начать тренировки →
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { useTrainingStore } from '../stores/trainingStore'

const router = useRouter()
const authStore = useAuthStore()
const trainingStore = useTrainingStore()

const currentQuestion = ref(0)
const answers = ref([])
const selectedAnswer = ref(null)
const testCompleted = ref(false)
const testResult = ref(null)

const question = computed(() => trainingStore.testQuestions[currentQuestion.value])

const selectAnswer = (option) => {
  selectedAnswer.value = option
}

const nextQuestion = () => {
  const currentQ = trainingStore.testQuestions[currentQuestion.value]
  
  if (selectedAnswer.value) {
    answers.value[currentQuestion.value] = {
      value: selectedAnswer.value.value,
      type: currentQ.type,
      questionId: currentQ.id,
      pointsCalculation: currentQ.pointsCalculation
    }
    selectedAnswer.value = null

    if (currentQuestion.value < trainingStore.testQuestions.length - 1) {
      currentQuestion.value++
      // Load saved answer for this question if exists
      const savedAnswer = answers.value[currentQuestion.value]
      if (savedAnswer) {
        const question = trainingStore.testQuestions[currentQuestion.value]
        selectedAnswer.value = question.options.find(opt => opt.value === savedAnswer.value) || null
      }
    } else {
      finishTest()
    }
  }
}

const previousQuestion = () => {
  if (currentQuestion.value > 0) {
    // Save current answer before going back
    const currentQ = trainingStore.testQuestions[currentQuestion.value]
    if (selectedAnswer.value) {
      answers.value[currentQuestion.value] = {
        value: selectedAnswer.value.value,
        type: currentQ.type,
        questionId: currentQ.id,
        pointsCalculation: currentQ.pointsCalculation
      }
    }

    currentQuestion.value--
    // Load saved answer for previous question
    const savedAnswer = answers.value[currentQuestion.value]
    selectedAnswer.value = null
    if (savedAnswer) {
      const question = trainingStore.testQuestions[currentQuestion.value]
      selectedAnswer.value = question.options.find(opt => opt.value === savedAnswer.value) || null
    }
  }
}

const finishTest = () => {
  const result = trainingStore.calculateFitnessScore(answers.value)
  testResult.value = result
  testCompleted.value = true
}

const completeTest = () => {
  authStore.updateFitnessLevel(testResult.value.level)
  authStore.updateUserPoints(testResult.value.points)
  const program = trainingStore.createTrainingProgram(authStore.currentUser.id, testResult.value.level)
  authStore.currentUser.completedTests = true
  authStore.currentUser.currentProgram = program
  router.push('/dashboard')
}
</script>
