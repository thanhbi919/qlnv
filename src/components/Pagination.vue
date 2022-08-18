<template lang="">
      
<button v-if = "pageCurrent != 1" ref="prePage" type="" @click ="prePage" >Prev</button>
<input  v-model = "pageCurrent" type="text" disabled>
<button v-if = "pageCurrent!=pageCount" ref = "nextPage" type="" @click = "nextPage">Next</button>
</template>
<script>

// import Paginate from "vuejs-paginate-next";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Pagination",
  components: {
    // paginate: Paginate,
  },
  props: {
    employees: {
      type: Array,
      default: () => {},
    },
    pageCount:{
      type: Number,
    },
    modelValue:{
      default: 1,
      type: Number,
    }
  },

  data() {
    return {
      innnerValue: 1
    };
  },
  computed:{
    pageCurrent:{
      get(){
        return this.modelValue ;
      },
      set(val){
        return val
      }
    }
  },
 
  methods: {
   
   prePage(){
    const pageCur = this.pageCurrent -1;
    this.$emit('update:modelValue',pageCur)
     this.handleClick(pageCur);
   },
    nextPage(){
      const pageCur = Number(this.pageCurrent) +1;
      this.$emit("update:modelValue",pageCur);
      this.handleClick(pageCur);
      },
    handleClick(pageCur){
      this.$emit("pageChange",pageCur);
    }
  },
};
</script>
<style lang="css">


/* Write your own CSS for pagination */
.pagination {
  display: flex;
}

</style>