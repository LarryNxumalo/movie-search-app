<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Welcome to Movie Search</h1>
    
    <!-- Featured Section -->
    <div class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Featured Titles</h2>
      <div v-if="loading" class="text-center">Loading...</div>
      <div v-else class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div v-for="item in featured" :key="item.imdbID" class="bg-white rounded-lg shadow-md overflow-hidden">
          <NuxtLink :to="`/${item.imdbID}`">
            <img :src="item.Poster" :alt="item.Title" class="w-full h-[400px] object-cover">
            <div class="p-4">
              <h3 class="font-semibold">{{ item.Title }}</h3>
              <p class="text-gray-600">{{ item.Year }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Recently Viewed Section -->
    <div v-if="recentlyViewed.length">
      <h2 class="text-2xl font-semibold mb-4">Recently Viewed</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div v-for="item in recentlyViewed" :key="item.imdbID" class="bg-white rounded-lg shadow-md overflow-hidden">
          <NuxtLink :to="`/${item.imdbID}`">
            <img :src="item.Poster" :alt="item.Title" class="w-full h-[400px] object-cover">
            <div class="p-4">
              <h3 class="font-semibold">{{ item.Title }}</h3>
              <p class="text-gray-600">{{ item.Year }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useMovieStore } from '~/stores/movies'

const { searchMedia } = useOmdb()
const store = useMovieStore()
const featured = ref([])
const loading = ref(true)

const recentlyViewed = computed(() => store.recentlyViewed)

onMounted(async () => {
  try {
    // Load some featured content (using a popular movie search as example)
    const result = await searchMedia('marvel')
    if (result.Search) {
      featured.value = result.Search
    }
  } catch (error) {
    console.error('Error fetching featured content:', error)
  } finally {
    loading.value = false
  }

  // Load recently viewed items
  store.loadRecentlyViewed()
})
</script> 