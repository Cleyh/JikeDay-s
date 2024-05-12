const dataController = {
    namespaced: true,
    state: {
        data: []
    },
    mutations: {
        setData(state, newData) {
            state.data = newData;
        }
    },
    actions: {

    }
}
export default dataController;