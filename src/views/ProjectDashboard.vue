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
        :tasks="project.tasks"
        @onValidateTask="validateTask"
        @onEditTask="editTask"
        @onDeleteTask="deleteTask"
        @onAssignTask="assignTask"
        @onAddComment="addComment"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import TaskList from '../components/TaskList.vue';

const project = ref({});
const users = ref([]);
const newTask = ref({
  title: '',
  assignee: ''
});
const editIndex = ref(null);
const route = useRoute();

const addComment = (comment) => {
  const task = project.value.tasks.find(t => t.id === comment.taskId);
  if (task) {
    task.comments = task.comments || [];
    task.comments.push({text: comment.text, author: comment.author});
    saveData();
  }
};

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
    project.value.tasks.push({
      id: Date.now(),
      title: newTask.value.title,
      assignee: newTask.value.assignee,
      status: 'À valider'
    });
    saveData();
    resetTaskForm();
  }
};

const validateTask = (index) => {
  project.value.tasks[index].status = 'Validé';
  saveData();
};

const editTask = (index) => {
  editIndex.value = index;
  newTask.value.title = project.value.tasks[index].title;
  newTask.value.assignee = project.value.tasks[index].assignee;
};

const deleteTask = (index) => {
  project.value.tasks.splice(index, 1);
  saveData();
};

const assignTask = (index) => {
  const assignee = prompt("Entrez le nom de l'utilisateur à assigner :");
  if (assignee) {
    const userExists = users.value.some(user => user.username === assignee);
    if (!userExists) {
      alert("Cet utilisateur n'existe pas.");
      return;
    }
    project.value.tasks[index].assignee = assignee;
    saveData();
  }
};

const saveData = () => {
  const projects = JSON.parse(localStorage.getItem('projects')) || [];
  const updatedProjects = projects.map(p =>
    p.id === project.value.id ? project.value : p
  );
  localStorage.setItem('projects', JSON.stringify(updatedProjects));
};

const resetTaskForm = () => {
  newTask.value = { title: '', assignee: '' };
  editIndex.value = null;
};
</script>
