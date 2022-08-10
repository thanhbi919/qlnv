<template lang="">
      
<button type="" @click ="prevPage">Prev</button>
<input  v-model = "pageCurrent" type="text">
<h3>{{pageCurrent}}</h3>
<button type="" @click = "pageCurrent++">Next</button>
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
    page:{
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
        return this.page  || this.innnerValue;
      },
      set(val){
        console.log("val",this.page);
        this.$emit("input",val);
      }
    }
  },
  methods: {
   prevPage(){
      this.$emit('input', this.pageCurrent++);
   },
    // clickHandler(page) {
    //   // console.log("pageCount", this.pageCount);
    //   // console.log("page",page);
    //   // this.$emit("pageChange", page);
    //   this.pageCurrent = page;
    // },
  },
};
</script>
<style lang="css">
@import "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css";

/* Write your own CSS for pagination */
.pagination {
  display: flex;
}
.page-item {
}
</style>