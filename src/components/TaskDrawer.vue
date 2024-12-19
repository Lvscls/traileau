<template>
    <transition name="slide">
      <div v-if="visible" class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="close"></div>
          <div class="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <div class="relative w-screen max-w-md">
              <div class="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                <div class="px-4 py-6 sm:px-6 bg-indigo-600">
                  <h2 class="text-lg font-medium text-white">{{ task.title }}</h2>
                  <button @click="close" class="absolute top-4 right-4 text-white">X</button>
                </div>
                <div class="px-4 py-6 sm:px-6">
                  <p>{{ task.description }}</p>
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
  import TaskComments from './TaskComments.vue';
  const { visible, task } = defineProps(['visible', 'task'])
  
  const emit = defineEmits(['close', 'add-comment']);
  
  const close = () => {
    emit('close');
  };
  
  const addComment = (comment) => {
    emit('add-comment', comment);
  };
  </script>
  
  <style scoped>
  .slide-enter-active, .slide-leave-active {
    transition: transform 0.3s ease;
  }
  .slide-enter, .slide-leave-to {
    transform: translateX(100%);
  }
  </style>
  