import { createStore } from 'vuex';

const store = createStore({
  state: {
    loggedInUser: "ログイン",
  },
  mutations: {
    setLoggedInUser(state, user) {
      state.loggedInUser = user;
    },
  },
});

export default store;