<template>
  <div class="max-w-2xl mx-auto">
    <h1 class="text-3xl font-bold mb-8 dark:text-gray-200">Contact Us</h1>

    <div class="bg-white dark:bg-gray-800 rounded-[32px] shadow-lg p-8 dark-mode-transition">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Name -->
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Name
          </label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            class="w-full px-6 py-3 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500
                   dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            :class="{ 'border-red-500': errors.name }"
            required
          >
          <p v-if="errors.name" class="mt-1 text-sm text-red-500">{{ errors.name }}</p>
        </div>

        <!-- Email -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email
          </label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            class="w-full px-6 py-3 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500
                   dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            :class="{ 'border-red-500': errors.email }"
            required
          >
          <p v-if="errors.email" class="mt-1 text-sm text-red-500">{{ errors.email }}</p>
        </div>

        <!-- Subject -->
        <div>
          <label for="subject" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Subject
          </label>
          <input
            id="subject"
            v-model="form.subject"
            type="text"
            class="w-full px-6 py-3 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500
                   dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            :class="{ 'border-red-500': errors.subject }"
            required
          >
          <p v-if="errors.subject" class="mt-1 text-sm text-red-500">{{ errors.subject }}</p>
        </div>

        <!-- Message -->
        <div>
          <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Message
          </label>
          <textarea
            id="message"
            v-model="form.message"
            rows="5"
            class="w-full px-6 py-3 rounded-[24px] border focus:outline-none focus:ring-2 focus:ring-blue-500
                   dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            :class="{ 'border-red-500': errors.message }"
            required
          ></textarea>
          <p v-if="errors.message" class="mt-1 text-sm text-red-500">{{ errors.message }}</p>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="btn btn-primary w-full py-3 text-lg"
          :disabled="submitting"
        >
          {{ submitting ? 'Sending...' : 'Send Message' }}
        </button>

        <!-- Success Message -->
        <div v-if="submitted" class="p-4 bg-green-50 text-green-700 rounded-lg">
          Thank you for your message! We'll get back to you soon.
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const errors = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const submitting = ref(false)
const submitted = ref(false)

const validateForm = () => {
  let isValid = true
  
  // Reset errors
  Object.keys(errors).forEach(key => errors[key] = '')

  // Name validation
  if (form.name.length < 2) {
    errors.name = 'Name must be at least 2 characters long'
    isValid = false
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(form.email)) {
    errors.email = 'Please enter a valid email address'
    isValid = false
  }

  // Subject validation
  if (form.subject.length < 5) {
    errors.subject = 'Subject must be at least 5 characters long'
    isValid = false
  }

  // Message validation
  if (form.message.length < 20) {
    errors.message = 'Message must be at least 20 characters long'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return

  submitting.value = true

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Reset form
    Object.keys(form).forEach(key => form[key] = '')
    submitted.value = true

    // Hide success message after 5 seconds
    setTimeout(() => {
      submitted.value = false
    }, 5000)
  } catch (error) {
    console.error('Error submitting form:', error)
  } finally {
    submitting.value = false
  }
}
</script> 