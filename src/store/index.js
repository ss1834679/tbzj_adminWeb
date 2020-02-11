import Vue from 'vue'
import Vuex from 'vuex'
import { getLogin } from '../api/log'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userinfo: {},
    loginState: false,
    activeName: "index-menu",
    base_url: "http://ot50yo4tk8.52http.net/fileserver/file/",
  },
  mutations: {
    GETLOGIN: (state, obj) => {
      state.userinfo = obj;
      state.loginState = true;
    },
    change: (state, sta) => {
      state.loginState = sta
    },
    changePath: (state, active) => {
      state.activeName = active
      console.log(state.activeName);
    }
  },
  actions: {
    an(context, sta) {
      context.commit("change", sta)
    },
    getlogin({
      commit
    }, {
      obj,
      callback1
    }) {
      // getLogin(obj).then((data) => {
      //   console.log(data);
      //   if (data.status == 0) {
      //     commit('GETLOGIN', data)
      //     localStorage.setItem("username", data.username);
      //     localStorage.setItem("userid", data.uid);
      //     localStorage.setItem("loginState", true);
      //     callback1()
      //   } else {
      //     callback2("登录失败")
      //   }
      // })
      getLogin(obj)
      commit('GETLOGIN', { username: obj.username, uid: "123" })
      localStorage.setItem("username", obj.username);
      localStorage.setItem("userid", "123");
      localStorage.setItem("loginState", true);
      callback1()
    },
    // getlogin({commit},{obj,callback1,callback2}){
    //   getLogin(obj).then((data)=>{
    //     if (data.data.status==0) {
    //       callback1()
    //       commit('GETLOGIN',data.data)
    //     }else{
    //       callback2(data.data.msg)
    //     }
    //   })
    // }
  },
  modules: {}
})