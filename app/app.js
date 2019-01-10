import Vue from "nativescript-vue";
import Home from "./components/Home";
import store from './store';
import routes from "./routes";
import BackendService from "./constants/index";
import { isAndroid, isIOS } from 'tns-core-modules/platform';
// import { Mapbox, MapboxView } from "nativescript-mapbox";
// import { Directions } from "nativescript-directions";
// Vue.use(Mapbox)
// Vue.use(MapboxView)
// Vue.use(Directions)

Vue.prototype.$isAndroid = isAndroid;
Vue.prototype.$isIOS = isIOS;

const backendService = new BackendService();
Vue.prototype.$backendService = backendService;

import { TNSFontIcon, fonticon } from './nativescript-fonticon';
TNSFontIcon.debug = false;
TNSFontIcon.paths = {
    'fa': './fonts/font-awesome.css',
    'ion': './fonts/ionicons.css',
};
TNSFontIcon.loadCss();
Vue.filter('fonticon', fonticon);

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
