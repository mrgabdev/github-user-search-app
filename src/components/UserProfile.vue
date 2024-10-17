<script>
import { OfficeIcon, PinIcon, TwitterIcon, UrlIcon } from './icons'
import NotAviable from './NotAviable.vue'

export default {
  props: ['user'],
  components: {
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
              <h2 class="text-base md:text-2xl text-navyBlack text-ellipsis">
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
        <section
          class="flex flex-col md:flex-row flex-wrap justify-between gap-5"
        >
          <div class="flex flex-col justify-between gap-5">
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
          </div>
          <div class="flex flex-col justify-between gap-5">
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
          </div>
        </section>
      </div>
    </section>
    <div v-else>Loading...</div>
  </div>
</template>
