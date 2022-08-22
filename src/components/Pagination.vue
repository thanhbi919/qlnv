<template>
  <paginate

      v-model="pageCurrent"
      :page-count="pageCount"
      :click-handler="handleClick"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination'"
      :page-class="'page-item'"
  >
  </paginate>
</template>
<script>

import Paginate from "vuejs-paginate-next";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Pagination",
  components: {
    paginate: Paginate,
  },
  props: {
    employees: {
      type: Array,
      default: () => {
      },
    },
    pageCount: {
      type: Number,
    },
    modelValue: {
      default: 1,
      type: Number,
    }
  },

  data() {
    return {
      innnerValue: 1
    };
  },
  computed: {
    pageCurrent: {
      get() {
        return this.modelValue;
      },
      set(val) {
        return val
      }
    }
  },

  methods: {

    prePage() {
      const pageCur = this.pageCurrent - 1;
      this.$emit('update:modelValue', pageCur)
      this.handleClick(pageCur);
    },
    nextPage() {
      const pageCur = Number(this.pageCurrent) + 1;
      this.$emit("update:modelValue", pageCur);
      this.handleClick(pageCur);
    },
    handleClick(pageCur) {
      this.$emit("pageChange", pageCur);
      this.$emit('update:modelValue', pageCur)
    }
  },
};
</script>
<style lang="css">


/* Write your own CSS for pagination */

.pagination > .page-item > .page-link {
  color: black;
  background-color: #1abc9c;
}
.pagination > .page-item .active{
  background-color:red;
}



</style>