<template>
  <div>
    <h1 class="text-3xl font-bold mb-8 dark:text-white">TV Series</h1>

    <SearchBar 
      :loading="loading"
      placeholder="Search for TV series..."
      @search="handleSearch"
    />

    <MediaGrid 
      :items="series"
      :loading="loading"
      :error="error"
      :show-empty="hasSearched && !series.length"
      empty-message="No TV series found. Try a different search term."
    />

    <MediaPagination 
      v-if="totalResults > 0"
      :current-page="currentPage"
      :total-pages="totalPages"
      @page-change="handlePageChange"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const { searchMedia } = useOmdb()

const series = ref([])
const loading = ref(false)
const error = ref(null)
const hasSearched = ref(false)
const currentPage = ref(1)
const totalResults = ref(0)
const currentQuery = ref('game of thrones') // Default search term

const totalPages = computed(() => Math.ceil(totalResults.value / 10))

const performSearch = async (query, page) => {
  loading.value = true
  error.value = null

  try {
    const response = await searchMedia(query, 'series', page)
    if (response.Response === 'True') {
      series.value = response.Search
      totalResults.value = parseInt(response.totalResults)
    } else {
      error.value = response.Error
      series.value = []
      totalResults.value = 0
    }
  } catch (e) {
    error.value = 'An error occurred while searching. Please try again.'
    series.value = []
    totalResults.value = 0
  } finally {
    loading.value = false
  }
}

const handleSearch = async (query) => {
  currentQuery.value = query
  currentPage.value = 1
  hasSearched.value = true
  await performSearch(query, 1)
}

const handlePageChange = async (page) => {
  currentPage.value = page
  await performSearch(currentQuery.value, page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Load initial series
onMounted(async () => {
  await performSearch(currentQuery.value, 1)
})
</script> 