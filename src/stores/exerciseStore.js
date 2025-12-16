import { defineStore } from "pinia"
import { ref } from "vue"

export const useExerciseStore = defineStore("exercise", () => {
  const exercises = ref([
    {
      id: 1,
      name: "Отжимания",
      description: "Классические отжимания от пола",
      technique: "Встаньте в позицию планки, опустите тело до пола, затем поднимите себя вверх.",
      sets: 3,
      reps: 10,
      difficulty: 1,
      image: "/-----------------.jpg",
      targetGroup: "Грудь, трицепсы",
      category: "Базовые",
    },
    {
      id: 2,
      name: "Приседания",
      description: "Приседания собственным весом",
      technique: "Ноги на ширине плеч, приседайте как будто садитесь на стул.",
      sets: 3,
      reps: 15,
      difficulty: 1,
      image: "/----------.jpg",
      targetGroup: "Ноги, ягодицы",
      category: "Базовые",
    },
    {
      id: 3,
      name: "Планка",
      description: "Статическое упражнение на кор",
      technique: "Встаньте в позицию отжимания, сохраняйте тело прямым 30-60 секунд.",
      sets: 3,
      reps: "30-60 сек",
      difficulty: 1,
      image: "/-----------------.jpg",
      targetGroup: "Кор",
      category: "Базовые",
    },
    {
      id: 4,
      name: "Берпи",
      description: "Полнотелесное упражнение",
      technique: "Встаньте прямо, присядьте, прыгните в позицию планки, вернитесь.",
      sets: 3,
      reps: 10,
      difficulty: 2,
      image: "/----------------.jpg",
      targetGroup: "Все группы мышц",
      category: "Интенсивные",
    },
    {
      id: 5,
      name: "Подтягивания",
      description: "Упражнение на турнике",
      technique: "Держитесь за перекладину хватом сверху, подтягивайте себя вверх.",
      sets: 3,
      reps: 8,
      difficulty: 3,
      image: "/------------.jpg",
      targetGroup: "Спина, бицепсы",
      category: "Продвинутые",
    },
  ])

  const getExercisesByDifficulty = (difficulty) => {
    return exercises.value.filter((e) => e.difficulty <= difficulty)
  }

  const addExercise = (exercise) => {
    const newId = Math.max(...exercises.value.map((e) => e.id), 0) + 1
    exercises.value.push({ ...exercise, id: newId })
    return { success: true, id: newId }
  }

  const updateExercise = (id, updates) => {
    const index = exercises.value.findIndex((e) => e.id === id)
    if (index !== -1) {
      exercises.value[index] = { ...exercises.value[index], ...updates }
      return { success: true }
    }
    return { success: false, error: "Упражнение не найдено" }
  }

  const deleteExercise = (id) => {
    const index = exercises.value.findIndex((e) => e.id === id)
    if (index !== -1) {
      exercises.value.splice(index, 1)
      return { success: true }
    }
    return { success: false }
  }

  // Additional functionality can be added here

  return {
    exercises,
    getExercisesByDifficulty,
    addExercise,
    updateExercise,
    deleteExercise,
  }
})
