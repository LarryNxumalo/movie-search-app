<template>
  <form @submit.prevent="$emit('search', searchQuery)" class="mb-8">
    <div class="flex gap-4">
      <input 
        v-model="searchQuery" 
        type="text" 
        :placeholder="placeholder"
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
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  loading: Boolean,
  placeholder: {
    type: String,
    default: 'Search...'
  }
})

defineEmits(['search'])
const searchQuery = ref('')
</script> 