import axios from "axios";

import {state, setState} from "../state";
import {getEl} from "../helpers";
import {siteName, siteDescription, userLogin, logoutBtn, loginForm} from "../config";
import {isAuth, initLogout} from "./Authentication";

import {LoggedOutLink, LoggedInLink} from "./html/Login";
import {Routes} from "./Routes";


export function init() {
    updateLogin();

    axios
        .get(state.restUrl)
        .then(({data: apiInfo}) => {
            /**
             * TODO: This is where we will set site options
             */
            setState("siteName", apiInfo.name);
            setState("siteDescription", apiInfo.description);
            update();
        })
        .catch(error => {
            console.error((error))
        });
}


export function update() {
    /**
     * TODO  update any site options
     */
}

export function updateLogin() {
    console.log("update login")
    if( ! getEl(loginForm) ) {
        console.log("update inner login")
        let loginHtml = (isAuth()) ? LoggedInLink : LoggedOutLink;

        getEl(userLogin).innerHTML = loginHtml;
        let logoutListener = getEl(userLogin).querySelector('#logoutBtn');
        console.log("logoutListener");
        console.log(logoutListener);
        initLogout(logoutListener);
    }
}
