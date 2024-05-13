import { createStore } from 'vuex';
import auth from '@/store/auth.js';
import realTime from '@/store/realtime.js';
import dataUpdater from "@/store/dataUpdater.js";
import dataController from "@/store/dataController.js";
import tokenSave from "@/store/tokenSave.js";
export default createStore({
    modules: {
        auth,
        realTime,
        dataUpdater,
        dataController,
        tokenSave
    }
});
