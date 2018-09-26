<template>
<div class="row">
 <div class="card border-primary md-2" style="max-width: 13rem;">
  
  <div class="card-body">
    <h4 class="card-title">30</h4>
    <p class="card-text">Tasks created by me</p>
  </div>
</div>
<div class="card border-primary md-2" style="max-width: 13rem;">
  
  <div class="card-body">
    <h4 class="card-title">12</h4>
    <p class="card-text">Approved</p>
  </div>
</div>
<div class="card border-primary md-2" style="max-width: 13rem;">
  
  <div class="card-body">
    <h4 class="card-title">1</h4>
    <p class="card-text">In progress</p>
  </div>
</div>
<div class="card border-primary md-2" style="max-width: 13rem;">
  
  <div class="card-body">
    <h4 class="card-title">1250</h4>
    <p class="card-text">Completed</p>
  </div>
</div>
<div class="card border-primary md-2" style="max-width: 13rem;">
  
  <div class="card-body">
    <h4 class="card-title">15</h4>
    <p class="card-text">Queries awaiting my reply</p>
  </div>
</div>
<div class="card border-primary md-2" style="max-width: 13rem;">
  
  <div class="card-body">
    <h4 class="card-title">58</h4>
    <p class="card-text">Queries awaiting my reply</p>
  </div>
</div>

</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome  Dashboard'
    }
  }
}
</script>

<!-- Add "scoped" attributo limit CSS to this component only -->
<style scoped>
h1, h2 {
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
.card{
  margin: 7px;
  min-width: 13.07rem !IMPORTANT;
}
.card-title{
  text-align: center;
}
.card-text{
  text-align: center;
}
</style>
