<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
      <!-- Заголовок -->
      <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <div class="flex justify-between items-center">
          <h2 class="text-2xl font-bold">Выбрать упражнения</h2>
          <button
            @click="$emit('close')"
            class="text-white hover:text-gray-200 text-2xl"
          >
            ×
          </button>
        </div>
      </div>

      <!-- Поиск -->
      <div class="p-6 border-b">
        <input
          v-model="searchQuery"
          class="input-field"
          placeholder="Поиск упражнений..."
        />
      </div>

      <!-- Список упражнений -->
      <div class="p-6 overflow-y-auto max-h-[60vh]">
        <div class="grid md:grid-cols-2 gap-4">
          <div
            v-for="exercise in filteredExercises"
            :key="exercise.id"
            class="border rounded-lg p-4 hover:shadow-md transition cursor-pointer"
            :class="{
              'border-purple-500 bg-purple-50': selectedExercises.includes(exercise.id),
              'border-gray-200': !selectedExercises.includes(exercise.id)
            }"
            @click="toggleExercise(exercise.id)"
          >
            <div class="flex justify-between items-start mb-2">
              <h3 class="font-bold text-gray-800">{{ exercise.name }}</h3>
              <div class="flex items-center gap-2">
                <span class="text-sm px-2 py-1 rounded-full"
                      :class="getDifficultyClass(exercise.difficulty)">
                  {{ exercise.difficulty }}
                </span>
                <div v-if="selectedExercises.includes(exercise.id)" class="text-purple-600">
                  ✓
                </div>
              </div>
            </div>
            <p class="text-sm text-gray-600 mb-2">{{ exercise.targetGroup }}</p>
            <p class="text-sm text-gray-700">{{ exercise.description }}</p>
            <div class="mt-3 flex gap-4 text-xs text-gray-500">
              <span>{{ exercise.sets }} подходов</span>
              <span>{{ exercise.reps }} повторений</span>
            </div>
          </div>
        </div>

        <div v-if="filteredExercises.length === 0" class="text-center py-8 text-gray-500">
          Упражнения не найдены
        </div>
      </div>

      <!-- Кнопки -->
      <div class="bg-gray-50 px-6 py-4 flex justify-between items-center">
        <div class="text-sm text-gray-600">
          Выбрано: {{ selectedExercises.length }} упражнений
        </div>
        <div class="flex gap-4">
          <button
            @click="$emit('close')"
            class="btn-secondary"
          >
            Отмена
          </button>
          <button
            @click="confirmSelection"
            class="btn-primary"
            :disabled="selectedExercises.length === 0"
          >
            Подтвердить ({{ selectedExercises.length }})
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useExerciseStore } from '../stores/exerciseStore'

const props = defineProps({
  selectedExercises: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['close', 'select'])

const exerciseStore = useExerciseStore()
const searchQuery = ref('')

const selectedExercises = ref([...props.selectedExercises])

const filteredExercises = computed(() => {
  let filtered = exerciseStore.exercises
  
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(exercise => 
      exercise.name.toLowerCase().includes(query) ||
      exercise.targetGroup.toLowerCase().includes(query) ||
      exercise.description.toLowerCase().includes(query)
    )
  }
  
  return filtered
})

const getDifficultyClass = (difficulty) => {
  const classes = {
    1: 'bg-green-100 text-green-800',
    2: 'bg-yellow-100 text-yellow-800',
    3: 'bg-red-100 text-red-800'
  }
  return classes[difficulty] || 'bg-gray-100 text-gray-800'
}

const toggleExercise = (exerciseId) => {
  const index = selectedExercises.value.indexOf(exerciseId)
  if (index > -1) {
    selectedExercises.value.splice(index, 1)
  } else {
    selectedExercises.value.push(exerciseId)
  }
}

const confirmSelection = () => {
  emit('select', [...selectedExercises.value])
}
</script>