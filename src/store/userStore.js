import { defineStore } from "pinia";
import { ref } from "vue";

const useUserStore = defineStore("user", () => {
  // State
  const currentUser = ref(null);

  // Actions
  function setCurrentUser(user) {
    currentUser.value = user;
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("currentUser");
    }
  }

  function loadCurrentUser() {
    const user = localStorage.getItem("currentUser");
    if (user) {
      currentUser.value = JSON.parse(user);
    } else {
      currentUser.value = null;
    }
  }

  function logout() {
    setCurrentUser(null);
  }

  // Load current user from localStorage when the store is initialized
  loadCurrentUser();

  // Mise à dispo des données
  return {
    // States
    currentUser,
    // Actions
    setCurrentUser,
    loadCurrentUser,
    logout,
  };
});

export default useUserStore;
