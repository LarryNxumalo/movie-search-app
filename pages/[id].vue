<template>
  <div>
    <div v-if="media" class="max-w-6xl mx-auto">
      <div class="bg-white dark:bg-gray-800 rounded-[32px] shadow-lg overflow-hidden dark-mode-transition">
        <!-- Back Button -->
        <div class="p-6 bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600">
          <button @click="router.back()" 
            class="btn btn-secondary flex items-center gap-2">
            <span class="text-xl">←</span> Back
          </button>
        </div>

        <div class="md:flex p-6">
          <!-- Poster -->
          <div class="md:w-1/3">
            <img 
              :src="media.Poster !== 'N/A' ? media.Poster : '/placeholder.png'" 
              :alt="media.Title"
              class="w-full rounded-[24px] shadow-md"
            >
          </div>

          <!-- Details -->
          <div class="md:w-2/3 md:pl-8 mt-6 md:mt-0">
            <h1 class="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{{ media.Title }}</h1>
            
            <!-- Quick Info -->
            <div class="flex flex-wrap gap-4 mb-6">
              <span class="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-sm dark:text-gray-300">
                {{ media.Year }}
              </span>
              <span class="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-sm dark:text-gray-300">
                {{ media.Rated }}
              </span>
              <span class="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-sm dark:text-gray-300">
                {{ media.Runtime }}
              </span>
            </div>

            <!-- Plot -->
            <div class="mb-6">
              <h2 class="text-xl font-semibold mb-2 dark:text-gray-200">Plot</h2>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed">{{ media.Plot }}</p>
            </div>

            <!-- Additional Info -->
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <h2 class="text-xl font-semibold mb-2 dark:text-gray-200">Details</h2>
                <dl class="space-y-2">
                  <div>
                    <dt class="font-medium dark:text-gray-200">Genre</dt>
                    <dd class="text-gray-600 dark:text-gray-300">{{ media.Genre }}</dd>
                  </div>
                  <div>
                    <dt class="font-medium dark:text-gray-200">Director</dt>
                    <dd class="text-gray-600 dark:text-gray-300">{{ media.Director }}</dd>
                  </div>
                  <div>
                    <dt class="font-medium dark:text-gray-200">Writers</dt>
                    <dd class="text-gray-600 dark:text-gray-300">{{ media.Writer }}</dd>
                  </div>
                  <div>
                    <dt class="font-medium dark:text-gray-200">Actors</dt>
                    <dd class="text-gray-600 dark:text-gray-300">{{ media.Actors }}</dd>
                  </div>
                  <div>
                    <dt class="font-medium dark:text-gray-200">Language</dt>
                    <dd class="text-gray-600 dark:text-gray-300">{{ media.Language }}</dd>
                  </div>
                  <div>
                    <dt class="font-medium dark:text-gray-200">Country</dt>
                    <dd class="text-gray-600 dark:text-gray-300">{{ media.Country }}</dd>
                  </div>
                </dl>
              </div>

              <!-- Ratings -->
              <div v-if="media.Ratings?.length">
                <h2 class="text-xl font-semibold mb-2 dark:text-gray-200">Ratings</h2>
                <div class="space-y-4">
                  <div v-for="rating in media.Ratings" :key="rating.Source" 
                    class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div class="font-medium dark:text-gray-200">{{ rating.Source }}</div>
                    <div class="text-gray-600 dark:text-gray-300">{{ rating.Value }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else-if="loading" class="flex justify-center items-center min-h-[400px]">
      <div class="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-500 text-lg mb-4">{{ error }}</p>
      <button @click="router.back()" class="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
        Go Back
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMovieStore } from '~/stores/movies'

const route = useRoute()
const router = useRouter()
const { getMediaById } = useOmdb()
const store = useMovieStore()

const media = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const response = await getMediaById(route.params.id)
    if (response.Response === 'True') {
      media.value = response
      // Add to recently viewed
      store.addToRecentlyViewed({
        imdbID: response.imdbID,
        Title: response.Title,
        Poster: response.Poster,
        Type: response.Type,
        Year: response.Year
      })
    } else {
      error.value = response.Error
    }
  } catch (e) {
    error.value = 'An error occurred while fetching the details. Please try again.'
  } finally {
    loading.value = false
  }
})
</script> 