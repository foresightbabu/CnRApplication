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
<script>
import AdminMenu from "@/components/AdminMenu";
import FooterSection from "@/components/Footer";

export default {
  name: "App",
  components: {
    AdminMenu,
    FooterSection
  }
};
</script>



<style lang="scss">
@import "./assets/styles/_variables.scss";
//@import "./assets/styles/_bootswatch.scss";
@import url(https://bootswatch.com/4/flatly/_bootswatch.scss);
@import url(https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css);
//@import "node_modules/bootstrap/scss/bootstrap";
@import "./assets/styles/css/bootstrap.min.css";
@import "../node_modules/bootstrap-vue/dist/bootstrap-vue.css";
@import "./assets/styles/_custom.scss";
@import './assets/styles/common.css';
</style>