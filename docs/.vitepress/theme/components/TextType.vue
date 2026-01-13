<script setup>
import { computed, onMounted, onUnmounted, ref, useAttrs, watchEffect } from 'vue'

const props = defineProps({
  text: {
    type: [String, Array],
    required: true
  },
  as: {
    type: [String, Object],
    default: 'div'
  },
  typingSpeed: {
    type: Number,
    default: 50
  },
  initialDelay: {
    type: Number,
    default: 0
  },
  pauseDuration: {
    type: Number,
    default: 2000
  },
  postDeletingDelay: {
    type: Number,
    default: 0
  },
  deletingSpeed: {
    type: Number,
    default: 30
  },
  loop: {
    type: Boolean,
    default: true
  },
  className: {
    type: String,
    default: ''
  },
  showCursor: {
    type: Boolean,
    default: true
  },
  hideCursorWhileTyping: {
    type: Boolean,
    default: false
  },
  cursorCharacter: {
    type: String,
    default: '|'
  },
  cursorClassName: {
    type: String,
    default: ''
  },
  cursorBlinkDuration: {
    type: Number,
    default: 0.5
  },
  textColors: {
    type: Array,
    default: () => []
  },
  variableSpeed: {
    type: Object,
    default: null
  },
  onSentenceComplete: {
    type: Function,
    default: null
  },
  startOnVisible: {
    type: Boolean,
    default: false
  },
  reverseMode: {
    type: Boolean,
    default: false
  }
})

const isClient = typeof window !== 'undefined'

const attrs = useAttrs()

const displayedText = ref('')
const currentCharIndex = ref(0)
const isDeleting = ref(false)
const currentTextIndex = ref(0)
const isVisible = ref(!props.startOnVisible)
const containerRef = ref(null)

const textArray = computed(() => (Array.isArray(props.text) ? props.text : [props.text]))

const cursorStyle = computed(() => ({
  animationDuration: `${props.cursorBlinkDuration}s`
}))

const currentColor = computed(() => {
  if (!props.textColors.length) return undefined
  return props.textColors[currentTextIndex.value % props.textColors.length]
})

const getRandomSpeed = () => {
  if (!props.variableSpeed) return props.typingSpeed
  const min = typeof props.variableSpeed.min === 'number' ? props.variableSpeed.min : props.typingSpeed
  const max = typeof props.variableSpeed.max === 'number' ? props.variableSpeed.max : props.typingSpeed
  if (max <= min) return min
  return Math.random() * (max - min) + min
}

let observer
onMounted(() => {
  if (!props.startOnVisible || !containerRef.value) return
  observer = new IntersectionObserver(
    entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          isVisible.value = true
          break
        }
      }
    },
    { threshold: 0.1 }
  )
  observer.observe(containerRef.value)
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})

watchEffect(onCleanup => {
  if (!isVisible.value) return

  if (!textArray.value.length) {
    displayedText.value = ''
    return
  }

  const currentText = textArray.value[currentTextIndex.value] ?? ''
  const processedText = props.reverseMode ? String(currentText).split('').reverse().join('') : String(currentText)

  if (!isClient) {
    return
  }

  const shouldStopAtEnd = !props.loop && currentTextIndex.value === textArray.value.length - 1

  let timeoutId

  const schedule = () => {
    if (isDeleting.value) {
      if (!displayedText.value) {
        isDeleting.value = false
        if (props.onSentenceComplete) {
          props.onSentenceComplete(textArray.value[currentTextIndex.value], currentTextIndex.value)
        }
        if (shouldStopAtEnd) return
        timeoutId = setTimeout(() => {
          currentTextIndex.value = (currentTextIndex.value + 1) % textArray.value.length
          currentCharIndex.value = 0
        }, props.postDeletingDelay)
        return
      }

      timeoutId = setTimeout(() => {
        displayedText.value = displayedText.value.slice(0, -1)
      }, props.deletingSpeed)
      return
    }

    if (currentCharIndex.value < processedText.length) {
      timeoutId = setTimeout(() => {
        displayedText.value += processedText[currentCharIndex.value]
        currentCharIndex.value += 1
      }, props.variableSpeed ? getRandomSpeed() : props.typingSpeed)
      return
    }

    if (shouldStopAtEnd) return
    timeoutId = setTimeout(() => {
      isDeleting.value = true
    }, props.pauseDuration)
  }

  if (currentCharIndex.value === 0 && !isDeleting.value && !displayedText.value) {
    timeoutId = setTimeout(schedule, props.initialDelay)
  } else {
    schedule()
  }

  onCleanup(() => clearTimeout(timeoutId))
})

const shouldHideCursor = computed(() => {
  if (!props.hideCursorWhileTyping) return false
  const currentText = textArray.value[currentTextIndex.value] ?? ''
  const processedText = props.reverseMode ? String(currentText).split('').reverse().join('') : String(currentText)
  return currentCharIndex.value < processedText.length || isDeleting.value
})
</script>

<template>
  <component
    :is="as"
    ref="containerRef"
    :class="['text-type', className]"
    v-bind="attrs"
  >
    <span class="text-type__content" :style="{ color: currentColor || 'inherit' }">
      {{ displayedText }}
    </span>
    <span
      v-if="showCursor"
      class="text-type__cursor"
      :class="[cursorClassName, shouldHideCursor ? 'text-type__cursor--hidden' : '']"
      :style="cursorStyle"
    >
      {{ cursorCharacter }}
    </span>
  </component>
</template>

<style>
.text-type {
  display: inline-flex;
  align-items: baseline;
  white-space: pre-wrap;
  word-break: break-word;
}

.text-type__content {
  display: inline;
  white-space: inherit;
}

@media (min-width: 960px) {
  .text-type {
    white-space: nowrap;
  }
  .text-type__content {
    display: inline-block;
    white-space: nowrap;
  }
}

.text-type__cursor {
  display: inline-block;
  margin-left: 2px;
  animation-name: text-type-blink;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

.text-type__cursor--hidden {
  opacity: 0;
  animation: none;
}

@keyframes text-type-blink {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
