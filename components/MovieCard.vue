<template>
  <div class="movie-card">
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
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true
  }
})
</script> 