<template>
    <b-container fluid class="bv-example-row">      
        <div class="row">
          <div class="col-md-12">
            <div class="col-md-6">
              <h2>{{$ml.with('VueJS').get('menu.Tasks')}}</h2>
            </div>
            <div class="col-md-6">
              <b-btn v-b-modal.modal1>Launch demo modal</b-btn>       
            </div>
          </div>
        </div>
        <div class="contents">
            <b-table :items="items"
                :fields="fields"
                :bordered="true"
                :hover="true"
                :striped="true"
                responsive >
        </b-table>
      <b-modal id="modal1" title="Create Task" hide-footer>
          <TaskCreate></TaskCreate>
      </b-modal>        
      </div>
    </b-container>   
</template>
<script>
import TaskCreate from "./create";

export default {
  name: "AdminTask",
  components: {
    TaskCreate
  },
  data() {
    return {
      fields: [
        { key: "last_name", sortable: true },
        { key: "first_name", sortable: true },
        { key: "age", sortable: true },
        { key: "isActive", sortable: false }
      ],
      items: [
        {
          isActive: true,
          age: 40,
          first_name: "Dickerson",
          last_name: "Macdonald"
        },
        { isActive: false, age: 21, first_name: "Larsen", last_name: "Shaw" },
        { isActive: false, age: 89, first_name: "Geneva", last_name: "Wilson" },
        { isActive: true, age: 38, first_name: "Jami", last_name: "Carney" }
      ]
    };
  }
};
</script>
