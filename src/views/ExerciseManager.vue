<template>
  <div class="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
    <!-- Header -->
    <header class="bg-indigo-600 shadow-lg sticky top-0 z-10">
      <div class="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-white">Управление упражнениями</h1>
        <RouterLink to="/admin" class="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30">
          ← Назад
        </RouterLink>
      </div>
    </header>

    <!-- Main content -->
    <main class="max-w-6xl mx-auto px-4 py-8">
      <div class="grid md:grid-cols-4 gap-4 mb-8">
        <div class="card text-center">
          <div class="text-3xl font-bold text-indigo-600">{{ exerciseStore.exercises.length }}</div>
          <p class="text-gray-600">Упражнений всего</p>
        </div>
        <div class="card text-center">
          <div class="text-3xl font-bold text-green-600">
            {{ exerciseStore.exercises.filter(e => e.difficulty === 1).length }}
          </div>
          <p class="text-gray-600">Базовых</p>
        </div>
        <div class="card text-center">
          <div class="text-3xl font-bold text-orange-600">
            {{ exerciseStore.exercises.filter(e => e.difficulty === 2).length }}
          </div>
          <p class="text-gray-600">Интенсивных</p>
        </div>
        <div class="card text-center">
          <div class="text-3xl font-bold text-red-600">
            {{ exerciseStore.exercises.filter(e => e.difficulty === 3).length }}
          </div>
          <p class="text-gray-600">Продвинутых</p>
        </div>
      </div>

      <!-- Filter -->
      <div class="mb-6 flex gap-2 flex-wrap">
        <button
          v-for="level in [0, 1, 2, 3]"
          :key="level"
          @click="filterLevel = level"
          :class="[
            'px-4 py-2 rounded-lg font-medium transition',
            filterLevel === level
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-indigo-400'
          ]"
        >
          {{ level === 0 ? 'Все' : `Уровень ${level}` }}
        </button>
      </div>

      <!-- Exercises grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="exercise in filteredExercises"
          :key="exercise.id"
          class="card overflow-hidden hover:shadow-xl transition"
        >
          <div class="bg-gray-200 h-40 flex items-center justify-center mb-4">
            <span class="text-4xl">💪</span>
          </div>
          <h3 class="text-lg font-bold text-gray-800 mb-2">{{ exercise.name }}</h3>
          <p class="text-sm text-gray-600 mb-3">{{ exercise.targetGroup }}</p>
          <div class="space-y-2 mb-4 text-sm">
            <p><strong>Подходы:</strong> {{ exercise.sets }}</p>
            <p><strong>Повторения:</strong> {{ exercise.reps }}</p>
            <p><strong>Сложность:</strong> {{ exercise.difficulty }}/3</p>
          </div>
          <div class="flex gap-2">
            <button class="btn-secondary flex-1 text-sm">Изменить</button>
            <button
              @click="exerciseStore.deleteExercise(exercise.id)"
              class="btn-secondary flex-1 text-sm bg-red-50 text-red-600 border-red-200"
            >
              Удалить
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useExerciseStore } from '../stores/exerciseStore'

const exerciseStore = useExerciseStore()
const filterLevel = ref(0)

const filteredExercises = computed(() => {
  if (filterLevel.value === 0) return exerciseStore.exercises
  return exerciseStore.exercises.filter(e => e.difficulty === filterLevel.value)
})
</script>
