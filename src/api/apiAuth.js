import Api from "./api"

export default {
    login(payload) {
        return Api.post("/login", payload).then(res => res.data);
    },
    register(payload){
        return Api.post("/register", payload).then(res => res.data);
    },
    logout(){
        return Api.post("/logout");
    }
}