import Vue from "nativescript-vue";
import Home from "./components/Home";
import store from './store';
import routes from "./routes";
import BackendService from "./constants/index";

const backendService = new BackendService();
Vue.prototype.$backendService = backendService;

new Vue({
    template: `
        <Frame>
            <Home />
        </Frame>`,
    store,
    routes,
    components: {
        Home
    },
    render: h => h("frame", [h(backendService.isLoggedIn() ? routes.home : routes.login)])
}).$start();
