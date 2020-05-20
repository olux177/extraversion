<template>
  <section>
    <h2>{{title}}</h2>
    <!-- <b-field label="Select form type">
        <b-radio-button v-model="buefy"
            native-value="yes"
            type="is-info">
            <span>buefy</span>
        </b-radio-button>

        <b-radio-button v-model="buefy"
            native-value="no">
            <b-icon icon="check"></b-icon>
            <span>html</span>
        </b-radio-button>
    </b-field> -->

    <form  @submit.prevent="submitForm">
      <div v-for="(item,index) in fields" :key="index">
        <label>{{item.label}}</label>
        <div v-if="item.type==='radio'">          
          <div  v-for="(option) in item.options" 
              :key="option">
            <h5>{{option}}</h5>
            <input 
              v-model="formData[item.name]"
              :value="option" 
              :type="item.type" 
              @input="inputUpdate($event,item)" />
          </div>
        </div>

        <div v-else>
          <input 
            v-model="formData[item.name]" 
            :type="item.type" 
            class="input"
            @input="inputUpdate($event,item)" 
            v-on:blur="inputUpdate($event,item)"/>
        </div>
        <div class="error" v-if="errors[item.name]">
          {{errors[item.name][0]}}
        </div>  
      </div>
      <button 
        class="button submit" 
        type="submit"
        :disabled="!valid">Submit form
      </button>
    </form> 
    {{formData}}
  </section>
</template>

<script>
import {formsData} from "~/api/form";
export default {
  props:{
    // fields:Array,
    // rules:Array,
    apiData:Object,
    title:String,
    formData:Object,
    submitForm:Function
  },

  data:()=>({
    valid:false,
    formData1:{},
    errors:{},
    buefy:'yes',
    fields:[],
    rules:[]
  }),

  mounted(){  
    const form = JSON.stringify(this.apiData);
    const parseData  = JSON.parse(form);
    this.fields =parseData.fields
    this.rules =parseData.rules
    
    this.fields.forEach((field)=>{
      this.validate(field,this.rules,'')              
    })
  },

  methods:{
    validate(field,rules,value){
      rules.forEach((item)=>{
        if (field.name === item.on) {
          this.errors[field.name]=[]
          if(item.required){      
            if (value.length === 0) {      
              this.errors[field.name].push(`${field.name} require a value`)
            }
          }
          if (item.on==='email') {
            var pattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm
            let valid = pattern.test(value);
            if (!valid) {
               this.errors[field.name].push(`${field.label} value is not valid`)
            }
          }
          else if(item.gte){            
            const age = parseInt(this.formData[item.from])
            if (age<item.gte) {
              this.errors[field.name].push(`not old enough`)
            }
          }
          else if(item.match){
            const val = parseInt()
            if (value !== this.formData[item.from]) {
              this.errors[field.name].push(`${field.name} value does not match ${item.from} value`)
            }
          } 
          this.validateForm()
        }
      })
    },
    validateForm(){      
      const valid = Object.entries(this.errors).map((item)=>{
        if (item[1].length>0) {
          return false
        } else {
          return true              
        }          
      })
      if(valid.includes(false)){
        this.valid = false       
      }
      else{
        this.valid = true 
      }
    },
    inputUpdate(event,item){
      this.validate(item,this.rules,event.target.value)
    },
    inputUpdate1(value,item){
      this.validate(item,this.rules,event.target.value)
    }
  }
}
</script>

<style scoped>
  .error{
    color: crimson;
    font-size: 10px;
  }
  label{
    display: block;
    font-size: 16px;
    font-weight: 900;
  }
  h2{
    text-transform: capitalize;
    font-size: 20px;
    font-weight: 600;
  }
  .input{
    width: 100%;
    box-sizing:border-box;
    padding: 10px;
  }
  form{
    padding: 10px;
  }
  .submit{
    background-color: rgb(3, 114, 17);
    color:darkgrey;
    font-size: 18px;    
    text-transform: uppercase;
  }
</style>