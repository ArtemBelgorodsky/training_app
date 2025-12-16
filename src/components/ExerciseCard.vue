<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
    <div class="bg-gradient-to-br from-blue-400 to-blue-600 h-24 sm:h-32 md:h-40 flex items-center justify-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
      💪
    </div>
    <div class="p-3 sm:p-4">
      <h3 class="font-bold text-gray-800 mb-1 text-sm sm:text-base">{{ exercise.name }}</h3>
      <p class="text-xs text-gray-600 mb-3">{{ exercise.targetGroup }}</p>
      
      <!-- Адаптивная сетка для подходов, повторений и сложности -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3 sm:mb-4">
        <!-- На десктопе показываем в ряд, на мобильном - в колонку -->
        <div class="flex items-center justify-between bg-green-50 p-2 rounded">
          <span class="text-xs text-gray-600 truncate mr-2">подходов</span>
          <div class="text-xs sm:text-sm font-bold text-green-600 flex-shrink-0">{{ exercise.sets }}</div>
        </div>
        <div class="flex items-center justify-between bg-blue-50 p-2 rounded">
          <span class="text-xs text-gray-600 truncate mr-2">повторений</span>
          <div class="text-xs sm:text-sm font-bold text-blue-600 flex-shrink-0">{{ exercise.reps }}</div>
        </div>
        <div class="flex items-center justify-between bg-purple-50 p-2 rounded">
          <span class="text-xs text-gray-600 truncate mr-2">сложность</span>
          <div class="text-xs sm:text-sm font-bold text-purple-600 flex-shrink-0">{{ exercise.difficulty }}</div>
        </div>
      </div>

      <p class="text-xs text-gray-600 leading-relaxed mb-3 line-clamp-2">{{ exercise.description }}</p>
      
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  exercise: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
