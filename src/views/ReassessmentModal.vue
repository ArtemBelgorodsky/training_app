<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="isOpen" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-xl shadow-xl max-w-md w-full animate-bounce-in">
          <div class="bg-gradient-to-r from-green-500 to-emerald-500 p-6 text-center text-white rounded-t-xl">
            <div class="text-5xl mb-2">📈</div>
            <h2 class="text-2xl font-bold">Время переоценки!</h2>
          </div>
          
          <div class="p-6 text-center">
            <p class="text-gray-700 mb-6">
              Вы активно тренировались последние 2 недели! Пришло время пройти новый тест и повысить уровень подготовки.
            </p>
            
            <div class="bg-blue-50 rounded-lg p-4 mb-6">
              <p class="text-sm text-gray-600">Текущий уровень</p>
              <p class="text-2xl font-bold text-blue-600">{{ currentLevel }}</p>
            </div>

            <div class="space-y-3">
              <button
                @click="startReassessment"
                class="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition font-bold text-lg"
              >
                Пройти тест →
              </button>
              <button
                @click="closeModal"
                class="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition font-medium"
              >
                Позже
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close', 'start'])

const currentLevel = computed(() => {
  const levels = {
    1: 'Начинающий',
    2: 'Любитель',
    3: 'Продвинутый',
    4: 'Эксперт'
  }
  return levels[authStore.currentUser?.fitnessLevel] || 'Неизвестно'
})

const startReassessment = () => {
  emit('start')
  router.push('/reassessment')
}

const closeModal = () => {
  emit('close')
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.animate-bounce-in {
  animation: bounceIn 0.5s ease-out;
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
