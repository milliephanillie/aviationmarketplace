import Cookies from "js-cookie";
import {Routes, ProtectedRoutes, LoginRoutes} from "./components/Routes";

const from = Cookies.get("location-from");

const state = {
    loggedIn: false,
    user: {
        ID: null,
        posts: null,
    },
    token: "wp-token",
    location:  {
        from: (from != "undefined" && (Object.values(LoginRoutes).indexOf(from)) < 0) ? Cookies.get("location-from") : Routes.home,
        home: Routes.home,
    },
    currentPath: window.location.pathname,
    aircraftSingle: null,
    aircraft: null,
    restUrl: "https://dev.flying/wp-json/",
    siteName: "Aviation Marketplace by FLYING",
    siteDescription: "Aviation marketplace",
    siteUrl: "http://localhost:8080/",
}

const setState = (toSet, newValue) => {
    state[toSet] = newValue;
}

export {state, setState};
