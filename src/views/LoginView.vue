<template>
    <div class="login-form">
      <h2>Connexion</h2>
      <form @submit.prevent="handleLogin">
        <input v-model="username" placeholder="Nom d'utilisateur" required />
        <input type="password" v-model="password" placeholder="Mot de passe" required />
        <button type="submit">Se connecter</button>
      </form>
      <button @click="handleRegister">S'inscrire</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: ''
      };
    },
    methods: {
      handleLogin() {
        const users = JSON.parse(localStorage.getItem('users'));
        const user = users.find(u => u.username === this.username && u.password === this.password);
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.$router.push('/projects');
        } else {
          alert('Identifiants incorrects');
        }
      },
      handleRegister() {
        const users = JSON.parse(localStorage.getItem('users'));
        users.push({ username: this.username, password: this.password, role: ['developer'] });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Inscription réussie');
      }
    }
  };
  </script>