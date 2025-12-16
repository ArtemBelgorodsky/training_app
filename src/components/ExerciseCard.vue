<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
    <div class="bg-gradient-to-br from-blue-400 to-blue-600 h-40 flex items-center justify-center text-5xl">
      💪
    </div>
    <div class="p-4">
      <h3 class="font-bold text-gray-800 mb-1">{{ exercise.name }}</h3>
      <p class="text-xs text-gray-600 mb-3">{{ exercise.targetGroup }}</p>
      
      <div class="grid grid-cols-3 gap-2 mb-4">
        <div class="bg-green-50 p-2 rounded text-center">
          <div class="text-sm font-bold text-green-600">{{ exercise.sets }}</div>
          <div class="text-xs text-gray-600">подходов</div>
        </div>
        <div class="bg-blue-50 p-2 rounded text-center">
          <div class="text-sm font-bold text-blue-600">{{ exercise.reps }}</div>
          <div class="text-xs text-gray-600">повторений</div>
        </div>
        <div class="bg-purple-50 p-2 rounded text-center">
          <div class="text-sm font-bold text-purple-600">{{ exercise.difficulty }}</div>
          <div class="text-xs text-gray-600">сложность</div>
        </div>
      </div>

      <p class="text-xs text-gray-600 leading-relaxed mb-3">{{ exercise.description }}</p>
      
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
