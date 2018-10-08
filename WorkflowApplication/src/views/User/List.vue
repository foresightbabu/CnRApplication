<template>
    <b-container fluid class="bv-example-row">      
        <div class="row">
          <div class="col-md-12">
            <div class="col-md-6">
              <h2>{{$ml.with('VueJS').get('User.Heading')}}</h2>
            </div>
            <hr />
          </div>
        </div>
        <div class="contents">
          <table class="table table-bordered">
      <thead>
        <tr>
         <th>#</th>
         <th>Name</th>
         <th>Username</th>
         <th>Email-Id</th>
         <th >Client Name</th>
         <th></th>
         <!-- <th>Created On</th> -->
         <th class="text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value, key) in UserData">
         <td>{{key+1}}</td>
         <td>{{value.Name}}</td>
         <td>{{value.Username}}</td>
         <td>{{value.EmailId}}</td>
        <td >{{value.ClientName}}</td>
         <td  class="text-center"><i class="fa fa-unlock fa-lg"  v-if="!value.IsBlocked"></i> 
         <i class="fa fa-lock fa-lg" v-else></i>
         </td>       
         <!-- <td>{{ value.CreatedOn | moment("DD-MM-YYYY, h:mm:ss a") }}</td> -->
         <td class="text-center"><a href="#!"><i class="fa fa-edit fa-lg"></i></a> | <i class="fa fa-trash fa-lg" ></i> </td>
         </tr> 
      </tbody>
      </table>
      <b-modal  id="modal1" :title="$ml.with('VueJS').get('User.Heading')" hide-footer>
          <Form></Form>
      </b-modal>        
      </div>
        <b-btn v-b-modal.modal1 class="popup-toggle">  
            <span class="fa fa-plus" aria-hidden="true"></span>
        </b-btn>    
  <ul v-if="data && data.length">
    <li v-for="post of data">
      <p><strong>{{post.Name}}</strong></p>
      <p>{{post.EmailId}}</p>
    </li>
  </ul>
    </b-container>   
</template>
<script>
import Vue from 'vue';
import axios from 'axios';
import Form from './Form';
import { apiUrl } from '../../../vue.config';
Vue.use(require('vue-moment'));

export default {
  name: "ClientList",
  components: {
    Form
  },
  data() {
    return {
      UserData: [],
      errors: []
    }
  },
    created() {
    axios.get(`${apiUrl}/users`)
    .then(response => {
      // JSON responses are automatically parsed.
      this.UserData = response.data.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
};
  
</script>

