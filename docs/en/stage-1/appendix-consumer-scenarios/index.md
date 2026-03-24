---
title: 'C-End Scenario Inspiration Direction Reference'
description: 'This document summarizes creative application directions of LLM large models in C-End consumer scenarios, covering inspiration across lifestyle, emotional companionship, entertainment, personal growth, social interaction, and more, providing creative references for AI application developers targeting everyday users.'
---

<script setup>
import { computed, ref } from 'vue'

const duration = 'Approx. <strong>4 hours</strong>'

const vibePoint = ref('')
const feeling = ref('')

// Theme pool for each scenario type, emphasizing feeling, atmosphere, and psychological cues
const topicPool = {
  'lifestyle': [
    { title: 'Morning Ritual Awakening Assistant', desc: 'Generate a personalized morning ritual based on weather, schedule, and mood so each day begins beautifully' },
    { title: 'Solo Living Atmosphere Creator', desc: 'Design cozy at-home atmosphere plans for people living alone, with smart combinations of lighting, music, and scent' },
    { title: 'Weekend Stay-Home Healing Plan Generator', desc: 'Recommend the perfect stay-home mix from current mood: movies + snacks + atmosphere setup' },
    { title: 'Bedtime Soul-Soothing Radio', desc: 'Generate gentle stories and meditation guidance as a private radio station for falling asleep' },
    { title: 'Life Aesthetics Inspiration Hunter', desc: 'Discover beauty in everyday moments and generate life-aesthetics suggestions and ritual guides' }
  ],
  'emotion': [
    { title: 'Late-Night Tree-Hole Listener', desc: 'A 24/7 emotional outlet that receives every worry without judgment' },
    { title: 'Heartbreak Healing Companion', desc: 'Offer gentle companionship, healing suggestions, and emotional outlets during heartbreak lows' },
    { title: 'Anxiety Relief Breathing Coach', desc: 'Detect anxiety and guide breathing exercises and mindfulness meditation' },
    { title: 'Self-Confidence Rebuilding Mentor', desc: 'Use positive dialogue and psychological cues to rebuild self-identity and self-worth' },
    { title: 'Intelligent Emotional Journal Interpreter', desc: 'Analyze emotional journals, discover patterns, and provide warm insights and suggestions' }
  ],
  'entertainment': [
    { title: 'Immersive Script-Murder DM', desc: 'Act as a script-murder host, create suspense, and drive the plot' },
    { title: 'Open-World Soul NPC', desc: 'Create lifelike NPCs that remember player stories and form genuine emotional bonds' },
    { title: 'Personalized Podcast Content Generator', desc: 'Generate podcasts around user interests with a natural, friend-like tone' },
    { title: 'Virtual Concert Atmosphere Crew', desc: 'Create live-concert energy for online events with real-time interaction and hype' },
    { title: 'Interactive Novel Co-Creation Partner', desc: 'Co-create stories with readers where every choice changes the world direction' }
  ],
  'growth': [
    { title: 'Personal Growth Witness', desc: 'Record growth trajectories and provide encouragement and reflection at key milestones' },
    { title: 'Gamified Habit-Building Coach', desc: 'Turn boring habit-building into fun adventure gameplay' },
    { title: 'Skill-Learning Buddy Matcher', desc: 'Match like-minded learning partners for accountability and shared progress' },
    { title: 'Daily Little Happiness Discoverer', desc: 'Help users notice small good things in life and cultivate gratitude and optimism' },
    { title: 'Life Simulation Explorer', desc: 'Simulate different life choices to experience alternate possibilities in parallel worlds' }
  ],
  'social': [
    { title: 'Icebreaker Topic Generator', desc: 'Provide interesting social topics to break awkwardness and shorten distance' },
    { title: 'Moments Caption Atmosphere Stylist', desc: 'Generate tasteful social captions based on photos and mood' },
    { title: 'Date Atmosphere Planner', desc: 'Design complete date atmosphere plans from venue to topics to surprises' },
    { title: 'Remote Party Atmosphere Lead', desc: 'Energize online gatherings with games and guided interaction' },
    { title: 'Social Energy Management Assistant', desc: 'Help introverts manage social energy and find a comfortable social rhythm' }
  ],
  'creative': [
    { title: 'Creative Block First-Aid Kit', desc: 'Provide unexpected sparks when users hit creative bottlenecks' },
    { title: 'Personal Style Exploration Guide', desc: 'Help users discover their unique style, from fashion to expression' },
    { title: 'Journal & Diary Aesthetics Advisor', desc: 'Provide aesthetic suggestions for journal layouts, color palettes, and content ideas' },
    { title: 'Photography Composition Atmosphere Guide', desc: 'Offer photography and retouching suggestions based on scene and desired feeling' },
    { title: 'Music Mood Matcher', desc: 'Recommend the perfect music combinations for current mood and context' }
  ],
  'travel': [
    { title: 'City Walk Exploration Guide', desc: 'Explore cities like a local and discover hidden gems' },
    { title: 'Travel Mood Journal Generator', desc: 'Turn travel photos and moods into beautiful travel writing and memories' },
    { title: 'Solo Travel Companion Assistant', desc: 'Provide companionship, suggestions, and safety support for solo travelers' },
    { title: 'Destination Atmosphere Preview', desc: 'Immersively preview destination atmosphere before departure' },
    { title: 'Travel Photography Atmosphere Coach', desc: 'Guide users to shoot story-rich travel photos based on scene and light' }
  ],
  'health': [
    { title: 'Exercise Motivation Awakener', desc: 'Provide just-right encouragement when users do not feel like moving' },
    { title: 'Healthy Diet Inspiration Kitchen', desc: 'Generate healing-style healthy recipes from mood and available ingredients' },
    { title: 'Sleep Quality Atmosphere Optimizer', desc: 'Create high-quality sleep atmosphere from environment to mindset' },
    { title: 'Body Awareness Guide', desc: 'Guide users to notice body signals and build mind-body connection' },
    { title: 'Self-Care Reminder Assistant', desc: 'Remind users to pause and care for themselves in busy routines' }
  ],
  'learning': [
    { title: 'Gamified Knowledge Exploration Guide', desc: 'Transform boring learning into an engaging exploration adventure' },
    { title: 'Language Learning Scenario Partner', desc: 'Play different roles for natural language acquisition in scenario dialogues' },
    { title: 'Curiosity Satisfaction Assistant', desc: 'Answer all kinds of imaginative questions and satisfy curiosity about the world' },
    { title: 'Reading Notes Inspiration Booster', desc: 'Help users organize reading insights and find new angles for thinking' },
    { title: 'Knowledge-Sharing Atmosphere Builder', desc: 'Turn what users learn into interesting content for sharing' }
  ],
  'relationship': [
    { title: 'Intimate Communication Coach', desc: 'Help users express hard-to-say feelings and improve intimate relationships' },
    { title: 'Family Care Reminder Assistant', desc: 'Remind users to care for family and offer warm interaction suggestions' },
    { title: 'Friendship Maintenance Atmosphere Coach', desc: 'Help maintain long-distance friendship and create shared topics' },
    { title: 'Confession & Surprise Planner', desc: 'Plan unforgettable surprises and romantic moments for important people' },
    { title: 'Conflict-Deescalation Atmosphere Guide', desc: 'Provide suggestions and wording to cool down tension in relationships' }
  ],
  'pet': [
    { title: 'Anthropomorphic Pet Diary', desc: 'Generate diary entries from a pet perspective to record warm daily life' },
    { title: 'Pet Behavior Interpreter', desc: 'Interpret pet behavior language and deepen connection between pet and owner' },
    { title: 'Pet Bonding-Time Planner', desc: 'Design creative activities for interacting with pets and strengthening bonds' },
    { title: 'Pet Memory Story Generator', desc: 'Turn pet photos and memories into warm stories' },
    { title: 'New Pet Parent Comfort Guide', desc: 'Provide warm companionship and guidance for first-time pet owners' }
  ],
  'finance': [
    { title: 'Spending Emotion Awareness Assistant', desc: 'Notice emotions behind impulse spending and build healthier money habits' },
    { title: 'Savings Goal Visualization Motivator', desc: 'Turn savings goals into visible dream-progress journeys' },
    { title: 'Easy & Fun Finance Learning', desc: 'Learn finance knowledge in a relaxed and enjoyable way' },
    { title: 'Financial Anxiety Soothing Coach', desc: 'Provide emotional support and practical suggestions under financial pressure' },
    { title: 'Small-Amount Investment Experience Game', desc: 'Use gamification to experience investing and lower beginner barriers' }
  ],
  'career': [
    { title: 'Career-Confusion Companion', desc: 'Offer listening, exploration, and direction suggestions during career confusion' },
    { title: 'Work Achievement Awakener', desc: 'Help users rediscover value and meaning in work and reignite motivation' },
    { title: 'Workplace Social Atmosphere Assistant', desc: 'Provide relaxed workplace social topics and interaction ideas' },
    { title: 'Side-Hustle Inspiration Generator', desc: 'Generate side-hustle ideas based on interests and skills' },
    { title: 'Pre-Interview Confidence Station', desc: 'Provide confidence-building support and encouragement before interviews' }
  ],
  'home': [
    { title: 'Home Atmosphere Designer', desc: 'Design home atmosphere plans based on mood and season' },
    { title: 'Four-Season Home Refresh Guide', desc: 'Update home setups by season to keep freshness' },
    { title: 'Small-Space Magic', desc: 'Help small spaces still feel comfortable and warm' },
    { title: 'At-Home Ritual Creator', desc: 'Create rituals for everyday home activities' },
    { title: 'Decluttering Psychological Companion', desc: 'Provide emotional support and decision suggestions while organizing belongings' }
  ],
  'food': [
    { title: 'One-Person Healing Cuisine', desc: 'Design simple healing meals for solo living' },
    { title: 'Festive Table Atmosphere Designer', desc: 'Design ritual-rich table setups for special days' },
    { title: 'Cooking Mood Matcher', desc: 'Recommend suitable food and cooking methods based on current mood' },
    { title: 'Kitchen Beginner Confidence Builder', desc: 'Provide warm encouragement and simple recipes for cooking beginners' },
    { title: 'Food Photography Atmosphere Guide', desc: 'Help everyday dishes look enticing with atmosphere-rich photos' }
  ],
  'fashion': [
    { title: 'Today\'s Outfit Mood Board', desc: 'Generate outfit inspiration based on weather, occasion, and mood' },
    { title: 'Capsule Wardrobe Stylist', desc: 'Create limitless outfit combinations from a limited set of items' },
    { title: 'Personal Style Exploration Journey', desc: 'Help users discover and build unique personal style' },
    { title: 'Old-Clothes New-Wear Creator', desc: 'Provide fresh styling inspiration for old clothing' },
    { title: 'Special-Occasion Styling Advisor', desc: 'Design confidence-boosting looks for important occasions' }
  ]
}

