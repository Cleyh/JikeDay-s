
const realtime = {
    namespaced: true,
    state: {
        messages: [],
    },
    mutations: {
        addMessage(state, message) {
            state.messages.push(message);
        }
    },
    actions: {
        initializeWebSocket({ commit }) {
            const socket = new WebSocket('wss://api.yoursite.com/stream');

            socket.onmessage = event => {
                const message = JSON.parse(event.data);
                commit('addMessage', message);
            };

            socket.onerror = error => {
                console.error('WebSocket error:', error);
            };

            socket.onclose = () => {
                console.log('WebSocket connection closed');
            };
        }
    }
};

export default realtime;