<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="isOpen" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-bounce-in">
          <div class="bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-center text-white rounded-t-xl">
            <div class="text-5xl mb-2">💡</div>
            <h2 class="text-2xl font-bold">Персональные рекомендации</h2>
          </div>
          
          <div class="p-6">
            <!-- Вкладки -->
            <div class="flex flex-wrap gap-2 mb-6 border-b border-gray-200">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                @click="activeTab = tab.id"
                :class="[
                  'px-4 py-2 rounded-t-lg transition-all',
                  activeTab === tab.id 
                    ? 'bg-blue-100 text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-600 hover:text-gray-800'
                ]"
              >
                <span class="mr-2">{{ tab.icon }}</span>
                {{ tab.name }}
              </button>
            </div>

            <!-- Содержимое вкладок -->
            <div class="min-h-[400px]">
              <!-- Рекомендации по питанию -->
              <div v-if="activeTab === 'nutrition'" class="space-y-4">
                <div v-for="(recommendation, index) in nutritionRecommendations" :key="index" 
                     class="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                  <h4 class="font-semibold text-green-800 mb-2">{{ recommendation.title }}</h4>
                  <p class="text-green-700 text-sm">{{ recommendation.description }}</p>
                  <div v-if="recommendation.tips" class="mt-2">
                    <ul class="text-xs text-green-600 space-y-1">
                      <li v-for="(tip, tipIndex) in recommendation.tips" :key="tipIndex" class="flex items-start">
                        <span class="mr-1">•</span>
                        <span>{{ tip }}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <!-- Рекомендации по тренировкам -->
              <div v-if="activeTab === 'workout'" class="space-y-4">
                <div v-for="(recommendation, index) in workoutRecommendations" :key="index" 
                     class="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                  <h4 class="font-semibold text-blue-800 mb-2">{{ recommendation.title }}</h4>
                  <p class="text-blue-700 text-sm">{{ recommendation.description }}</p>
                  <div v-if="recommendation.exercises" class="mt-2">
                    <p class="text-xs text-blue-600 font-medium">Рекомендуемые упражнения:</p>
                    <ul class="text-xs text-blue-600 space-y-1">
                      <li v-for="(exercise, exIndex) in recommendation.exercises" :key="exIndex" class="flex items-start">
                        <span class="mr-1">•</span>
                        <span>{{ exercise }}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <!-- Рекомендации по отдыху -->
              <div v-if="activeTab === 'recovery'" class="space-y-4">
                <div v-for="(recommendation, index) in recoveryRecommendations" :key="index" 
                     class="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
                  <h4 class="font-semibold text-purple-800 mb-2">{{ recommendation.title }}</h4>
                  <p class="text-purple-700 text-sm">{{ recommendation.description }}</p>
                  <div v-if="recommendation.activities" class="mt-2">
                    <p class="text-xs text-purple-600 font-medium">Активности для восстановления:</p>
                    <ul class="text-xs text-purple-600 space-y-1">
                      <li v-for="(activity, actIndex) in recommendation.activities" :key="actIndex" class="flex items-start">
                        <span class="mr-1">•</span>
                        <span>{{ activity }}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <!-- Общие рекомендации -->
              <div v-if="activeTab === 'general'" class="space-y-4">
                <div v-for="(recommendation, index) in generalRecommendations" :key="index" 
                     class="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg">
                  <h4 class="font-semibold text-orange-800 mb-2">{{ recommendation.title }}</h4>
                  <p class="text-orange-700 text-sm">{{ recommendation.description }}</p>
                  <div v-if="recommendation.points" class="mt-2">
                    <ul class="text-xs text-orange-600 space-y-1">
                      <li v-for="(point, pointIndex) in recommendation.points" :key="pointIndex" class="flex items-start">
                        <span class="mr-1">•</span>
                        <span>{{ point }}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-gray-200">
              <button
                @click="closeModal"
                class="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition font-medium"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  userLevel: {
    type: Number,
    default: 1,
  }
})

const emit = defineEmits(['close'])

const activeTab = ref('nutrition')

const tabs = [
  { id: 'nutrition', name: 'Питание', icon: '🥗' },
  { id: 'workout', name: 'Тренировки', icon: '💪' },
  { id: 'recovery', name: 'Отдых', icon: '😴' },
  { id: 'general', name: 'Общие', icon: '📋' }
]

const nutritionRecommendations = computed(() => {
  const baseRecommendations = [
    {
      title: 'Сбалансированное питание',
      description: 'Поддерживайте баланс белков, жиров и углеводов в соотношении 30/30/40.',
      tips: [
        'Включите в рацион нежирное мясо, рыбу, яйца',
        'Ешьте овощи и фрукты каждый день',
        'Выбирайте сложные углеводы (каши, цельнозерновой хлеб)',
        'Ограничьте потребление сахара и фастфуда'
      ]
    },
    {
      title: 'Гидратация',
      description: 'Пейте достаточно воды для поддержания оптимального уровня гидратации.',
      tips: [
        'Выпивайте 8-10 стаканов воды в день',
        'Увеличьте потребление воды во время тренировок',
        'Носите с собой бутылку воды',
        'Пейте воду перед каждым приемом пищи'
      ]
    },
    {
      title: 'Время приема пищи',
      description: 'Соблюдайте режим питания для лучшего усвоения питательных веществ.',
      tips: [
        'Ешьте 5-6 раз в день небольшими порциями',
        'Последний прием пищи за 2-3 часа до сна',
        'Не пропускайте завтрак',
        'Планируйте приемы пищи заранее'
      ]
    }
  ]

  if (props.userLevel >= 2) {
    baseRecommendations.push({
      title: 'Питание для спортсменов',
      description: 'Оптимизируйте питание для достижения спортивных целей.',
      tips: [
        'Потребляйте белок в течение 30 минут после тренировки',
        'Используйте спортивное питание при интенсивных нагрузках',
        'Следите за калорийностью рациона',
        'Добавьте витамины и минералы'
      ]
    })
  }

  return baseRecommendations
})

