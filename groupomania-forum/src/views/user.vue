<template>
  <div class="Profil">
    <h1 class="page-title">Réseau Social <br> GROUPOMANIA</h1>

    <div class="mx-auto">
      <div v-for="(user, idx) in users" :key="idx">
        <div class="card mx-auto">
          <div class="card-body product-body">
            <h2 class="card-title name"><span class="userIdname">{{ user.username }}</span></h2>
            <h3 class="card-title UserID"><span class="userIdNumber">№ ID: {{ user.id }}</span></h3>
            <h3 class="card-title UserID"><span class="userStatusAdmin" v-if="admin == 1" >Rôle: Aministrateur</span><span class="userStatusMember" v-if="admin == 0" >Role: Salarié</span></h3>
         
            <div class="mt-5">
              <div class="form-row email-label">
                <label for="email">Changer mon Adresse Email</label>
                <input type="email" class="form-row__input" v-model="email" id="email" placeholder="email@example.com" required/><br />
                <span class="error" v-if="!$v.email.required && $v.email.$dirty">Veuillez ajouter un email valide</span>
              </div>

              <div class="form-row pwd-label">
                <label for="password">Changer mon Mot de passe</label>
                <input type="password" class="form-row__input" v-model="password" id="password" placeholder="Nouveau mot de passe" required/><br />
                <span class="error" v-if="!$v.password.required && $v.password.$dirty">Mot de passe requis : 8 caractères minimun. Au moins 1 Majuscule, 1 minuscule. Sans espaces et 1 chiffres</span>
                <span class="error" v-if="!$v.password.valid && !$v.password.minLength">Mot de passe requis : 8 caractères minimun. Au moins 1 Majuscule, 1 minuscule. Sans espaces et 1 chiffres</span>
              </div>
            </div>
            <div class="btn-block">
                <button class="btn btn-danger mr-5 mt-2" v-if="userId == user.id || admin == 1" @click="updateUser()">
                Modifier mon compte</button>

                <button class="btn btn-delete mt-2" v-if="userId == user.id || admin == 1" @click="deleteuser()">
                Supprimer mon compte</button>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VueJwtDecode from "vue-jwt-decode";

import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";

export default {
  name: "user",

  data() {
    return {
      users: [],
      userId: "",
      isAdmin: 0,
      email: "",
      password: "",
      userId: VueJwtDecode.decode(localStorage.getItem("token")).userId,
      admin: VueJwtDecode.decode(localStorage.getItem("token")).isAdmin,
      
    };
  },

  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      valid: function (value) {
        const containsUppercase = /[A-Z]/.test(value);
        const containsLowercase = /[a-z]/.test(value);
        const containsNumber = /[0-9]/.test(value);
        const containsSpecial = /[#?!@$%^&*-]/.test(value);
        return (
          containsUppercase &&
          containsLowercase &&
          containsNumber &&
          containsSpecial
        );
      },
      minLength: minLength(8),
      maxLength: maxLength(19),
    },
  },

  mounted() {
    this.getOneUser();
    this.userId = VueJwtDecode.decode(localStorage.getItem("token")).userId;
    this.admin = VueJwtDecode.decode(localStorage.getItem("token")).isAdmin;
    
    // console.log(localStorage); 
  },

  methods: {

    getOneUser() {
      const token = localStorage.getItem("token");
      const iduser = VueJwtDecode.decode(localStorage.getItem("token")).userId;
      // const iduser = this.$route.params.id;

      console.log(token); // Voir contenu dans la variable.....
      console.log(iduser);  // Voir contenu dans la variable....
       
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } else {
        axios.defaults.headers.common["Authorization"] = null;
        this.$router.push("../");
        // this.$forceUpdate("../");
      }

      axios
        .get(this.$localhost + "api/auth/user/" + iduser, {
          headers: {
            // "Content-Type": "application/json",
            Authorization: "bearer " + token,
          },
        })
        .then((res) => {
          this.users = res.data;   ////// THERE'S A PROBLEM HERE !!!!! ////////

           console.log(res.data);        

        })
        .catch((error) => {
          console.log("Les données user n'ont pas pu être récupéré /" + error);

          console.log("--------------------------------------------------------");
        });
    },



    deleteuser() {
      const token = localStorage.getItem("token");
      // const idUser = this.$router.params.id;
      const idUser = VueJwtDecode.decode(localStorage.getItem("token")).userId;
      
      console.log(token); // Voir contenu dans la variable.....
      console.log(idUser);  // Voir contenu dans la variable....
      

      axios
        .delete(this.$localhost + "api/auth/delete/" + idUser, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + token,
          },
        })
        .then((res) => {
          if (res) {
            localStorage.clear();
            this.$router.push("../Signup");

            console.log( "Le compte de ce user a BIEN été supprimé! /");
            console.log("--------------------------------------------------------");
          }
        })
        .catch((error) => {
          console.log( "Le compte de ce user n'a PAS pu être supprimé /" + error);
        });
    },



    updateUser() {
      this.submited = true;
      this.$v.$touch();

      if (!this.$v.$invalid) {
        const token = localStorage.getItem("token");
        // const idUser = this.$route.params.id;
        const idUser = VueJwtDecode.decode(localStorage.getItem("token")).userId;
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
       
        // if (token) {
        //   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        // } else {
        //   axios.defaults.headers.common["Authorization"] = null;
        //   this.$router.push("/");
        // }

        // const newData = new NewData();
        // newData.append("email", email);
        // newData.append("password", password);
       
        let data = {
          email: email,
          password: password,
        };

        axios
          .post(this.$localhost + "api/auth/update/" + idUser, data, {
            headers: {
              "Content-Type": "application/json",
              Authorization: "bearer " + token,
            },
          })
          .then((res) => {
            if (res) {
              this.$router.push("../");
              console.log("Les données ont bien été updaté!");
            }
          })
          .catch((error) => {
            console.log("Can't get the info to you" + error);
          });
      }
    },
  },
};
</script>

<style scoped>
#post {
  text-align: center;
}
.error {
  color: black;
}

.userIdname {
  color: darkblue;
}

.page-title {
  margin-bottom: 90px;
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
  background: #ffffff;
  font-weight: 500;
  font-size: 16px;
  flex: 1;
  min-width: 100px;
  color: black;
  border: 1px solid black;
}
.form-row__input::placeholder {
  color: #aaaaaa;
}

.email-label, .pwd-label {
  display: flex;
  flex-direction: column;
  row-gap: 5px;
}

label {
  text-align: left;
}

.btn {
  background: #d6d7d8;
  padding: 8px 10px;
  border-radius: 5px 5px; 
  display: block;
  margin-left: auto;
  margin-right: auto 
}

.btn-delete {
  color: #af4444;
}

.btn-block {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 25px;
}

@media (min-width: 320px) and (max-width: 1024px) {
  .card-product {
    margin: 90px auto auto auto;
    flex-direction: column;
    border-radius: 20px 20px;
    width: 100%;
  }
  .product-img {
    width: 100%;
    object-fit: contain;
  }

  .btn-block {
  display: flex;
  row-gap: 25px;
}
}
</style>
