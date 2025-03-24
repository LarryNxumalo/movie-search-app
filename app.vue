<template>
  <NuxtLayout>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <!-- Navigation -->
      <TheNavigation />

      <!-- Main Content -->
      <main class="container mx-auto px-4 py-8">
        <NuxtPage />
      </main>

      <!-- Footer -->
      <footer class="bg-white dark:bg-gray-800 border-t dark:border-gray-700 mt-auto">
        <div class="container mx-auto px-4 py-6">
          <p class="text-center text-gray-600 dark:text-gray-400 text-sm">
            © {{ new Date().getFullYear() }} MovieSearch. Powered by OMDb API
          </p>
        </div>
      </footer>
  </div>
  </NuxtLayout>
</template>

<script setup>
import { useMovieStore } from '~/stores/movies'
const store = useMovieStore()

onMounted(() => {
  store.loadRecentlyViewed()
})
</script>

<style>
:root {
  color-scheme: light dark;
}

body {
  @apply antialiased;
}

/* Update card styles globally */
.movie-card {
  @apply bg-white dark:bg-gray-800 rounded-[32px] shadow-md overflow-hidden hover:shadow-lg transition-all duration-200;
}

.movie-card img {
  @apply rounded-t-[32px];
}

.movie-card-content {
  @apply p-6 dark:text-gray-200;
}

/* Dark mode transitions */
.dark-mode-transition {
  @apply transition-colors duration-200;
}

/* Button styles */
.btn {
  @apply px-6 py-2 rounded-full transition-all duration-200;
}

.btn-primary {
  @apply bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600;
}

.btn-secondary {
  @apply bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600;
}

/* Search input styles */
.search-input {
  @apply px-6 py-3 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200;
}
</style>
