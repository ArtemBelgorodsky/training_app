<template>
  <div v-if="isVisible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
      <!-- Заголовок -->
      <div class="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6">
        <div class="flex justify-between items-center">
          <h2 class="text-2xl font-bold">
            {{ isEdit ? 'Редактировать программу' : 'Создать программу' }}
          </h2>
          <button
            @click="close"
            class="text-white hover:text-gray-200 text-2xl"
          >
            ×
          </button>
        </div>
      </div>

      <!-- Содержимое -->
      <div class="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
        <form @submit.prevent="saveProgram" class="space-y-6">
          <!-- Основная информация -->
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Название программы</label>
              <input
                v-model="form.name"
                class="input-field"
                placeholder="Например: Начинающий"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Уровень сложности</label>
              <select v-model.number="form.level" class="input-field" required>
                <option value="1">1 - Начинающий</option>
                <option value="2">2 - Любитель</option>
                <option value="3">3 - Продвинутый</option>
                <option value="4">4 - Эксперт</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Описание</label>
            <textarea
              v-model="form.description"
              class="input-field"
              placeholder="Краткое описание программы"
              rows="3"
              required
            ></textarea>
          </div>

          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Длительность (недель)</label>
              <input
                v-model.number="form.duration"
                type="number"
                class="input-field"
                min="1"
                max="52"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Расписание</label>
              <select v-model="form.schedule" class="input-field" required>
                <option value="ПН, СР, ПТ">ПН, СР, ПТ</option>
                <option value="ПН, ВТ, СР, ПТ, СБ">ПН, ВТ, СР, ПТ, СБ</option>
                <option value="ПН-СБ с выходным в ВС">ПН-СБ с выходным в ВС</option>
                <option value="Ежедневно">Ежедневно</option>
                <option value="ПН, СР, ПТ, СБ">ПН, СР, ПТ, СБ</option>
                <option value="ВТ, ЧТ, СБ">ВТ, ЧТ, СБ</option>
              </select>
            </div>
          </div>

          <!-- Упражнения -->
          <div>
            <div class="flex justify-between items-center mb-4">
              <label class="block text-sm font-medium text-gray-700">Упражнения в программе</label>
              <button
                type="button"
                @click="showExerciseSelector = true"
                class="btn-primary text-sm"
              >
                + Добавить упражнение
              </button>
            </div>

            <!-- Список упражнений -->
            <div class="space-y-3">
              <div
                v-for="(exerciseId, index) in form.exercises"
                :key="`${exerciseId}-${index}`"
                class="bg-gray-50 p-4 rounded-lg flex justify-between items-center"
              >
                <div class="flex-1">
                  <div class="font-medium text-gray-800">
                    {{ getExerciseById(exerciseId)?.name || 'Упражнение не найдено' }}
                  </div>
                  <div class="text-sm text-gray-600">
                    {{ getExerciseById(exerciseId)?.targetGroup || 'Не указана группа' }}
                  </div>
                </div>
                <button
                  type="button"
                  @click="removeExercise(index)"
                  class="text-red-600 hover:text-red-800 ml-4"
                >
                  Удалить
                </button>
              </div>
            </div>

            <div v-if="form.exercises.length === 0" class="text-center py-8 text-gray-500">
              Нет добавленных упражнений. Нажмите "Добавить упражнение" для начала.
            </div>
          </div>
        </form>
      </div>

      <!-- Кнопки действий -->
      <div class="bg-gray-50 px-6 py-4 flex justify-end gap-4">
        <button
          type="button"
          @click="close"
          class="btn-secondary"
        >
          Отмена
        </button>
        <button
          @click="saveProgram"
          class="btn-primary"
        >
          {{ isEdit ? 'Сохранить изменения' : 'Создать программу' }}
        </button>
      </div>
    </div>

    <!-- Модальное окно выбора упражнений -->
    <ExerciseSelectorModal
      v-if="showExerciseSelector"
      :selected-exercises="form.exercises"
      @close="showExerciseSelector = false"
      @select="addExercises"
    />
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useExerciseStore } from '../stores/exerciseStore'
import ExerciseSelectorModal from './ExerciseSelectorModal.vue'

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  },
  program: {
    type: Object,
    default: null
  },
  isEdit: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'save'])

const exerciseStore = useExerciseStore()

const showExerciseSelector = ref(false)
const form = ref({
  name: '',
  level: 1,
  description: '',
  duration: 4,
  schedule: 'ПН, СР, ПТ',
  exercises: []
})

// Инициализация формы при изменении программы
watch(() => props.program, (newProgram) => {
  if (newProgram && props.isEdit) {
    form.value = {
      name: newProgram.name,
      level: newProgram.level,
      description: newProgram.description,
      duration: newProgram.duration,
      schedule: newProgram.schedule,
      exercises: [...newProgram.exercises]
    }
  } else if (!props.isEdit) {
    form.value = {
      name: '',
      level: 1,
      description: '',
      duration: 4,
      schedule: 'ПН, СР, ПТ',
      exercises: []
    }
  }
}, { immediate: true })

const getExerciseById = (id) => {
  return exerciseStore.exercises.find(ex => ex.id === id)
}

const addExercises = (exerciseIds) => {
  form.value.exercises = [...new Set([...form.value.exercises, ...exerciseIds])]
  showExerciseSelector.value = false
}

const removeExercise = (index) => {
  form.value.exercises.splice(index, 1)
}

const saveProgram = () => {
  if (!form.value.name || !form.value.description) {
    alert('Пожалуйста, заполните все обязательные поля')
    return
  }

  emit('save', {
    ...form.value,
    exercises: [...form.value.exercises]
  })
}

const close = () => {
  emit('close')
}
</script>