export default {
    data() {
      return {
         /* data */
         }
    },
    methods: {
        formatDate(date) {
          return  date.replaceAll("-", "/");
        }
    },
}