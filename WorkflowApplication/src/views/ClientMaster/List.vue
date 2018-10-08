<template>
    <b-container fluid class="bv-example-row">
        <div class="row">
          <div class="col-md-12">
            <div class="col-md-6">
              <h2>{{$ml.with('VueJS').get('Client.Heading')}}</h2>
            </div>
            <hr />
          </div>
        </div>
        <div class="contents table-grid">
      <b-row class="mb-2">
      <b-col md="4" class="my-1">
        <b-form-group horizontal label="Filter" class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Type to Search" />
            <b-input-group-append>
              <b-btn :disabled="!filter" @click="filter = ''" class="btn-dark"><i class="fa fa-times"></i></b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      
    </b-row>

    <!-- Main table element -->
    <b-table show-empty
             stacked="md"
             :items="items"
             :fields="fields"
             :current-page="currentPage"
             :per-page="perPage"
             :filter="filter"
             :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc"
             :sort-direction="sortDirection">

      <template slot="actions" slot-scope="row">
        <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
        <b-button size="sm" @click.stop="info(row.item, row.index, $event.target)" class="mr-1 btn-dark">
          <i class="fa fa-pencil"></i>
        </b-button>
         <b-button size="sm" @click.stop="deleteRow(row.item, row.index, $event.target)" class="mr-1 btn-dark">
         <i class="fa fa-trash"></i> 
        </b-button>
      </template> 
    </b-table>
    <b-row>
      <b-col md="3" class="my-1">
        <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
      </b-col>
      <b-col md="2" class="my-1">  
          <b-form-select :options="pageOptions" v-model="perPage" class="col-sm-5"/>  
      </b-col>
    </b-row>
      </div>
  <!-- Info modal -->
    <b-modal  ref="Usermodal" id="modalInfo" @hide="resetModal" :title="$ml.with('VueJS').get('Client.Heading')"  hide-footer>
         <ClientForm :form="modalInfo.content" :isEditMode="modalInfo.isEditMode"></ClientForm>
    </b-modal>

    <b-btn v-b-modal.modalInfo class="popup-toggle">
        <span class="fa fa-plus" aria-hidden="true"></span>
    </b-btn>
    </b-container>
</template>
<script>
import Vue from 'vue';
import axios from 'axios';
import ClientForm from './ClientForm';
import { apiUrl } from '../../../vue.config';

Vue.use(require('vue-moment'));

export default {
  name: "ClientList",
  components: {
    ClientForm
  },
  data() {
    return {
      ClientData: [],
      errors: [],
      fields: [
        { key: "ClientName", sortable: true },
        { key: "Address", sortable: true },
        { key: "City", sortable: true },
        { key: "Country", sortable: true },
        { key: "State", sortable: true },
        { key: "IsBlocked", sortable: true },
        { key: 'actions', label: 'Actions' }
      ],
      items: [],
      currentPage: 1,
      perPage: 5,
      totalRows:  50,
      totalRows: 0,
      pageOptions: [ 5, 10, 15 ],
      sortBy: null,
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      modalInfo: { 
        title: '', 
        content: {
          Id: null,
          ClientName:  '',
          Address: '',
          City:'',
          Country: "",
          State: "",
          NoofUsersAllowed:"",
          ApproverId:"",
          CreatedBy:""
        },
        isEditMode : false
      }
    }
  },
    created() {
   this.getClients();
  },
  methods: {
    getClients (){
 axios.get(`${apiUrl}/client`)
    .then(response => {
      this.items = response.data.data;
      this.totalRows = this.items.length;
    })
    .catch(e => {
      this.errors.push(e)
    })
    },
    info (item, index, button) {
      this.modalInfo.title = `Row index: ${index}`
      this.modalInfo.content = item
      this.modalInfo.isEditMode = true
      this.$root.$emit('bv::show::modal', 'modalInfo', button)
    },
     deleteRow (row, index, button) {
      var r = confirm("Are you sure want to delete!");
      if (r == true) {
             
     axios({
        method: 'delete',
        url: `${apiUrl}/client`,
        data: {
        ModifiedBy: this.$session.get('secret').Id,
        ClientId: row.Id
      
        }
      })
    .then(response => {
      this.getClients();
        this.$awn.success(`Record deleted successfully.`)
    })
    .catch(e => {
      this.$awn.alert('An error occurred please try again.');
     // this.errors.push(e)
    })


      } 

     
    },
    resetModal () {
      this.modalInfo.title = ''
      this.modalInfo.content = {
          Id: null,
          ClientName:  '',
          Address: '',
          City:'',
          Country: "",
          State: "",
          NoofUsersAllowed:"",
          ApproverId:"",
          CreatedBy:""          
        }
        this.modalInfo.isEditMode = false
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  }
};
</script>

