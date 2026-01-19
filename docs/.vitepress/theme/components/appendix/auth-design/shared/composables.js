// auth-design 公共组合式函数
import { ref, computed, onMounted, onUnmounted } from 'vue'

/**
 * 延迟函数
 * @param {number} ms - 延迟毫秒数
 * @returns {Promise<void>}
 */
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * 防抖函数
 * @param {Function} fn - 要防抖的函数
 * @param {number} wait - 等待时间（毫秒）
 * @returns {Function}
 */
export const useDebounce = (fn, wait = 300) => {
  let timeout = null
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), wait)
  }
}

/**
 * 步骤流程管理
 * @param {Array} steps - 步骤数组
 * @param {number} stepDelay - 每步延迟时间
 * @returns {Object}
 */
export const useStepFlow = (steps, stepDelay = 800) => {
  const currentStep = ref(0)
  const isProcessing = ref(false)

  const startFlow = async () => {
    isProcessing.value = true
    for (let i = 0; i < steps.length; i++) {
      currentStep.value = i + 1
      await delay(stepDelay)
    }
    isProcessing.value = false
  }

  const resetFlow = () => {
    currentStep.value = 0
    isProcessing.value = false
  }

  return {
    currentStep,
    isProcessing,
    startFlow,
    resetFlow
  }
}

/**
 * 异步操作状态管理
 * @returns {Object}
 */
export const useAsyncState = () => {
  const isLoading = ref(false)
  const error = ref(null)
  const data = ref(null)

  const execute = async (fn) => {
    isLoading.value = true
    error.value = null
    try {
      const result = await fn()
      data.value = result
      return result
    } catch (err) {
      error.value = err
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const reset = () => {
    isLoading.value = false
    error.value = null
    data.value = null
  }

  return {
    isLoading,
    error,
    data,
    execute,
    reset
  }
}

/**
 * 定时器管理
 * @returns {Object}
 */
export const useTimer = () => {
  const timer = ref(null)
  const isRunning = ref(false)

  const start = (callback, interval) => {
    if (timer.value) clearInterval(timer.value)
    isRunning.value = true
    timer.value = setInterval(callback, interval)
  }

  const stop = () => {
    if (timer.value) {
      clearInterval(timer.value)
      timer.value = null
      isRunning.value = false
    }
  }

  onUnmounted(() => {
    stop()
  })

  return {
    isRunning,
    start,
    stop
  }
}

/**
 * 切换状态
 * @param {boolean} initialValue - 初始值
 * @returns {Object}
 */
export const useToggle = (initialValue = false) => {
  const value = ref(initialValue)

  const toggle = () => {
    value.value = !value.value
  }

  const setTrue = () => {
    value.value = true
  }

  const setFalse = () => {
    value.value = false
  }

  return {
    value,
    toggle,
    setTrue,
    setFalse
  }
}

/**
 * 动画控制
 * @param {number} duration - 动画持续时间（毫秒）
 * @returns {Object}
 */
export const useAnimation = (duration = 300) => {
  const isAnimating = ref(false)

  const animate = async (callback) => {
    isAnimating.value = true
    await callback()
    await delay(duration)
    isAnimating.value = false
  }

  return {
    isAnimating,
    animate
  }
}

/**
 * 生成随机 ID
 * @param {string} prefix - 前缀
 * @returns {string}
 */
export const generateId = (prefix = 'id') => {
  return `${prefix}_${Math.random().toString(36).substring(2, 15)}`
}

/**
 * 格式化时间戳
 * @param {number} timestamp - 时间戳
 * @returns {string}
 */
export const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleTimeString()
}

/**
 * 深拷贝对象
 * @param {*} obj - 要拷贝的对象
 * @returns {*}
 */
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime())
  if (obj instanceof Array) return obj.map((item) => deepClone(item))
  if (obj instanceof Object) {
    const clonedObj = {}
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key])
      }
    }
    return clonedObj
  }
}

/**
 * 批量更新状态
 * @param {Object} stateRef - 状态引用
 * @param {Object} updates - 更新内容
 */
export const batchUpdate = (stateRef, updates) => {
  Object.assign(stateRef.value, updates)
}

/**
 * 评分转换为星星
 * @param {number} score - 评分 (1-5)
 * @returns {string}
 */
export const scoreToStars = (score) => {
  return '⭐'.repeat(Math.floor(score))
}
