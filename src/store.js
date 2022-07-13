import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            profile: {},
        };
    },
    mutations: {
        saveProfile(state, profile) {
            state.profile = profile;
        },
        clearProfile(state) {
            state.profile = {};
        }

    },
    actions:{
        saveProfile({commit}, profile){
            commit("saveProfile", profile);
        },
        clearProfile({commit}){
            commit("clearProfile");
        }
    }
    }
);

export default store;