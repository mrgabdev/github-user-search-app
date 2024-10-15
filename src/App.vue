<script>
import ButtonSearch from './components/ButtonSearch.vue'
import {
  SunIcon,
  MoonIcon,
  FindIcon,
  OfficeIcon,
  PinIcon,
  TwitterIcon,
  UrlIcon,
} from './components/icons'
import NotAviable from './components/NotAviable.vue'
import GitHubApi from './services/GitHubApi'

const THEME = {
  light: 'light',
  dark: 'dark',
}

/**
 * TODO: Create user SFC
 * TODO: Create searchbar SFC
 */

export default {
  data() {
    return {
      theme: THEME.light,
      error: false,
      user: null,
      username: null,
    }
  },
  methods: {
    async fetchUser() {
      const githubApi = new GitHubApi()
      const username = this.username ?? 'octocat'
      try {
        this.user = await githubApi.findUser(username)
        this.error = false
      } catch {
        this.error = true
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
    this.fetchUser()
  },
  components: {
    SunIcon,
    MoonIcon,
    FindIcon,
    ButtonSearch,
    NotAviable,
    OfficeIcon,
    PinIcon,
    TwitterIcon,
    UrlIcon,
  },
}
</script>

<template>
  <div
    class="min-h-screen bg-softBlue px-6 py-8 flex md:items-center justify-center"
  >
    <main class="max-w-[730px] w-full">
      <header class="flex justify-between items-center">
        <h1 class="text-navyBlack">devfinder</h1>
        <div
          @click="toggleTheme"
          class="flex gap-4 cursor-pointer select-none group"
        >
          <p
            class="uppercase text-slateBlue group-hover:text-darkSlateBlue font-bold text-sm tracking-[2.5px]"
          >
            {{ theme === 'light' ? 'dark' : 'light' }}
          </p>
          <SunIcon
            v-if="theme === 'dark'"
            class="group-hover:fill-darkSlateBlue"
          />
          <MoonIcon
            v-if="theme === 'light'"
            class="group-hover:fill-darkSlateBlue"
          />
        </div>
      </header>
      <form
        @submit.prevent="fetchUser"
        class="flex items-center gap-2 p-2 pl-4 md:gap-6 md:pl-8 bg-offWhite mt-9 rounded-2xl h-[60px] md:h-[69px] shadow-lg"
      >
        <FindIcon />
        <input
          v-model="username"
          class="bg-transparent outline-none text-oceanBlue w-full text-xs md:text-lg caret-brandBlue"
          type="text"
          placeholder="Search Github username..."
        />
        <p v-if="error" class="text-red-500 font-bold text-nowrap">
          No results
        </p>
        <ButtonSearch />
      </form>
      <div
        class="bg-offWhite md:h-[444px] w-full mt-6 rounded-2xl text-oceanBlue p-8 md:px-14 md:py-10 shadow-lg"
      >
        <section v-if="user" class="block md:flex md:items-start md:gap-8">
          <img
            :src="user.avatarUrl"
            alt="User Avatar"
            class="w-full max-w-[117px] max-h-[117px] rounded-full hidden md:block"
          />
          <div class="w-full">
            <!-- User Profile -->
            <section class="flex justify-between gap-5">
              <img
                :src="user.avatarUrl"
                alt="User Avatar"
                class="max-w-[70px] max-h-[70px] w-full rounded-full block md:hidden"
              />
              <div class="flex flex-wrap justify-between w-full">
                <div>
                  <h2 class="text-[16px] md:text-2xl text-navyBlack">
                    {{ user.name }}
                  </h2>
                  <p class="text-brandBlue text-sm md:text-[16px] mt-1">
                    @{{ user.login }}
                  </p>
                </div>
                <p class="text-sm md:text-base">Joinded {{ user.createdAt }}</p>
              </div>
            </section>

            <section class="mt-5">
              <p v-if="user.bio" class="text-sm md:text-base">
                {{ user.bio }}
              </p>
              <p v-else>This profile has no bio</p>
            </section>

            <!-- Stats -->
            <section
              class="bg-softBlue rounded-lg flex justify-between p-4 md:py-6 md:px-8 my-5 md:my-8"
            >
              <div>
                <h3 class="text-xs md:text-sm mb-1">Repos</h3>
                <p
                  class="font-bold text-midnightBlue text-center md:text-left text-base md:text-2xl"
                >
                  {{ user.repositories }}
                </p>
              </div>
              <div>
                <h3 class="text-xs md:text-sm mb-1">Followers</h3>
                <p
                  class="font-bold text-midnightBlue text-center md:text-left text-base md:text-2xl"
                >
                  {{ user.followers }}
                </p>
              </div>
              <div>
                <h3 class="text-xs md:text-sm mb-1">Following</h3>
                <p
                  class="font-bold text-midnightBlue text-center md:text-left text-base md:text-2xl"
                >
                  {{ user.following }}
                </p>
              </div>
            </section>

            <!-- User Additional Data-->
            <section class="flex flex-wrap justify-between gap-5">
              <div class="flex gap-5 items-center md:order-1">
                <PinIcon :class="`${!user.location && 'fill-gray-400'}`" />
                <p v-if="user.location" class="text-sm md:text-base">
                  {{ user.location }}
                </p>
                <NotAviable v-else />
              </div>
              <div class="flex gap-5 items-center md:order-3">
                <UrlIcon :class="`${!user.blog && 'fill-gray-400'}`" />
                <p v-if="user.blog" class="text-sm md:text-base">
                  {{ user.blog }}
                </p>
                <NotAviable v-else />
              </div>
              <div class="flex gap-5 items-center md:order-2">
                <TwitterIcon
                  :class="`${!user.twitterUsername && 'fill-gray-500'}`"
                />
                <p v-if="user.twitterUsername" class="text-sm md:text-base">
                  {{ user.twitterUsername }}
                </p>
                <NotAviable v-else />
              </div>
              <div class="flex gap-5 items-center md:order-4">
                <OfficeIcon :class="`${!user.company && 'fill-gray-400'}`" />
                <p v-if="user.company" class="text-sm md:text-base">
                  {{ user.company }}
                </p>
                <NotAviable v-else />
              </div>
            </section>
          </div>
        </section>
        <div v-else>Loading...</div>
      </div>
    </main>
  </div>
</template>
