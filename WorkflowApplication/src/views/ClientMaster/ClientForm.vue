<template>
    <div class="form">
 <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="ClientName"
                    label="Client Name"
                    label-for="ClientName"
                 >
       <b-form-input id="exampleInput2"
                      type="text"
                      v-model="form.ClientName"
                      required
                      placeholder="Enter name">
        </b-form-input>
      </b-form-group>
       <b-form-group id="ClientName"
                    label="Address"
                    label-for="ClientName"
                 >
       <b-form-textarea id="Address"
                     v-model="form.Address"
                       label="Address"
                     placeholder="Enter Address."
                     :rows="3"
                     :max-rows="6">
    </b-form-textarea>
    </b-form-group>
    <b-form-group id="exampleInputGroup2"
                  label="City:"
                  label-for="City">
      <b-form-input id="City"
                    type="text"
                    v-model="form.City"
                    required
                    placeholder="Enter City">
      </b-form-input>
    </b-form-group>
      <b-row>
      <b-form-group class="col-md-6" id="Country"
                    label="Country:"
                    label-for="Country">
        <b-form-select  id="Country"
                      :options="Country"
                      required
                      v-model="form.Country">
        </b-form-select>
      </b-form-group>
        <b-form-group class="col-md-6" id="State"
                    label="State:"
                    label-for="State">
        <b-form-input  id="State"
                      required
                      v-model="form.State">
        </b-form-input>
      </b-form-group>
      </b-row>
         <b-row>
      <b-form-group class="col-md-6" id="Country"
                    label="Approved by:"
                    label-for="ApproverId">
        <b-form-select  id="ApproverId"
                      :options="ApproverId"
                      required
                      v-model="form.ApproverId">
        </b-form-select>
      </b-form-group>
        <b-form-group class="col-md-6" id="NoofUsersAllowed"
                    label="No of Users Allowed:"
                    label-for="NoofUsersAllowed">
      <b-form-input id="City"
                      type="number"
                      v-model="form.NoofUsersAllowed"
                      required
                     >
        </b-form-input>
      </b-form-group>
      </b-row> 
      <input type="hidden" v-model="form.Id" >
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
import { CountryList } from '../../_helpers/Countries';
Vue.use(VueSession)
export default {
  name: "TaskCreate",
   props: ['form', 'isEditMode'],
  data() {
    return {  
      Country: CountryList,
      ApproverId: [{text: 'vijay',value:0},
      {text: 'babu',value:1}],
      show: true,
     
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
          axios({
        method: this.isEditMode ? 'put' : 'post',
        url: `${apiUrl}/client`,
        data: {
          ClientId: this.form.Id,
          ClientName: this.form.ClientName,
          Address: this.form.Address,
          City: this.form.City,
          State: this.form.State,
          Country: this.form.Country,
          NoofUsersAllowed: this.form.NoofUsersAllowed,
          ApproverId:this.form.ApproverId,
          CreatedBy: this.$session.get('secret').Id
        }
      }).then(response => {
            this.posts = response.data;
           // this.onReset(evt);
            this.$root.$emit('bv::hide::modal', 'modalInfo');
           this.$awn.success(`Record ${this.isEditMode ? 'updated' : 'inserted'} successfully.`)
          })
          .catch(e => {
            this.$awn.alert('An error occurred please try again.');
          })
    },
    onReset(evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.ClientName = "";
      this.form.Address = "";
      this.form.City = null;
      this.form.Country = '';
      this.form.State = '';
      this.form.ApproverId = '';
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>

