import { defineStore } from "pinia";
import { ref } from "vue";

const useProjectsStore = defineStore("projects", () => {
  // State
  const projects = ref([]);

  function loadProjects() {
    const projectsLoaded = localStorage.getItem("projects");
    if (projectsLoaded) {
      projects.value = JSON.parse(projectsLoaded);
    } else {
      projects.value = [];
    }
  }

  function addProject(project) {
    projects.value.push(project);
    localStorage.setItem("projects", JSON.stringify(projects.value));
  }

  function updateProject(updatedProject) {
    const index = projects.value.findIndex(p => p.id === updatedProject.id);
    if (index !== -1) {
      projects.value[index] = updatedProject;
      localStorage.setItem("projects", JSON.stringify(projects.value));
    }
  }

  function deleteProject(projectId) {
    projects.value = projects.value.filter(p => p.id !== projectId);
    localStorage.setItem("projects", JSON.stringify(projects.value));
  }

  // Load current projects from localStorage when the store is initialized
  loadProjects();

  // Expose the state and actions
  return {
    projects,
    loadProjects,
    addProject,
    updateProject,
    deleteProject
  };
});

export default useProjectsStore;
