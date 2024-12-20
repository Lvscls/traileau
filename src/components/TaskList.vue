<script setup>
import { computed } from 'vue';
import Task from './Task.vue';
import { useRoute } from 'vue-router';
import useProjectsStore from '../store/projectsStore';
  
const props = defineProps({
  tasks: {
    type: Array,
    required: true
  }
});

const route = useRoute();
const projectsStore = useProjectsStore()

  const tasksToValidate = computed(() => {
    return props.tasks.filter(task => task.status === 'À valider');
  });
  
  const completedTasks = computed(() => {
    return props.tasks.filter(task => task.status === 'Complétée');
  });
  
  const validatedTasks = computed(() => {
    return props.tasks.filter(task => task.status === 'Validé');
  });
  

  const handleDeleteTask = (task) => {
    
    const projectId = route.params.id;
    projectsStore.deleteTask(projectId, task.id);
  };
  


  const handleAssignTask = (task) => {
    
    const projectId = route.params.id;
    projectsStore.assignTask(projectId, task.id);
  };
  </script>

<template>
    <div class="grid grid-cols-3 gap-4">
      <div>
        <h3 class="text-xl font-bold text-gray-900">Tâches à valider</h3>
        <ul class="space-y-3">
          <Task
            v-for="(task, index) in tasksToValidate"
            :key="task.id"
            :task="task"
            @onDelete="handleDeleteTask(task)"
            @onAssign="handleAssignTask(task)"

          />
        </ul>
      </div>
      <div>
        <h3 class="text-xl font-bold text-gray-900">Tâches complétées</h3>
        <ul class="space-y-3">
          <Task
            v-for="(task, index) in completedTasks"
            :key="task.id"
            :task="task"
            @onValidate="validateTask(index)"
            @onEdit="editTask(index)"
            @onDelete="handleDeleteTask(task)"
            @onAssign="handleAssignTask(task)"
            @onAddComment="addComment"
          />
        </ul>
      </div>
      <div>
        <h3 class="text-xl font-bold text-gray-900">Tâches validées</h3>
        <ul class="space-y-3">
          <Task
            v-for="(task, index) in validatedTasks"
            :key="task.id"
            :task="task"
            @onValidate="validateTask(index)"
            @onEdit="editTask(index)"
            @onDelete="handleDeleteTask(task)"
            @onAssign="handleAssignTask(task)"
            @onAddComment="addComment"
          />
        </ul>
      </div>
    </div>
  </template>
  
  