// Predefined recommendation paths based on vibe and feeling
const recommendationMap = {
  'healing': {
    'relax': ['emotion', 'lifestyle', 'health', 'home'],
    'inspire': ['creative', 'growth', 'learning', 'entertainment'],
    'connect': ['relationship', 'social', 'pet', 'emotion'],
    'escape': ['travel', 'entertainment', 'creative', 'lifestyle']
  },
  'growth': {
    'relax': ['growth', 'learning', 'creative', 'health'],
    'inspire': ['career', 'learning', 'creative', 'growth'],
    'connect': ['social', 'relationship', 'career', 'learning'],
    'escape': ['travel', 'entertainment', 'creative', 'lifestyle']
  },
  'social': {
    'relax': ['social', 'pet', 'food', 'home'],
    'inspire': ['social', 'creative', 'entertainment', 'travel'],
    'connect': ['relationship', 'social', 'pet', 'travel'],
    'escape': ['social', 'travel', 'entertainment', 'creative']
  },
  'explore': {
    'relax': ['travel', 'creative', 'lifestyle', 'food'],
    'inspire': ['travel', 'creative', 'learning', 'entertainment'],
    'connect': ['travel', 'social', 'relationship', 'pet'],
    'escape': ['travel', 'entertainment', 'creative', 'lifestyle']
  },
  'daily': {
    'relax': ['lifestyle', 'home', 'health', 'emotion'],
    'inspire': ['creative', 'food', 'fashion', 'home'],
    'connect': ['relationship', 'social', 'pet', 'lifestyle'],
    'escape': ['entertainment', 'creative', 'travel', 'lifestyle']
  }
}

