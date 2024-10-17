<script>
import ButtonTheme from './components/ButtonTheme.vue'
import SearchBar from './components/SearchBar.vue'
import UserProfile from './components/UserProfile.vue'

export default {
  data() {
    return {
      user: null,
    }
  },
  components: {
    ButtonTheme,
    SearchBar,
    UserProfile,
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
        <ButtonTheme />
      </header>

      <SearchBar v-model:user="user" />
      <UserProfile :user="user" />
    </main>
  </div>
</template>
