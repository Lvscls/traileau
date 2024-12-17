<script setup>
import { useRouter } from 'vue-router';

const users = [
    {
        username: 'admin',
        password: 'admin'
    },
    {
        username: 'user',
        password: 'user'
    }
]

const router = useRouter()
function handleLogin(e){
    const user = {
        username: e.target.username.value,
        password: e.target.password.value
    }
    if(!users.find(u => u.username === user.username && u.password === user.password)){
        alert('Nom d\'utilisateur ou mot de passe incorrect');
        return;
    }
    localStorage.setItem('currentUser', JSON.stringify(user));
    router.push('/projects');
}

</script>

<template>
    <div class="login-form">
      <h2>Connexion</h2>
      <form @submit.prevent="handleLogin">
        <input name="username" placeholder="Nom d'utilisateur" required />
        <input name="password" placeholder="Mot de passe" required />
        <button type="submit">Se connecter</button>
      </form>
    </div>
</template>