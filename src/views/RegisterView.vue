<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useUserStore from '../store/userStore';

const router = useRouter();
const userStore = useUserStore();
const errorMessage = ref('');

function handleRegister(e) {
    e.preventDefault();
    const newUser = {
        username: e.target.username.value,
        password: e.target.password.value,
        role: e.target.role.value
    };

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const foundUser = users.find(u => u.username === newUser.username);

    if (foundUser) {
        errorMessage.value = 'Nom d\'utilisateur déjà pris';
        return;
    }

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    userStore.setCurrentUser(newUser);
    router.push('/projects');
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Inscription
      </h2>
      <p v-if="errorMessage" class="text-center text-red-600">{{ errorMessage }}</p>
      <form @submit.prevent="handleRegister" class="mt-8 space-y-6">
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
          <select
              name="role"
              required
              class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          >
            <option value="" disabled selected>Choisir un rôle</option>
            <option value="developer">Développeur</option>
            <option value="manager">Manager</option>
            <option value="manager/développeur">Manager/développeur</option>
          </select>
        </div>
        <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          S'inscrire
        </button>
      </form>
      <p class="text-xs text-center">Vous avez déjà un compte <router-link to="/" class=" text-indigo-600 hover:text-indigo-700">se connecter</router-link></p>
    </div>
  </div>
</template>
