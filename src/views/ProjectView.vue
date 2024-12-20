<script setup>
import { ref, onMounted, computed } from 'vue'
import NewProject from '../components/NewProject.vue'
import ListProjects from '../components/ListProjects.vue'
import useUserStore from '../store/userStore'
import useProjectsStore from '../store/projectsStore'

const showNewProjectForm = ref(false)
const userStore = useUserStore()
const projectsStore = useProjectsStore()

onMounted(() => {
  projectsStore.loadProjects()
})

const handleProjectCreated = (project) => {
  showNewProjectForm.value = false
}

const filteredProjects = computed(() => {
  if (isManager.value) {
    return projectsStore.projects;
  }
  return projectsStore.projects.filter(project =>
    project.userIds?.includes(userStore.currentUser.username)
  )
})

const isManager = computed(() => {
  return userStore.currentUser.role === 'manager' || userStore.currentUser.role === 'manager/développeur'
})
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Liste des projets</h1>
      <button
        @click="showNewProjectForm = !showNewProjectForm"
        class="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        v-if="isManager"
      >
        {{ showNewProjectForm ? 'Fermer' : 'Nouveau projet' }}
      </button>
    </div>

    <NewProject
      v-if="showNewProjectForm"
      @project-created="handleProjectCreated"
    />

    <div class="mt-8">
      <ListProjects :projects="filteredProjects" />
    </div>
  </div>
</template>

<style scoped>

</style>
