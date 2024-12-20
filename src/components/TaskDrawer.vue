<template>
    <transition name="slide">
      <div v-if="visible" class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="absolute inset-0 bg-gray-700 bg-opacity-80 transition-opacity" @click.stop="close"></div>
          <div class="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <div class="relative w-screen max-w-lg">
              <div class="h-full flex flex-col bg-white shadow-2xl overflow-hidden">
                <div class="px-6 py-8 sm:px-8 bg-indigo-700">
                  <h2 class="text-xl font-semibold text-white">{{ task.title }}</h2>
                  <div class="mt-4 flex space-x-4" v-if="isManager">
                    <button @click.stop="deleteTask" class="btn btn-red">Supprimer</button>
                    <button @click.stop="assignTask" class="btn btn-gray">Assigner</button>
                    <button @click.stop="editTask" class="btn btn-indigo">Modifier</button>
                  </div>
                  <button @click.stop="close" class="absolute top-4 right-4 text-white">X</button>
                </div>
                <div class="px-6 py-8 sm:px-8 h-full">
                  <p class="text-gray-700">{{ task.description }}</p>
                  <TaskComments :taskId="task.id" :comments="task.comments || []" @add-comment="addComment"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
</template>
  
  <script setup>
  import { computed } from 'vue';
import TaskComments from './TaskComments.vue';
import useUserStore from '../store/userStore';
  const { visible, task } = defineProps(['visible', 'task'])
  const userStore = useUserStore()

  const isManager = computed(() => {
  return (
    userStore.currentUser.role === "manager" ||
    userStore.currentUser.role === "manager/développeur"
  );
});
  const emit = defineEmits(['close', 'add-comment', 'delete', "assign"]);
  
  const close = () => {
    emit('close');
  };
  
  const addComment = (comment) => {
    emit('add-comment', comment);
  };

  const deleteTask = () => emit('delete');
const assignTask = () => emit('assign');
const editTask = () => emit('edit');
  </script>
  
  <style scoped>
  .slide-enter-active, .slide-leave-active {
    transition: transform 0.3s ease;
  }
  .slide-enter, .slide-leave-to {
    transform: translateX(100%);
  }
  .btn {
  @apply px-3 py-1 text-sm text-white rounded focus:outline-none focus:ring-2 focus:ring-offset-2;
}
.btn-indigo { @apply bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500; }
.btn-red { @apply bg-red-600 hover:bg-red-700 focus:ring-red-500; }
.btn-gray { @apply bg-gray-600 hover:bg-gray-700 focus:ring-gray-500; }
  </style>
  