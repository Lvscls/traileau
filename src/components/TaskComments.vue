<script setup>
import { ref } from 'vue';

const props = defineProps({
  taskId: {
    type: String,
    required: true,
  },
  comments: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['add-comment']);

const newComment = ref('');

const handleAddComment = () => {
  if (newComment.value.trim()) {
    emit('add-comment', { taskId: props.taskId, text: newComment.value });
    newComment.value = '';
  }
};
</script>

<template>
  <div class="task-comments">
    <h3 class="text-lg font-semibold text-gray-800">Commentaires</h3>
    <ul class="space-y-2 mt-2">
      <li v-for="(comment, index) in comments" :key="index" class="p-2 border border-gray-200 rounded-md">
        <p class="text-gray-700">{{ comment.text }}</p>
      </li>
    </ul>
    <div class="mt-4">
      <textarea
        v-model="newComment"
        placeholder="Ajouter un commentaire..."
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none"
      ></textarea>
      <button
        @click="handleAddComment"
        class="mt-2 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
      >
        Ajouter un commentaire
      </button>
    </div>
  </div>
</template>

<style scoped>
.task-comments {
  margin-top: 1rem;
}
</style>