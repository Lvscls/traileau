<template>
  <li
    class="p-4 border bg-white border-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow cursor-grab"
    draggable="true"
    @dragstart="onDragStart"
    @click="openDrawer"
  >
    <div class="flex flex-col space-y-2">
        <div class="text-gray-900 font-bold">{{ task.title }}</div>
        <div v-if="task.assignee" class="text-gray-600 ml-2">
          Assigné à : {{ task.assignee }}
        </div>
      </div>
    
    <TaskDrawer @edit="editTask" @delete="deleteTask" @assign="assignTask" :visible="drawerVisible" :task="task" @close="closeDrawer" @add-comment="addComment"/>
  </li>
</template>

<script setup>
import { computed, ref } from 'vue';
import TaskDrawer from './TaskDrawer.vue';
import useUserStore from '../store/userStore';

const props = defineProps({
  task: { type: Object, required: true },
  status: { type: String, required: true },
});

const emit = defineEmits(['onDelete', 'onAssign', 'onDragStart', 'onEdit']);

const drawerVisible = ref(false);

const openDrawer = (event) => {
  if (!event.target.closest('button')) {
    drawerVisible.value = true;
  }
}
const userStore = useUserStore()

const isManager = computed(() => {
  return (
    userStore.currentUser.role === "manager" ||
    userStore.currentUser.role === "manager/développeur"
  );
});

const closeDrawer = () => {
    drawerVisible.value = false;
};

const onDragStart = (event) => {
  if(!isManager.value && props.status === "Validé") return;
  event.dataTransfer.setData('taskId', props.task.id);
  emit('onDragStart', props.task.id);
};

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
