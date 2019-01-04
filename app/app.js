import Vue from "nativescript-vue";
import Home from "./components/Home";
import ActivityList from "./components/ActivityList";
import store from './store';
import routes from "./routes";
import BackendService from "./constants/index";

const backendService = new BackendService();
Vue.prototype.$backendService = backendService;

new Vue({
    template: `
        <Frame>
            <ActivityList />
        </Frame>`,
    store,
    routes,
    components: {
        ActivityList
    },
    // render: h => h("frame", [h(backendService.isLoggedIn() ? routes.home : routes.login)])
}).$start();
