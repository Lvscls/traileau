<script setup>
import { ref, onMounted } from 'vue'
import NewProject from '../components/NewProject.vue'
import ListProjects from '../components/ListProjects.vue'

const showNewProjectForm = ref(false)
const projects = ref([])

onMounted(() => {
  const savedProjects = localStorage.getItem('projects')
  if (savedProjects) {
    projects.value = JSON.parse(savedProjects)
  }
})

const handleProjectCreated = (project) => {
  projects.value.push(project)
  localStorage.setItem('projects', JSON.stringify(projects.value))
  showNewProjectForm.value = false
}
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Liste des projets</h1>
      <button 
        @click="showNewProjectForm = !showNewProjectForm"
        class="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
      >
        {{ showNewProjectForm ? 'Fermer' : 'Nouveau projet' }}
      </button>
    </div>

    <NewProject 
      v-if="showNewProjectForm" 
      @project-created="handleProjectCreated" 
    />

    <div class="mt-8">
      <ListProjects :projects="projects" />
    </div>
  </div>
</template>

<style scoped>
    
</style>