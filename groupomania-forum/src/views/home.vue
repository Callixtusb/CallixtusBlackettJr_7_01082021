<template>

  <div class="home">
  <h1 class="heyheyhey">Bonjour, <span class="userIdname">  </span>! </h1>
    <HelloWorld msg="Bienvenue sur le réseau Social GROUPOMANIA" />

    <CreatePost />
    <AllPost />
  </div>
  
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import VueJwtDecode from "vue-jwt-decode";

import HelloWorld from "@/components/HelloWorld.vue";
import CreatePost from "@/components/CreatePost.vue";
import AllPost from "@/components/AllPost.vue";


export default {
  name: "Home",
  components: {
    HelloWorld,
    CreatePost,
    AllPost,
  },


data() {
    return {
      users: [],
      userId: "",
      isAdmin: 0,

      userId: VueJwtDecode.decode(localStorage.getItem("token")).userId,
      admin: VueJwtDecode.decode(localStorage.getItem("token")).isAdmin,
      
    };
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
      const username = VueJwtDecode.decode(localStorage.getItem("token")).username;
      
      const nomutilisateur = document.querySelector(".userIdname");
      nomutilisateur.innerHTML = username;  //Username appears on top page

      // console.log(token); 
      console.log(iduser);  
      console.log(username); 

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
          this.users = res.data;   

           console.log(res.data);        
           console.log("--------------------------------------------------------"); 
           
        })
        .catch((error) => {
          console.log("Les données user n'ont pas pu être récupéré /" + error);

          console.log("--------------------------------------------------------");
        });
    },
},


};


</script>


<style scoped >

.heyheyhey {
  margin-top: 50px;
  font-size: 20px;
}

.userIdname{
  color: darkblue;
}

</style>
