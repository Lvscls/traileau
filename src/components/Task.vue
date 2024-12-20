<template>
    <li class="p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow" @click="openDrawer">
      <div class="flex justify-between items-center">
        <div>
          <strong class="text-gray-900">{{ task.title }}</strong>
          <span :class="{'text-green-600 font-medium': task.status === 'Validé'}" class="ml-2">
            {{ task.status }}
          </span>
          <span v-if="task.assignee" class="text-gray-600 ml-2">
            | Assigné à : {{ task.assignee }}
          </span>
        </div>
        <div class="space-x-2">
          <button v-if="task.status !== 'Validé'" @click.stop="validateTask" class="text-sm text-blue-600 hover:underline">Valider</button>
          <button @click.stop="editTask" class="px-3 py-1 text-sm text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Modifier</button>
          <button @click.stop="deleteTask" class="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Supprimer</button>
          <button @click.stop="assignTask" class="px-3 py-1 text-sm text-white bg-gray-600 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Assigner</button>
        </div>
      </div>
        <TaskDrawer :visible="drawerVisible" :task="task" @close="closeDrawer" @add-comment="addComment"/>
    </li>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import TaskDrawer from './TaskDrawer.vue';
  
  const props = defineProps({
    task: {
      type: Object,
      required: true,
    },
  });
  const emit = defineEmits(['onDelete']);

  const drawerVisible = ref(false);
  
  const openDrawer = () => {
    if (!event.target.closest('button')) {
    drawerVisible.value = true;
  }
  };
  
  const closeDrawer = () => {
    drawerVisible.value = false;
  };
  
  const validateTask = () => {
    props.onValidate();
  };
  
  const editTask = () => {
    props.onEdit();
  };
  
  const deleteTask = () => {
    emit('onDelete')
  };
  
  const assignTask = () => {
    emit('onAssign')
  };
  
  const addComment = (comment) => {
    props.onAddComment(comment);
  };
  </script>
  