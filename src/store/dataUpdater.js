const dataUpdater = {
    namespaced: true,
    state: () => ({
        data: [], // 存储API返回的数据
    }),
    mutations: {
        setData(state, newData) {
            state.data = newData;
        }
    },
    actions: {
        fetchData({ commit }) {

        },
        startDataUpdater({ dispatch }) {

        }
    }
};

export default dataUpdater;
