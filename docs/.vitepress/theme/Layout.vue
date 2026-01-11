<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import TextType from './components/TextType.vue'

const { frontmatter } = useData()

const homeTaglineTyping = {
  typingSpeed: 45,
  initialDelay: 0,
  pauseDuration: 2500,
  postDeletingDelay: 500,
  deletingSpeed: 18
}
</script>

<template>
  <DefaultTheme.Layout>
    <template #home-hero-info-after>
      <div v-if="frontmatter.layout === 'home' && frontmatter.hero?.tagline" class="vp-typed-tagline">
        <ClientOnly>
          <TextType :text="frontmatter.hero.tagline" v-bind="homeTaglineTyping" :loop="true" />
        </ClientOnly>
      </div>
    </template>
  </DefaultTheme.Layout>
</template>
