<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useUserStore from '../store/userStore';

const router = useRouter();
const userStore = useUserStore();
const errorMessage = ref('');

function handleLogin(e) {
    e.preventDefault();
    const user = {
        username: e.target.username.value,
        password: e.target.password.value
    };

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const foundUser = users.find(u => u.username === user.username);

    if (!foundUser) {
        errorMessage.value = 'Utilisateur inconnu';
        return;
    }

    if (foundUser.password !== user.password) {
        errorMessage.value = 'Mot de passe incorrect';
        return;
    }

    userStore.setCurrentUser(foundUser);
    router.push('/projects');
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Connexion
      </h2>
      <p v-if="errorMessage" class="text-center text-red-600">{{ errorMessage }}</p>
      <form @submit.prevent="handleLogin" class="mt-8 space-y-6">
        <div class="rounded-md shadow-sm space-y-4">
          <input
              name="username"
              placeholder="Nom d'utilisateur"
              required
              class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          />
          <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              required
              class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          />
        </div>
        <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Se connecter
        </button>
      </form>
      <p class="text-xs text-center">Vous n'avez pas encore de compte
        <router-link to="/register" class=" text-indigo-600 hover:text-indigo-700">s'inscrire</router-link>
      </p>
    </div>
  </div>
</template>
