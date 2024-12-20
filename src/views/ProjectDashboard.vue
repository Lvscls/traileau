<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto space-y-8 bg-white p-8 rounded-lg shadow-md">
      <h1 class="text-3xl font-extrabold text-gray-900 text-center">
        Tableau de bord : {{ project.name }}
      </h1>

      <div class="flex justify-center" v-if="isManager">
        <button @click="showModal = true" class="btn btn-indigo">Ajouter une tâche</button>
      </div>
        
        <!-- Modal -->
        <div v-if="showModal" class="fixed z-10 inset-0 overflow-y-auto">
          <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity" aria-hidden="true">
              <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="">
                  <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 class="text-center text-lg leading-6 font-medium text-gray-900 mb-4">Créer une nouvelle tâche</h3>
                    <div class="mt-2">
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
                        <div class="mt-4 flex justify-between">
                          <button type="button" @click="showModal = false" class="btn btn-red">Annuler</button>
                          <button type="submit" class="btn btn-indigo">Ajouter</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- End Modal -->


  
      <TaskList
        :tasks="tasks"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import TaskList from '../components/TaskList.vue';
import useProjectsStore from '../store/projectsStore';
import useUserStore from '../store/userStore';

const showModal = ref(false);

const projectsStore = useProjectsStore()
const userStore = useUserStore()

const project = ref({});
const users = ref([]);
const tasks = ref([]);
const newTask = ref({
  title: '',
  assignee: ''
});
const editIndex = ref(null);
const route = useRoute();

const isManager = computed(() => {
  return (
    userStore.currentUser.role === "manager" ||
    userStore.currentUser.role === "manager/développeur"
  );
});

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
    showModal.value = false;
  }
};




const resetTaskForm = () => {
  newTask.value = { title: '', assignee: '' };
  editIndex.value = null;
};
</script>
<style scoped>
.btn {
  @apply px-3 py-1 text-sm text-white rounded focus:outline-none focus:ring-2 focus:ring-offset-2;
}
.btn-indigo { @apply bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500; }
.btn-red { @apply bg-red-600 hover:bg-red-700 focus:ring-red-500; }
.btn-gray { @apply bg-gray-600 hover:bg-gray-700 focus:ring-gray-500; }
</style>