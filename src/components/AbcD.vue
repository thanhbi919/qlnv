<template lang="">
      
<button type="" @click ="prePage" >Prev</button>
<input  v-model = "pageCurrent" type="text" disabled>
<button type="" @click = "nextPage">Next</button>
</template>
<script>

// import Paginate from "vuejs-paginate-next";
export default {
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
      type: Number,
    }
  },
  watch: {
   
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
      const pageCur = Math.ceil(this.pageCurrent) +1;
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
@import "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css";

/* Write your own CSS for pagination */
.pagination {
  display: flex;
}

</style>