const workoutRecommendations = computed(() => {
  const baseRecommendations = [
    {
      title: 'Регулярность тренировок',
      description: 'Поддерживайте постоянный график тренировок для достижения результата.',
      exercises: [
        '3-4 тренировки в неделю по 30-45 минут',
        'Чередуйте интенсивность тренировок',
        'Включите разные виды активности',
        'Следите за прогрессом'
      ]
    },
    {
      title: 'Разминка и заминка',
      description: 'Обязательно включайте разминку и заминку в каждую тренировку.',
      exercises: [
        '5-10 минут легкой кардио разминки',
        'Динамические растяжки перед тренировкой',
        'Статические растяжки после тренировки',
        'Упражнения на дыхание и расслабление'
      ]
    }
  ]

  if (props.userLevel >= 2) {
    baseRecommendations.push({
      title: 'Силовые тренировки',
      description: 'Добавьте силовые упражнения для укрепления мышц и костей.',
      exercises: [
        'Приседания, отжимания, подтягивания',
        'Ягодичный мост для укрепления ягодиц',
        'Отжимания на брусьях для груди и трицепсов',
        'Тренировки с собственным весом',
        'Использование гантелей или эспандеров',
        'Функциональные упражнения'
      ]
    })
  }

  if (props.userLevel >= 3) {
    baseRecommendations.push({
      title: 'Интервальные тренировки',
      description: 'Внедрите высокоинтенсивные интервальные тренировки (HIIT).',
      exercises: [
        'Чередование высокой и низкой интенсивности',
        'Берпи, прыжки в высоту, альпинист',
        '20-30 секунд максимальной нагрузки',
        'Подъем ног лежа для кардио',
        '1-2 минуты активного восстановления',
        '15-20 минут общей продолжительности'
      ]
    })
  }

  return baseRecommendations
})

const recoveryRecommendations = computed(() => {
  const baseRecommendations = [
    {
      title: 'Качественный сон',
      description: 'Обеспечьте себе полноценный отдых для восстановления организма.',
      activities: [
        '7-9 часов сна каждую ночь',
        'Соблюдайте режим сна',
        'Создайте комфортные условия для сна',
        'Избегайте экранов за час до сна'
      ]
    },
    {
      title: 'Активное восстановление',
      description: 'Используйте легкие физические активности для улучшения кровообращения.',
      activities: [
        'Прогулки на свежем воздухе',
        'Йога или растяжка',
        'Легкое плавание',
        'Велосипедные прогулки'
      ]
    },
    {
      title: 'Управление стрессом',
      description: 'Поддерживайте эмоциональное равновесие для лучшего восстановления.',
      activities: [
        'Медитация и дыхательные упражнения',
        'Чтение или прослушивание музыки',
        'Общение с близкими',
        'Хобби и творческие занятия'
      ]
    }
  ]

  if (props.userLevel >= 2) {
    baseRecommendations.push({
      title: 'Массаж и расслабление',
      description: 'Используйте профессиональные методы восстановления.',
      activities: [
        'Самомассаж с помощью валиков',
        'Посещение массажиста',
        'Сауна или баня (при отсутствии противопоказаний)',
        'Растяжка с элементами ПИЛАТЕС'
      ]
    })
  }

  return baseRecommendations
})

const generalRecommendations = computed(() => {
  const baseRecommendations = [
    {
      title: 'Постановка целей',
      description: 'Четко определите свои цели и составьте план их достижения.',
      points: [
        'Ставьте конкретные, измеримые цели',
        'Разбивайте большие цели на мелкие задачи',
        'Отслеживайте свой прогресс',
        'Празднуйте достижения'
      ]
    },
    {
      title: 'Мониторинг прогресса',
      description: 'Ведите дневник тренировок и питания для отслеживания прогресса.',
      points: [
        'Записывайте результаты тренировок',
        'Отмечайте изменения в самочувствии',
        'Фотографируйте прогресс',
        'Используйте приложения для фитнеса'
      ]
    },
    {
      title: 'Мотивация',
      description: 'Поддерживайте мотивацию на протяжении всего пути к цели.',
      points: [
        'Найдите единомышленников',
        'Вознаграждайте себя за достижения',
        'Помните о причине начала тренировок',
        'Не сравнивайте себя с другими'
      ]
    }
  ]

  if (props.userLevel >= 3) {
    baseRecommendations.push({
      title: 'Профессиональная помощь',
      description: 'Обращайтесь к специалистам для оптимизации тренировок.',
      points: [
        'Консультации с тренером',
        'Работа с диетологом',
        'Регулярные медицинские осмотры',
        'Биохимический анализ крови'
      ]
    })
  }

  return baseRecommendations
})

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