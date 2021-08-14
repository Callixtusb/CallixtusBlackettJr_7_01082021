<template>
  <main id="card">
    <h1>Bienvenue sur le réseau Social Groupomania</h1>
    <form class="px-4 py-3 signin card">
      <h1 class="card__title">Inscription</h1>
      <p class="card__subtitle">Tu as déjà un compte ? <router-link class="btn btn-danger" to="/login">Se connecter</router-link></p>
      <div class="form-row">

        <input type="email" class="form-row__input" v-model="email" id="email" placeholder="Adresse mail" aria-required="true" required /><br>
        <span class="error" v-if="(!$v.email.required && $v.email.$dirty)">Veuillez ajouter un email valide</span>
      </div>
      <div class="form-row">
    
        <input type="text" class="form-row__input" id="username" v-model="username" name="username" placeholder="Prénom et nom" aria-required="true" required /><br>
        <span class="error" v-if="(!$v.username.required && $v.username.$dirty)">Veuillez ajouter votre prenom et nom de famille </span>
      </div>
      <div class="form-row">

        <input type="password" class="form-row__input" v-model="password" id="password" placeholder="Mot de passe" aria-required="true" required /><br>
        <span class="error" v-if="(!$v.password.required && $v.password.$dirty )">Mot de passe requis : 8 caractères minimun. Au moins 1 Majuscule, 1 minuscule. Sans espaces et 1 chiffres </span>
        <span class="error" v-if="(!$v.password.valid && !$v.password.minLength )">Mot de passe requis : 8 caractères minimun. Au moins 1 Majuscule, 1 minuscule. Sans espaces,et 1 chiffres </span>

      </div>
      <button type="submit" class="btn btn-danger signup button" @click="createUser()">
        S'incrire
      </button>
      <span id="notfound" class="error"> </span>
    </form>
    <div class="dropdown-divider separation"></div>

  </main>
</template>
<script>
// import Footer from "@/components/Footer.vue";
import axios from "axios";
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";

export default {
  name: "Signup",
  components: {
  
  },
  data() {
    return {
      email: "",
      username: "",
      password: "",
    };
  },

  
  validations: {
    email: {
      required,
      email,
    },
    username: {
      required,
    },
    password: {
      required,
      valid: function (value) {
        const containsUppercase = /[A-Z]/.test(value);
        const containsLowercase = /[a-z]/.test(value);
        const containsNumber = /[0-9]/.test(value);
        return containsUppercase && containsLowercase && containsNumber;
      },
      minLength: minLength(8),
      maxLength: maxLength(19),
    },
  },


  methods: {
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
            this.$router.push("/login");
          })
          .catch((error) => {
            console.log(error);
            document.getElementById("notfound").innerHTML =
              "Une erreur est survenue, veuillez réessayer ultérieurement";
          });
      }
    },
  },
};
</script>
<style scoped>
#app {
  text-align: center;
}

.error {
  background: transparent;

}

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

.button {
  background: #cacbcd;
}



</style>