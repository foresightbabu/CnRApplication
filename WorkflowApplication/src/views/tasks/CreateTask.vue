<template>
<div class="row">
 <!-- <div class="breadcrumb-area">
   <ol class="breadcrumb ml-15">
  <li class="breadcrumb-item"><a href="#">{{ $ml.with('VueJS').get('common.Home') }}</a></li>
  <li class="breadcrumb-item"><a href="#">{{ $ml.with('VueJS').get('tasks.ModuleName') }}</a></li>
  <li class="breadcrumb-item active">{{ $ml.with('VueJS').get('tasks.CreateTasks') }}</li>
</ol>
 </div> -->
 <div class="container-fluid"> 
   <div class="row">
       <div class="col-md-12">
      <h1>{{ $ml.with('VueJS').get('tasks.CreateTasks') }}</h1>
        <hr />
      <b-container fluid>
    <b-row class="my-1">
      <div class="col-md-12">
        <b-form-group id="fieldsetHorizontal"
                      horizontal
                      :label-cols="3"
                      breakpoint="md"
                      description="Let us know your name."
                      label="Task Group"
                      label-for="TaskGroup">
            <select id="TaskGroup"  class="form-control col-md-8">
            <option v-for="Services in ServicesList" :value="Services.ServicesMasterId" v-bind:ServiceName="Services.ServiceName" > 
               {{Services.ServiceName}}
            </option>
           </select>
      </b-form-group>
    <b-row>
      <b-col cols="2">
          <b-form-group id="fieldsetHorizontal"
                      breakpoint="md"
                      label="Display/ Reference Name"
                      label-for="inputDisplayReferenceName">
        </b-form-group>
      </b-col>
       <b-col cols="1">CPA-002</b-col>  
        <b-col cols="6">
        <b-form-input :v-model="ModelName" type="text" placeholder="Display/ Reference Name" ></b-form-input> 
        </b-col>
      <b-col cols="1">0014</b-col>  
     </b-row>   
      </div>
    </b-row>
     <b-row class="my-1">
      <div class="col-md-12">
        <hr />
         <b-row class="v-form-title"> 
           <span>Mandatory Documents</span>           
         </b-row>
      <b-row class="v-form-inputs" v-for="item in FormData[2]" v-if="item.IsMandatory"> 
      <b-col cols="3">{{item.LableName}}</b-col>
      <b-col cols="6">
<textarea  :placeholder="item.PlaceholderText" v-if="item.IsTextArea === true" class="form-control"></textarea>
<input  :placeholder="item.PlaceholderText" v-else-if="item.IsCheckbox === true"  type="checkbox" class="form-control"/>
<input  :placeholder="item.PlaceholderText" v-else-if="item.IsDatePicker === true"  type="date" class="form-control"/>
<input  :placeholder="item.PlaceholderText" v-else-if="item.IsTimePicker === true"  type="time" class="form-control"/>
<b-form-file accept="image/*" :placeholder="item.PlaceholderText" v-else-if="item.IsFileUpload === true" ></b-form-file>
<input  :placeholder="item.PlaceholderText" v-else class="form-control"/>
 </b-col>
       </b-row>
      </div>
     </b-row>
     <b-row class="my-1">
      <div class="col-md-12">
        <hr />
         <b-row class="v-form-title"> 
           <span>Optional Documents</span>           
         </b-row>
       <b-row class="v-form-inputs" v-for="item in FormData[2]" v-if="!item.IsMandatory"> 
      <b-col cols="3">{{item.LableName}}</b-col>
      <b-col cols="6">
<textarea  :placeholder="item.PlaceholderText" v-if="item.IsTextArea === true" class="form-control"></textarea>
<input  :placeholder="item.PlaceholderText" v-else-if="item.IsCheckbox === true"  type="checkbox" class="form-control"/>
<input  :placeholder="item.PlaceholderText" v-else-if="item.IsDatePicker === true"  type="date" class="form-control"/>
<input  :placeholder="item.PlaceholderText" v-else-if="item.IsTimePicker === true"  type="time" class="form-control"/>
<b-form-file accept="image/*" :placeholder="item.PlaceholderText" v-else-if="item.IsFileUpload === true" ></b-form-file>
<input  :placeholder="item.PlaceholderText" v-else class="form-control"/>
 </b-col>
       </b-row>
  
      </div>
     </b-row>
 
      <b-row class="my-1">
      <div class="col-md-12">
        <hr />
         <b-row class="v-form-title"> 
           <span>Other Documents</span>
         </b-row>
      <b-row class="v-form-inputs"> 
      <b-col cols="2">Document Name</b-col>
      <b-col cols="3"> <b-form-input placeholder="Document Name" v-model="DocumentName"></b-form-input></b-col>
      <b-col cols="1">Document</b-col>
      <b-col cols="3"> <b-form-file accept="image/*"></b-form-file></b-col>
       </b-row>
      </div>
     </b-row>
      <b-row class="my-1">
      <div class="col-md-12">
        <hr />
      <b-row class="v-form-inputs"> 
      <b-col cols="2">Budget</b-col>
      <b-col cols="3"> <b-form-input  v-model="Budget"></b-form-input></b-col> 
      <b-col cols="1">ETA</b-col>
     <b-col cols="3"> <b-form-input  v-model="ETA"></b-form-input></b-col>
       </b-row>
      </div>
     </b-row>
  <b-row class="my-1">
      <div class="col-md-12">
      <b-row class="v-form-inputs"> 
      <b-col cols="2">Note</b-col>
      <b-col cols="7">
        <b-form-textarea id="textarea1"
                     v-model="Note"
                     placeholder="Enter something"
                     :rows="3"
                     :max-rows="6">
    </b-form-textarea>
      </b-col>
       </b-row>
      </div>
     </b-row>

      <b-row class="my-1">
      <div class="col-md-12 text-center mt-5">
       <b-button  variant="info">Submit</b-button>
      </div>
     </b-row>
  </b-container>
   </div>
 </div>
  </div>
