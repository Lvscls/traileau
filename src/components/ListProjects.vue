<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import useUserStore from "../store/userStore";

const props = defineProps({
  projects: {
    type: Array,
    required: true,
  },
});

const userStore = useUserStore();

const isManager = computed(() => {
  return (
    userStore.currentUser.role === "manager" ||
    userStore.currentUser.role === "manager/développeur"
  );
});
const isOverdue = (deadline) => {
  const today = new Date().toISOString().split("T")[0];
  return deadline < today;
};

const isDueSoon = (deadline) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueDate = new Date(deadline);
  dueDate.setHours(0, 0, 0, 0);

  const timeDiff = dueDate - today;
  const daysDiff = timeDiff / (1000 * 3600 * 24);
  return daysDiff <= 3 && daysDiff >= 0;
};

const sortedProjects = computed(() => {
  return [...props.projects].sort(
    (a, b) => new Date(a.deadline) - new Date(b.deadline)
  );
});

const router = useRouter();

const editProject = (project) => {
  router.push({ name: "EditProject", params: { id: project.id } });
};

const deleteProject = (projectId) => {
  const projects = JSON.parse(localStorage.getItem("projects")) || [];
  const updatedProjects = projects.filter(
    (project) => project.id !== projectId
  );
  localStorage.setItem("projects", JSON.stringify(updatedProjects));
  window.location.reload();
};
</script>

<template>
  <div class="space-y-4">
    <div
      v-for="project in sortedProjects"
      :key="project.id"
      :class="{
        'bg-white shadow-md rounded-lg p-6': true,
        'border border-red-500': isOverdue(project.deadline),
        'border border-orange-500':
          isDueSoon(project.deadline) && !isOverdue(project.deadline),
      }"
    >
      <router-link :to="{ name: 'ProjectDetails', params: { id: project.id } }">
        <h3 class="text-lg font-semibold text-gray-800">{{ project.name }}</h3>
        <p class="text-gray-600 mt-2">{{ project.description }}</p>
        <div class="mt-4 text-sm text-gray-500">
          Date limite: {{ new Date(project.deadline).toLocaleDateString() }}
        </div>
      </router-link>
      <div class="mt-4 flex space-x-2">
        <button
          @click="editProject(project)"
          class="px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          v-if="isManager"
        >
          Edit
        </button>
        <button
          @click="deleteProject(project.id)"
          class="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          v-if="isManager"
        >
          Delete
        </button>
      </div>
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
