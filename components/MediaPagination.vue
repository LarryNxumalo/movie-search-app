<template>
  <div class="flex justify-center items-center space-x-4 mt-8">
    <button 
      @click="$emit('page-change', currentPage - 1)"
      class="btn btn-secondary"
      :disabled="currentPage <= 1"
    >
      Previous
    </button>
    
    <span class="text-gray-600 dark:text-gray-300">
      Page {{ currentPage }} of {{ totalPages }}
    </span>
    
    <button 
      @click="$emit('page-change', currentPage + 1)"
      class="btn btn-secondary"
      :disabled="currentPage >= totalPages"
    >
      Next
    </button>
  </div>
</template>

<script setup>
defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
})

defineEmits(['page-change'])
</script> 