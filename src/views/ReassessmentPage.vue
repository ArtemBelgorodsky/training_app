<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-white">
    <!-- Header -->
    <header class="bg-white shadow-sm sticky top-0 z-10">
      <div class="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 class="text-xl font-bold text-gray-800">Переоценка уровня подготовки</h1>
        <div class="text-sm text-gray-600">
          Вопрос {{ currentQuestion + 1 }} из {{ trainingStore.reassessmentQuestions.length }}
        </div>
      </div>
      <!-- Progress bar -->
      <div class="bg-gray-200 h-1">
        <div 
          class="bg-green-500 h-1 transition-all duration-300"
          :style="{ width: ((currentQuestion + 1) / trainingStore.reassessmentQuestions.length * 100) + '%' }"
        ></div>
      </div>
    </header>

    <!-- Main content -->
    <main class="max-w-2xl mx-auto px-4 py-8">
      <!-- Info banner -->
      <div class="bg-green-50 border-l-4 border-green-500 p-4 rounded mb-6">
        <p class="text-green-800 font-medium">
          Спустя 2 недели тренировок время переоценить ваш уровень подготовки!
        </p>
      </div>

      <div v-if="!testCompleted">
        <!-- Current question -->
        <div class="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 class="text-xl md:text-2xl font-bold text-gray-800 mb-4">
            {{ question.question }}
          </h2>
          
          <!-- Instruction for practical tasks -->
          <div v-if="question.instruction" class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded">
            <p class="text-blue-800 font-medium">{{ question.instruction }}</p>
          </div>

          <!-- Input field for practical questions -->
          <div v-if="question.type === 'input'" class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ question.placeholder }}
            </label>
            <input
              v-model="inputValue"
              :type="question.inputType || 'number'"
              :min="question.minValue"
              :max="question.maxValue"
              class="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none text-lg"
              :placeholder="question.placeholder"
              @input="handleInputChange"
            />
            <p class="text-sm text-gray-500 mt-2">
              Допустимые значения: {{ question.minValue }} - {{ question.maxValue }}
            </p>
          </div>

          <!-- Multiple choice options -->
          <div v-else class="space-y-3">
            <button
              v-for="option in question.options"
              :key="option.value"
              @click="selectAnswer(option)"
              :class="[
                'w-full p-4 rounded-lg border-2 transition-all duration-200 text-left font-medium',
                selectedAnswer?.value === option.value
                  ? 'bg-green-500 text-white border-green-500'
                  : 'bg-gray-50 text-gray-800 border-gray-200 hover:border-green-300'
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
            {{ currentQuestion === trainingStore.reassessmentQuestions.length - 1 ? 'Завершить' : 'Далее' }} →
          </button>
        </div>
      </div>

      <!-- Results -->
      <div v-else class="text-center">
        <div class="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h2 class="text-3xl font-bold text-gray-800 mb-4">🎉 Отлично!</h2>
          <p class="text-lg text-gray-600 mb-8">Переоценка завершена</p>

          <!-- Old vs New comparison -->
          <div class="grid grid-cols-2 gap-4 mb-8">
            <div class="bg-gray-50 rounded-lg p-6">
              <p class="text-gray-600 text-sm mb-2">Старый уровень</p>
              <div class="text-3xl font-bold text-gray-800">{{ oldLevel }}</div>
              <p class="text-sm text-gray-600 mt-1">{{ getLevelName(oldLevel) }}</p>
            </div>
            <div class="bg-green-50 rounded-lg p-6">
              <p class="text-gray-600 text-sm mb-2">Новый уровень</p>
              <div class="text-3xl font-bold text-green-600">{{ testResult.level }}</div>
              <p class="text-sm text-gray-600 mt-1">{{ getLevelName(testResult.level) }}</p>
            </div>
          </div>

          <!-- Raw score display -->
          <div v-if="testResult.rawScore !== undefined" class="bg-gray-50 rounded-lg p-4 mb-6">
            <p class="text-sm text-gray-600">Сырой балл: {{ testResult.rawScore }}</p>
            <p class="text-xs text-gray-500 mt-1">Максимальный балл: {{ trainingStore.reassessmentQuestions.length * 5 }}</p>
          </div>

          <!-- Points -->
          <div class="bg-blue-50 rounded-lg p-6 mb-8">
            <div class="text-5xl font-bold text-blue-600 mb-2">+{{ testResult.points }}</div>
            <p class="text-lg text-gray-600">Добавлено баллов</p>
          </div>

          <!-- Level up message -->
          <div v-if="testResult.level > oldLevel" class="bg-yellow-50 rounded-lg p-4 mb-8 border border-yellow-200">
            <p class="text-yellow-800 font-bold text-lg">
              🚀 Поздравляем! Вы повысили уровень на {{ testResult.level - oldLevel }} уровень(ей)!
            </p>
          </div>

          <button
            @click="completeReassessment"
            class="btn-primary text-lg w-full"
          >
            Получить новую программу →
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { useTrainingStore } from '../stores/trainingStore'

