<script setup>
import { ref, onMounted } from 'vue'

const stars = ref(0)
const formattedStars = ref('')

const formatStars = (count) => {
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'k'
  }
  return count.toString()
}

onMounted(async () => {
  const CACHE_KEY = 'github-stars-cache'
  const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

  try {
    const cached = localStorage.getItem(CACHE_KEY)
    if (cached) {
      const { count, timestamp } = JSON.parse(cached)
      if (Date.now() - timestamp < CACHE_DURATION) {
        stars.value = count
        formattedStars.value = formatStars(count)
        return
      }
    }

    const res = await fetch(
      'https://api.github.com/repos/datawhalechina/easy-vibe'
    )
    if (res.ok) {
      const data = await res.json()
      stars.value = data.stargazers_count
      formattedStars.value = formatStars(stars.value)

      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          count: stars.value,
          timestamp: Date.now()
        })
      )
    }
  } catch (e) {
    console.error('Failed to fetch GitHub stars:', e)
  }
})
</script>

<template>
  <div class="github-stars-wrapper">
    <a
      class="github-stars-link"
      href="https://github.com/datawhalechina/easy-vibe"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="GitHub"
    >
      <span class="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"
          />
        </svg>
      </span>
      <span v-if="formattedStars" class="stars-count">{{
        formattedStars
      }}</span>
    </a>
  </div>
</template>

<style scoped>
.github-stars-wrapper {
  display: flex;
  align-items: center;
  padding-left: 12px;
}

.github-stars-link {
  display: flex;
  align-items: center;
  color: var(--vp-c-text-2);
  transition: color 0.25s;
}

.github-stars-link:hover {
  color: var(--vp-c-text-1);
}

.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
}

.icon svg {
  width: 20px;
  height: 20px;
  fill: currentColor;
}

.stars-count {
  margin-left: 6px;
  font-size: 14px;
  font-weight: 500;
}
</style>
