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

  const assignTask = (projectId, taskId) => {
    const project = projects.value.find((p) => p.id === projectId);

    if (project) {
      const task = project.tasks.find((t) => t.id === taskId);
      const users = JSON.parse(localStorage.getItem("users")) || [];
      if (task) {
        const assignee = prompt("Entrez le nom de l'utilisateur à assigner :");
        if (assignee) {
          const userExists = users.some((user) => user.username === assignee);
          if (!userExists) {
            alert("Cet utilisateur n'existe pas.");
            return;
          }
          task.assignee = assignee;
          localStorage.setItem("projects", JSON.stringify(projects.value));
        }
      }
    }
  };

  const deleteTask = (projectId, taskId) => {
    const project = projects.value.find((p) => p.id === projectId);

    if (project) {
      const taskIndex = project.tasks?.findIndex((t) => t.id === taskId);

      if (taskIndex > -1) {
        project.tasks.splice(taskIndex, 1);
        localStorage.setItem("projects", JSON.stringify(projects.value));
      }
    }
  };

  function addComment(projectId, comment) {
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

  function updateTaskStatus(projectId, taskId, newStatus) {
    const project = projects.value.find((p) => p.id === projectId);

    if (project) {
      console.log(project.tasks);

      const task = project.tasks?.find(
        (t) => t.id.toString() === taskId.toString()
      );
      console.log(task);

      if (task) {
        task.status = newStatus;
        localStorage.setItem("projects", JSON.stringify(projects.value));
      }
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
    deleteTask,
    assignTask,
    updateTaskStatus,
  };
});

export default useProjectsStore;
