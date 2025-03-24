<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header/Navigation -->
    <header class="bg-white shadow-sm">
      <nav class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <NuxtLink to="/" class="text-2xl font-bold text-blue-600">
            MovieSearch
          </NuxtLink>
          
          <div class="space-x-6">
            <NuxtLink 
              to="/" 
              class="text-gray-600 hover:text-blue-600 transition-colors"
              active-class="text-blue-600 font-medium"
            >
              Home
            </NuxtLink>
            <NuxtLink 
              to="/movies" 
              class="text-gray-600 hover:text-blue-600 transition-colors"
              active-class="text-blue-600 font-medium"
            >
              Movies
            </NuxtLink>
            <NuxtLink 
              to="/series" 
              class="text-gray-600 hover:text-blue-600 transition-colors"
              active-class="text-blue-600 font-medium"
            >
              Series
            </NuxtLink>
            <NuxtLink 
              to="/contact" 
              class="text-gray-600 hover:text-blue-600 transition-colors"
              active-class="text-blue-600 font-medium"
            >
              Contact
            </NuxtLink>
          </div>
        </div>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <NuxtPage />
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t mt-auto">
      <div class="container mx-auto px-4 py-6">
        <p class="text-center text-gray-600 text-sm">
          © {{ new Date().getFullYear() }} MovieSearch. Powered by OMDb API
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
// Load the recently viewed items when the app starts
import { useMovieStore } from '~/stores/movies'

const store = useMovieStore()

// Initialize recently viewed items from localStorage
onMounted(() => {
  store.loadRecentlyViewed()
})
</script>

<style>
.router-link-active {
  @apply text-blue-600 font-medium;
}

body {
  @apply antialiased;
}
</style>
