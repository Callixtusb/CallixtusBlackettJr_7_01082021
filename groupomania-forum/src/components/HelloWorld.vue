<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Le réseau social interne pour les employés de Groupomania. 
    </p>
    <h3>Dernières nouvelles...</h3>
    
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello {
  margin-top: 60px;
  // background: url(../images/bgimg.jpg) no-repeat center center fixed;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
