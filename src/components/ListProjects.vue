<script setup>
import { computed } from 'vue';

const props = defineProps({
  projects: {
    type: Array,
    required: true,
  },
});

const isOverdue = (deadline) => {
  const today = new Date().toISOString().split('T')[0];
  return deadline < today;
};

const isDueSoon = (deadline) => {
  const today = new Date();
  const dueDate = new Date(deadline);
  const timeDiff = dueDate - today;
  const daysDiff = timeDiff / (1000 * 3600 * 24);
  return daysDiff <= 3 && daysDiff >= 0;
};

// sort les projets par date de fin
const sortedProjects = computed(() => {
  return [...props.projects].sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
});
</script>

<template>
  <div class="space-y-4">
    <div
      v-for="project in sortedProjects"
      :key="project.id"
      :class="{
        'bg-white shadow-md rounded-lg p-6': true,
        'border border-red-500': isOverdue(project.deadline),
        'border border-orange-500': isDueSoon(project.deadline) && !isOverdue(project.deadline),
      }"
    >
      <router-link :to="{ name: 'ProjectDetails', params: { id: project.id }}">
        <h3 class="text-lg font-semibold text-gray-800">{{ project.name }}</h3>
        <p class="text-gray-600 mt-2">{{ project.description }}</p>
        <div class="mt-4 text-sm text-gray-500">
          Date limite: {{ new Date(project.deadline).toLocaleDateString() }}
        </div>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.border-red-500 {
  border-color: #f56565;
}
.border-orange-500 {
  border-color: #f6ad55;
}
</style>