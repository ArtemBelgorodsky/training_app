<template>
  <div class="min-h-screen bg-gradient-to-b from-purple-50 to-white">
    <!-- Header -->
    <header class="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg sticky top-0 z-10">
      <div class="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-white">⚙️ Панель администратора</h1>
          <p class="text-purple-100">Управление системой</p>
        </div>
        <button
          @click="logout"
          class="px-6 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition font-medium"
        >
          Выход
        </button>
      </div>
    </header>

    <!-- Main content -->
    <main class="max-w-6xl mx-auto px-4 py-8">
      <!-- Navigation tabs -->
      <div class="flex gap-4 mb-8 overflow-x-auto pb-4">
        <button
          @click="activeTab = 'exercises'"
          :class="[
            'px-6 py-3 rounded-lg font-medium whitespace-nowrap transition',
            activeTab === 'exercises'
              ? 'bg-purple-600 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
          ]"
        >
          💪 Упражнения
        </button>
        <button
          @click="activeTab = 'programs'"
          :class="[
            'px-6 py-3 rounded-lg font-medium whitespace-nowrap transition',
            activeTab === 'programs'
              ? 'bg-purple-600 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
          ]"
        >
          📋 Программы
        </button>
        <button
          @click="activeTab = 'stats'"
          :class="[
            'px-6 py-3 rounded-lg font-medium whitespace-nowrap transition',
            activeTab === 'stats'
              ? 'bg-purple-600 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
          ]"
        >
          📊 Статистика
        </button>
      </div>

      <!-- Exercises tab -->
      <div v-if="activeTab === 'exercises'" class="space-y-6">
        <div class="bg-white rounded-xl shadow-md p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-800">Управление упражнениями</h2>
            <button
              @click="showAddExerciseForm = !showAddExerciseForm"
              class="btn-primary"
            >
              + Добавить упражнение
            </button>
          </div>

          <!-- Add exercise form -->
          <div v-if="showAddExerciseForm" class="bg-gray-50 p-6 rounded-lg mb-6 border-2 border-purple-200">
            <h3 class="text-lg font-bold text-gray-800 mb-4">Новое упражнение</h3>
            <form @submit.prevent="addExercise" class="space-y-4">
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Название</label>
                  <input v-model="newExercise.name" class="input-field" placeholder="Название упражнения" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Целевая группа</label>
                  <input v-model="newExercise.targetGroup" class="input-field" placeholder="Грудь, трицепсы" />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Описание</label>
                <textarea v-model="newExercise.description" class="input-field" placeholder="Описание упражнения" rows="2"></textarea>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Техника выполнения</label>
                <textarea v-model="newExercise.technique" class="input-field" placeholder="Подробное описание техники" rows="3"></textarea>
              </div>

              <div class="grid md:grid-cols-4 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Подходы</label>
                  <input v-model.number="newExercise.sets" type="number" class="input-field" min="1" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Повторения</label>
                  <input v-model="newExercise.reps" class="input-field" placeholder="10 или 30 сек" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Сложность (1-3)</label>
                  <input v-model.number="newExercise.difficulty" type="number" class="input-field" min="1" max="3" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Категория</label>
                  <input v-model="newExercise.category" class="input-field" placeholder="Базовые" />
                </div>
              </div>

              <div class="flex gap-4">
                <button type="submit" class="btn-primary flex-1">Добавить</button>
                <button
                  type="button"
                  @click="showAddExerciseForm = false"
                  class="btn-secondary flex-1"
                >
                  Отмена
                </button>
              </div>
            </form>
          </div>

          <!-- Exercises list -->
          <div class="space-y-4">
            <div
              v-for="exercise in exerciseStore.exercises"
              :key="exercise.id"
              class="bg-gray-50 p-4 rounded-lg hover:shadow-md transition border-l-4 border-purple-500"
            >
              <div class="flex justify-between items-start mb-3">
                <div>
                  <h4 class="text-lg font-bold text-gray-800">{{ exercise.name }}</h4>
                  <p class="text-sm text-gray-600">{{ exercise.targetGroup }}</p>
                </div>
                <div class="flex gap-2">
                  <span class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                    Сложность: {{ exercise.difficulty }}
                  </span>
                  <button
                    @click="deleteExercise(exercise.id)"
                    class="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <div class="text-sm text-gray-700 mb-3">
                <p><strong>Описание:</strong> {{ exercise.description }}</p>
                <p class="mt-2"><strong>{{ exercise.sets }} подходов × {{ exercise.reps }} повторений</strong></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Programs tab -->
      <div v-if="activeTab === 'programs'" class="space-y-6">
        <div class="bg-white rounded-xl shadow-md p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-800">Программы тренировок</h2>
            <button
              @click="showProgramEditor = true"
              class="btn-primary"
            >
              + Создать программу
            </button>
          </div>

          <!-- Programs grid -->
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="program in trainingStore.trainingPrograms"
              :key="program.id"
              class="card relative group"
            >
              <!-- Кнопки управления -->
              <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                <button
                  @click="editProgram(program)"
                  class="px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition text-sm"
                >
                  ✏️
                </button>
                <button
                  @click="deleteProgram(program.id)"
                  class="px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition text-sm"
                >
                  🗑️
                </button>
              </div>

              <h3 class="text-lg font-bold text-gray-800 mb-2 pr-16">{{ program.name }}</h3>
              <p class="text-sm text-gray-600 mb-4">{{ program.description }}</p>
              
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-500">Уровень:</span>
                  <span class="font-medium">{{ program.level }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-500">Длительность:</span>
                  <span class="font-medium">{{ program.duration }} недель</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-500">Упражнений:</span>
                  <span class="font-medium">{{ program.exercises.length }}</span>
                </div>
                <div class="mt-3">
                  <span class="text-gray-500">Расписание:</span>
                  <p class="font-medium mt-1">{{ program.schedule }}</p>
                </div>
              </div>

              <!-- Упражнения в программе -->
              <div class="mt-4 pt-4 border-t border-gray-200">
                <p class="text-sm text-gray-500 mb-2">Упражнения:</p>
                <div class="flex flex-wrap gap-1">
                  <span
                    v-for="exerciseId in program.exercises.slice(0, 3)"
                    :key="exerciseId"
                    class="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs"
                  >
                    {{ getExerciseById(exerciseId)?.name || 'Неизвестно' }}
                  </span>
                  <span
                    v-if="program.exercises.length > 3"
                    class="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                  >
                    +{{ program.exercises.length - 3 }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Пустое состояние -->
          <div v-if="trainingStore.trainingPrograms.length === 0" class="text-center py-12">
            <p class="text-gray-500 mb-4">Пока нет созданных программ</p>
            <button
              @click="showProgramEditor = true"
              class="btn-primary"
            >
              Создать первую программу
            </button>
          </div>
        </div>
      </div>

      <!-- Stats tab -->
      <div v-if="activeTab === 'stats'" class="space-y-6">
        <div class="bg-white rounded-xl shadow-md p-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">Общая статистика</h2>
          <div class="grid md:grid-cols-4 gap-4">
            <div class="card text-center">
              <div class="text-4xl font-bold text-purple-600">{{ exerciseStore.exercises.length }}</div>
              <p class="text-gray-600 mt-2">Упражнений</p>
            </div>
            <div class="card text-center">
              <div class="text-4xl font-bold text-blue-600">{{ trainingStore.trainingPrograms.length }}</div>
              <p class="text-gray-600 mt-2">Программ</p>
            </div>
            <div class="card text-center">
              <div class="text-4xl font-bold text-green-600">{{ trainingStore.userSessions.length }}</div>
              <p class="text-gray-600 mt-2">Завершено тренировок</p>
            </div>
            <div class="card text-center">
              <div class="text-4xl font-bold text-orange-600">
                {{ trainingStore.userSessions.reduce((sum, s) => sum + s.duration, 0) }}
              </div>
              <p class="text-gray-600 mt-2">Минут тренировок</p>
            </div>
          </div>
        </div>

        <!-- Recent sessions -->
        <div class="bg-white rounded-xl shadow-md p-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">Последние тренировки</h2>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="bg-gray-100">
                <tr>
                  <th class="px-4 py-2 text-left">Дата</th>
                  <th class="px-4 py-2 text-left">Длительность</th>
                  <th class="px-4 py-2 text-left">Заработано баллов</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="session in recentSessions" :key="session.id" class="border-t hover:bg-gray-50">
                  <td class="px-4 py-2">{{ formatDate(session.completedAt) }}</td>
                  <td class="px-4 py-2">{{ session.duration }} мин</td>
                  <td class="px-4 py-2 font-bold text-green-600">+{{ session.pointsEarned }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>

    <!-- Модальное окно редактора программ -->
    <ProgramEditorModal
      :is-visible="showProgramEditor"
      :program="editingProgram"
      :is-edit="!!editingProgram"
      @close="closeProgramEditor"
      @save="handleProgramSave"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { useTrainingStore } from '../stores/trainingStore'
import { useExerciseStore } from '../stores/exerciseStore'
import ProgramEditorModal from '../components/ProgramEditorModal.vue'

const router = useRouter()
const authStore = useAuthStore()
const trainingStore = useTrainingStore()
const exerciseStore = useExerciseStore()

const activeTab = ref('exercises')
const showAddExerciseForm = ref(false)
const showProgramEditor = ref(false)
const editingProgram = ref(null)

const newExercise = ref({
  name: '',
  description: '',
  technique: '',
  sets: 3,
  reps: '10',
  difficulty: 1,
  image: '',
  targetGroup: '',
  category: 'Новое',
})

const recentSessions = computed(() => {
  return trainingStore.userSessions.slice(-10).reverse()
})

// Функции для упражнений
const addExercise = () => {
  if (!newExercise.value.name) return

  const result = exerciseStore.addExercise({
    ...newExercise.value,
    image: '/---------.jpg',
  })

  if (result.success) {
    newExercise.value = {
      name: '',
      description: '',
      technique: '',
      sets: 3,
      reps: '10',
      difficulty: 1,
      image: '',
      targetGroup: '',
      category: 'Новое',
    }
    showAddExerciseForm.value = false
  }
}

const deleteExercise = (id) => {
  if (confirm('Вы уверены, что хотите удалить это упражнение?')) {
    exerciseStore.deleteExercise(id)
  }
}

// Функции для программ тренировок
const getExerciseById = (id) => {
  return exerciseStore.exercises.find(ex => ex.id === id)
}

const editProgram = (program) => {
  editingProgram.value = { ...program }
  showProgramEditor.value = true
}

const deleteProgram = (id) => {
  if (confirm('Вы уверены, что хотите удалить эту программу тренировок?')) {
    const result = trainingStore.deleteTrainingProgram(id)
    if (!result.success) {
      alert('Ошибка при удалении программы: ' + (result.error || 'Неизвестная ошибка'))
    }
  }
}

const handleProgramSave = (programData) => {
  let result
  if (editingProgram.value) {
    // Редактирование существующей программы
    result = trainingStore.updateTrainingProgram(editingProgram.value.id, programData)
  } else {
    // Создание новой программы
    result = trainingStore.addTrainingProgram(programData)
  }

  if (result.success) {
    showProgramEditor.value = false
    editingProgram.value = null
  } else {
    alert('Ошибка при сохранении программы: ' + (result.error || 'Неизвестная ошибка'))
  }
}

const closeProgramEditor = () => {
  showProgramEditor.value = false
  editingProgram.value = null
}

// Общие функции
const formatDate = (date) => {
  return new Date(date).toLocaleString('ru-RU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>
