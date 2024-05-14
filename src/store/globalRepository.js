const globalRepository = {
    namespaced: true,
    state: {
        serverUrl: String,
    },
    mutations: {
        setServerUrl(state, url) {
            state.data = url;
        }
    },
    getter: {
        serverUrl(){
            return this.serverUrl();
        }
    },
    actions: {
    }
}
export default globalRepository;