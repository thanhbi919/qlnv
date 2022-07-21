<template lang="">
       <paginate
       v-model="page"
        :page-count="pageCount"
        :click-handler="clickHandler(page)"
        :prev-text="'Prev'"
        :next-text="'Next'"
>
</paginate>
</template>
<script>
import Paginate from "vuejs-paginate-next";
export default {
  components: {
    paginate: Paginate,
  },
  props: {
    employees: {
      type: Array,
      default: () => {},
    },
  },
  watch: {
    employees: function (newVal) {
        console.log("employees",newVal.length);
      this.pageCount= Math.ceil(newVal.length/2);
    },
  },
  data() {
    return {
      pageCount: 0,
      page: 1,
    };
  },
  methods: {
    clickHandler(page) {
      this.page = page;
      console.log("page",page);
      this.$emit("pageChange", page);
    },
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