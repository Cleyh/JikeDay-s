import { createStore } from 'vuex';
import auth from './modules/auth';
import realTime from './modules/realTime';

const store = createStore({
    modules: {
        auth,
        realTime
    }
});

export default store;