const vibeOptions = [
  { label: 'Healing', value: 'healing', desc: 'Warm, soothing, restorative' },
  { label: 'Growth', value: 'growth', desc: 'Progress, breakthrough, transformation' },
  { label: 'Social', value: 'social', desc: 'Connection, sharing, interaction' },
  { label: 'Exploration', value: 'explore', desc: 'Curiosity, adventure, discovery' },
  { label: 'Daily Life', value: 'daily', desc: 'Ordinary, real, present-moment' }
]

const feelingOptions = [
  { label: 'Want to Relax', value: 'relax', desc: 'Relieve stress, clear your mind' },
  { label: 'Seeking Inspiration', value: 'inspire', desc: 'Spark creativity, gain insight' },
  { label: 'Craving Connection', value: 'connect', desc: 'Connect with others, feel emotional resonance' },
  { label: 'Need an Escape', value: 'escape', desc: 'Step away from reality, immerse yourself' }
]

const scenarios = [
  { key: 'lifestyle', name: 'Lifestyle', anchor: '#_1-lifestyle' },
  { key: 'emotion', name: 'Emotional Companionship', anchor: '#_2-emotional-companionship' },
  { key: 'entertainment', name: 'Entertainment & Leisure', anchor: '#_3-entertainment-leisure' },
  { key: 'growth', name: 'Personal Growth', anchor: '#_4-personal-growth' },
  { key: 'social', name: 'Social Interaction', anchor: '#_5-social-interaction' },
  { key: 'creative', name: 'Creative Expression', anchor: '#_6-creative-expression' },
  { key: 'travel', name: 'Travel Exploration', anchor: '#_7-travel-exploration' },
  { key: 'health', name: 'Physical & Mental Health', anchor: '#_8-physical-mental-health' },
  { key: 'learning', name: 'Knowledge Exploration', anchor: '#_9-knowledge-exploration' },
  { key: 'relationship', name: 'Relationship Management', anchor: '#_10-relationship-management' },
  { key: 'pet', name: 'Pet Companionship', anchor: '#_11-pet-companionship' },
  { key: 'finance', name: 'Financial Health', anchor: '#_12-financial-health' },
  { key: 'career', name: 'Career Development', anchor: '#_13-career-development' },
  { key: 'home', name: 'Home Space', anchor: '#_14-home-space' },
  { key: 'food', name: 'Food & Cooking', anchor: '#_15-food-cooking' },
  { key: 'fashion', name: 'Style & Outfit', anchor: '#_16-style-outfit' }
]

// Compute recommendation results by random sampling from topic pool
const recommendationTopics = computed(() => {
  if (!vibePoint.value || !feeling.value) return []

  const keys = recommendationMap[vibePoint.value]?.[feeling.value] || []
  const topics = []

  keys.forEach(key => {
    const scenario = scenarios.find(item => item.key === key)
    const scenarioTopics = topicPool[key] || []

    if (scenario && scenarioTopics.length > 0) {
      const count = Math.floor(Math.random() * 2) + 1
      const shuffled = [...scenarioTopics].sort(() => Math.random() - 0.5)
      const selected = shuffled.slice(0, Math.min(count, shuffled.length))

      selected.forEach(topic => {
        topics.push({
          ...topic,
          scenarioKey: key,
          scenarioName: scenario.name,
          scenarioAnchor: scenario.anchor
        })
      })
    }
  })

  return topics.sort(() => Math.random() - 0.5).slice(0, 8)
})

// Current selected labels
const currentSelection = computed(() => {
  const vibe = vibeOptions.find(i => i.value === vibePoint.value)
  const feel = feelingOptions.find(p => p.value === feeling.value)
  return {
    vibe: vibe?.label || '',
    feeling: feel?.label || ''
  }
})

const scrollToAnchor = (anchor) => {
  setTimeout(() => {
    let element = document.querySelector(anchor)

    if (!element) {
      const altAnchor = anchor.replace('#_', '#')
      element = document.querySelector(altAnchor)
    }

    if (!element) {
      const anchorText = decodeURIComponent(anchor.replace('#', '').replace(/^_/, ''))
      const headings = document.querySelectorAll('h2, h3')

      for (const heading of headings) {
        const headingText = heading.textContent.trim()
        const cleanHeading = headingText.replace(/^\d+\.\s*/, '')
        if (cleanHeading === anchorText || headingText.includes(anchorText)) {
          element = heading
          break
        }
      }
    }

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
      element.style.backgroundColor = '#fdf2f8'
      element.style.transition = 'background-color 0.3s'
      element.style.padding = '8px'
      element.style.borderRadius = '4px'
      setTimeout(() => {
        element.style.backgroundColor = ''
        element.style.padding = ''
      }, 2000)
    }
  }, 100)
}

const resetSelection = () => {
  vibePoint.value = ''
  feeling.value = ''
}
</script>

# C-End Scenario Inspiration Direction Reference

## Chapter Overview

<ChapterIntroduction :duration="duration" :tags="['C-End Applications', 'Lifestyle', 'Emotional Experience', 'Atmosphere Design']" coreOutput="Discover 15+ lifestyle-inspired scenario directions" expectedOutput="Find product directions that truly move users">

This document summarizes <strong>creative application directions of LLM large models in C-End consumer scenarios</strong>. Unlike B-End products that focus on efficiency and pain points, C-End products put stronger emphasis on <strong>building feelings, psychological cues, and atmosphere</strong>, so users can gain emotional resonance and delightful experiences during use.

</ChapterIntroduction>

## Quick Atmosphere Selection