const router = useRouter()
const authStore = useAuthStore()
const trainingStore = useTrainingStore()

const currentQuestion = ref(0)
const answers = ref([])
const selectedAnswer = ref(null)
const inputValue = ref('')
const testCompleted = ref(false)
const testResult = ref(null)
const oldLevel = ref(null)

const question = computed(() => trainingStore.reassessmentQuestions[currentQuestion.value])

const selectAnswer = (option) => {
  selectedAnswer.value = option
}

const handleInputChange = () => {
  if (inputValue.value) {
    const numericValue = parseInt(inputValue.value)
    if (!isNaN(numericValue) && numericValue >= question.value.minValue && numericValue <= question.value.maxValue) {
      selectedAnswer.value = {
        value: numericValue,
        type: 'input',
        pointsCalculation: question.value.pointsCalculation
      }
    } else {
      selectedAnswer.value = null
    }
  } else {
    selectedAnswer.value = null
  }
}

const nextQuestion = () => {
  if (selectedAnswer.value) {
    answers.value[currentQuestion.value] = selectedAnswer.value
    selectedAnswer.value = null
    inputValue.value = ''

    if (currentQuestion.value < trainingStore.reassessmentQuestions.length - 1) {
      currentQuestion.value++
      // Load saved answer for this question if exists
      const savedAnswer = answers.value[currentQuestion.value]
      if (savedAnswer) {
        selectedAnswer.value = savedAnswer
        if (savedAnswer.type === 'input') {
          inputValue.value = savedAnswer.value.toString()
        }
      }
    } else {
      finishTest()
    }
  }
}

const previousQuestion = () => {
  if (currentQuestion.value > 0) {
    answers.value[currentQuestion.value] = selectedAnswer.value
    currentQuestion.value--
    selectedAnswer.value = null
    inputValue.value = ''
    
    const savedAnswer = answers.value[currentQuestion.value]
    if (savedAnswer) {
      selectedAnswer.value = savedAnswer
      if (savedAnswer.type === 'input') {
        inputValue.value = savedAnswer.value.toString()
      }
    }
  }
}

const finishTest = () => {
  const result = trainingStore.calculateFitnessScore(answers.value)
  testResult.value = result
  testCompleted.value = true
}

const getLevelName = (level) => {
  const names = {
    1: 'Начинающий',
    2: 'Любитель',
    3: 'Продвинутый',
    4: 'Эксперт'
  }
  return names[level] || 'Неизвестно'
}

const completeReassessment = () => {
  // Обновляем уровень и баллы
  const newPoints = authStore.currentUser.points + testResult.value.points
  authStore.updateFitnessLevel(testResult.value.level)
  authStore.updateUserPoints(newPoints)
  
  // Создаем новую программу
  const program = trainingStore.createTrainingProgram(authStore.currentUser.id, testResult.value.level)
  authStore.currentUser.currentProgram = program
  
  // Записываем время последней переоценки
  authStore.setLastReassessmentDate(new Date().toISOString())
  authStore.updateReassessmentStatus(false)
  
  router.push('/dashboard')
}

onMounted(() => {
  oldLevel.value = authStore.currentUser.fitnessLevel
})
</script>
