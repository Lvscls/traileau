<template>
    <div class="project-dashboard">
      <h1>Tableau de bord : {{ project.name }}</h1>
  
      <div class="task-form">
        <h3>Créer une nouvelle tâche</h3>
        <form @submit.prevent="addTask">
          <input v-model="newTask.title" placeholder="Titre de la tâche" required />
          <select v-model="newTask.assignee">
            <option value="">Aucun assigné</option>
            <option v-for="user in users" :key="user.username" :value="user.username">
              {{ user.username }}
            </option>
          </select>
          <button type="submit">Ajouter</button>
        </form>
      </div>
      
      <h3>Liste des tâches</h3>
      <ul>
        <li v-for="(task, index) in project.tasks" :key="task.id" class="task-item">
          <strong>{{ task.title }}</strong> - 
          <span :class="{'completed': task.status === 'Validé'}">
            {{ task.status }}
          </span> 
          <span v-if="task.assignee"> | Assigné à : {{ task.assignee }}</span>
          
          <!-- Actions -->
          <div class="task-actions">
            <button @click="validateTask(index)" v-if="task.status !== 'Validé'">Valider</button>
            <button @click="editTask(index)">Modifier</button>
            <button @click="deleteTask(index)">Supprimer</button>
            <button @click="assignTask(index)">Assigner</button>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        project: {}, // Projet actuel
        users: [], // Liste des utilisateurs disponibles
        newTask: {
          title: '',
          assignee: ''
        },
        editIndex: null // Pour la modification des tâches
      };
    },
    created() {
      this.loadData();
    },
    methods: {
      // Charger les données depuis localStorage
      loadData() {
        const projects = JSON.parse(localStorage.getItem('projects')) || [];
        const projectId = parseInt(this.$route.params.id);
        this.project = projects.find(p => p.id === projectId) || { tasks: [] };
  
        // Charger les utilisateurs
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        this.users = storedUsers;
      },
  
      // Ajouter une nouvelle tâche
      addTask() {
        if (this.newTask.title.trim()) {
          this.project.tasks.push({
            id: Date.now(),
            title: this.newTask.title,
            assignee: this.newTask.assignee,
            status: 'Non validé'
          });
          this.saveData();
          this.resetTaskForm();
        }
      },
  
      // Valider une tâche
      validateTask(index) {
        this.project.tasks[index].status = 'Validé';
        this.saveData();
      },
  
      // Modifier une tâche
      editTask(index) {
        this.editIndex = index;
        this.newTask.title = this.project.tasks[index].title;
        this.newTask.assignee = this.project.tasks[index].assignee;
      },
  
      // Supprimer une tâche
      deleteTask(index) {
        this.project.tasks.splice(index, 1);
        this.saveData();
      },
  
      // Assigner une tâche à un utilisateur
      assignTask(index) {
        const assignee = prompt('Entrez le nom de l\'utilisateur à assigner :');
        if (assignee) {
          this.project.tasks[index].assignee = assignee;
          this.saveData();
        }
      },
  
      // Sauvegarder les modifications dans localStorage
      saveData() {
        const projects = JSON.parse(localStorage.getItem('projects')) || [];
        const updatedProjects = projects.map(p => (p.id === this.project.id ? this.project : p));
        localStorage.setItem('projects', JSON.stringify(updatedProjects));
      },
  
      // Réinitialiser le formulaire de tâche
      resetTaskForm() {
        this.newTask = { title: '', assignee: '' };
        this.editIndex = null;
      }
    }
  };
  </script>
  
  <style scoped>
  .project-dashboard {
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  
  h1 {
    color: #42b983;
  }
  
  .task-form {
    margin-bottom: 20px;
  }
  
  .task-form input,
  .task-form select {
    margin-right: 10px;
    padding: 5px;
  }
  
  .task-form button {
    background-color: #42b983;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
  }
  
  .task-form button:hover {
    background-color: #369870;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  .task-item {
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  
  .task-item .completed {
    color: green;
    font-weight: bold;
  }
  
  .task-actions button {
    margin-right: 5px;
    padding: 5px;
    border: none;
    background-color: #f0f0f0;
    cursor: pointer;
  }
  
  .task-actions button:hover {
    background-color: #ddd;
  }
  </style>
  