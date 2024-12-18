<script setup>
import { ref, onMounted } from "vue";

const projects = ref([]);
const newProject = ref({
  name: "",
  description: "",
  deadline: "",
});

onMounted(() => {
  const savedProjects = localStorage.getItem("projects");
  if (savedProjects) {
    projects.value = JSON.parse(savedProjects);
  }
});

const createProject = () => {
  const project = {
    id: Date.now(),
    ...newProject.value,
    createdAt: new Date().toISOString(),
  };

  projects.value.push(project);

  localStorage.setItem("projects", JSON.stringify(projects.value));

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
            v-model="newProject.deadline"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Créer le projet
        </button>
      </form>
    </div>

    <div class="mt-8 space-y-4">
      <div
        v-for="project in projects"
        :key="project.id"
        class="bg-white shadow-md rounded-lg p-6"
      >
        <h3 class="text-lg font-semibold text-gray-800">{{ project.name }}</h3>
        <p class="text-gray-600 mt-2">{{ project.description }}</p>
        <div class="mt-4 text-sm text-gray-500">
          Date limite: {{ new Date(project.deadline).toLocaleDateString() }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
