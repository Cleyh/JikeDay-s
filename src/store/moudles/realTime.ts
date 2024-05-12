import { Module } from 'vuex';
import { RealTimeState } from '../types';

const realTime: Module<RealTimeState, any> = {
    namespaced: true,
    state: {
        messages: [],
    },
    mutations: {
        addMessage(state, message: any) {
            state.messages.push(message);
        }
    },
    actions: {
        initializeWebSocket({ commit }) {
            const socket = new WebSocket('wss://api.yoursite.com/stream');

            socket.onmessage = (event: MessageEvent) => {
                const message = JSON.parse(event.data);
                commit('addMessage', message);
            };

            socket.onerror = (error: Event) => {
                console.error('WebSocket error:', error);
            };

            socket.onclose = () => {
                console.log('WebSocket connection closed');
            };
        }
    }
};

export default realTime;
