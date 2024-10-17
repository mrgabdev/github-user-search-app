<script>
import { SunIcon, MoonIcon } from './icons'
const THEME = {
  light: 'light',
  dark: 'dark',
}

export default {
  data() {
    return {
      theme: THEME.light,
    }
  },
  methods: {
    toggleTheme() {
      const newTheme = this.theme === THEME.light ? THEME.dark : THEME.light
      this.theme = newTheme
      document.body.className = newTheme
      localStorage.setItem('theme', newTheme)
    },

    syncTheme() {
      const browserPreference = window.matchMedia(
        '(prefers-color-scheme: dark)',
      )
      const preference = localStorage.getItem('theme')
      if (preference) {
        this.theme = preference
        document.body.className = preference
        return
      }
      if (browserPreference) {
        this.theme = THEME.dark
        return
      }
    },
  },
  mounted() {
    this.syncTheme()
  },
  components: {
    SunIcon,
    MoonIcon,
  },
}
</script>

<template>
  <div @click="toggleTheme" class="flex gap-4 cursor-pointer select-none group">
    <p
      class="uppercase text-slateBlue group-hover:text-darkSlateBlue font-bold text-sm tracking-[2.5px]"
    >
      {{ theme === 'light' ? 'dark' : 'light' }}
    </p>
    <SunIcon v-if="theme === 'dark'" class="group-hover:fill-darkSlateBlue" />
    <MoonIcon v-if="theme === 'light'" class="group-hover:fill-darkSlateBlue" />
  </div>
</template>
