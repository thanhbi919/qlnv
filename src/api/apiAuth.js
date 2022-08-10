import Api from "@/untils/request";

export default {
    login(payload) {
        console.log("process: ", process.env);
        return Api.post("/login", payload).then(res => res.data);
    },
    register(payload){
        return Api.post("register", payload).then(res => res.data);
    },
    logout(){
        return Api.post("/logout");
    }
}