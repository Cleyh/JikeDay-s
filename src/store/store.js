import { createStore } from 'vuex';
import auth from '@/store/auth.js';
import realTime from '@/store/realtime.js';
import dataUpdater from "@/store/dataUpdater.js";
import globalRepository from "@/store/globalRepository.js";

export default createStore({
    modules: {
        auth,
        realTime,
        dataUpdater,
        globalRepository
    }
});
