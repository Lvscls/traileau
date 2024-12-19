<script setup>
import { computed, onMounted, ref } from 'vue';
import Task from './Task.vue';
import { useRoute } from 'vue-router';
  
const tasks = ref([]);
const route = useRoute();

onMounted(() => {
  loadData();
});

  const loadData = () => {
  const projects = JSON.parse(localStorage.getItem('projects')) || [];
  const projectId = route.params.id;
  const project = projects.find(p => p.id === projectId) || { tasks: [] };
  tasks.value = project.tasks || [];
};

const emit = defineEmits(['onValidateTask', 'onEditTask', 'onDeleteTask', 'onAssignTask', 'onAddComment']);

  
  console.log(tasks.value);
  
  const tasksToValidate = computed(() => {
    return tasks.value.filter(task => task.status === 'À valider');
  });
  
  const completedTasks = computed(() => {
    return tasks.value.filter(task => task.status === 'Complétée');
  });
  
  const validatedTasks = computed(() => {
    return tasks.value.filter(task => task.status === 'Validé');
  });
  
  
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
            @onDelete="deleteTask(index)"
            @onAssign="assignTask(index)"
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
            @onDelete="deleteTask(index)"
            @onAssign="assignTask(index)"
            @onAddComment="addComment"
          />
        </ul>
      </div>
    </div>
  </template>
  
  