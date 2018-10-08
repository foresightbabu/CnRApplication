<template>
  <div id="app">  
    <div class="fullapp">    
        <div class="fixedHeder">
            <HeaderMenu></HeaderMenu>
        </div>    
        <div class="contentarea">
            <router-view/>
        </div>
        <div class="footerarea">
            <CommonFooter></CommonFooter>
        </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import HeaderMenu from "../../components/AdminMenu";
import CommonFooter from "../../components/Footer";
import VueSession from 'vue-session';
import VueAWN from "vue-awesome-notifications"

Vue.use(VueSession)
Vue.use(VueAWN)
export default {
   beforeCreate() {
   
   if (!this.$session.exists()) {
    this.$router.push('/login');
    }
  },
  name: "App",
  components: {
    HeaderMenu,
    CommonFooter
  }
};
</script>
<!-- Add "scoped" attributo limit CSS to this component only -->
<style lang="scss">
@import '~vue-awesome-notifications/dist/styles/style.scss';
</style>
<style scoped>
h1,
h2 {
  font-weight: normal;
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
.breadcrumb-area {
  width: 100%;
}
.breadcrumb {
  margin-left: 15px;
}

h1 {
  font-size: 2rem;
}
label {
  font-size: 1.2rem;
}
.v-form-inputs {
    margin-top: 20px;
}
.v-form-title{
  margin-top: 20px;
  font-size: 1.3rem;
}
.notifications{
  padding: 10px;
  margin: 0 5px 5px;
  position: absolute;
  z-index: 0;
  font-size: 12px;
  color: #ffffff;
  background: #44A4FC;
  border-left: 5px solid #187FE7;
   z-index: 1;
}
</style>
