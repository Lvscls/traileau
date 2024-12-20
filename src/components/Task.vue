<template>
  <li
    class="p-4 border bg-white border-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow cursor-grab"
    draggable="true"
    @dragstart="onDragStart"
  >
    <div class="flex flex-col space-y-2">
        <div class="text-gray-900 font-bold">{{ task.title }}</div>
        <div v-if="task.assignee" class="text-gray-600 ml-2">
          Assigné à : {{ task.assignee }}
        </div>
      </div>
      <div class="space-x-2 mt-3">
        <button @click.stop="editTask" class="btn btn-indigo">Modifier</button>
        <button @click.stop="openDrawer"class="btn btn-indigo">Détail</button>
      </div>
    <TaskDrawer @delete="deleteTask" @assign="assignTask" :visible="drawerVisible" :task="task" @close="closeDrawer" @add-comment="addComment"/>
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
    drawerVisible.value = true;
}


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
