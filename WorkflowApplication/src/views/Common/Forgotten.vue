<template>
<div class="body">
        <div class="wrapper-page">
            <div class="text-center mb-4">
                <a href="index.html" class="logo logo-lg"><img class="img-responsive" src="../../assets/logo.png" alt="Chandran and Raman" width="200" height="50">  </a>
            </div>
            <p class="forgotInfo">Enter your Email and instructions will be sent to you!</p>
            <form class="form-horizontal m-t-20" action="index.html">
                <div class="form-group">
                    <div class="col-xs-12">
                        <input class="form-control" type="text" required="" placeholder="Enter your Email id">
                        <i class="md md-account-circle form-control-feedback l-h-34"></i>
                    </div>
                </div> 
                <div class="form-group text-right m-t-20">
                    <div class="col-xs-12">
                        <button class="btn btn-primary login-btn btn-custom w-md waves-effect waves-light" type="submit">Reset
                        </button>
                    </div>
                </div>
                <div class="form-group m-t-30">
                    <div class="col-sm-7 pl-0">
                        <a href="#/Login" class="text-muted"><i class="fa fa-lock m-r-5"></i> Back to Login</a>
                    </div>                 
                </div>
            </form>
        </div>
    </div>    
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
    }
  }
}
</script>


<style scoped>

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
.forgotInfo{
    font-size: 14px;
}
</style>
