import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTrainingStore = defineStore('training', () => {
  const testQuestions = ref([
    // Новый упрощенный входной тест - только выбор ответа
    {
      id: 1,
      question: 'Сколько отжиманий вы можете сделать без перерыва?',
      type: 'multiple',
      category: 'strength',
      options: [
        { text: 'Меньше 5', value: 0 },
        { text: '5-10', value: 1 },
        { text: '11-20', value: 2 },
        { text: '21-30', value: 3 },
        { text: 'Больше 30', value: 4 },
      ],
    },
    {
      id: 2,
      question: 'Сколько подтягиваний вы можете сделать без перерыва?',
      type: 'multiple',
      category: 'strength',
      options: [
        { text: '0 (не могу)', value: 0 },
        { text: '1-3', value: 1 },
        { text: '4-7', value: 2 },
        { text: '8-12', value: 3 },
        { text: 'Больше 12', value: 4 },
      ],
    },
    {
      id: 3,
      question: 'Сколько минут вы можете держать планку?',
      type: 'multiple',
      category: 'endurance',
      options: [
        { text: 'Менее 30 секунд', value: 0 },
        { text: '30 сек - 1 минута', value: 1 },
        { text: '1-2 минуты', value: 2 },
        { text: '2-3 минуты', value: 3 },
        { text: 'Более 3 минут', value: 4 },
      ],
    },
    {
      id: 4,
      question: 'Сколько времени вы можете непрерывно бежать?',
      type: 'multiple',
      category: 'endurance',
      options: [
        { text: 'Менее 5 минут', value: 0 },
        { text: '5-10 минут', value: 1 },
        { text: '10-20 минут', value: 2 },
        { text: '20-30 минут', value: 3 },
        { text: 'Более 30 минут', value: 4 },
      ],
    },
    {
      id: 5,
      question: 'Можете ли вы сесть на шпагат?',
      type: 'multiple',
      category: 'flexibility',
      options: [
        { text: 'Нет, не могу', value: 0 },
        { text: 'Могу частично', value: 1 },
        { text: 'Могу сесть на продольный шпагат', value: 2 },
        { text: 'Могу сесть на поперечный шпагат', value: 3 },
      ],
    },
    {
      id: 6,
      question: 'Как долго вы можете стоять на одной ноге с закрытыми глазами?',
      type: 'multiple',
      category: 'coordination',
      options: [
        { text: 'Менее 5 секунд', value: 0 },
        { text: '5-10 секунд', value: 1 },
        { text: '10-20 секунд', value: 2 },
        { text: 'Более 20 секунд', value: 3 },
      ],
    },
    {
      id: 7,
      question: 'Как часто вы тренировались в последние 3 месяца?',
      type: 'multiple',
      category: 'activity',
      options: [
        { text: 'Не тренировался', value: 0 },
        { text: '1 раз в неделю', value: 1 },
        { text: '2-3 раза в неделю', value: 2 },
        { text: '4-5 раз в неделю', value: 3 },
        { text: 'Каждый день', value: 4 },
      ],
    },
    {
      id: 8,
      question: 'Какой у вас опыт в силовых тренировках?',
      type: 'multiple',
      category: 'experience',
      options: [
        { text: 'Нет опыта', value: 0 },
        { text: 'Менее 6 месяцев', value: 1 },
        { text: '6 месяцев - 1 год', value: 2 },
        { text: '1-3 года', value: 3 },
        { text: 'Более 3 лет', value: 4 },
      ],
    },
    {
      id: 9,
      question:
        'Есть ли у вас проблемы со здоровьем, ограничивающие тренировки?',
      type: 'multiple',
      category: 'health',
      options: [
        { text: 'Да, серьезные ограничения', value: 0 },
        { text: 'Да, небольшие проблемы', value: 1 },
        { text: 'Иногда возникают боли', value: 2 },
        { text: 'Нет проблем со здоровьем', value: 3 },
      ],
    },
    {
      id: 10,
      question: 'Какая ваша основная цель в тренировках?',
      type: 'multiple',
      category: 'goals',
      options: [
        { text: 'Просто быть активным', value: 1 },
        { text: 'Улучшить здоровье', value: 2 },
        { text: 'Похудеть', value: 2 },
        { text: 'Набрать мышечную массу', value: 3 },
        { text: 'Достичь спортивных результатов', value: 4 },
      ],
    },
  ]);

  // Расширенные вопросы для переоценки (28 вопросов)
  const reassessmentQuestions = ref([
    // Блок 1: Практические упражнения (выполняются прямо сейчас)
    {
      id: 1,
      question:
        '🔥 ПРАКТИЧЕСКОЕ ЗАДАНИЕ: Сейчас выполните 10 отжиманий и введите количество, которое вы реально сделали:',
      type: 'input',
      category: 'practical_pushups',
      placeholder: 'Введите количество отжиманий (0-50)',
      minValue: 0,
      maxValue: 50,
      inputType: 'number',
      instruction:
        'Поставьте таймер на 30 секунд и выполните максимальное количество отжиманий. Введите точно то количество, которое получилось.',
      pointsCalculation: (value) => {
        if (value >= 25) return 5;
        if (value >= 15) return 4;
        if (value >= 10) return 3;
        if (value >= 5) return 2;
        if (value >= 1) return 1;
        return 0;
      },
    },
    {
      id: 2,
      question:
        '🔥 ПРАКТИЧЕСКОЕ ЗАДАНИЕ: Подтянитесь на перекладине столько раз, сколько можете. Введите количество:',
      type: 'input',
      category: 'practical_pullups',
      placeholder: 'Введите количество подтягиваний (0-30)',
      minValue: 0,
      maxValue: 30,
      inputType: 'number',
      instruction:
        'Найдите перекладину или турник. Выполните максимальное количество подтягиваний. Если не можете подтянуться - введите 0.',
      pointsCalculation: (value) => {
        if (value >= 15) return 5;
        if (value >= 10) return 4;
        if (value >= 5) return 3;
        if (value >= 2) return 2;
        if (value >= 1) return 1;
        return 0;
      },
    },
    {
      id: 3,
      question:
        '🔥 ПРАКТИЧЕСКОЕ ЗАДАНИЕ: Удерживайте планку 30 секунд. Сколько секунд вы продержались?',
      type: 'input',
      category: 'practical_plank',
      placeholder: 'Время в секундах (0-120)',
      minValue: 0,
      maxValue: 120,
      inputType: 'number',
      instruction:
        'Примите упор лежа и держите планку. Засеките время до момента, когда устанете и опуститесь. Введите время в секундах.',
      pointsCalculation: (value) => {
        if (value >= 90) return 5;
        if (value >= 60) return 4;
        if (value >= 30) return 3;
        if (value >= 15) return 2;
        if (value >= 5) return 1;
        return 0;
      },
    },

    // Блок 2: Силовые упражнения (оценочные)
    {
      id: 4,
      question:
        'Сколько классических отжиманий вы можете сделать без перерыва?',
      type: 'multiple',
      category: 'strength_pushups',
      options: [
        { text: 'Меньше 5', value: 0 },
        { text: '5-10', value: 1 },
        { text: '11-20', value: 2 },
        { text: '21-30', value: 3 },
        { text: '31-40', value: 4 },
        { text: 'Более 40', value: 5 },
      ],
    },
    {
      id: 5,
      question:
        'Сколько подтягиваний (классических) вы можете сделать без перерыва?',
      type: 'multiple',
      category: 'strength_pullups',
      options: [
        { text: '0 (не могу)', value: 0 },
        { text: '1-3', value: 1 },
        { text: '4-7', value: 2 },
        { text: '8-12', value: 3 },
        { text: '13-20', value: 4 },
        { text: 'Более 20', value: 5 },
      ],
    },
    {
      id: 6,
      question: 'Сколько приседаний вы можете сделать без перерыва?',
      type: 'multiple',
      category: 'strength_squats',
      options: [
        { text: 'Меньше 10', value: 0 },
        { text: '10-20', value: 1 },
        { text: '21-40', value: 2 },
        { text: '41-60', value: 3 },
        { text: '61-80', value: 4 },
        { text: 'Более 80', value: 5 },
      ],
    },
    {
      id: 7,
      question:
        'Сколько отжиманий на брусьях (или обратных отжиманий) вы можете сделать?',
      type: 'multiple',
      category: 'strength_dips',
      options: [
        { text: '0 (не могу)', value: 0 },
        { text: '1-5', value: 1 },
        { text: '6-10', value: 2 },
        { text: '11-15', value: 3 },
        { text: '16-25', value: 4 },
        { text: 'Более 25', value: 5 },
      ],
    },
    {
      id: 8,
      question:
        'Можете ли вы сделать 10 подряд отжиманий в стойке на руках у стены?',
      type: 'multiple',
      category: 'strength_handstand',
      options: [
        { text: 'Нет, не умею стоять на руках', value: 0 },
        { text: 'Умею стоять, но не могу отжиматься', value: 1 },
        { text: 'Могу 1-3 отжимания', value: 2 },
        { text: 'Могу 4-7 отжиманий', value: 3 },
        { text: 'Могу 8-10 отжиманий', value: 4 },
        { text: 'Могу более 10 отжиманий', value: 5 },
      ],
    },

    // Блок 3: Выносливость и кардио
    {
      id: 9,
      question: 'Сколько минут вы можете держать планку?',
      type: 'multiple',
      category: 'endurance_plank',
      options: [
        { text: 'Менее 30 секунд', value: 0 },
        { text: '30 сек - 1 минута', value: 1 },
        { text: '1-2 минуты', value: 2 },
        { text: '2-3 минуты', value: 3 },
        { text: '3-5 минут', value: 4 },
        { text: 'Более 5 минут', value: 5 },
      ],
    },
    {
      id: 10,
      question: 'Сколько времени вы можете непрерывно бежать в среднем темпе?',
      type: 'multiple',
      category: 'endurance_running',
      options: [
        { text: 'Менее 5 минут', value: 0 },
        { text: '5-10 минут', value: 1 },
        { text: '10-20 минут', value: 2 },
        { text: '20-30 минут', value: 3 },
        { text: '30-60 минут', value: 4 },
        { text: 'Более часа', value: 5 },
      ],
    },
    {
      id: 11,
      question:
        'Сколько прыжков через скакалку вы можете сделать без остановки?',
      type: 'multiple',
      category: 'endurance_jumping',
      options: [
        { text: 'Менее 20', value: 0 },
        { text: '20-50', value: 1 },
        { text: '51-100', value: 2 },
        { text: '101-150', value: 3 },
        { text: '151-200', value: 4 },
        { text: 'Более 200', value: 5 },
      ],
    },
    {
      id: 12,
      question: 'Сколько раз можете подпрыгнуть на месте за 30 секунд?',
      type: 'multiple',
      category: 'endurance_jumping_alt',
      options: [
        { text: 'Менее 20', value: 0 },
        { text: '20-30', value: 1 },
        { text: '31-45', value: 2 },
        { text: '46-60', value: 3 },
        { text: '61-80', value: 4 },
        { text: 'Более 80', value: 5 },
      ],
    },

    // Блок 4: Функциональная сила и координация
    {
      id: 13,
      question: 'Можете ли вы сделать 10 burpees подряд без остановки?',
      type: 'multiple',
      category: 'functional_burpees',
      options: [
        { text: 'Нет, не знаю что это', value: 0 },
        { text: 'Могу 1-3', value: 1 },
        { text: 'Могу 4-6', value: 2 },
        { text: 'Могу 7-10', value: 3 },
        { text: 'Могу 11-15', value: 4 },
        { text: 'Могу более 15', value: 5 },
      ],
    },
    {
      id: 14,
      question: 'Можете ли вы сделать стойку на руках у стены?',
      type: 'multiple',
      category: 'coordination_handstand',
      options: [
        { text: 'Нет, не умею', value: 0 },
        { text: 'Могу простоять 5-10 секунд', value: 1 },
        { text: 'Могу простоять 11-30 секунд', value: 2 },
        { text: 'Могу простоять 31-60 секунд', value: 3 },
        { text: 'Могу простоять 1-2 минуты', value: 4 },
        { text: 'Могу более 2 минут', value: 5 },
      ],
    },
    {
      id: 15,
      question: 'Как долго вы можете стоять на одной ноге с закрытыми глазами?',
      type: 'multiple',
      category: 'coordination_balance',
      options: [
        { text: 'Менее 5 секунд', value: 0 },
        { text: '5-10 секунд', value: 1 },
        { text: '10-20 секунд', value: 2 },
        { text: '20-30 секунд', value: 3 },
        { text: '30-60 секунд', value: 4 },
        { text: 'Более минуты', value: 5 },
      ],
    },

    // Блок 5: Гибкость и мобильность
    {
      id: 16,
      question: 'Можете ли вы сесть на продольный шпагат?',
      type: 'multiple',
      category: 'flexibility_straddle',
      options: [
        { text: 'Нет, совсем не гибкий', value: 0 },
        { text: 'Могу сесть на 120-140 градусов', value: 1 },
        { text: 'Могу сесть на 140-160 градусов', value: 2 },
        { text: 'Могу сесть на 160-170 градусов', value: 3 },
        { text: 'Могу сесть на шпагат (180 градусов)', value: 4 },
        { text: 'Могу сесть на шпагат с запасом', value: 5 },
      ],
    },
    {
      id: 17,
      question: 'Можете ли вы сесть на поперечный шпагат?',
      type: 'multiple',
      category: 'flexibility_side',
      options: [
        { text: 'Нет, совсем не гибкий', value: 0 },
        { text: 'Могу частично', value: 1 },
        { text: 'Могу сесть на 70-80%', value: 2 },
        { text: 'Могу сесть на 80-90%', value: 3 },
        { text: 'Могу сесть на шпагат полностью', value: 4 },
        { text: 'Могу сесть на шпагат с запасом', value: 5 },
      ],
    },
    {
      id: 18,
      question: 'Можете ли вы сделать глубокий присед с прямой спиной?',
      type: 'multiple',
      category: 'mobility_squat',
      options: [
        { text: 'Нет, падаю назад', value: 0 },
        { text: 'Могу присесть до 90 градусов', value: 1 },
        { text: 'Могу присесть глубоко, но не идеально', value: 2 },
        { text: 'Могу сделать идеальный глубокий присед', value: 3 },
        { text: 'Могу держать глубокий присет 1-2 минуты', value: 4 },
        { text: 'Могу делать приседания в глубоком приседе', value: 5 },
      ],
    },

    // Блок 6: Специальные навыки
    {
      id: 19,
      question: 'Можете ли вы сделать колесо (переворот на руках)?',
      type: 'multiple',
      category: 'skills_wheel',
      options: [
        { text: 'Нет, не умею', value: 0 },
        { text: 'Умею, но только с помощью', value: 1 },
        { text: 'Могу сделать 1-2 раза', value: 2 },
        { text: 'Могу сделать 3-5 раз подряд', value: 3 },
        { text: 'Могу сделать серию из 10+ раз', value: 4 },
        { text: 'Могу делать колеса легко и красиво', value: 5 },
      ],
    },
    {
      id: 20,
      question: 'Можете ли вы сделать стойку на предплечьях (березка)?',
      type: 'multiple',
      category: 'skills_headstand',
      options: [
        { text: 'Нет, не умею', value: 0 },
        { text: 'Могу простоять 5-10 секунд', value: 1 },
        { text: 'Могу простоять 10-30 секунд', value: 2 },
        { text: 'Могу простоять 30-60 секунд', value: 3 },
        { text: 'Могу простоять 1-2 минуты', value: 4 },
        { text: 'Могу более 2 минут + переходы', value: 5 },
      ],
    },

    // Блок 7: Активность и опыт
    {
      id: 21,
      question: 'Как часто вы тренировались в последние 3 месяца?',
      type: 'multiple',
      category: 'activity_frequency',
      options: [
        { text: 'Не тренировался совсем', value: 0 },
        { text: '1 раз в неделю', value: 1 },
        { text: '2-3 раза в неделю', value: 2 },
        { text: '4-5 раз в неделю', value: 3 },
        { text: '6 раз в неделю', value: 4 },
        { text: 'Каждый день + дополнительно', value: 5 },
      ],
    },
    {
      id: 22,
      question: 'Какой у вас опыт в функциональных тренировках?',
      type: 'multiple',
      category: 'experience_functional',
      options: [
        { text: 'Нет опыта', value: 0 },
        { text: 'Менее 3 месяцев', value: 1 },
        { text: '3-6 месяцев', value: 2 },
        { text: '6 месяцев - 1 год', value: 3 },
        { text: '1-2 года', value: 4 },
        { text: 'Более 2 лет', value: 5 },
      ],
    },
    {
      id: 23,
      question:
        'Участвовали ли вы в соревнованиях по кроссфиту или гимнастике?',
      type: 'multiple',
      category: 'experience_competitions',
      options: [
        { text: 'Нет, не участвовал', value: 0 },
        { text: 'Только любительские соревнования', value: 1 },
        { text: '1-2 раза в году', value: 2 },
        { text: 'Регулярно, раз в квартал', value: 3 },
        { text: 'Часто, каждый месяц', value: 4 },
        { text: 'Профессиональный спортсмен', value: 5 },
      ],
    },

    // Блок 8: Здоровье и ограничения
    {
      id: 24,
      question:
        'Есть ли у вас проблемы со здоровьем, ограничивающие тренировки?',
      type: 'multiple',
      category: 'health_limitations',
      options: [
        { text: 'Да, серьезные ограничения', value: 0 },
        { text: 'Да, некоторые ограничения', value: 1 },
        { text: 'Иногда возникают боли', value: 2 },
        { text: 'Редкие небольшие проблемы', value: 3 },
        { text: 'Нет проблем со здоровьем', value: 4 },
        { text: 'Отличное здоровье', value: 5 },
      ],
    },
    {
      id: 25,
      question: 'Как часто у вас болят суставы после тренировок?',
      type: 'multiple',
      category: 'health_joints',
      options: [
        { text: 'Постоянно', value: 0 },
        { text: 'Часто', value: 1 },
        { text: 'Иногда', value: 2 },
        { text: 'Редко', value: 3 },
        { text: 'Очень редко', value: 4 },
        { text: 'Никогда', value: 5 },
      ],
    },

    // Блок 9: Цели и мотивация
    {
      id: 26,
      question: 'Какая ваша основная цель в тренировках?',
      type: 'multiple',
      category: 'goals',
      options: [
        { text: 'Просто быть активным', value: 1 },
        { text: 'Улучшить здоровье', value: 2 },
        { text: 'Похудеть', value: 2 },
        { text: 'Набрать мышечную массу', value: 3 },
        { text: 'Достичь спортивных результатов', value: 4 },
        { text: 'Стать профессиональным атлетом', value: 5 },
      ],
    },
    {
      id: 27,
      question: 'Насколько вы мотивированы к регулярным тренировкам?',
      type: 'multiple',
      category: 'motivation',
      options: [
        { text: 'Совсем не мотивирован', value: 0 },
        { text: 'Слабая мотивация', value: 1 },
        { text: 'Умеренная мотивация', value: 2 },
        { text: 'Высокая мотивация', value: 3 },
        { text: 'Очень высокая мотивация', value: 4 },
        { text: 'Мотивация на максимуме!', value: 5 },
      ],
    },
    {
      id: 28,
      question:
        'Готовы ли вы тренироваться 5-6 раз в неделю для достижения цели?',
      type: 'multiple',
      category: 'dedication',
      options: [
        { text: 'Нет, максимум 2-3 раза в неделю', value: 0 },
        { text: 'Могу 3-4 раза в неделю', value: 1 },
        { text: 'Могу 4-5 раз в неделю', value: 2 },
        { text: 'Могу 5-6 раз в неделю', value: 3 },
        { text: 'Могу каждый день', value: 4 },
        { text: 'Готов на любые нагрузки!', value: 5 },
      ],
    },
  ]);

  const trainingPrograms = ref([
    {
      id: 1,
      name: 'Начинающий',
      level: 1,
      description: 'Для новичков без опыта тренировок',
      duration: 4,
      exercises: [1, 2, 3],
      schedule: 'ПН, СР, ПТ',
    },
    {
      id: 2,
      name: 'Любитель',
      level: 2,
      description: 'Для регулярно тренирующихся',
      duration: 6,
      exercises: [1, 2, 3, 4],
      schedule: 'ПН, ВТ, СР, ПТ, СБ',
    },
    {
      id: 3,
      name: 'Продвинутый',
      level: 3,
      description: 'Для опытных спортсменов',
      duration: 8,
      exercises: [1, 2, 3, 4, 5],
      schedule: 'ПН-СБ с выходным в СВ',
    },
    {
      id: 4,
      name: 'Эксперт',
      level: 4,
      description: 'Для профессиональных атлетов и спортсменов',
      duration: 10,
      exercises: [1, 2, 3, 4, 5, 6],
      schedule: 'Ежедневно с вариативными тренировками',
    },
  ]);

  const userSessions = ref([]);

  const calculateFitnessScore = (answers) => {
    let totalScore = 0;

    answers.forEach((answer) => {
      if (answer.type === 'input' && answer.pointsCalculation) {
        // Для практических заданий используем специальную функцию подсчета
        const points = answer.pointsCalculation(parseInt(answer.value));
        totalScore += points;
      } else {
        // Для обычных вопросов используем значение ответа
        totalScore += answer.value || 0;
      }
    });

    let level;
    if (totalScore <= 30) {
      level = 1; // 0-30 баллов = Начинающий
    } else if (totalScore <= 60) {
      level = 2; // 31-60 баллов = Любитель
    } else if (totalScore <= 90) {
      level = 3; // 61-90 баллов = Продвинутый
    } else {
      level = 4; // 91+ баллов = Эксперт
    }

    const points = Math.round(totalScore * 1.5);
    return { level, points, rawScore: totalScore };
  };

  const createTrainingProgram = (userId, level) => {
    const program = trainingPrograms.value.find((p) => p.level === level);
    return program ? { ...program, userId, startDate: new Date() } : null;
  };

  const completeSession = (userId, programId, duration) => {
    const session = {
      id: Math.random(),
      userId,
      programId,
      completedAt: new Date(),
      duration,
      pointsEarned: Math.floor(duration / 5) * 10,
    };
    userSessions.value.push(session);
    return session;
  };

  const getUserProgress = (userId) => {
    const sessions = userSessions.value.filter((s) => s.userId === userId);
    return {
      totalSessions: sessions.length,
      totalMinutes: sessions.reduce((sum, s) => sum + s.duration, 0),
      totalPoints: sessions.reduce((sum, s) => sum + s.pointsEarned, 0),
    };
  };

  const checkIfReassessmentNeeded = (userId) => {
    const userSessionsArray = userSessions.value.filter(
      (s) => s.userId === userId
    );

    if (userSessionsArray.length === 0) return false;

    let lastReassessmentDate = null;
    const stored = localStorage.getItem(`lastReassessment_${userId}`);
    if (stored) {
      lastReassessmentDate = new Date(JSON.parse(stored));
    } else {
      // Если это первая проверка, устанавливаем дату первой тренировки
      lastReassessmentDate = userSessionsArray[0].completedAt;
    }

    const now = new Date();
    const daysSinceLastReassessment = Math.floor(
      (now - new Date(lastReassessmentDate)) / (1000 * 60 * 60 * 24)
    );

    return daysSinceLastReassessment >= 14; // Возвращаем реальные 14 дней
  };

  const recordReassessment = (userId) => {
    localStorage.setItem(
      `lastReassessment_${userId}`,
      JSON.stringify(new Date().toISOString())
    );
  };

  // Константы для дней недели
  const DAYS_OF_WEEK = {
    ПН: 1,
    ВТ: 2,
    СР: 3,
    ЧТ: 4,
    ПТ: 5,
    СБ: 6,
    ВС: 0,
  };

  // Функция для получения дня недели из расписания
  const parseScheduleDays = (schedule) => {
    const days = [];
    const scheduleText = schedule.toUpperCase();

    // Обработка различных форматов расписания
    if (scheduleText.includes('ПН-СБ')) {
      return [1, 2, 3, 4, 5, 6]; // Понедельник-Суббота
    }

    // Разделяем по запятой
    const dayParts = scheduleText.split(/[, ]+/);

    for (const part of dayParts) {
      const day = DAYS_OF_WEEK[part.trim()];
      if (day !== undefined) {
        days.push(day);
      }
    }

    return days;
  };

  // Функция для проверки, является ли текущий день днем тренировки
  const isTrainingDay = (schedule) => {
    const currentDay = new Date().getDay(); // 0=ВС, 1=ПН, ..., 6=СБ
    const trainingDays = parseScheduleDays(schedule);
    return trainingDays.includes(currentDay);
  };

  // Функция для симуляции автоматической тренировки
  const simulateTraining = (userId, program) => {
    if (!program || !isTrainingDay(program.schedule)) {
      return null;
    }

    // Генерируем случайную продолжительность тренировки (15-45 минут)
    const duration = Math.floor(Math.random() * 30) + 15;

    // Генерируем случайные баллы за тренировку
    const pointsEarned = Math.floor(duration / 5) * 10;

    // Создаем запись о тренировке
    const session = {
      id: Math.random(),
      userId,
      programId: program.id,
      completedAt: new Date(),
      duration,
      pointsEarned,
    };

    userSessions.value.push(session);
    return session;
  };

  // Функция для запуска всех автоматических тренировок пользователя
  const runAutoTraining = (userId, authStore) => {
    const user = authStore.currentUser;

    if (!user || !user.currentProgram || user.role !== 'user') {
      return [];
    }

    // Проверяем, нужно ли выполнять тренировку сегодня
    if (!isTrainingDay(user.currentProgram.schedule)) {
      return [];
    }

    // Проверяем, не было ли уже тренировки сегодня
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todaySessions = userSessions.value.filter((session) => {
      const sessionDate = new Date(session.completedAt);
      sessionDate.setHours(0, 0, 0, 0);
      return (
        session.userId === userId && sessionDate.getTime() === today.getTime()
      );
    });

    // Если тренировка сегодня уже была, не выполняем повторно
    if (todaySessions.length > 0) {
      return [];
    }

    // Выполняем симуляцию тренировки
    const session = simulateTraining(userId, user.currentProgram);

    if (session) {
      // Обновляем баллы пользователя
      const newPoints = user.points + session.pointsEarned;
      authStore.updateUserPoints(newPoints);

      // Проверяем, не пора ли делать переоценку
      const needsReassessment = checkIfReassessmentNeeded(userId);
      if (needsReassessment) {
        authStore.updateReassessmentStatus(true);
      }
    }

    return session ? [session] : [];
  };

  // Additional functionality can be added here

  // Функции для управления программами тренировок (администратор)
  const addTrainingProgram = (program) => {
    const newId = Math.max(...trainingPrograms.value.map((p) => p.id), 0) + 1;
    trainingPrograms.value.push({
      ...program,
      id: newId,
      exercises: program.exercises || [],
    });
    return { success: true, id: newId };
  };

  const updateTrainingProgram = (id, updates) => {
    const index = trainingPrograms.value.findIndex((p) => p.id === id);
    if (index !== -1) {
      trainingPrograms.value[index] = {
        ...trainingPrograms.value[index],
        ...updates,
      };
      return { success: true };
    }
    return { success: false, error: 'Программа не найдена' };
  };

  const deleteTrainingProgram = (id) => {
    const index = trainingPrograms.value.findIndex((p) => p.id === id);
    if (index !== -1) {
      trainingPrograms.value.splice(index, 1);
      return { success: true };
    }
    return { success: false, error: 'Программа не найдена' };
  };

  const getTrainingProgramById = (id) => {
    return trainingPrograms.value.find((p) => p.id === id);
  };

  return {
    testQuestions,
    reassessmentQuestions,
    trainingPrograms,
    userSessions,
    calculateFitnessScore,
    createTrainingProgram,
    completeSession,
    getUserProgress,
    checkIfReassessmentNeeded,
    recordReassessment,
    parseScheduleDays,
    isTrainingDay,
    simulateTraining,
    runAutoTraining,
    addTrainingProgram,
    updateTrainingProgram,
    deleteTrainingProgram,
    getTrainingProgramById,
  };
});
