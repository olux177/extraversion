<template>
  <section class="section">
    <form>
      <FormCompo 
        :title="title" 
        :fields="[{name:'gop'}]" 
        :formData="formData"
        :apiData="apiData"
        :rules="formFields.rules"
        :submitForm="submitForm" />
    </form>
  </section>
</template>

<script>
import {formsData} from "~/api/form";
import FormCompo from '~/components/Form'

export default {
  name: 'HomePage',

  components: {
    FormCompo
  },
  data:()=>({
    formFields:{},
    formData:{},
    title:'A	dynamic	form	rules	engine',
    apiData:formsData
  }),
  mounted(){
    const form = JSON.stringify(formsData);
    this.formFields = JSON.parse(form);
  },
  methods:{
    submitForm(){
      console.log(this.formData);
      
    }
  }
}
</script>
