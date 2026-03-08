<template>
  <div
    :class="['event', event.orientation, { visible: isVisible }]"
    ref="eventRef"
  >
    <div v-if="event.orientation === 'left'" class="event-content">
      <div
        class="event-year"
        :class="{ 'revision-blurred': shouldHideTime && !yearRevealed }"
        @click="onYearClick"
      >
        {{ event.year }}
      </div>
      <div
        class="event-card"
        :class="{
          'revision-blurred': shouldBlurEventCard && !cardRevealed
        }"
        @click="onCardClick"
      >
        <div class="event-title">{{ event.title }}</div>
        <div class="event-desc">{{ event.description }}</div>
        <span
          v-if="event.tag?.label"
          :class="['event-tag', tagClass(event.tag.type)]"
        >
          {{ event.tag.label }}
        </span>
      </div>
    </div>
    <div class="event-dot"><div class="dot-inner"></div></div>
    <div v-if="event.orientation === 'right'" class="event-content">
      <div
        class="event-year"
        :class="{ 'revision-blurred': shouldHideTime && !yearRevealed }"
        @click="onYearClick"
      >
        {{ event.year }}
      </div>
      <div
        class="event-card"
        :class="{
          'revision-blurred': shouldBlurEventCard && !cardRevealed
        }"
        @click="onCardClick"
      >
        <div class="event-title">{{ event.title }}</div>
        <div class="event-desc">{{ event.description }}</div>
        <span
          v-if="event.tag?.label"
          :class="['event-tag', tagClass(event.tag.type)]"
        >
          {{ event.tag.label }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { historyPreferenceService } from '../services/historyPreferenceService'

const prefs = historyPreferenceService.state
const shouldHideTime = computed(
  () => prefs.revisionActive && prefs.revisionHideTime
)
const shouldBlurEventCard = computed(
  () => prefs.revisionActive && prefs.revisionBlurEventCard
)
const yearRevealed = ref(false)
const cardRevealed = ref(false)

function onYearClick() {
  if (shouldHideTime.value) yearRevealed.value = !yearRevealed.value
}

function onCardClick() {
  if (shouldBlurEventCard.value) cardRevealed.value = !cardRevealed.value
}

const TAG_CLASS_MAP = {
  revolution: 'tag-revolution',
  republic: 'tag-republic',
  war: 'tag-war',
  culture: 'tag-culture',
  social: 'tag-social',
  europe: 'tag-europe',
  religion: 'tag-religion'
}

const props = defineProps({
  event: {
    type: Object,
    required: true
  }
})

const eventRef = ref(null)
const isVisible = ref(false)
let observer = null

function tagClass(type) {
  return TAG_CLASS_MAP[type] || 'tag-culture'
}

onMounted(() => {
  if (!eventRef.value) return
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) isVisible.value = true
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  )
  observer.observe(eventRef.value)
})

onUnmounted(() => {
  if (observer && eventRef.value) observer.unobserve(eventRef.value)
})
</script>

