import Api from "@/untils/request";

export default {
    getProfile() {
        return Api.get("/profile");
    },
    getEmployee(page) {
        return Api.get(`/employee?page_size=5&page=${page}`);
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