<el-card shadow="hover" style="margin-top: 16px; margin-bottom: 24px; border-left: 5px solid #ec4899;">
  <div style="font-weight: 600; margin-bottom: 8px;">Find scenario inspiration that resonates with you</div>
  <div style="color: #606266; font-size: 14px; line-height: 1.6; margin-bottom: 12px;">
    Choose your desired atmosphere and current feeling. The system will recommend related scenario directions. Click tags to jump to corresponding sections.
  </div>
  <el-row :gutter="16">
    <el-col :span="12">
      <el-select v-model="vibePoint" placeholder="Select atmosphere type" style="width: 100%;">
        <el-option
          v-for="item in vibeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
          <div style="font-weight: 500;">{{ item.label }}</div>
          <div style="font-size: 12px; color: #909399;">{{ item.desc }}</div>
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="12">
      <el-select v-model="feeling" placeholder="Select current feeling" style="width: 100%;">
        <el-option
          v-for="item in feelingOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
          <div style="font-weight: 500;">{{ item.label }}</div>
          <div style="font-size: 12px; color: #909399;">{{ item.desc }}</div>
        </el-option>
      </el-select>
    </el-col>
  </el-row>

  <div v-if="recommendationTopics.length > 0" style="margin-top: 16px;">
    <div style="font-weight: 600; margin-bottom: 12px; color: #ec4899;">
      Recommended {{ currentSelection.vibe }} × {{ currentSelection.feeling }} scenarios for you:
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
      <el-tag
        v-for="topic in recommendationTopics"
        :key="topic.title"
        type="danger"
        effect="light"
        style="cursor: pointer; margin-bottom: 4px;"
        @click="scrollToAnchor(topic.scenarioAnchor)"
      >
        {{ topic.title }}
      </el-tag>
    </div>
    <el-button type="text" size="small" @click="resetSelection" style="margin-top: 8px;">
      Choose Again
    </el-button>
  </div>
</el-card>

## Scenario Direction Quick Overview

<el-row :gutter="16" style="margin-top: 24px;">
  <el-col :span="8" v-for="scenario in scenarios.slice(0, 6)" :key="scenario.key">
    <el-card shadow="hover" style="margin-bottom: 16px; cursor: pointer;" @click="scrollToAnchor(scenario.anchor)">
      <div style="font-weight: 600; color: #303133; margin-bottom: 4px;">{{ scenario.name }}</div>
      <div style="font-size: 12px; color: #909399;">{{ topicPool[scenario.key]?.length || 0 }} inspiration directions</div>
    </el-card>
  </el-col>
</el-row>
<el-row :gutter="16">
  <el-col :span="8" v-for="scenario in scenarios.slice(6, 12)" :key="scenario.key">
    <el-card shadow="hover" style="margin-bottom: 16px; cursor: pointer;" @click="scrollToAnchor(scenario.anchor)">
      <div style="font-weight: 600; color: #303133; margin-bottom: 4px;">{{ scenario.name }}</div>
      <div style="font-size: 12px; color: #909399;">{{ topicPool[scenario.key]?.length || 0 }} inspiration directions</div>
    </el-card>
  </el-col>
</el-row>
<el-row :gutter="16">
  <el-col :span="8" v-for="scenario in scenarios.slice(12, 16)" :key="scenario.key">
    <el-card shadow="hover" style="margin-bottom: 16px; cursor: pointer;" @click="scrollToAnchor(scenario.anchor)">
      <div style="font-weight: 600; color: #303133; margin-bottom: 4px;">{{ scenario.name }}</div>
      <div style="font-size: 12px; color: #909399;">{{ topicPool[scenario.key]?.length || 0 }} inspiration directions</div>
    </el-card>
  </el-col>
</el-row>

---

## 1. Lifestyle

> 💡 **Core Concept**: Turn ordinary daily life into meaningful rituals, and create beauty in details

### 1.1 Morning Ritual Awakening Assistant

**Scenario Description**:
Every morning, generate a personalized ritual based on weather, schedule, and mood. It might be a gentle song, a cup of tea that matches today’s mood, a 5-minute stretch, or a perfectly timed encouraging sentence.

**Key Atmosphere-Building Points**:
- Gradual awakening instead of abrupt urging
- Multi-sensory visual and auditory experience
- Make the start of every day feel worth looking forward to

**Psychological Cue**:
> "Today will be a beautiful day, because you deserve to be treated gently."

### 1.2 Solo Living Atmosphere Creator

**Scenario Description**:
Design home atmosphere plans for people living alone by intelligently combining lighting, music, scent, and more, so even a one-person home feels warm and grounding.

**Key Atmosphere-Building Points**:
- Auto-adjust atmosphere by time and mood
- Seasonal theme changes
- Create a feeling of "being accompanied"

### 1.3 Weekend Stay-Home Healing Plan Generator

**Scenario Description**:
On Friday night, generate a perfect weekend-at-home plan based on current mood and weather. Include movie picks, snack pairings, home setup suggestions, and even corners ideal for zoning out.

**Key Atmosphere-Building Points**:
- Healing-oriented visual presentation
- Low-pressure choice experience
- Make staying home feel like a treat

### 1.4 Bedtime Soul-Soothing Radio

**Scenario Description**:
Before sleep every night, generate personalized soothing content: gentle stories, meditation guidance, white noise, or simple good-night greetings to accompany users into sleep.

**Key Atmosphere-Building Points**:
- Soft vocal tone and rhythm
- Gradual volume fade design
- Build safety and relaxation

### 1.5 Life Aesthetics Inspiration Hunter

**Scenario Description**:
Help users discover beauty from daily details and provide life-aesthetics suggestions and ritual guides, such as making coffee more elegant or turning a desk into a flow-state space.

**Key Atmosphere-Building Points**:
- Find the extraordinary in ordinary moments
- Cultivate aesthetic perception
- Let life itself become art

---

## 2. Emotional Companionship

> 💡 **Core Concept**: Unconditional acceptance and companionship as a gentle emotional container

### 2.1 Late-Night Tree-Hole Listener

**Scenario Description**:
A 24/7 emotional outlet that receives all worries without judgment. Whether joy, sadness, anger, or confusion, there is always a place where emotions can land.

**Key Atmosphere-Building Points**:
- Absolute sense of safety and privacy protection
- No interruption, no preaching, just listening
- Gentle responses and empathy

**Psychological Cue**:
> "All your emotions are valid. I am here with you."

### 2.2 Heartbreak Healing Companion

