<script setup>
import { computed } from 'vue';
import Task from './Task.vue';
  
const props = defineProps({
  tasks: {
    type: Array,
    required: true
  }
});


const emit = defineEmits(['onValidateTask', 'onEditTask', 'onDeleteTask', 'onAssignTask', 'onAddComment']);

  
  
  const tasksToValidate = computed(() => {
    return props.tasks.filter(task => task.status === 'À valider');
  });
  
  const completedTasks = computed(() => {
    return props.tasks.filter(task => task.status === 'Complétée');
  });
  
  const validatedTasks = computed(() => {
    return props.tasks.filter(task => task.status === 'Validé');
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
  
  