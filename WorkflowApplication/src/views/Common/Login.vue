<template>
<div class="body">
        <div class="wrapper-page">
            <div class="text-center mb-4">
                <a href="index.html" class="logo logo-lg">  
                  <img class="img-responsive" src="../../assets/logo.png" alt="Chandran and Raman" width="200" height="50"> </a>
            </div>

             <form @submit.prevent="handleSubmit" class="form-horizontal m-t-20">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" v-model="username" name="username" class="form-control" :class="{ 'is-invalid': submitted && !username }" />
                <div v-show="submitted && !username" class="invalid-feedback">Username is required</div>
            </div>
            <div class="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" v-model="password" name="password" class="form-control" :class="{ 'is-invalid': submitted && !password }" />
                <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
            </div>
          <div class="form-group">
                    <div class="col-xs-12">
                        <div class="checkbox checkbox-primary">
                            <input id="checkbox-signup" type="checkbox">
                            <label for="checkbox-signup">
                                Remember me
                            </label>
                        </div>
                    </div>
                </div>
                <div class="form-group text-right m-t-20">
                    <div class="col-xs-12">
                        <button class="btn btn-primary login-btn btn-custom w-md waves-effect waves-light" type="submit">Log In
                        </button>
                    </div>
                </div>
                <div class="form-group m-t-30">
                    <div class="col-sm-7 pl-0">
                        <a href="#/Forgotten" class="text-muted"><i class="fa fa-lock m-r-5"></i> Forgot your
                            password?</a>
                    </div>                 
                </div>
        </form>
        </div>
    </div>    
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
    data () {
        return {
            username: '',
            password: '',
            submitted: false
        }
    },
    computed: {
        ...mapState('account', ['status'])
    },
    created () {
        // reset login status
        this.logout();
    },
    methods: {
        ...mapActions('account', ['login', 'logout']),
        handleSubmit (e) {
            this.submitted = true;
            const { username, password } = this;
            if (username && password) {
                this.login({ username, password })
            }
        }
    }
};
</script>

<style scoped>
body {
    background: #ecf0f1 !important;
    margin: 0;
    color: #4c5667;
    overflow-x: hidden !important;
}
.wrapper-page {
    margin: 7.5% auto;
    width: 360px;
}
.logo {
    color: #ffffff;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: .02em;
    line-height: 70px;
}
.logo-lg {
    font-size: 28px !important;
    color: #228bdf !important;
}
.login-btn{
  width: 100%;
}
.wrapper-page{
background: #ecf0f1;
    width: 29%;
    min-height: 351px;
    padding: 30px;
    margin: 8% auto 6% auto;
    position: relative;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 8px;
    -o-border-radius: 8px;
    box-shadow: inset 0px -2px 0px -100px #d0d0d0, 0px 0px 11px 2px #d0d0d0;
    -webkit-box-shadow:  inset 0px -2px 0px -100px #d0d0d0, 0px 0px 11px 2px #d0d0d0;
    -moz-box-shadow:  inset 0px -2px 0px -100px #d0d0d0, 0px 0px 11px 2px #d0d0d0;
    -o-box-shadow:  inset 0px -2px 0px -100px #d0d0d0, 0px 0px 11px 2px #d0d0d0;
}
</style>