**Scenario Description**:
Provide gentle companionship, healing suggestions, and emotional outlets during heartbreak lows. It does not rush users to "move on," but allows them to heal at their own pace.

**Key Atmosphere-Building Points**:
- Allow sadness to exist
- Gradual emotional guidance
- Rebuild self-worth

### 2.3 Anxiety Relief Breathing Coach

**Scenario Description**:
Sense user anxiety and guide breathing exercises and mindfulness meditation. In tense moments, provide a reliable anchor.

**Key Atmosphere-Building Points**:
- Real-time emotional awareness
- Simple and effective relief methods
- Create calm and a sense of control

### 2.4 Self-Confidence Rebuilding Mentor

**Scenario Description**:
Help users rebuild self-identity and self-worth through positive dialogue and psychological cues. Record each small step and witness transformation.

**Key Atmosphere-Building Points**:
- Discover overlooked strengths
- Celebrate every small win
- Build positive self-talk

### 2.5 Intelligent Emotional Journal Interpreter

**Scenario Description**:
Analyze users' emotional journals, discover patterns, and provide warm insights and suggestions so users understand themselves better and coexist with emotions peacefully.

**Key Atmosphere-Building Points**:
- Visualized emotional trajectory
- Warm insights instead of cold analysis
- Actionable suggestions

---

## 3. Entertainment & Leisure

> 💡 **Core Concept**: Create immersive experiences so entertainment becomes a place where the mind can rest

### 3.1 Immersive Script-Murder DM

**Scenario Description**:
Play the role of script-murder host, build suspense, and drive the story. Adjust rhythm in real time based on player responses to create unforgettable gameplay.

**Key Atmosphere-Building Points**:
- A gripping opening
- Well-paced suspense setting
- Immersive role-play

### 3.2 Open-World Soul NPC

**Scenario Description**:
Create lifelike NPCs that remember player stories and form genuine emotional bonds. They are not just quest givers but friends in the game world.

**Key Atmosphere-Building Points**:
- Persistent memory and continuity
- Personalized interaction
- Authentic emotional connection

### 3.3 Personalized Podcast Content Generator

**Scenario Description**:
Generate personalized podcasts based on user interests, sounding as natural as chatting with friends. Content can be knowledge sharing, storytelling, or simple companionship.

**Key Atmosphere-Building Points**:
- Relaxed and natural conversational feel
- Content aligned with personal taste
- Companionship available anytime

### 3.4 Virtual Concert Atmosphere Crew

**Scenario Description**:
Build live-concert atmosphere for online concerts with real-time interaction, cheering, and atmosphere rendering. Even alone at home, users can feel the excitement of a concert.

**Key Atmosphere-Building Points**:
- Visual and auditory immersion
- Real-time interaction and resonance
- Create collective participation

### 3.5 Interactive Novel Co-Creation Partner

**Scenario Description**:
Co-create stories with readers where each choice affects world direction. Readers are no longer passive consumers but co-creators.

**Key Atmosphere-Building Points**:
- Unlimited possibilities
- Real choice ownership
- Build stories that truly belong to the user

---

## 4. Personal Growth

> 💡 **Core Concept**: Growth is not ascetic suffering, but an interesting journey of self-discovery

### 4.1 Personal Growth Witness

**Scenario Description**:
Record user growth trajectories and provide encouragement and reflection at key milestones. Make growth visible and effort remembered.

**Key Atmosphere-Building Points**:
- Visualized growth path
- Milestone commemoration
- Warm reflection and forward-looking encouragement

**Psychological Cue**:
> "You have already come this far, even if you did not notice."

### 4.2 Gamified Habit-Building Coach

**Scenario Description**:
Turn boring habit formation into fun adventure gameplay. Every small habit kept becomes an achievement in the game.

**Key Atmosphere-Building Points**:
- Gamified motivation mechanics
- Instant positive feedback
- Make consistency feel fun

### 4.3 Skill-Learning Buddy Matcher

**Scenario Description**:
Match users with like-minded learning partners for mutual accountability and progress sharing. Learning no longer feels like a lonely solo trip.

**Key Atmosphere-Building Points**:
- Find peers on the same wavelength
- Build a mutually motivating atmosphere
- Share the joy of growing together

### 4.4 Daily Little Happiness Discoverer

**Scenario Description**:
Help users discover small beautiful moments in life and cultivate gratitude and positivity. Encourage recording one gratitude-worthy moment every day.

**Key Atmosphere-Building Points**:
- Notice overlooked goodness
- Build gratitude habits
- Accumulate positive energy

### 4.5 Life Simulation Explorer

**Scenario Description**:
Simulate different life choices and experience alternative possibilities in parallel worlds. Help users explore possibilities and make more authentic decisions.

**Key Atmosphere-Building Points**:
- Safe choice exploration
- Discover unknown sides of self
- No right or wrong, only experience

---

## 5. Social Interaction

> 💡 **Core Concept**: Make socializing feel natural and easy, and help users find their comfortable way of connecting

### 5.1 Icebreaker Topic Generator

**Scenario Description**:
Provide interesting topics for social settings to dissolve awkwardness and bring people closer. Whether it is a stranger meetup or old friends reconnecting, there is always a suitable opening.

**Key Atmosphere-Building Points**:
- Light and interesting topics
- Suitable across different settings
- Natural conversation openings

### 5.2 Moments Caption Atmosphere Stylist

**Scenario Description**:
Generate tasteful social captions based on photos and mood. Make sharing a form of expression and records warmer.

**Key Atmosphere-Building Points**:
- Align with personal style
- Tasteful but not forced
- Authentic emotional expression

### 5.3 Date Atmosphere Planner

**Scenario Description**:
Design complete date atmosphere plans from location to topics to surprises. Make every date a memorable experience.

**Key Atmosphere-Building Points**:
- End-to-end experience design
- Surprises at the right level
- Build romantic atmosphere

### 5.4 Remote Party Atmosphere Lead

**Scenario Description**:
Liven up online gatherings by organizing games and guiding interaction. Make remote parties feel as lively as face-to-face gatherings.

**Key Atmosphere-Building Points**:
- Fun games and activities
- Guided natural interaction
- Create collective participation

### 5.5 Social Energy Management Assistant

