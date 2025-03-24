<template>
  <div>
    <!-- Hero Section -->
    <div class="mb-12 text-center">
      <h1 class="text-4xl font-bold mb-4">Welcome to MovieSearch</h1>
      <p class="text-gray-600 max-w-2xl mx-auto">
        Discover your next favorite movie or TV series. Browse through thousands of titles and keep track of what you've viewed.
      </p>
    </div>

    <!-- Featured Movies Section -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-6">Featured Movies</h2>
      <div v-if="loadingMovies" class="text-center py-8">
        <div class="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
      </div>
      <div v-else-if="featuredMovies.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div v-for="movie in featuredMovies" :key="movie.imdbID" 
          class="movie-card dark-mode-transition">
          <NuxtLink :to="`/${movie.imdbID}`">
            <img 
              :src="movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.png'" 
              :alt="movie.Title"
              class="w-full h-[400px] object-cover"
            >
            <div class="movie-card-content">
              <h3 class="font-semibold text-lg mb-2 dark:text-gray-200">{{ movie.Title }}</h3>
              <p class="text-gray-600 dark:text-gray-400">{{ movie.Year }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Featured TV Shows Section -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-6 dark:text-gray-200">Featured TV Shows</h2>
      <div v-if="loadingSeries" class="text-center py-8">
        <div class="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
      </div>
      <div v-else-if="featuredSeries.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div v-for="show in featuredSeries" :key="show.imdbID" class="movie-card">
          <NuxtLink :to="`/${show.imdbID}`">
            <img 
              :src="show.Poster !== 'N/A' ? show.Poster : '/placeholder.png'" 
              :alt="show.Title"
              class="w-full h-[400px] object-cover"
            >
            <div class="movie-card-content">
              <h3 class="font-semibold text-lg mb-2 dark:text-gray-200">{{ show.Title }}</h3>
              <p class="text-gray-600 dark:text-gray-400">{{ show.Year }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Recently Viewed Section -->
    <section v-if="recentlyViewed.length" class="mb-12">
      <h2 class="text-2xl font-semibold mb-6 dark:text-gray-200">Recently Viewed</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div v-for="item in recentlyViewed" :key="item.imdbID" class="movie-card">
          <NuxtLink :to="`/${item.imdbID}`">
            <img 
              :src="item.Poster !== 'N/A' ? item.Poster : '/placeholder.png'" 
              :alt="item.Title"
              class="w-full h-[400px] object-cover"
            >
            <div class="movie-card-content">
              <h3 class="font-semibold text-lg mb-2 dark:text-gray-200">{{ item.Title }}</h3>
              <p class="text-gray-600 dark:text-gray-400">{{ item.Year }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useMovieStore } from '~/stores/movies'

const { searchMedia } = useOmdb()
const store = useMovieStore()

const featuredMovies = ref([])
const featuredSeries = ref([])
const loadingMovies = ref(true)
const loadingSeries = ref(true)
const recentlyViewed = computed(() => store.recentlyViewed)

// Featured content queries
const movieQueries = ['marvel', 'star wars', 'lord of the rings', 'harry potter']
const seriesQueries = ['breaking bad', 'game of thrones', 'stranger things', 'the office']

const getRandomQuery = (queries) => {
  return queries[Math.floor(Math.random() * queries.length)]
}

onMounted(async () => {
  // Fetch featured movies
  try {
    const movieQuery = getRandomQuery(movieQueries)
    const movieResult = await searchMedia(movieQuery, 'movie')
    if (movieResult.Search) {
      featuredMovies.value = movieResult.Search.slice(0, 4)
    }
  } catch (error) {
    console.error('Error fetching featured movies:', error)
  } finally {
    loadingMovies.value = false
  }

  // Fetch featured TV series
  try {
    const seriesQuery = getRandomQuery(seriesQueries)
    const seriesResult = await searchMedia(seriesQuery, 'series')
    if (seriesResult.Search) {
      featuredSeries.value = seriesResult.Search.slice(0, 4)
    }
  } catch (error) {
    console.error('Error fetching featured series:', error)
  } finally {
    loadingSeries.value = false
  }
})
</script> 