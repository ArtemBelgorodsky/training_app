<template>
  <div class="bg-white rounded-xl shadow-md p-6">
    <h3 class="text-xl font-bold text-gray-800 mb-6">📈 График прогресса</h3>
    
    <div class="space-y-6">
      <!-- Points progress -->
      <div>
        <div class="flex justify-between items-center mb-2">
          <span class="text-sm font-medium text-gray-700">Баллы подготовленности</span>
          <span class="text-lg font-bold text-blue-600">{{ user.points }}/150</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            class="bg-gradient-to-r from-blue-400 to-blue-600 h-3 transition-all duration-500"
            :style="{ width: Math.min((user.points / 150) * 100, 100) + '%' }"
          ></div>
        </div>
      </div>

      <!-- Level progress -->
      <div>
        <div class="flex justify-between items-center mb-2">
          <span class="text-sm font-medium text-gray-700">Уровень подготовки</span>
          <span class="text-lg font-bold text-green-600">{{ user.fitnessLevel }}/3</span>
        </div>
        <div class="flex gap-2">
          <div
            v-for="level in 3"
            :key="level"
            :class="[
              'flex-1 h-3 rounded-full transition-all duration-500',
              level <= user.fitnessLevel
                ? 'bg-gradient-to-r from-green-400 to-green-600'
                : 'bg-gray-200'
            ]"
          ></div>
        </div>
      </div>

      <!-- Training frequency -->
      <div>
        <div class="flex justify-between items-center mb-3">
          <span class="text-sm font-medium text-gray-700">Частота тренировок</span>
          <span class="text-lg font-bold text-purple-600">{{ trainingFrequency }}%</span>
        </div>
        <div class="text-xs text-gray-600">
          <p v-if="trainingFrequency >= 80" class="text-green-600">Отличный результат! Продолжайте так же</p>
          <p v-else-if="trainingFrequency >= 50" class="text-yellow-600">Хороший темп, но можно улучшить</p>
          <p v-else class="text-red-600">Нужно увеличить частоту тренировок</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import { useTrainingStore } from '../stores/trainingStore'

const trainingStore = useTrainingStore()

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
})

const trainingFrequency = computed(() => {
  const sessions = trainingStore.userSessions.filter(s => s.userId === props.user.id)
  const weeks = 4
  const possibleSessions = weeks * 3 // 3 тренировки в неделю
  return Math.min(Math.round((sessions.length / possibleSessions) * 100), 100)
})
</script>
