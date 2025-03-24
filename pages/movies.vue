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
          class="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
        <button 
          type="submit"
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
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

    <div v-else-if="movies.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="movie in movies" :key="movie.imdbID" 
        class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
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