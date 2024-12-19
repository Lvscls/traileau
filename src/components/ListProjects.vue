<script setup>
defineProps({
  projects: {
    type: Array,
    required: true,
  },
});

const isOverdue = (deadline) => {
  const today = new Date().toISOString().split('T')[0];
  return deadline < today;
};
</script>

<template>
  <div class="space-y-4">
    <div
      v-for="project in projects"
      :key="project.id"
      :class="{
        'bg-white shadow-md rounded-lg p-6': true,
        'border border-red-500': isOverdue(project.deadline),
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
</style>