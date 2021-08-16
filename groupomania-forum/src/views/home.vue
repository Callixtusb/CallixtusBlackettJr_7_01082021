<template>
  <div class="home">
    <HelloWorld msg="Bienvenue sur le réseau Social GROUPOMANIA" />

    <CreatePost />
    <AllPost />
  </div>
  
</template>

<script>
// @ is an alias to /src

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


};
</script>


<style scoped lang="scss">

</style>
