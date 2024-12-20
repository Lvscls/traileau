<template>
  <div class="grid grid-cols-3 gap-4">
    <!-- Colonne : Tâches à valider -->
    <div class="p-4 bg-gray-100 rounded" @drop="onDrop($event, 'À valider')" @dragover.prevent>
      <h3 class="text-xl font-bold text-gray-900 text-center">Tâches à valider</h3>
      <ul class="space-y-3">
        <Task
          v-for="task in tasksToValidate"
          :status="'À valider'"
          :key="task.id"
          :task="task"
          @onDelete="handleDeleteTask(task)"
          @onAssign="handleAssignTask(task)"
          @onEdit="handleEditTask(task)"
        />
      </ul>
    </div>

    <!-- Colonne : Tâches complétées -->
    <div class="p-4 bg-gray-100 rounded" @drop="onDrop($event, 'Complétée')" @dragover.prevent>
      <h3 class="text-xl font-bold text-gray-900 text-center">Tâches complétées</h3>
      <ul class="space-y-3">
        <Task
          v-for="task in completedTasks"
          :key="task.id"
          :task="task"
          :status="'Complétée'"
          @onDelete="handleDeleteTask(task)"
          @onAssign="handleAssignTask(task)"
          @onEdit="handleEditTask(task)"
        />
      </ul>
    </div>

    <!-- Colonne : Tâches validées -->
    <div class="p-4 bg-gray-100 rounded" @drop="onDrop($event, 'Validé')" @dragover.prevent>
      <h3 class="text-xl font-bold text-gray-900 text-center">Tâches validées</h3>
      <ul class="space-y-3">
        <Task
          v-for="task in validatedTasks"
          :key="task.id"
          :task="task"
          :status="'Validé'"
          @onDelete="handleDeleteTask(task)"
          @onAssign="handleAssignTask(task)"
          @onEdit="handleEditTask(task)"
        />
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import Task from './Task.vue';
import { useRoute } from 'vue-router';
import useProjectsStore from '../store/projectsStore';
import useUserStore from '../store/userStore';

const userStore = useUserStore()

const isManager = computed(() => {
  return (
    userStore.currentUser.role === "manager" ||
    userStore.currentUser.role === "manager/développeur"
  );
});

const props = defineProps({
  tasks: { type: Array, required: true },
});

const route = useRoute();
const projectsStore = useProjectsStore();

const tasksToValidate = computed(() => props.tasks.filter(task => task.status === 'À valider'));
const completedTasks = computed(() => props.tasks.filter(task => task.status === 'Complétée'));
const validatedTasks = computed(() => props.tasks.filter(task => task.status === 'Validé'));

const handleDeleteTask = (task) => {
  projectsStore.deleteTask(route.params.id, task.id);
};

const handleAssignTask = (task) => {
  projectsStore.assignTask(route.params.id, task.id);
};

const handleEditTask = (task) => {
  projectsStore.updatetask(route.params.id, task.id);
};



const onDrop = (event, newStatus) => {
  const taskId = event.dataTransfer.getData('taskId');
  
  if(!isManager.value && newStatus === 'Validé') {    
    return;
  }

  if (taskId) {
    projectsStore.updateTaskStatus(route.params.id, taskId, newStatus);
  }
};
</script>
