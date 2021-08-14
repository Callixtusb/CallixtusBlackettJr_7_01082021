<template>
  <v-app id="nav">
    <v-navigation-drawer 
      v-model="drawer"
      app
    >
          <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Menu
          </v-list-item-title>
          <v-list-item-subtitle>
            Bienvenu !
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Groupomania Forum</v-toolbar-title>
      
    </v-app-bar>

    <br></br>
    <div id="conn-connected"></div>

    <v-main class= "my-5">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
// import axios from "axios";

export default {


  data: () => ({

      drawer: null,
      items: [
        { title: 'Home', icon: 'mdi-home-outline', to: '/' },
        { title: 'Login', icon: 'mdi-account-check-outline', to: '/login' },
        { title: 'Signup', icon: 'mdi-account-edit-outline', to: '/Signup' },
        { title: 'Profile', icon: 'mdi-account-details-outline', to: '/user' },
      ],

      // conn: "",

     }),

  //    created() {
  //   axios
  //     .get(this.$localhost + "api/")
  //     .then((response) => (this.conn = response.data))

  //     .catch((error) => {
  //       console.log(error);
  //       document.getElementById("conn-connected").innerHTML = 
  //         "<hr> /!\\ Attention la database n'est pas connectée!  Veuillez réessayer ultérieurement. <hr>" ;
  //     });
  // },
}
</script>

<style lang="scss">

#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#app {
  max-width: 100%;
}

#conn-connected {
  margin: auto;
  color: #894131;
}

body {
//   background-image: linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%);
  background-image: white;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding:32px;
}
img {
  max-width: 100%;
  border-radius: 8px;
}
.card {
  max-width: 100%;
  // width: 540px;
  background: #ECEFF1;
  border-radius: 16px;
  padding:32px;
  margin-bottom: 10px;
  margin-right: 10px;
}
.card__title {
  text-align:center;
  font-weight: 800;
}
.card__subtitle {
  text-align: center;
  color:#666;
  font-weight: 500;
}
  .button {
    background: #2196F3;
    color:white;
    border-radius: 8px;
    font-weight: 800;
    font-size: 15px;
    border: none;
    width: 100%;
    padding: 16px;
    transition: .4s background-color;
    margin-bottom: 5px;
  }
  .button__delete {
    background-color: red;
    color:white;
    border-radius: 8px;
    font-weight: 800;
    font-size: 15px;
    border: none;
    width: 100%;
    padding: 16px;
    transition: .4s background-color;
  }
  .card__action {
    color:#2196F3;
    text-decoration: underline;
  }
  .card__action:hover {
    cursor:pointer;
  }
  .button:hover {
    cursor:pointer;
    background: #1976D2;
  }
  .button--disabled {
    background:#cecece;
    color:#ececec
  }
  .button--disabled:hover {
    cursor:not-allowed;
    background:#cecece;
  }
  .button__delete:hover {
      cursor:pointer;
      background: #9e0e40;
    }
  .link {
    text-decoration: none;
  }
  .link:hover{
    cursor: pointer;
  }
  .button__admin {
    background: red;
    color:white;
    border-radius: 8px;
    font-weight: 800;
    font-size: 15px;
    border: none;
    width: 45%;
    padding: 16px;
    transition: .4s background-color;
    margin-left: 5px;
  }
  .button__admin:hover {
    cursor:pointer;
    background: #9e0e40;
  }
  .button__modify {
    background: #2196F3;
    color:white;
    border-radius: 8px;
    font-weight: 800;
    font-size: 15px;
    border: none;
    width: 30%;
    padding: 16px;
    transition: .4s background-color;
    margin-left: 5px;
  }
  .button__modify:hover {
    cursor:pointer;
    background: #1976D2;
  }
  .button__sup {
    background: red;
    color:white;
    border-radius: 8px;
    font-weight: 800;
    font-size: 15px;
    border: none;
    width: 30%;
    padding: 16px;
    transition: .4s background-color;
    margin-left: 5px;
  }
  .button__sup:hover {
    cursor:pointer;
    background: #9e0e40;
  }
</style>