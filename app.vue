<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
    <ColorScheme placeholder="..." tag="html">
      <!-- Header/Navigation -->
      <header class="bg-white dark:bg-gray-800 shadow-sm">
        <nav class="container mx-auto px-4 py-4">
          <div class="flex justify-between items-center">
            <NuxtLink to="/" class="text-2xl font-bold text-blue-600 dark:text-blue-400">
              MovieSearch
            </NuxtLink>
            
            <div class="flex items-center space-x-6">
              <NuxtLink 
                to="/" 
                class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                active-class="text-blue-600 dark:text-blue-400 font-medium"
              >
                Home
              </NuxtLink>
              <NuxtLink 
                to="/movies" 
                class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                active-class="text-blue-600 dark:text-blue-400 font-medium"
              >
                Movies
              </NuxtLink>
              <NuxtLink 
                to="/series" 
                class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                active-class="text-blue-600 dark:text-blue-400 font-medium"
              >
                Series
              </NuxtLink>
              <NuxtLink 
                to="/contact" 
                class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                active-class="text-blue-600 dark:text-blue-400 font-medium"
              >
                Contact
              </NuxtLink>

              <!-- Dark Mode Toggle -->
              <button 
                @click="toggleColorMode"
                class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                :title="$colorMode.value === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
              >
                <!-- Sun icon for dark mode -->
                <svg 
                  v-if="$colorMode.value === 'dark'"
                  xmlns="http://www.w3.org/2000/svg" 
                  class="h-5 w-5 text-gray-300" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
                  />
                </svg>
                <!-- Moon icon for light mode -->
                <svg 
                  v-else
                  xmlns="http://www.w3.org/2000/svg" 
                  class="h-5 w-5 text-gray-600" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
                  />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>

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
    </ColorScheme>
  </div>
</template>

<script setup>
// Use Nuxt's built-in colorMode composable
const colorMode = useColorMode()

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

// Load the recently viewed items when the app starts
import { useMovieStore } from '~/stores/movies'
const store = useMovieStore()

onMounted(() => {
  store.loadRecentlyViewed()
})
</script>

<style>
:root {
  --color-mode: 'light';
}

html {
  background-color: theme('colors.gray.50');
}

html.dark {
  background-color: theme('colors.gray.900');
  color-scheme: dark;
}

.router-link-active {
  @apply text-blue-600 dark:text-blue-400 font-medium;
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

/* Dark mode transitions */
.dark-mode-transition {
  @apply transition-colors duration-200;
}
</style>