**Scenario Description**:
Help introverts manage social energy and find a comfortable social rhythm. Users do not need to force themselves to still enjoy social experiences.

**Key Atmosphere-Building Points**:
- Respect personal boundaries
- Find what works for each individual
- No personality change required

---

## 6. Creative Expression

> 💡 **Core Concept**: Everyone has creativity, it just needs to be awakened

### 6.1 Creative Block First-Aid Kit

**Scenario Description**:
Offer unexpected sparks during creative bottlenecks. Not standard answers, but keys that open new ways of thinking.

**Key Atmosphere-Building Points**:
- Break fixed thinking patterns
- Unexpected idea connections
- Activate internal creativity

### 6.2 Personal Style Exploration Guide

**Scenario Description**:
Help users discover unique personal style from outfit choices to self-expression. Let everyone find their own voice.

**Key Atmosphere-Building Points**:
- Discover what is uniquely yours
- Encourage experimentation
- Build a personal brand

### 6.3 Journal & Diary Aesthetics Advisor

**Scenario Description**:
Provide aesthetic suggestions for journal layout, color, and content ideas. Turn recording into art and give memories better texture.

**Key Atmosphere-Building Points**:
- Visual aesthetic guidance
- Content creativity inspiration
- Personalized style

### 6.4 Photography Composition Atmosphere Guide

**Scenario Description**:
Provide photography and editing suggestions based on scene and desired feeling. Make each photo deliver intended emotions.

**Key Atmosphere-Building Points**:
- Atmosphere over pure technique
- Visual expression of emotion
- Train an eye for beauty

### 6.5 Music Mood Matcher

**Scenario Description**:
Recommend perfect music combinations based on current mood and context. Music is emotional resonance and an atmosphere builder.

**Key Atmosphere-Building Points**:
- Precise emotion matching
- Scenario-based recommendation
- Healing power of music

---

## 7. Travel Exploration

> 💡 **Core Concept**: Travel is not only seeing scenery, but feeling different ways of life

### 7.1 City Walk Exploration Guide

**Scenario Description**:
Explore cities like a local and discover hidden gems. It is not only about check-in spots, but about sensing the city’s true pulse.

**Key Atmosphere-Building Points**:
- Local perspective
- Unexpected discoveries and surprises
- Dive into the city's soul

### 7.2 Travel Mood Journal Generator

**Scenario Description**:
Transform travel photos and moods into elegant travel journals and memories. Let every trip leave a unique mark.

**Key Atmosphere-Building Points**:
- Emotional recording
- Beautiful writing
- Lasting memories

### 7.3 Solo Travel Companion Assistant

**Scenario Description**:
Provide companionship, suggestions, and safety support for solo travelers. Solo trips can still feel cared for and accompanied.

**Key Atmosphere-Building Points**:
- Build a sense of safety
- Offer enjoyable companionship
- Solo but not lonely

### 7.4 Destination Atmosphere Preview

**Scenario Description**:
Immersively preview destination atmosphere before departure to get in the mood early. Let anticipation become part of the journey.

**Key Atmosphere-Building Points**:
- Immersive preview
- Spark anticipation and imagination
- Enter travel mode in advance

### 7.5 Travel Photography Atmosphere Coach

**Scenario Description**:
Guide users to capture story-rich travel photos based on scene and light. It is not just recording, but storytelling.

**Key Atmosphere-Building Points**:
- Story-first composition
- Emotion capture
- Unique perspective

---

## 8. Physical & Mental Health

> 💡 **Core Concept**: Health is not an endpoint, but a gentle practice of self-care

### 8.1 Exercise Motivation Awakener

**Scenario Description**:
When users do not feel like moving, provide exactly the right encouragement. It is not forcing action, but awakening internal motivation.

**Key Atmosphere-Building Points**:
- Understand resistance to movement
- Step-by-step guidance
- Celebrate every small action

### 8.2 Healthy Diet Inspiration Kitchen

**Scenario Description**:
Generate healing healthy recipes based on mood and available ingredients. Healthy eating can also be delicious enjoyment.

**Key Atmosphere-Building Points**:
- Appealing food experiences
- Simple cooking methods
- Healthy balance

### 8.3 Sleep Quality Atmosphere Optimizer

**Scenario Description**:
Build high-quality sleep atmosphere from environment to mindset. Make sleep the most anticipated part of the day.

**Key Atmosphere-Building Points**:
- Environmental optimization
- Psychological relaxation
- Ritualized design

### 8.4 Body Awareness Guide

**Scenario Description**:
Guide users to notice body signals and build mind-body connection. Pause in busy life and listen to the body.

**Key Atmosphere-Building Points**:
- Gentle guidance
- Body awareness
- Mind-body integration

### 8.5 Self-Care Reminder Assistant

**Scenario Description**:
Remind users to pause and care for themselves in the middle of busy days. A small reminder can change the state of an entire day.

**Key Atmosphere-Building Points**:
- Timely reminders
- Simple actions
- Gentle care

---

## 9. Knowledge Exploration

> 💡 **Core Concept**: Learning is an endless adventure, and curiosity is the best teacher

### 9.1 Gamified Knowledge Exploration Guide

**Scenario Description**:
Turn boring learning into an engaging exploration adventure. Every knowledge point becomes a treasure waiting to be discovered.

**Key Atmosphere-Building Points**:
- Gamified experience
- Joy of exploration
- Sense of achievement

### 9.2 Language Learning Scenario Partner

**Scenario Description**:
Play different roles so users naturally acquire language through contextual dialogue. Not rote memorization, but learning through use.

**Key Atmosphere-Building Points**:
- Realistic contexts
- Interesting role-play
- Natural acquisition

### 9.3 Curiosity Satisfaction Assistant

**Scenario Description**:
Answer all kinds of imaginative questions and satisfy curiosity about the world. There are no foolish questions, only answers waiting to be found.

**Key Atmosphere-Building Points**:
- Encourage asking
- Interesting explanations
- Spark even more curiosity

### 9.4 Reading Notes Inspiration Booster

**Scenario Description**:
Help users organize reading insights and discover new thinking angles. Turn reading into dialogue with the author and with oneself.

