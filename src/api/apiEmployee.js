import Api from "./api"

export default {
    getEmployee() {
        return Api.get("/employee").then(res => res.data);
    },
    getDepartment(){
        return Api.get("/department").then(res => res.data.items);
    },
    getTitle(){
        return Api.get("/title").then(res=>res.data);
    },
    getEmployeeById(id){
        return Api.get(`/employee/${id}`).then(res=>res.data);
    },
    updateEmployee(id, payload){
        return Api.post(`/employee/${id}`, payload).then(res=>res.data);
    },
    deleteEmployee(id){
        return Api.delete(`/employee/${id}`).then(res=>res.data);
    },
    createEmployee(payload){
        return Api.post("/employee", payload).then(res=>res.data);
    }
    
}