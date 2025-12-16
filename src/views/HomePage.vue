<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-blue-600 flex items-center gap-2">
          <span class="text-3xl">💪</span>
          <span class="hidden sm:inline">FitMaster</span>
        </h1>
        <nav class="flex gap-4">
          <RouterLink 
            to="/login" 
            class="px-4 py-2 rounded-lg border-2 border-blue-500 text-blue-500 hover:bg-blue-50 transition"
          >
            Вход
          </RouterLink>
          <RouterLink 
            to="/register" 
            class="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            Регистрация
          </RouterLink>
        </nav>
      </div>
    </header>

    <!-- Hero -->
    <section class="flex-1 flex items-center justify-center px-4 py-20">
      <div class="text-center max-w-2xl">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
          Ваш персональный тренер в кармане
        </h2>
        <p class="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
          FitMaster - это система индивидуальных физических тренировок, которая адаптируется к вашему уровню подготовки и помогает вам достичь своих целей
        </p>
        <div class="flex gap-4 justify-center flex-wrap">
          <RouterLink 
            to="/register" 
            class="btn-primary text-lg"
          >
            Начать прямо сейчас
          </RouterLink>
          <button 
            @click="tryAsDemo" 
            class="btn-secondary text-lg"
          >
            Демо вход (user1/user123)
          </button>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="bg-white py-16 px-4">
      <div class="max-w-6xl mx-auto">
        <h3 class="text-3xl font-bold text-center mb-12 text-gray-800">Возможности</h3>
        <div class="grid md:grid-cols-3 gap-6 mb-8">
          <div class="card text-center">
            <div class="text-5xl mb-4">📊</div>
            <h4 class="font-bold text-lg mb-2 text-gray-800">Тест уровня</h4>
            <p class="text-gray-600">Определяем ваш уровень подготовки через интерактивный тест</p>
          </div>
          <div class="card text-center">
            <div class="text-5xl mb-4">📈</div>
            <h4 class="font-bold text-lg mb-2 text-gray-800">Персональная программа</h4>
            <p class="text-gray-600">Адаптивная программа тренировок, которая растет с вами</p>
          </div>
          <div class="card text-center">
            <div class="text-5xl mb-4">🎯</div>
            <h4 class="font-bold text-lg mb-2 text-gray-800">Прогресс в реальном времени</h4>
            <p class="text-gray-600">Отслеживайте свои достижения и получайте награды</p>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          <div class="card">
            <h4 class="font-bold text-lg mb-3 text-gray-800">💻 Интуитивный интерфейс</h4>
            <p class="text-gray-600 mb-4">Приложение полностью оптимизировано для мобильных устройств и работает плавно на всех экранах</p>
            <ul class="text-sm text-gray-600 space-y-2">
              <li>✓ Мобильный первый подход</li>
              <li>✓ Быстрая загрузка</li>
              <li>✓ Оффлайн поддержка</li>
            </ul>
          </div>
          <div class="card">
            <h4 class="font-bold text-lg mb-3 text-gray-800">🏆 Система достижений</h4>
            <p class="text-gray-600 mb-4">Получайте баллы за каждую тренировку и повышайте свой уровень</p>
            <ul class="text-sm text-gray-600 space-y-2">
              <li>✓ Баллы подготовленности</li>
              <li>✓ История тренировок</li>
              <li>✓ Автоматическое повышение</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section class="py-16 px-4 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div class="max-w-6xl mx-auto">
        <h3 class="text-3xl font-bold text-center mb-12 text-gray-800">Как это работает</h3>
        <div class="grid md:grid-cols-4 gap-4">
          <div class="bg-white rounded-lg shadow-md p-6 text-center">
            <div class="text-4xl mb-4">1️⃣</div>
            <h4 class="font-bold mb-2 text-gray-800">Регистрация</h4>
            <p class="text-sm text-gray-600">Создайте аккаунт за несколько секунд</p>
          </div>
          <div class="bg-white rounded-lg shadow-md p-6 text-center">
            <div class="text-4xl mb-4">2️⃣</div>
            <h4 class="font-bold mb-2 text-gray-800">Тест</h4>
            <p class="text-sm text-gray-600">Пройдите небольшой тест для определения уровня</p>
          </div>
          <div class="bg-white rounded-lg shadow-md p-6 text-center">
            <div class="text-4xl mb-4">3️⃣</div>
            <h4 class="font-bold mb-2 text-gray-800">Тренируйтесь</h4>
            <p class="text-sm text-gray-600">Выполняйте упражнения из вашей программы</p>
          </div>
          <div class="bg-white rounded-lg shadow-md p-6 text-center">
            <div class="text-4xl mb-4">4️⃣</div>
            <h4 class="font-bold mb-2 text-gray-800">Растите</h4>
            <p class="text-sm text-gray-600">Повышайте уровень и получайте сложные упражнения</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-8 px-4 mt-auto">
      <div class="max-w-6xl mx-auto text-center">
        <p class="text-gray-400 mb-4">FitMaster - Система индивидуальных физических тренировок</p>
        <p class="text-xs text-gray-500">
          Дипломный проект | Создано на Vue 3 с Pinia и Vue Router
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const tryAsDemo = () => {
  const result = authStore.login('user1', 'user123')
  if (result.success) {
    const user = authStore.currentUser
    if (user.completedTests) {
      router.push('/dashboard')
    } else {
      router.push('/test')
    }
  }
}
</script>
