<template>
    <div class="form">
 <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="Name"
                    label="Name"
                    label-for="Name"
                 >
       <b-form-input id="input1"
                      type="text"
                      v-model="form.Name"
                      required
                      placeholder="Enter Name">
        </b-form-input>
      </b-form-group>
       <b-form-group id="Username"
                    label="Username"
                    label-for="Username"
                 >
       <b-form-input id="InputUsername"
                     v-model="form.Username"
                       label="Username"
                     placeholder="Enter Username"
                     >
    </b-form-input>
       </b-form-group>
      <b-form-group id="Password"
                    label="Password:"
                    label-for="Password">
        <b-form-input id="inputPassword"
                      type="text"
                      v-model="form.Password"
                      required
                      placeholder="Enter Password">
        </b-form-input>
      </b-form-group>
        <b-form-group id="EmailId"
                    label="Email-Id:"
                    label-for="EmailId">
        <b-form-input id="inputEmailId"
                      type="email"
                      v-model="form.EmailId"
                      required
                      placeholder="Enter Email-Id">
        </b-form-input>
      </b-form-group>  
      <b-form-group id="CreatedBy"
                    label="Created by"
                    label-for="CreatedBy">
        <b-form-select  id="CreatedBy"
                      :options="Country"
                      required
                      v-model="form.CreatedBy">
        </b-form-select>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    </div>
</template>
<script>
import Vue from 'vue';
import axios from 'axios';
import { apiUrl } from '../../../vue.config';
import VueSession from 'vue-session';
Vue.use(VueSession)
export default {
  name: "UserForm",
  props: ['form'],
  data() {
    return {
      form: {
        EmailId: "",
        Nmae: "",
        Username:"",
        Password:""
      },
      Country: [
        { text: "Select One", value: null },
        "Carrots",
        "Beans",
        "Tomatoes",
        "Corn"
      ],
      show: true
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      axios({
        method: 'post',
        url: `${apiUrl}/users`,
        data: {
        Name: form.Name,
        ClientId: "17",
        Username: form.Username,
        Password: form.Password,
        PasswordSalt: "",
        UserType: this.$session.get('secret').UserType,
        EmailId: form.EmailId,
        CreatedBy: this.$session.get('secret').UserType
        }
      }).then(response => {
            this.posts = response.data
          })
          .catch(e => {
            this.errors.push(e)
          })
    },
    onReset(evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.Username = "";
      this.form.Password = "";
      this.form.EmailId = "";
      this.form.checked = [];
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>

