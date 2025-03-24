<template>
  <div>
    <h1 class="text-3xl font-bold mb-8">Movies</h1>

    <!-- Search Form -->
    <form @submit.prevent="handleSearch" class="mb-8">
      <div class="flex gap-4">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Search for movies..."
          class="search-input flex-1"
          required
        >
        <button 
          type="submit"
          class="btn btn-primary"
          :disabled="loading"
        >
          {{ loading ? 'Searching...' : 'Search' }}
        </button>
      </div>
    </form>

    <!-- Results -->
    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
    </div>

    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-500">{{ error }}</p>
    </div>

    <div v-else-if="movies.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      <div v-for="movie in movies" :key="movie.imdbID" class="movie-card">
        <NuxtLink :to="`/${movie.imdbID}`">
          <img 
            :src="movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.png'" 
            :alt="movie.Title"
            class="w-full h-[400px] object-cover"
          >
          <div class="p-4">
            <h3 class="font-semibold text-lg mb-2">{{ movie.Title }}</h3>
            <p class="text-gray-600">{{ movie.Year }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>

    <div v-else-if="hasSearched" class="text-center py-12">
      <p class="text-gray-600">No movies found. Try a different search term.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const { searchMedia } = useOmdb()

const searchQuery = ref('')
const movies = ref([])
const loading = ref(false)
const error = ref(null)
const hasSearched = ref(false)

const handleSearch = async () => {
  if (!searchQuery.value.trim()) return

  loading.value = true
  error.value = null
  movies.value = []
  hasSearched.value = true

  try {
    const response = await searchMedia(searchQuery.value, 'movie')
    if (response.Response === 'True') {
      movies.value = response.Search
    } else {
      error.value = response.Error
    }
  } catch (e) {
    error.value = 'An error occurred while searching. Please try again.'
  } finally {
    loading.value = false
  }
}
</script> 