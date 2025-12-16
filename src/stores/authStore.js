import { defineStore } from "pinia"
import { ref, computed } from "vue"

export const useAuthStore = defineStore("auth", () => {
  const currentUser = ref(null)
  const isAuthenticated = computed(() => !!currentUser.value)

  const mockUsers = {
    admin: {
      id: 1,
      username: "admin",
      password: "admin123",
      role: "admin",
      name: "Администратор",
      email: "admin@fitmaster.ru",
    },
    user1: {
      id: 2,
      username: "user1",
      password: "user123",
      role: "user",
      name: "Иван Петров",
      email: "ivan@fitmaster.ru",
      fitnessLevel: 1,
      points: 0,
      completedTests: false,
      trainingSessions: [],
      currentProgram: null,
      lastReassessmentDate: null,
      needsReassessment: false,
    },
  }

  const login = (username, password) => {
    const user = Object.values(mockUsers).find((u) => u.username === username && u.password === password)

    if (user) {
      currentUser.value = { ...user }
      localStorage.setItem("currentUser", JSON.stringify(currentUser.value))
      return { success: true }
    }
    return { success: false, error: "Неверные учетные данные" }
  }

  const register = (username, password, name, email) => {
    const exists = Object.values(mockUsers).some((u) => u.username === username)

    if (exists) {
      return { success: false, error: "Пользователь уже существует" }
    }

    const newUser = {
      id: Math.max(...Object.values(mockUsers).map((u) => u.id)) + 1,
      username,
      password,
      role: "user",
      name,
      email,
      fitnessLevel: 1,
      points: 0,
      completedTests: false,
      trainingSessions: [],
      currentProgram: null,
      lastReassessmentDate: null,
      needsReassessment: false,
    }

    mockUsers[username] = newUser
    currentUser.value = newUser
    localStorage.setItem("currentUser", JSON.stringify(currentUser.value))
    return { success: true }
  }

  const logout = () => {
    currentUser.value = null
    localStorage.removeItem("currentUser")
  }

  const updateUserPoints = (newPoints) => {
    if (currentUser.value) {
      currentUser.value.points = newPoints
      localStorage.setItem("currentUser", JSON.stringify(currentUser.value))
    }
  }

  const updateFitnessLevel = (newLevel) => {
    if (currentUser.value) {
      currentUser.value.fitnessLevel = newLevel
      localStorage.setItem("currentUser", JSON.stringify(currentUser.value))
    }
  }

  const initializeFromStorage = () => {
    const stored = localStorage.getItem("currentUser")
    if (stored) {
      currentUser.value = JSON.parse(stored)
    }
  }

  const updateReassessmentStatus = (needsReassessment) => {
    if (currentUser.value) {
      currentUser.value.needsReassessment = needsReassessment
      localStorage.setItem("currentUser", JSON.stringify(currentUser.value))
    }
  }

  const setLastReassessmentDate = (date) => {
    if (currentUser.value) {
      currentUser.value.lastReassessmentDate = date
      localStorage.setItem("currentUser", JSON.stringify(currentUser.value))
    }
  }

  return {
    currentUser,
    isAuthenticated,
    login,
    register,
    logout,
    updateUserPoints,
    updateFitnessLevel,
    initializeFromStorage,
    updateReassessmentStatus,
    setLastReassessmentDate,
  }
})
