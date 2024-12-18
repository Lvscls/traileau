<script setup>
import { useRoute } from 'vue-router';
import Navbar from './components/Navbar.vue';

const route = useRoute();
</script>

<template>
    <!-- Si on est pas sur '/' ni sur /register, on affiche le composant Navbar -->
    <div v-if="route.path !== '/' && route.path !== '/register'">
        <Navbar/>
    </div>
    <router-view />
</template>

<style scoped>

</style>
