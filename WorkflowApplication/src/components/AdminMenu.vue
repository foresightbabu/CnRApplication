<template>
<div class="menu" fixed>
    <b-navbar toggleable="md" type="light" variant="light">
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
            <b-navbar-brand href="#">
                <img src="../assets/logo.png" alt="Chandran and Raman">
            </b-navbar-brand>
            <b-collapse is-nav id="nav_collapse" class="tophead">
                <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown text="" v-model="$ml.current" right>
                        <template slot="button-content">
                            {{$ml.current}}
                        </template>
                        <b-dropdown-item href="#" v-for="lang in $ml.list" :key="lang" v-text="lang" @click="$ml.change(lang)" />                       
                    </b-nav-item-dropdown>
                    <b-nav-item-dropdown right>
                        <!-- Using button-content slot -->  
                        <template slot="button-content">
                            <img src="https://placekitten.com/g/30/30" class="d-inline-block align-middle rounded" alt="BV">
                            {{userName}}
                        </template>
                        <b-dropdown-item href="#">{{$ml.with('VueJS').get('common.Profile')}}</b-dropdown-item>
                        <b-dropdown-item href="#">{{$ml.with('VueJS').get('common.Signout')}}</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
    </b-navbar>
    <b-navbar type="dark" variant="primary" toggleable>
            <b-navbar-toggle target="navbarColor03"></b-navbar-toggle>
            <b-collapse is-nav id="navbarColor03">
                <b-navbar-nav>
                    <b-nav-item to="/" class="active">{{$ml.with('VueJS').get('menu.Dashboard')}}</b-nav-item>
                    <b-nav-item to="/admin/tasks">{{$ml.with('VueJS').get('menu.Tasks')}}</b-nav-item>
                    <b-nav-item href="#">{{$ml.with('VueJS').get('menu.Subtasks')}}</b-nav-item>
                    <b-nav-item href="#">{{$ml.with('VueJS').get('menu.Queries')}}</b-nav-item>
                    <b-nav-item href="#">{{$ml.with('VueJS').get('menu.Comments')}}</b-nav-item>
                    <!-- Navbar dropdowns -->                   
                    <!-- <b-nav-item-dropdown text="User" right>
                    <b-dropdown-item href="#">Account</b-dropdown-item>
                    <b-dropdown-item href="#">Settings</b-dropdown-item>
                    </b-nav-item-dropdown> -->
                </b-navbar-nav>
            </b-collapse>
    </b-navbar>
</div>
</template>

<script>
export default {
  name: "AdminMenu",
  data() {
    return {
      userName: "Administrator"
    };
  }
};
</script>