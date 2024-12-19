<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const props = defineProps({
  projectId: {
    type: String,
    required: true,
  },
});

const route = useRoute();
const router = useRouter();
onMounted(() => {
  loadData();
});

const editProject = ref({
  name: "",
  description: "",
  deadline: "",
});

  const loadData = () => {
  const projects = JSON.parse(localStorage.getItem('projects')) || [];
  const projectId = route.params.id;
  const project = projects.find(p => p.id === projectId) || { tasks: [] };
  console.log(project);
  editProject.value = { ...project };
};


const emit = defineEmits(['project-updated']);
const today = new Date().toISOString().split('T')[0];


const updateProject = () => {
  const savedProjects = localStorage.getItem('projects');
  const projects = savedProjects ? JSON.parse(savedProjects) : [];
  const projectIndex = projects.findIndex(p => p.id === editProject.value.id);
  if (projectIndex !== -1) {
    projects[projectIndex] = { ...editProject.value };
    localStorage.setItem('projects', JSON.stringify(projects));
    emit('project-updated', editProject.value);
    router.push('/projects');
  }
};

</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-8">
    <div class="bg-white shadow-md rounded-lg p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">
        Modifier le projet
      </h2>
      <form @submit.prevent="updateProject" class="space-y-4">
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
              v-model="editProject.name"
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
              v-model="editProject.description"
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
              v-model="editProject.deadline"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <button
            type="submit"
            class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Mettre à jour le projet
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
