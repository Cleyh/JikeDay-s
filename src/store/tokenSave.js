const tokenSave={
    state: {
        token: null,
        email: null,
    },
    mutations: {
        SET_TOKEN(state,token) {
            state.token = token;
        },
        SET_EMAIL(state,email) {

            state.email=email;
        },
    },
    actions: {
        setToken({ commit }, token) {
            commit('SET_TOKEN', token);
        },
        setEmail({ commit }, email){
            commit('SET_EMAIL',email);
        }
    },

};

export default tokenSave