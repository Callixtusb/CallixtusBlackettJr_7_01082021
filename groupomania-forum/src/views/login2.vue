<template>
    <form class="card">
        <h1 class="card__title" v-if="mode == 'login'">Connection</h1>
        <h1 class="card__title" v-else>Inscription</h1>
        <p class="card__subtitle" v-if="mode == 'login'">Pas encore de compte ? <a class="card__action" @click="switchToCreateAccount()">céer un compte</a></p>
        <p class="card__subtitle" v-else>Tu as déjà un compte ? <a class="card__action" @click="switchToLogin()">connecter</a></p>
        <div class="form-row">
            <input v-model="email" class="form-row__input" type="email" placeholder="Adresse mail">
        </div>
        <div class="form-row" v-if="mode == 'create'">
            <input v-model="username" class="form-row__input" type="text" placeholder="Prénom et nom">
        </div>
        <div class="form-row">
            <input v-model="password" class="form-row__input" type="password" placeholder="Mot de passe">
        </div>

        <div class="form-row" v-if="mode =='login' && status == 'error_login'">
            Adresse mail et/ou mot de passe invalide
        </div>
        <div class="form-row" v-if="mode =='create' && status == 'error_create'">
            Adresse mail déjà utilisée
        </div>

        <div class="form-row">
            <button @click="login()" class="button" :class="{'button--disabled' : !validatedFields}" v-if="mode == 'login'">
                <span v-if="status == 'loading'">Connexion en cours...</span>
                <span v-else>Connexion</span>
            </button>
            <button @click="createUser()" class="button" :class="{'button--disabled' : !validatedFields}" v-else>
                <span v-if="status == 'loading'">Création en cours...</span>
                <span v-else>Créer un compte</span>
            </button>
        </div>
    </form>
</template>
<script>

import { mapState } from 'vuex'
import axios from "axios";
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";

export default {
    name:'login', 
    data: function () {
        return {
            mode: 'login',
            email: '',
            username: '',
            password: '',
        }
    },
    // mounted: function () {
    //     if (this.$store.state.user.userId != -1) {
    //         this.$router.push('/profile');
    //         return;
    //     } 
    // },


    computed: {
        validatedFields: function () {
            if (this.mode == 'create') {
                if (this.email != "" && this.username != "" && this.password != "") {
                    return true;
                } else {
                    return false;
                }
            } else {
                if (this.email != "" && this.password != "") {
                    return true;
                } else {
                    return false;
                }
            }
        },
        ...mapState(['status'])
    },

    methods: {
        switchToCreateAccount: function () {
            this.mode = 'create';
        },
        switchToLogin: function () {
            this.mode = 'login';
        },


/**
     * Permet de poster les donnees saisie par utilisateur
     */
    createUser() {
      this.submited = true;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        const username = document.querySelector("#username").value;
        let users = {
          email: email,
          password: password,
          username: username,
        };
        // Verifie que utilisateur a bien remplie tout les champs
        if (users.email == "" || users.password == "" || users.username == "") {
          users = {
            userVerification: false,
          };
        } // Permet d'envoyer les information pour la creation d'un profil
        axios
          .post(this.$localhost + "api/auth/signup", users)
          .then((res) => {
            console.log(res);
            this.$router.push("/Login");
          })
          .catch((error) => {
            console.log(error);
            document.getElementById("notfound").innerHTML =
              "Une erreur est survenue, veuillez réessayer ultérieurement";
          });
      }
    },





        login: function () {
            const self = this;
            this.$store.dispatch('login', {
                email: this.email,
                password: this.password,
            }).then (function () {
                self.$router.push('/');
            }).catch (function (error) {
                console.log(error);
            })
        },
    },
}
</script>

<style scoped>

    .card {
    margin-top: 60px;
    }
    
    .form-row {
        display: flex;
        margin: 16px 0px;
        gap: 16px;
        flex-wrap: wrap;
    }
    .form-row__input {
        padding: 8px;
        border: none;
        border-radius: 8px;
        background:#ffffff;
        font-weight: 500;
        font-size: 16px;
        flex:1;
        min-width: 100px;
        color: black;
    }
    .form-row__input::placeholder {
        color:#aaaaaa;
    }
</style>