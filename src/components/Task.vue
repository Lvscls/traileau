<template>
  <li
    class="p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow"
    draggable="true"
    @dragstart="onDragStart"
    @click="openDrawer"
  >
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
        <button @click.stop="editTask" class="btn btn-indigo">Modifier</button>
        <button @click.stop="deleteTask" class="btn btn-red">Supprimer</button>
        <button @click.stop="assignTask" class="btn btn-gray">Assigner</button>
      </div>
    </div>
    <TaskDrawer :visible="drawerVisible" :task="task" @close="closeDrawer" @add-comment="addComment"/>
  </li>
</template>

<script setup>
import { ref } from 'vue';
import TaskDrawer from './TaskDrawer.vue';

const props = defineProps({
  task: { type: Object, required: true },
});

const emit = defineEmits(['onDelete', 'onAssign', 'onDragStart']);

const drawerVisible = ref(false);

const openDrawer = (event) => {
  if (!event.target.closest('button')) {
    drawerVisible.value = true;
  }
};

const closeDrawer = () => drawerVisible.value = false;

const onDragStart = (event) => {
  event.dataTransfer.setData('taskId', props.task.id);
  emit('onDragStart', props.task.id);
};

const validateTask = () => emit('onValidate');
const editTask = () => emit('onEdit');
const deleteTask = () => emit('onDelete');
const assignTask = () => emit('onAssign');
</script>

<style scoped>
.btn {
  @apply px-3 py-1 text-sm text-white rounded focus:outline-none focus:ring-2 focus:ring-offset-2;
}
.btn-indigo { @apply bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500; }
.btn-red { @apply bg-red-600 hover:bg-red-700 focus:ring-red-500; }
.btn-gray { @apply bg-gray-600 hover:bg-gray-700 focus:ring-gray-500; }
</style>