**Key Atmosphere-Building Points**:
- Deep thinking
- Personal perspective
- Knowledge connection

### 9.5 Knowledge-Sharing Atmosphere Builder

**Scenario Description**:
Transform what users learned into interesting content for sharing. Sharing is not only output, but also a process of deepening understanding.

**Key Atmosphere-Building Points**:
- Engaging expression
- Joy of sharing
- Knowledge diffusion

---

## 10. Relationship Management

> 💡 **Core Concept**: Good relationships require care, and care does not need to be complicated

### 10.1 Intimate Communication Coach

**Scenario Description**:
Help users express difficult emotions and improve intimate relationships. Sometimes what is needed is simply the right way to say what is in the heart.

**Key Atmosphere-Building Points**:
- Safe space for expression
- Gentle suggestions
- Improved mutual understanding

### 10.2 Family Care Reminder Assistant

**Scenario Description**:
Remind users to care for family and provide warm interaction suggestions. In busy life, do not forget what matters most.

**Key Atmosphere-Building Points**:
- Timely reminders
- Simple care actions
- Warm connection

### 10.3 Friendship Maintenance Atmosphere Coach

**Scenario Description**:
Help users maintain long-distance friendships and create shared topics. Distance is not the problem; intention is the key.

**Key Atmosphere-Building Points**:
- Create opportunities to connect
- Shared conversation themes
- Sustained friendship

### 10.4 Confession & Surprise Planner

**Scenario Description**:
Plan unforgettable surprises and romantic moments for important people. Make special days even more special.

**Key Atmosphere-Building Points**:
- Personalized design
- Romantic surprise moments
- Memorable experiences

### 10.5 Conflict-Deescalation Atmosphere Guide

**Scenario Description**:
Provide atmosphere-softening suggestions and wording when relationships become tense. Help users find a bridge toward reconciliation.

**Key Atmosphere-Building Points**:
- Understand both sides
- Gentle guidance
- Relationship repair

---

## 11. Pet Companionship

> 💡 **Core Concept**: Pets are family, and their companionship deserves to be recorded and cherished

### 11.1 Anthropomorphic Pet Diary

**Scenario Description**:
Generate diary entries from a pet perspective to record warm daily moments with owners. Imagine how pets would describe their time with you.

**Key Atmosphere-Building Points**:
- Adorable perspective
- Warm daily moments
- Emotional connection

### 11.2 Pet Behavior Interpreter

**Scenario Description**:
Interpret pet behavior language to deepen pet-owner connection and better understand needs and emotions.

**Key Atmosphere-Building Points**:
- Professional interpretation
- Better understanding
- Better care

### 11.3 Pet Bonding-Time Planner

**Scenario Description**:
Design creative activities for interacting with pets and strengthening bonds. Make companionship time more meaningful and fun.

**Key Atmosphere-Building Points**:
- Creative activities
- Fun interaction
- Beautiful memories

### 11.4 Pet Memory Story Generator

**Scenario Description**:
Turn pet photos and memories into warm stories. Record precious moments with furry family members.

**Key Atmosphere-Building Points**:
- Warm narrative
- Precious memory preservation
- Enduring love

### 11.5 New Pet Parent Comfort Guide

**Scenario Description**:
Provide warm companionship and practical guidance for new pet owners, making the pet-raising journey confident and joyful.

**Key Atmosphere-Building Points**:
- Comprehensive guidance
- Warm encouragement
- Reassuring companionship

---

## 12. Financial Health

> 💡 **Core Concept**: Financial freedom is not the only goal; financial health is

### 12.1 Spending Emotion Awareness Assistant

**Scenario Description**:
Help users notice emotions behind impulse spending and build healthy spending views. Understanding why you want to buy can be more important than whether you buy.

**Key Atmosphere-Building Points**:
- Gentle awareness
- Understanding without judgment
- Healthier habits

### 12.2 Savings Goal Visualization Motivator

**Scenario Description**:
Turn savings goals into visible dream-progress journeys. Make saving part of realizing dreams.

**Key Atmosphere-Building Points**:
- Visualized progress
- Dream-linked motivation
- Sense of achievement

### 12.3 Easy & Fun Finance Learning

**Scenario Description**:
Learn financial knowledge in a light and enjoyable way. Finance should not be dry; it can be an engaging exploration.

**Key Atmosphere-Building Points**:
- Relaxed communication style
- Interesting real examples
- Practical knowledge

### 12.4 Financial Anxiety Soothing Coach

**Scenario Description**:
Provide emotional support and practical suggestions under financial stress. Anxiety does not solve problems, but calm often does.

**Key Atmosphere-Building Points**:
- Emotional soothing
- Practical guidance
- A sense of hope

### 12.5 Small-Amount Investment Experience Game

**Scenario Description**:
Use gamification to experience investing and lower the beginner barrier. Learn investing inside a safer environment.

**Key Atmosphere-Building Points**:
- Game-like experience
- Safe trial-and-error
- Joyful learning

---

## 13. Career Development

> 💡 **Core Concept**: A career is not a fixed track, but an open field for exploration

### 13.1 Career-Confusion Companion

**Scenario Description**:
Offer listening, exploration, and direction suggestions during career confusion. Feeling lost is normal; facing it alone is not required.

**Key Atmosphere-Building Points**:
- Non-judgmental listening
- Possibility exploration
- Warm companionship

### 13.2 Work Achievement Awakener

**Scenario Description**:
Help users rediscover value and meaning in work and reignite passion. Sometimes it is simply about seeing from a new angle.

**Key Atmosphere-Building Points**:
- Reveal hidden value
- Reignite passion
- Restore sense of achievement

### 13.3 Workplace Social Atmosphere Assistant

**Scenario Description**:
Provide relaxed workplace social topics and interaction suggestions so professional socializing feels less awkward and more natural.

**Key Atmosphere-Building Points**:
- Easy conversation starters
- Natural interaction
- Comfortable relationships

### 13.4 Side-Hustle Inspiration Generator

**Scenario Description**:
Generate side-hustle ideas based on personal interests and skills. Explore possibilities beyond regular work.

**Key Atmosphere-Building Points**:
- Interest discovery
- Possibility expansion
- Action encouragement

