<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto space-y-8 bg-white p-8 rounded-lg shadow-md">
      <h1 class="text-3xl font-extrabold text-gray-900 text-center">
        Tableau de bord : {{ project.name }}
      </h1>

      <div class="space-y-6">
        <h3 class="text-xl font-bold text-gray-900">Créer une nouvelle tâche</h3>
        <form @submit.prevent="addTask" class="space-y-4">
          <input
            v-model="newTask.title"
            placeholder="Titre de la tâche"
            required
            class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          />
          <select
            v-model="newTask.assignee"
            class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          >
            <option value="">Aucun assigné</option>
            <option v-for="user in users" :key="user.username" :value="user.username">
              {{ user.username }}
            </option>
          </select>
          <button
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Ajouter
          </button>
        </form>
      </div>

      <TaskList
        :tasks="tasks"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import TaskList from '../components/TaskList.vue';
import useProjectsStore from '../store/projectsStore';


const projectsStore = useProjectsStore()

const project = ref({});
const users = ref([]);
const tasks = ref([]);
const newTask = ref({
  title: '',
  assignee: ''
});
const editIndex = ref(null);
const route = useRoute();



//surveille les changements dans le store
watch(
  () => projectsStore.projects,
  (newProjects) => {
    
    const projectId = route.params.id;
    project.value = newProjects.find((p) => p.id === projectId) || { tasks: [] };
    tasks.value = project.value.tasks || [];
  },
  { deep: true, immediate: true }
);


onMounted(() => {
  loadData();
});

const loadData = () => {
  const projects = JSON.parse(localStorage.getItem('projects')) || [];
  const projectId = route.params.id;
  project.value = projects.find(p => p.id === projectId) || { tasks: [] };
  project.value.tasks = project.value.tasks || [];
  users.value = JSON.parse(localStorage.getItem('users')) || [];
};

const addTask = () => {
  if (newTask.value.title.trim()) {
    const projectId = route.params.id;

    projectsStore.addTask(projectId, {
      title: newTask.value.title,
      assignee: newTask.value.assignee,
      status: 'À valider'
    })
    resetTaskForm();
  }
};




const resetTaskForm = () => {
  newTask.value = { title: '', assignee: '' };
  editIndex.value = null;
};
</script>
