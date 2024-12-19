<script setup>
import { ref, onMounted } from "vue";
import useUserStore from '../store/userStore'
import useProjectsStore from '../store/projectsStore'

const projectsStore = useProjectsStore()
const newProject = ref({
  name: "",
  description: "",
  deadline: "",
});
const userStore = useUserStore();
const emit = defineEmits(['project-created']);
const today = new Date().toISOString().split('T')[0];

onMounted(() => {
  const savedProjects = localStorage.getItem("projects");
  if (savedProjects) {
    projectsStore.projects = JSON.parse(savedProjects);
  }
});

const createProject = () => {
  const project = {
    id: crypto.randomUUID(),
    ...newProject.value,
    createdAt: new Date().toISOString(),
    userIds: [userStore.currentUser.username]
  };

  emit('project-created', project);
  projectsStore.addProject(project);

  newProject.value = {
    name: "",
    description: "",
    deadline: "",
  };
};
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-8">
    <div class="bg-white shadow-md rounded-lg p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">
        Créer un nouveau projet
      </h2>
      <form @submit.prevent="createProject" class="space-y-4">
        <div>
          <label
            for="name"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Nom du projet
          </label>
          <input
            type="text"
            id="name"
            v-model="newProject.name"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label
            for="description"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            v-model="newProject.description"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 resize-none"
          ></textarea>
        </div>

        <div>
          <label
            for="deadline"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Date limite
          </label>
          <input
            type="date"
            id="deadline"
            :min="today"
            v-model="newProject.deadline"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Créer le projet
        </button>
      </form>
    </div>


  </div>
</template>

<style scoped></style>
