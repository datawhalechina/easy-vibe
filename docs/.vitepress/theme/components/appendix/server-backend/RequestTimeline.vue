<template>
  <div class="request-timeline">
    <div
      v-for="event in events"
      :key="event.time"
      class="timeline-row"
    >
      <div class="time">
        {{ event.time }}
      </div>
      <div class="event">
        {{ event.event }}
      </div>
    </div>
  </div>
</template>

<script setup>
const events = [
  { time: '0 ms', event: 'User submits the URL.' },
  { time: '10 ms', event: 'DNS and connection setup begin.' },
  { time: '80 ms', event: 'Gateway forwards the request to application code.' },
  { time: '120 ms', event: 'Database/cache lookups finish.' },
  { time: '180 ms', event: 'The browser receives and renders the response.' }
]
</script>

<style scoped>
.request-timeline {
  margin: 20px 0;
  border-left: 3px solid var(--vp-c-brand-1);
}

.timeline-row {
  display: grid;
  grid-template-columns: 88px minmax(0, 1fr);
  gap: 14px;
  padding: 10px 0 10px 16px;
}

.time {
  font-weight: 700;
  color: var(--vp-c-brand-1);
}

.event {
  color: var(--vp-c-text-2);
}
</style>
