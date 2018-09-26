<template>
  <div id="app">  
    <div class="fullapp">    
     <router-view/>
    </div>
  </div>
</template>

<script>


export default {
  name: "App",
  components: {
   
  }
};
</script>



<style lang="scss">
@import "./assets/styles/_variables.scss";
//@import "./assets/styles/_bootswatch.scss";
@import url(https://bootswatch.com/4/flatly/_bootswatch.scss);
//@import "node_modules/bootstrap/scss/bootstrap";
@import "./assets/styles/css/bootstrap.min.css";
@import "../node_modules/bootstrap-vue/dist/bootstrap-vue.css";
@import "./assets/styles/_custom.scss";
</style>