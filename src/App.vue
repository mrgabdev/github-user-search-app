<script>
import ButtonSearch from './components/ButtonSearch.vue'
import { SunIcon, MoonIcon, FindIcon } from './components/icons'
import GitHubApi from './services/GitHubApi'

const THEME = {
  light: 'light',
  dark: 'dark',
}

export default {
  data() {
    return {
      theme: THEME.light,
      error: false,
      user: null,
      userId: null,
    }
  },
  methods: {
    async fetchUser() {
      const githubApi = new GitHubApi()
      try {
        this.user = await githubApi.findUser(this.userId)
        console.log(this.user)
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    },
    toggleTheme() {
      const newTheme = this.theme === THEME.light ? THEME.dark : THEME.light
      this.theme = newTheme
      document.body.className = newTheme
    },
    syncTheme() {
      const browserPreference = window.matchMedia(
        '(prefers-color-scheme: dark)',
      )
      const preference = localStorage.getItem('theme')

      if (preference) {
        this.theme = preference
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
    FindIcon,
    ButtonSearch,
  },
}
</script>

<template>
  <div
    class="h-screen bg-softBlue px-6 py-8 flex md:items-center justify-center"
  >
    <main class="max-w-[730px] w-full">
      <header class="flex justify-between">
        <h1 class="text-navyBlack">devfinder</h1>
        <div @click="toggleTheme" class="flex gap-4 cursor-pointer select-none">
          <p
            class="uppercase text-slateBlue font-bold text-sm tracking-[2.5px]"
          >
            {{ theme === 'light' ? 'dark' : 'light' }}
          </p>
          <sun-icon v-if="theme === 'dark'"></sun-icon>
          <moon-icon v-if="theme === 'light'"></moon-icon>
        </div>
      </header>
      <form
        @submit.prevent="fetchUser"
        class="flex items-center gap-2 md:gap-6 p-2 md:pl-8 bg-offWhite mt-9 rounded-2xl h-[60px] md:h-[69px] shadow-lg"
      >
        <find-icon></find-icon>
        <input
          v-model="userId"
          class="bg-transparent outline-none text-oceanBlue w-full text-sm md:text-lg"
          type="text"
          placeholder="Search Github username..."
        />
        <p v-if="error" class="text-red-500 font-bold text-nowrap">
          No results
        </p>
        <button-search></button-search>
      </form>
      <section
        class="bg-offWhite max-h-[419px] w-full mt-6 rounded-2xl text-oceanBlue p-5"
      >
        <div v-if="user">
          <h1>{{ user.name }}</h1>
          <img :src="user.avatarUrl" alt="User Avatar" class="max-w-[150px]" />
          <p>{{ user.bio }}</p>
          <p>Repositories: {{ user.repositories }}</p>
          <p>Followers: {{ user.followers }}</p>
          <p>Following: {{ user.following }}</p>
        </div>
        <div v-else>
          <p>Not found</p>
        </div>
      </section>
    </main>
  </div>
</template>
