import Vue from 'vue'
import Vuex from 'vuex'
import currentUser from './modules/current-user'

Vue.use(Vuex)

const store = new Vuex.Store({
  mutations:{

  },
  actions:{

  },
  modules:{
    currentUser
  }
})

export default store
