<template>
  <div class="card mx-auto lg:card-side bg-base-100 w-fit">
    <figure class="hit-fit w-fit">
      <img class="h-96 w-96" src="/logo.jpg" alt="Logo de ClassCracker" />
    </figure>
    <div class="card-body w-96">
      <form>
        <div class="card-title mb-3">ClassCracker</div>
        <div class="w-full max-w-xs mb-6">
          Veuillez vous connecter avec vos identifiants EcoleDirecte
        </div>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          class="input input-bordered w-full max-w-xs mb-5"
          v-model="username"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          class="input input-bordered w-full max-w-xs mb-5"
          v-model="password"
        />
        <div class="card-actions justify-end">
          <button
            :class="'btn btn-primary' + (loginPending ? ' loading' : '')"
            @click.prevent="login()"
          >
            Connexion
          </button>
        </div>
      </form>
    </div>
  </div>
  <div class="container mx-auto mt-3">
    <div
      class="alert alert-error w-3/4 sm:w-1/2 mx-auto shadow-lg"
      v-if="loginError != ''"
    >
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-current flex-shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{{ loginError }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { io } from "socket.io-client";
import { Ref } from "vue";
import { ClassData } from "~~/composables";

const conf = useRuntimeConfig().public;
const username = ref("");
const password = ref("");
const classData: Ref<ClassData> = useState("classData");
const loginPending = ref(false);
const loginError = ref("");
async function login() {
  console.log("login");
  loginPending.value = true;
  loginError.value = "";
  try {
    if (!username.value || !password.value) {
    } else {
      await useFetch(conf.apiUrl + "/login", {
        method: "POST",
        body: {
          username: username.value,
          password: password.value,
        },
        initialCache: false,
      }).then(
        ({ data, pending, error, refresh }) => {
          if (!error.value) {
            //@ts-ignore
            classData.value = data;
            listenToUpdates();
          } else {
            console.log(error.value);

            if (
              error.value !== true &&
              error.value.name == "FetchError" &&
              // @ts-ignore
              error.value.response.status == 400
            ) {
              // @ts-ignore
              loginError.value = error.value.response._data.error;
            } else {
              loginError.value = "Une erreur est survenue durant la connexion";
            }
          }
        },
        (e) => {
          console.log("Error: " + e);
        }
      );
    }
  } catch (err: Error) {
    console.log(err);
  }
  loginPending.value = false;
}
async function listenToUpdates() {
  interface Student {
    name: string;
    class: string;
  }
  const socket = io(conf.apiUrl);
  socket.on("new:student", (student: Student) => {
    if (!classData.value) {
      return;
    }
    if (!(student.class in classData.value)) {
      classData.value.classList[student.class] = [];
    }
    if (!(student.name in classData.value.classList[student.class])) {
      classData.value.classList[student.class].push(student.name);
    }
  });
}
</script>
