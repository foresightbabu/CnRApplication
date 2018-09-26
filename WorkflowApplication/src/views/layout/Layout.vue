<template>
  <div id="app">  
    <div class="fullapp">    
        <div class="fixedHeder">
            <AdminMenu></AdminMenu>
        </div>    
        <div class="contentarea">
            <router-view/>
        </div>
        <div class="footerarea">
            <FooterSection></FooterSection>
        </div>
    </div>
  </div>
</template>

<script>
import AdminMenu from "../../components/AdminMenu";
import FooterSection from "../../components/Footer";

export default {
  name: "App",
  components: {
    AdminMenu,
    FooterSection
  }
};
</script>