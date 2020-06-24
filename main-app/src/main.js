import Vue from "vue";
import { registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start } from "qiankun";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import subApps from "./subapp.config";

Vue.config.productionTip = false;

let app = null;

function render ({ loading }) {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  } else {
    app.loading = loading;
  }
}

/**
 * Step1 初始化应用（可选）
 */
render({ loading: true });

const loader = loading => render({ loading });

/**
 * Step2 注册子应用
 */

registerMicroApps(
  [...subApps.map(item => ({ ...item, loader }))],
  {
    beforeLoad: [
      app => {
        console.log("[LifeCycle] before load %c%s", "color: green;", app.name);
      }
    ],
    beforeMount: [
      app => {
        console.log("[LifeCycle] before mount %c%s", "color: green;", app.name);
      }
    ],
    afterUnmount: [
      app => {
        console.log("[LifeCycle] after unmount %c%s", "color: green;", app.name);
      }
    ]
  }
);

// const { onGlobalStateChange, setGlobalState } = initGlobalState({
//   user: "qiankun"
// });

// onGlobalStateChange((value, prev) => console.log("[onGlobalStateChange - master]:", value, prev));

// setGlobalState({
//   ignore: "master",
//   user: {
//     name: "master"
//   }
// });

/**
 * Step3 设置默认进入的子应用
 */
setDefaultMountApp("/vue/");

/**
 * Step4 启动应用
 */
start();

runAfterFirstMounted(() => {
  console.log("[MainApp] first app mounted");
});
