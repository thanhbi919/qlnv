const employee = {
    namespace:true,
    state(){
       return {
           listEmployee:{}
       }
    },
    mutations:{
        SAVE_EMPLOYEES(state,employees){
            state.listEmployee = employees;
        }
    },
    actions:{
        saveEmployees({commit},employees) {
            commit("SAVE_EMPLOYEES",employees);
        }
    }

}
export default employee