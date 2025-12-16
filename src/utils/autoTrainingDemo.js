/**
 * Демонстрация системы автоматических тренировок с ускоренным таймером
 *
 * Эта система автоматически выполняет тренировки пользователя согласно расписанию
 * и запускает тест переоценки каждые 2 недели (в демо-режиме: каждые 1 минуту).
 *
 * Как это работает:
 * 1. При загрузке UserDashboard вызывается trainingStore.runAutoTraining()
 * 2. Система проверяет расписание программы пользователя
 * 3. Если сегодня день тренировки и её ещё не было, выполняется симуляция
 * 4. Тренировка записывается в историю с случайной продолжительностью и баллами
 * 5. Обновляются баллы пользователя
 * 6. Проверяется, не пора ли делать переоценку (каждые 1 минуту в демо-режиме)
 *
 * Расписание программ:
 * - Начинающий: ПН, СР, ПТ (3 раза в неделю)
 * - Любитель: ПН, ВТ, СР, ПТ, СБ (5 раз в неделю)
 * - Продвинутый: ПН-СБ с выходным в ВС (6 раз в неделю)
 *
 * Автоматические тренировки:
 * - Продолжительность: 15-45 минут (случайно)
 * - Баллы: продолжительность / 5 * 10
 * - Выполняются только один раз в день
 *
 * Переоценка (ДЕМО-РЕЖИМ):
 * - В реальном приложении: каждые 14 дней
 * - В демо-режиме: каждые 1 минуту
 * - Пользователь видит уведомление "Время переоценки!"
 * - После прохождения теста обновляется уровень подготовки
 *
 * Тестовые функции:
 * - forceReassessmentDate(userId, minutesAgo) - принудительно установить время переоценки
 * -(userId) - resetReassessmentTimer сбросить таймер переоценки
 * - getTimeUntilReassessment(userId) - получить время до следующей переоценки
 */

import { useTrainingStore } from '../stores/trainingStore';
import { useAuthStore } from '../stores/authStore';

export const demonstrateAutoTraining = () => {
  const trainingStore = useTrainingStore();
  const authStore = useAuthStore();

  console.log('=== ДЕМОНСТРАЦИЯ АВТОМАТИЧЕСКИХ ТРЕНИРОВОК (ДЕМО-РЕЖИМ) ===');

  // Пример 1: Проверка расписания
  console.log('\n1. Проверка расписания:');
  const beginnerProgram = trainingStore.trainingPrograms.find(
    (p) => p.level === 1
  );
  const advancedProgram = trainingStore.trainingPrograms.find(
    (p) => p.level === 3
  );

  console.log(
    'Начинающий (ПН, СР, ПТ):',
    trainingStore.parseScheduleDays(beginnerProgram.schedule)
  );
  console.log(
    'Продвинутый (ПН-СБ):',
    trainingStore.parseScheduleDays(advancedProgram.schedule)
  );

  // Пример 2: Проверка текущего дня
  const today = new Date();
  const dayNames = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
  console.log(`\n2. Сегодня: ${dayNames[today.getDay()]}`);
  console.log(
    'День тренировки для начинающих?',
    trainingStore.isTrainingDay(beginnerProgram.schedule)
  );
  console.log(
    'День тренировки для продвинутых?',
    trainingStore.isTrainingDay(advancedProgram.schedule)
  );

  // Пример 3: Симуляция тренировки
  console.log('\n3. Симуляция тренировки:');
  if (authStore.currentUser && authStore.currentUser.currentProgram) {
    const session = trainingStore.simulateTraining(
      authStore.currentUser.id,
      authStore.currentUser.currentProgram
    );
    if (session) {
      console.log('Выполнена тренировка:', session);
    } else {
      console.log('Сегодня не день тренировки или тренировка уже была');
    }
  }

  // Пример 4: Проверка переоценки (ДЕМО-РЕЖИМ)
  console.log('\n4. Проверка переоценки (ДЕМО - 1 минута вместо 14 дней):');
  if (authStore.currentUser) {
    const needsReassessment = trainingStore.checkIfReassessmentNeeded(
      authStore.currentUser.id
    );
    console.log('Нужна переоценка?', needsReassessment);

    // Показать время до следующей переоценки
    const timeInfo = trainingStore.getTimeUntilReassessment(
      authStore.currentUser.id
    );
    if (timeInfo) {
      console.log(
        'Время с последней переоценки:',
        timeInfo.minutesElapsed,
        'мин'
      );
      console.log(
        'Время до следующей переоценки:',
        timeInfo.minutesUntilReassessment,
        'мин'
      );
      console.log('Нужна переоценка?', timeInfo.needsReassessment);
    }
  }

  console.log('\n5. Тестовые функции для демонстрации:');
  console.log(
    '- trainingStore.forceReassessmentDate(userId, minutesAgo) - установить время переоценки'
  );
  console.log(
    '- trainingStore.resetReassessmentTimer(userId) - сбросить таймер'
  );
  console.log(
    '- trainingStore.getTimeUntilReassessment(userId) - получить время до переоценки'
  );

  console.log('\n=== КОНЕЦ ДЕМОНСТРАЦИИ ===');
};

// Автоматический запуск при импорте (только в режиме разработки)
if (import.meta.env.DEV) {
  // Задержка для загрузки stores
  setTimeout(() => {
    demonstrateAutoTraining();
  }, 1000);
}
