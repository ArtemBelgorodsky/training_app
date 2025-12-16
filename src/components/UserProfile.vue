<template>
  <div class="bg-white rounded-xl shadow-md p-6">
    <div class="flex items-center gap-6 mb-6">
      <div class="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-4xl">
        👤
      </div>
      <div>
        <h2 class="text-2xl font-bold text-gray-800">{{ user.name }}</h2>
        <p class="text-gray-600">{{ user.email }}</p>
        <p class="text-sm text-blue-600 font-medium mt-1">{{ getLevelName(user.fitnessLevel) }}</p>
      </div>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-blue-50 p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-blue-600">{{ user.points }}</div>
        <p class="text-xs text-gray-600 mt-1">Баллы подготовленности</p>
      </div>
      <div class="bg-green-50 p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-green-600">{{ progress.totalSessions }}</div>
        <p class="text-xs text-gray-600 mt-1">Завершено тренировок</p>
      </div>
      <div class="bg-purple-50 p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-purple-600">{{ progress.totalMinutes }}</div>
        <p class="text-xs text-gray-600 mt-1">Минут спорта</p>
      </div>
      <div class="bg-orange-50 p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-orange-600">{{ progress.totalPoints }}</div>
        <p class="text-xs text-gray-600 mt-1">Всего заработано</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import { useTrainingStore } from '../stores/trainingStore'

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
})

const trainingStore = useTrainingStore()

const progress = computed(() => {
  return trainingStore.getUserProgress(props.user.id)
})

const getLevelName = (level) => {
  const names = { 1: 'Начинающий', 2: 'Любитель', 3: 'Продвинутый' }
  return names[level] || 'Неизвестно'
}
</script>
