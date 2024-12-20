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
    const index = projects.value.findIndex((p) => p.id === updatedProject.id);
    if (index !== -1) {
      projects.value[index] = updatedProject;
      localStorage.setItem("projects", JSON.stringify(projects.value));
    }
  }

  function deleteProject(projectId) {
    projects.value = projects.value.filter((p) => p.id !== projectId);
    localStorage.setItem("projects", JSON.stringify(projects.value));
  }

  function addTask(projectId, newTask) {
    const project = projects.value.find((p) => p.id === projectId);
    if (project && newTask.title.trim()) {
      project.tasks = project.tasks || [];
      project.tasks.push({
        id: Date.now(),
        title: newTask.title,
        assignee: newTask.assignee,
        status: "À valider",
      });
      localStorage.setItem("projects", JSON.stringify(projects.value));
    }
  }

  function addComment(projectId, comment) {
    console.log(comment);

    const project = projects.value.find((p) => p.id === projectId);
    if (project) {
      const task = project.tasks?.find((t) => t.id === comment.taskId);

      if (task) {
        task.comments = task.comments || [];
        task.comments.push({
          text: comment.text,
          author: comment.author,
        });
      }
      localStorage.setItem("projects", JSON.stringify(projects.value));
    }
  }

  // Load current projects from localStorage when the store is initialized
  loadProjects();

  // Expose the state and actions
  return {
    projects,
    loadProjects,
    addTask,
    addProject,
    updateProject,
    deleteProject,
    addComment,
  };
});

export default useProjectsStore;
