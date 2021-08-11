<template>
  <div class="home">
 
    <HelloWorld msg="Bienvenue sur le forum de GROUPOMANIA"/>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  
  props: {
    msg: String
  },

  methods: {
    
  },
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// .logo {
//   opacity: 0.7;
//   width: 200px;

// }

</style>