import { createStore } from 'vuex'
import general from './modules/general'
import auth from './modules/auth'
import leagues from "@/store/modules/leagues.js";

const store = createStore({ /* options */ })

store.registerModule('auth', auth)
store.registerModule('general', general)
store.registerModule('leagues', leagues)

export default store;
