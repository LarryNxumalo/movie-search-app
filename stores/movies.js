import { defineStore } from 'pinia'

export const useMovieStore = defineStore('movies', {
  state: () => ({
    recentlyViewed: []
  }),

  actions: {
    addToRecentlyViewed(movie) {
      // Remove if already exists
      this.recentlyViewed = this.recentlyViewed.filter(m => m.imdbID !== movie.imdbID)
      // Add to start of array
      this.recentlyViewed.unshift(movie)
      // Keep only last 10 items
      this.recentlyViewed = this.recentlyViewed.slice(0, 10)
      // Save to localStorage
      localStorage.setItem('recentlyViewed', JSON.stringify(this.recentlyViewed))
    },

    loadRecentlyViewed() {
      const stored = localStorage.getItem('recentlyViewed')
      if (stored) {
        this.recentlyViewed = JSON.parse(stored)
      }
    }
  }
}) 