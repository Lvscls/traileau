<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import useUserStore from '../store/userStore';

const router = useRouter();
const userStore = useUserStore();

onMounted(() => {
    userStore.loadCurrentUser();
});

const currentUser = computed(() => userStore.currentUser);

const logout = () => {
    userStore.logout();
    router.push('/');
};
</script>

<template>
    <nav class="bg-indigo-600 shadow-lg">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-2 justify-between items-center">
            <div class="justify-between h-16 flex items-center gap-2">
                <router-link to="/projects" class="text-white font-bold text-xl">
                    Traileau
                </router-link>
                <div class="flex items-center">
                    <router-link to="/projects"
                        class="text-gray-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                        Projets
                    </router-link>
                </div>
            </div>

            <div class="flex items-center space-x-4" v-if="currentUser">
                <div class="flex items-center space-x-2">
                    <span class="text-gray-100 text-sm">
                        {{ currentUser.username }} ({{ currentUser.role }})
                    </span>
                    <button @click="logout"
                        class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200">
                        Déconnexion
                    </button>
                </div>
            </div>
        </div>
    </nav>
</template>
