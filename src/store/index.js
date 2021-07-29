import { createStore } from 'vuex'
import general from './modules/general'
import auth from './modules/auth'

const store = createStore({ /* options */ })

// register a module `myModule`
store.registerModule('auth', auth)
store.registerModule('general', general)
//
// // register a nested module `nested/myModule`
// store.registerModule(['nested', 'myModule'], {
//     // ...
// })

export default store;