### 13.5 Pre-Interview Confidence Station

**Scenario Description**:
Provide confidence-building and mental preparation support before interviews so users can meet opportunities in their best state.

**Key Atmosphere-Building Points**:
- Confidence building
- Solid preparation
- Best-state readiness

---

## 14. Home Space

> 💡 **Core Concept**: Home is not only where we live, but where the mind can rest

### 14.1 Home Atmosphere Designer

**Scenario Description**:
Design home atmosphere plans by mood and season so home can change with emotional and seasonal rhythms.

**Key Atmosphere-Building Points**:
- Atmosphere-focused design
- Seasonal variation
- Mood matching

### 14.2 Four-Season Home Refresh Guide

**Scenario Description**:
Update home layout and decor with the seasons to keep freshness. Let home stay full of vitality and surprise.

**Key Atmosphere-Building Points**:
- Seasonal themes
- Fresh feeling
- Everyday ritual quality

### 14.3 Small-Space Magic

**Scenario Description**:
Help small spaces still feel comfortable and warm. Space size is not the key; feeling is.

**Key Atmosphere-Building Points**:
- Space optimization
- Cozy atmosphere
- Comfortable living

### 14.4 At-Home Ritual Creator

**Scenario Description**:
Create rituals for daily home activities. Turn ordinary chores into meaningful moments.

**Key Atmosphere-Building Points**:
- Ritual design
- Meaning assignment
- Better life quality

### 14.5 Decluttering Psychological Companion

**Scenario Description**:
Provide emotional support and decision suggestions while organizing belongings. Decluttering is not only removing objects, but also organizing the mind.

**Key Atmosphere-Building Points**:
- Emotional support
- Decision assistance
- Inner clarity

---

## 15. Food & Cooking

> 💡 **Core Concept**: Food is a language of love, and cooking is a way to express it

### 15.1 One-Person Healing Cuisine

**Scenario Description**:
Design simple healing meal plans for solo living. Even alone, users deserve to eat well and care for themselves.

**Key Atmosphere-Building Points**:
- Simple cooking process
- Comforting taste
- Self-love expression

### 15.2 Festive Table Atmosphere Designer

**Scenario Description**:
Design ritual-rich table setups for special days so every meal can become a memorable moment.

**Key Atmosphere-Building Points**:
- Ritual-oriented design
- Visual enjoyment
- Beautiful memories

### 15.3 Cooking Mood Matcher

**Scenario Description**:
Recommend suitable food and cooking methods by current mood. Sometimes what users need is exactly that one right flavor.

**Key Atmosphere-Building Points**:
- Mood matching
- Food as healing
- Emotional connection

### 15.4 Kitchen Beginner Confidence Builder

**Scenario Description**:
Provide warm encouragement and simple recipes for beginner cooks. Everyone can become their own chef.

**Key Atmosphere-Building Points**:
- Easy starting path
- Warm encouragement
- Confidence building

### 15.5 Food Photography Atmosphere Guide

**Scenario Description**:
Help everyday dishes look atmosphere-rich and tempting in photos. Recording food is also recording life’s beauty.

**Key Atmosphere-Building Points**:
- Atmosphere creation
- Visual enjoyment
- Beautiful life documentation

---

## 16. Style & Outfit

> 💡 **Core Concept**: Outfit is self-expression, and style is the external form of what is inside

### 16.1 Today's Outfit Mood Board

**Scenario Description**:
Generate outfit inspiration based on weather, occasion, and mood so each day’s look expresses current emotions.

**Key Atmosphere-Building Points**:
- Mood expression
- Occasion alignment
- Confidence building

### 16.2 Capsule Wardrobe Stylist

**Scenario Description**:
Create limitless outfit combinations from a limited set of items. Less can be more, and simplicity can still look highly styled.

**Key Atmosphere-Building Points**:
- Minimalist concept
- Creative combinations
- Sustainable fashion

### 16.3 Personal Style Exploration Journey

**Scenario Description**:
Help users discover and build unique personal style. Dressing is not only wearing clothes, but showing one’s attitude.

**Key Atmosphere-Building Points**:
- Self exploration
- Style formation
- Confident expression

### 16.4 Old-Clothes New-Wear Creator

**Scenario Description**:
Provide new styling inspiration for old clothing. Revitalize old pieces and make fashion more sustainable.

**Key Atmosphere-Building Points**:
- Creative restyling
- Eco-conscious mindset
- Fresh feeling

### 16.5 Special-Occasion Styling Advisor

**Scenario Description**:
Design confidence-boosting looks for important occasions so every key moment can be presented at its best.

**Key Atmosphere-Building Points**:
- Occasion matching
- Confidence enhancement
- Polished presentation

---

## Core Principles for Designing C-End Products

### 1. From "Function" to "Feeling"

B-End products care about "what problem this feature solves." C-End products care about "what feeling this feature creates."

| B-End Thinking | C-End Thinking |
|---------|---------|
| Improve efficiency | Save time for things users love |
| Reduce costs | Make every dollar feel worthwhile |
| Solve pain points | Create delightful experiences |
| Full feature set | Feeling done right |

### 2. Three Layers of Atmosphere Building

**Sensory Layer**: design for sight, sound, and touch-like interaction feel
- Warm colors
- Soothing sounds
- Smooth motion

**Emotional Layer**: emotional resonance and guidance
- Understand user moods
- Provide emotional support
- Create positive emotions

**Meaning Layer**: value identity and belonging
- Make users feel understood
- Build a sense of belonging
- Give action a sense of meaning

### 3. The Power of Psychological Cues

Copy and design in C-End products always carry psychological cues:

- **Positive cues**: "You are already doing great", "Take your time, it is okay"
- **Belonging cues**: "Many people feel the same", "You are not alone"
- **Growth cues**: "Every attempt is progress", "You are getting better"

### 4. Help Users Become Better Versions of Themselves

The best C-End products do not change users by force; they help users become who they want to be.

- Not "you should...", but "you can..."
- Not "you must...", but "if you want..."
- Not "you are not enough yet...", but "you are already..."

---

> 🌟 **Remember**: C-End users do not buy functions, they buy feelings; not tools, but companionship; not service, but understanding.
