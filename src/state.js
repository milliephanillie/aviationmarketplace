import Cookies from "js-cookie";
import {Routes, ProtectedRoutes} from "./components/Routes";

const from = Cookies.get("location-from");

const state = {
    loggedIn: false,
    user: {
        ID: null,
        posts: null,
    },
    token: "wp-token",
    location:  {
        from: (from != "undefined" && from !== "/logout.html" && from !== "/login.html") ? Cookies.get("location-from") : Routes.home,
        home: Routes.home,
    },
    currentPath: window.location.pathname,
    aircraftSingle: null,
    aircraft: null,
    restUrl: "https://staging.flyingmag.com/wp-json/",
    siteName: "Aviation Marketplace by FLYING",
    siteDescription: "Aviation marketplace",

}

const setState = (toSet, newValue) => {
    state[toSet] = newValue;
}

export {state, setState};