<style scoped>
.event {
  display: grid;
  grid-template-columns: 1fr 40px 1fr;
  gap: 0;
  margin-bottom: 2.5rem;
  position: relative;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.event.visible {
  opacity: 1;
  transform: translateY(0);
}

.event.left .event-content {
  grid-column: 1;
  text-align: right;
  padding-right: 2rem;
}

.event.left .event-dot {
  grid-column: 2;
}

.event.right .event-dot {
  grid-column: 2;
}

.event.right .event-content {
  grid-column: 3;
  text-align: left;
  padding-left: 2rem;
}

.event-dot {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 0.5rem;
  z-index: 1;
}

.dot-inner {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--gold);
  border: 2px solid var(--dark);
  box-shadow: 0 0 0 3px rgba(201, 168, 76, 0.2);
  flex-shrink: 0;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.event:hover .dot-inner {
  box-shadow: 0 0 0 6px rgba(201, 168, 76, 0.15), 0 0 20px rgba(201, 168, 76, 0.3);
  transform: scale(1.3);
}

.event-content {
  display: flex;
  flex-direction: column;
}

.event-year {
  font-size: 1rem;
  letter-spacing: 0.25em;
  color: var(--gold);
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  font-weight: 600;
  transition: filter 0.4s ease, box-shadow 0.4s ease;
  position: relative;
  display: inline-block;
  min-height: 1.4em;
}

.event-year.revision-blurred {
  cursor: pointer;
  user-select: none;
}

/* 遮罩紧贴内容宽度，金色光芒从缝隙透出的宝箱效果 */
.event-year.revision-blurred::after {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 6px;
  background: var(--dark);
  border: 1px solid rgba(201, 168, 76, 0.35);
  pointer-events: none;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
  box-shadow:
    0 0 12px rgba(201, 168, 76, 0.22),
    0 0 24px rgba(201, 168, 76, 0.1),
    inset 0 0 16px rgba(201, 168, 76, 0.06);
}

.event-year.revision-blurred:hover::after {
  border-color: rgba(201, 168, 76, 0.5);
  box-shadow:
    0 0 18px rgba(201, 168, 76, 0.35),
    0 0 36px rgba(201, 168, 76, 0.15),
    inset 0 0 20px rgba(201, 168, 76, 0.1);
}

.event-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  padding: 1.1rem 1.3rem;
  transition: background 0.3s ease, border-color 0.3s ease, transform 0.3s ease,
    filter 0.4s ease, box-shadow 0.4s ease;
  cursor: default;
}

.event-card.revision-blurred {
  cursor: pointer;
  user-select: none;
  pointer-events: auto;
  position: relative;
}

.event-card.revision-blurred::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 8px;
  background: var(--dark);
  border: 1px solid rgba(255, 255, 255, 0.04);
  pointer-events: none;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}

.event-card.revision-blurred:hover::after {
  border-color: rgba(201, 168, 76, 0.25);
  box-shadow: 0 0 0 1px rgba(201, 168, 76, 0.15);
}

.event:hover .event-card {
  background: rgba(201, 168, 76, 0.05);
  border-color: rgba(201, 168, 76, 0.2);
  transform: translateX(4px);
}

.event.left:hover .event-card {
  transform: translateX(-4px);
}

.event-title {
  font-family: 'Playfair Display', serif;
  font-size: 1rem;
  font-weight: 700;
  color: var(--blanc);
  margin-bottom: 0.4rem;
  line-height: 1.3;
}

.event-desc {
  font-size: 0.82rem;
  color: var(--muted);
  line-height: 1.7;
}

.event-tag {
  display: inline-block;
  margin-top: 0.6rem;
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 0.2rem 0.6rem;
  border-radius: 3px;
  font-weight: 600;
}

.tag-revolution {
  background: rgba(237, 41, 57, 0.12);
  color: #ff6b7a;
  border: 1px solid rgba(237, 41, 57, 0.25);
}

.tag-republic {
  background: rgba(0, 35, 149, 0.15);
  color: #7b9fff;
  border: 1px solid rgba(0, 35, 149, 0.3);
}

.tag-war {
  background: rgba(120, 60, 0, 0.2);
  color: #d4a055;
  border: 1px solid rgba(180, 100, 0, 0.3);
}

.tag-culture {
  background: rgba(100, 0, 140, 0.15);
  color: #c070ff;
  border: 1px solid rgba(140, 0, 200, 0.25);
}

.tag-social {
  background: rgba(0, 120, 60, 0.15);
  color: #60c090;
  border: 1px solid rgba(0, 160, 80, 0.25);
}

.tag-europe {
  background: rgba(201, 168, 76, 0.1);
  color: var(--gold);
  border: 1px solid rgba(201, 168, 76, 0.25);
}

.tag-religion {
  background: rgba(80, 40, 0, 0.2);
  color: #e0a060;
  border: 1px solid rgba(150, 80, 0, 0.25);
}

@media (max-width: 640px) {
  .event {
    grid-template-columns: 40px 1fr;
  }

  .event.left .event-content,
  .event.right .event-content {
    grid-column: 2;
    text-align: left;
    padding-left: 1.2rem;
    padding-right: 0;
  }

  .event.left .event-dot,
  .event.right .event-dot {
    grid-column: 1;
    grid-row: 1;
  }

  .event.left:hover .event-card {
    transform: translateX(4px);
  }
}
</style>
