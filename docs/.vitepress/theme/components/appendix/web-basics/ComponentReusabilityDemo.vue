<template>
  <div class="component-reusability-demo">
    <div class="toolbox">
      <div class="tool-title">Component Library</div>
      <button class="spawn-btn" @click="spawn('counter')">
        ➕ New Counter
      </button>
      <button class="spawn-btn" @click="spawn('card')">➕ New Card</button>
    </div>

    <div class="workspace">
      <div class="workspace-label">App Workspace</div>
      <div class="instances-container">
        <transition-group name="list">
          <div
            v-for="item in instances"
            :key="item.id"
            class="instance-wrapper"
          >
            <!-- Counter Component -->
            <div v-if="item.type === 'counter'" class="comp-instance counter">
              <div class="comp-header">
                <span>Counter #{{ item.id }}</span>
                <button class="close-btn" @click="remove(item.id)">×</button>
              </div>
              <div class="comp-body">
                <span class="count-val">{{ item.data.count }}</span>
                <button class="mini-btn" @click="item.data.count++">+</button>
              </div>
            </div>

            <!-- Card Component -->
            <div v-if="item.type === 'card'" class="comp-instance card">
              <div class="comp-header">
                <span>Card #{{ item.id }}</span>
                <button class="close-btn" @click="remove(item.id)">×</button>
              </div>
              <div class="comp-body">
                <div class="skeleton-img"></div>
                <div class="skeleton-text"></div>
                <button
                  class="like-btn"
                  :class="{ liked: item.data.liked }"
                  @click="item.data.liked = !item.data.liked"
                >
                  {{ item.data.liked ? '❤️ Liked' : '♡ Like' }}
                </button>
              </div>
            </div>
          </div>
        </transition-group>
        <div v-if="instances.length === 0" class="empty-hint">
          Click buttons above to add components.
          <br />
          Notice how each one works independently!
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const instances = ref([])
let nextId = 1

const spawn = (type) => {
  if (type === 'counter') {
    instances.value.push({
      id: nextId++,
      type: 'counter',
      data: { count: 0 }
    })
  } else if (type === 'card') {
    instances.value.push({
      id: nextId++,
      type: 'card',
      data: { liked: false }
    })
  }
}

const remove = (id) => {
  instances.value = instances.value.filter((i) => i.id !== id)
}
</script>

<style scoped>
.component-reusability-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  overflow: hidden;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
}

.toolbox {
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  gap: 1rem;
  align-items: center;
}

.tool-title {
  font-weight: bold;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin-right: auto;
}

.spawn-btn {
  background: white;
  border: 1px solid var(--vp-c-divider);
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.2s;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
.spawn-btn:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  transform: translateY(-1px);
}

.workspace {
  background: var(--vp-c-bg-alt);
  padding: 1.5rem;
  min-height: 200px;
  position: relative;
}

.workspace-label {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.instances-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: flex-start;
}

.empty-hint {
  width: 100%;
  text-align: center;
  color: var(--vp-c-text-3);
  margin-top: 3rem;
  line-height: 1.6;
}

.instance-wrapper {
  transition: all 0.4s;
}

.comp-instance {
  background: white;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  width: 140px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.comp-header {
  background: #f1f5f9;
  padding: 4px 8px;
  font-size: 0.7rem;
  color: #64748b;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e2e8f0;
}

.close-btn {
  border: none;
  background: transparent;
  color: #94a3b8;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
}
.close-btn:hover {
  color: #ef4444;
}

.comp-body {
  padding: 0.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

/* Counter Style */
.counter .count-val {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--vp-c-brand);
}
.mini-btn {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  width: 100%;
  border-radius: 4px;
  cursor: pointer;
}
.mini-btn:hover {
  background: #e2e8f0;
}

/* Card Style */
.skeleton-img {
  width: 100%;
  height: 40px;
  background: #e2e8f0;
  border-radius: 4px;
}
.skeleton-text {
  width: 80%;
  height: 8px;
  background: #f1f5f9;
  border-radius: 2px;
}
.like-btn {
  font-size: 0.75rem;
  border: 1px solid #e2e8f0;
  background: white;
  padding: 2px 8px;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 4px;
}
.like-btn.liked {
  border-color: #fecaca;
  color: #ef4444;
  background: #fef2f2;
}

/* Transitions */
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.list-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
