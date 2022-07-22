import Cookies from "js-cookie";
import {Routes, ProtectedRoutes} from "./components/Routes";

const state = {
    loggedIn: false,
    user: null,
    token: "wp-token",
    location:  {
        from: Cookies.get("location-from") != "undefined" ? Cookies.get("location-from") : Routes.home,
        home: Routes.home,
    },
    currentPath: window.location.pathname,
    aircraftSingle: null,
    aircraft: null,
    restUrl: "https://dev.flying/wp-json/",
    siteName: "Aviation Marketplace by FLYING",
    siteDescription: "Aviation marketplace",
}

const setState = (toSet, newValue) => {
    state[toSet] = newValue;
}

export {state, setState};
