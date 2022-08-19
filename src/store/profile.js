const profile = {
    state() {
        return {
            profile: {},
            role: '1',
        };
    },
    mutations: {
        saveProfile(state, profile) {
            state.profile = profile;
            if (localStorage.getItem('role')) {
                state.role = localStorage.getItem('role');
            }
        },
        clearProfile(state) {
            state.profile = {};
        },
        updatedRole(state) {
            if (state.role == 3) {
                state.role = 3;
            } else {
                state.role++;
                localStorage.setItem('role', state.role);
            }

        }
    },
    actions: {
        saveProfile({ commit }, profile) {
            commit("saveProfile", profile);
        },
        clearProfile({ commit }) {
            commit("clearProfile");
        },
        updatedRole({ commit }) {
            commit("updatedRole");
        },
    }
};
export default profile;