</div>
</template>
<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      TaskGroup: '',
      DocumentName: '',
      Budget: '',
      ETA:'',
      ReferenceName:'',
      Note:'',
      PageTitle: "Create Tasks",
      ModelName: "testModel",
      ServicesList:  [  
                          {  
                            "ServicesMasterId":"1",
                            "ServiceName":"Individual Tax Filing",
                            "Description":"Tax filing of individuals",
                            "InitialManagerId":"1"
                          },{  
                            "ServicesMasterId":"2",
                            "ServiceName":"Corporate Tax Filing",
                            "Description":"Tax filing of Corporate",
                            "InitialManagerId":"1"
                          },
                          {  
                            "ServicesMasterId":"3",
                            "ServiceName":"Individual Tax Filing",
                            "Description":"Tax filing of individuals",
                            "InitialManagerId":"1"
                          }
                      ],
      FormData : [  
                      [  
                          {  
                            "ServicesMasterId":"1",
                            "ServiceName":"Individual Tax Filing",
                            "Description":"Tax filing of individuals",
                            "InitialManagerId":"1"
                          }
                      ],
                      [  
                          {  
                            "SubTaskMasterId":"1",
                            "ServiceId":"1",
                            "TaskName":"Document Analysis",
                            "Description":"Analyse all documents and get clarification from client"
                          },
                          {  
                            "SubTaskMasterId":"2",
                            "ServiceId":"1",
                            "TaskName":"Signature from auditor",
                            "Description":"Getting signed from auditor for ready to process"
                          },
                          {  
                            "SubTaskMasterId":"3",
                            "ServiceId":"1",
                            "TaskName":"Filing Incometax",
                            "Description":"Filing tax via online / offline"
                          }
                      ],
                      [  
                          {  
                            "Id":"1",
                            "ServiceId":"1",
                            "FormControlId":"3",
                            "LableName":"Task Group",
                            "PlaceholderText":"Name of the service",
                            "ORDER":999,
                            "NewLineBeforeThis":false,
                            "NewLineAfterThis":false,
                            "IsMandatory":true,
                            "FormControlMasterId":"3",
                            "ControlType":"DROPDOWN",
                            "IsTextBox":false,
                            "IsTextArea":false,
                            "IsDropdown":true,
                            "IsOption":false,
                            "IsCheckbox":false,
                            "IsDatePicker":false,
                            "IsTimePicker":false,
                            "IsFileUpload":false
                          },
                          {  
                            "Id":"2",
                            "ServiceId":"1",
                            "FormControlId":"2",
                            "LableName":"Reference Name",
                            "PlaceholderText":"Display / Reference Name",
                            "ORDER":998,
                            "NewLineBeforeThis":false,
                            "NewLineAfterThis":false,
                            "IsMandatory":true,
                            "FormControlMasterId":"2",
                            "ControlType":"TEXTAREA",
                            "IsTextBox":false,
                            "IsTextArea":true,
                            "IsDropdown":false,
                            "IsOption":false,
                            "IsCheckbox":false,
                            "IsDatePicker":false,
                            "IsTimePicker":false,
                            "IsFileUpload":false
                          },
                          {  
                            "Id":"3",
                            "ServiceId":"1",
                            "FormControlId":"8",
                            "LableName":"Taxform",
                            "PlaceholderText":"Taxform",
                            "ORDER":997,
                            "NewLineBeforeThis":false,
                            "NewLineAfterThis":false,
                            "IsMandatory":true,
                            "FormControlMasterId":"8",
                            "ControlType":"FILEUPLOAD",
                            "IsTextBox":false,
                            "IsTextArea":false,
                            "IsDropdown":false,
                            "IsOption":false,
                            "IsCheckbox":false,
                            "IsDatePicker":false,
                            "IsTimePicker":false,
                            "IsFileUpload":true
                          },
                          {  
                            "Id":"4",
                            "ServiceId":"1",
                            "FormControlId":"8",
                            "LableName":"Salary Certificate",
                            "PlaceholderText":"Salary Certificate",
                            "ORDER":996,
                            "NewLineBeforeThis":false,
                            "NewLineAfterThis":false,
                            "IsMandatory":true,
                            "FormControlMasterId":"8",
                            "ControlType":"FILEUPLOAD",
                            "IsTextBox":false,
                            "IsTextArea":false,
                            "IsDropdown":false,
                            "IsOption":false,
                            "IsCheckbox":false,
                            "IsDatePicker":false,
                            "IsTimePicker":false,
                            "IsFileUpload":true
                          },
                          {  
                            "Id":"5",
                            "ServiceId":"1",
                            "FormControlId":"8",
                            "LableName":"Address Proof",
                            "PlaceholderText":"Address Proof",
                            "ORDER":995,
                            "NewLineBeforeThis":false,
                            "NewLineAfterThis":false,
                            "IsMandatory":false,
                            "FormControlMasterId":"8",
                            "ControlType":"FILEUPLOAD",
                            "IsTextBox":false,
                            "IsTextArea":false,
                            "IsDropdown":false,
                            "IsOption":false,
                            "IsCheckbox":false,
                            "IsDatePicker":false,
                            "IsTimePicker":false,
                            "IsFileUpload":true
                          },
                          {  
                            "Id":"6",
                            "ServiceId":"1",
                            "FormControlId":"8",
                            "LableName":"Other Income Proof",
                            "PlaceholderText":"Other Income Proof",
                            "ORDER":994,
                            "NewLineBeforeThis":false,
                            "NewLineAfterThis":false,
                            "IsMandatory":false,
                            "FormControlMasterId":"8",
                            "ControlType":"FILEUPLOAD",
                            "IsTextBox":false,
                            "IsTextArea":false,
                            "IsDropdown":false,
                            "IsOption":false,
                            "IsCheckbox":false,
                            "IsDatePicker":false,
                            "IsTimePicker":false,
                            "IsFileUpload":true
                          },
                          {  
                            "Id":"7",
                            "ServiceId":"1",
                            "FormControlId":"1",
                            "LableName":"Budget",
                            "PlaceholderText":"Budget for the task",
                            "ORDER":993,
                            "NewLineBeforeThis":false,
                            "NewLineAfterThis":false,
                            "IsMandatory":false,
                            "FormControlMasterId":"1",
                            "ControlType":"TEXTBOX",
                            "IsTextBox":true,
                            "IsTextArea":false,
                            "IsDropdown":false,
                            "IsOption":false,
                            "IsCheckbox":false,
                            "IsDatePicker":false,
                            "IsTimePicker":false,
                            "IsFileUpload":false
                          },
                          {  
                            "Id":"8",
                            "ServiceId":"1",
                            "FormControlId":"6",
                            "LableName":"ETA",
                            "PlaceholderText":"Estimation of completion date",
                            "ORDER":992,
                            "NewLineBeforeThis":false,
                            "NewLineAfterThis":false,
                            "IsMandatory":false,
                            "FormControlMasterId":"6",
                            "ControlType":"DATEPICKER",
                            "IsTextBox":true,
                            "IsTextArea":false,
                            "IsDropdown":false,
                            "IsOption":false,
                            "IsCheckbox":false,
                            "IsDatePicker":true,
                            "IsTimePicker":false,
                            "IsFileUpload":false
                          },
                          {  
                            "Id":"9",
                            "ServiceId":"1",
                            "FormControlId":"2",
                            "LableName":"Notes",
                            "PlaceholderText":"Describe other information here",
                            "ORDER":991,
                            "NewLineBeforeThis":false,
                            "NewLineAfterThis":false,
                            "IsMandatory":false,
                            "FormControlMasterId":"2",
                            "ControlType":"TEXTAREA",
                            "IsTextBox":false,
                            "IsTextArea":true,
                            "IsDropdown":false,
                            "IsOption":false,
                            "IsCheckbox":false,
                            "IsDatePicker":false,
                            "IsTimePicker":false,
                            "IsFileUpload":false
                          }
                      ]
                    ]
     
    };
  }
};
</script>

<!-- Add "scoped" attributo limit CSS to this component only -->
<style scoped>
h1,
h2 {
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
.breadcrumb-area {
  width: 100%;
}
.breadcrumb {
  margin-left: 15px;
}

h1 {
  font-size: 2rem;
}
label {
  font-size: 1.2rem;
}
.v-form-inputs {
    margin-top: 20px;
}
.v-form-title{
  margin-top: 20px;
  font-size: 1.3rem;
}
</style>
