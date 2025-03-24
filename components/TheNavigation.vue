<template>
  <header class="bg-white dark:bg-gray-800 shadow-sm">
    <nav class="container mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="text-2xl font-bold text-blue-600 dark:text-blue-400 flex-shrink-0">
          MovieSearch
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-6">
          <NuxtLink 
            v-for="item in navigationItems"
            :key="item.path"
            :to="item.path" 
            class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            active-class="text-blue-600 dark:text-blue-400 font-medium"
          >
            {{ item.name }}
          </NuxtLink>

          <!-- Dark Mode Toggle -->
          <button 
            @click="toggleColorMode"
            class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            :title="$colorMode.value === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
          >
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

        <!-- Mobile Menu Button -->
        <div class="flex items-center md:hidden">
          <button 
            @click="toggleColorMode"
            class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors mr-2"
          >
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
          <button 
            @click="isOpen = !isOpen"
            class="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
          >
            <svg 
              v-if="!isOpen"
              class="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg 
              v-else
              class="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform -translate-y-2 opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="transform translate-y-0 opacity-100"
        leave-to-class="transform -translate-y-2 opacity-0"
      >
        <div 
          v-if="isOpen" 
          class="md:hidden py-2 space-y-1"
        >
          <NuxtLink 
            v-for="item in navigationItems"
            :key="item.path"
            :to="item.path" 
            class="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            active-class="text-blue-600 dark:text-blue-400 bg-gray-100 dark:bg-gray-700 font-medium"
            @click="isOpen = false"
          >
            {{ item.name }}
          </NuxtLink>
        </div>
      </Transition>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const colorMode = useColorMode()
const isOpen = ref(false)

const navigationItems = [
  { name: 'Home', path: '/' },
  { name: 'Movies', path: '/movies' },
  { name: 'Series', path: '/series' },
  { name: 'Contact', path: '/contact' }
]

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script> 