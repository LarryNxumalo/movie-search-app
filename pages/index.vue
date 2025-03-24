<template>
  <div>
    <!-- Hero Section -->
    <div class="mb-12 text-center">
      <h1 class="text-4xl font-bold mb-4 dark:text-gray-200">Welcome to MovieSearch</h1>
      <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Discover your next favorite movie or TV series. Browse through thousands of titles and keep track of what you've viewed.
      </p>
    </div>

    <!-- Featured Movies -->
    <section class="mb-12">
      <SectionTitle>Featured Movies</SectionTitle>
      <MediaGrid 
        :items="featuredMovies"
        :loading="loadingMovies"
        empty-message="No featured movies available"
      />
    </section>

    <!-- Featured TV Shows -->
    <section class="mb-12">
      <SectionTitle>Featured TV Shows</SectionTitle>
      <MediaGrid 
        :items="featuredSeries"
        :loading="loadingSeries"
        empty-message="No featured TV shows available"
      />
    </section>

    <!-- Recently Viewed -->
    <section v-if="recentlyViewed.length" class="mb-12">
      <SectionTitle>Recently Viewed</SectionTitle>
      <MediaGrid :items="recentlyViewed" />
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