<template>
  <div>
    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
    </div>

    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-500 dark:text-red-400">{{ error }}</p>
    </div>

    <div v-else-if="items.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      <MovieCard 
        v-for="item in items" 
        :key="item.imdbID" 
        :item="item"
      />
    </div>

    <div v-else-if="showEmpty" class="text-center py-12">
      <p class="text-gray-600 dark:text-gray-400">{{ emptyMessage }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => []
  },
  loading: Boolean,
  error: String,
  showEmpty: Boolean,
  emptyMessage: {
    type: String,
    default: 'No results found'
  }
})
</script> 