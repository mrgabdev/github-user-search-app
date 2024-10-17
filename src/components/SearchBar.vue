<script>
import ButtonSearch from './ButtonSearch.vue'
import { FindIcon } from './icons'
import GitHubApi from '../services/GitHubApi'

const DEFAULT_USER = 'octocat'

export default {
  props: ['user'],
  emits: ['update:user'],
  data() {
    return {
      username: null,
      error: false,
    }
  },
  methods: {
    async fetchUser() {
      const githubApi = new GitHubApi()
      const username = this.username ?? DEFAULT_USER
      try {
        const user = await githubApi.findUser(username)
        console.log(user)

        this.$emit('update:user', user)
        this.error = false
      } catch {
        this.error = true
      }
    },
  },
  mounted() {
    this.fetchUser()
  },
  components: {
    ButtonSearch,
    FindIcon,
  },
}
</script>

<template>
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
    <p v-if="error" class="text-red-500 font-bold text-nowrap">No results</p>
    <ButtonSearch />
  </form>
</template>
