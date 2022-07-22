import axios from "axios";
import Cookies from "js-cookie";
import formurlencoded from "form-urlencoded";
import {Routes, ProtectedRoutes} from "./Routes";

import {state, setState} from "../state";
import {getEl, createEl} from "../helpers";
import {loginBtn, logoutBtn, loginForm, loginFormButton, username, password, loginError} from "../config";

import {init as Posts} from "./Posts";
import {updateLogin} from "./Header";

/**
 * Initializes Login or lougout processes
 */
export function init() {
    console.log(state)
    if (Cookies.get(state.token) === undefined) {
        console.log("logged out");
        logout();
        if (getEl(loginForm)) {
            initLogin();
        }
    } else {
        console.log("logged in");
        login();
        if (getEl(logoutBtn)) {
            initLogout();
        }
    }

    initLoginRedirect();
}

/**
 * Sets the current location from state to the homepage if it was set as the login page at some point
 */
export function initLoginRedirect() {
    if (state.loggedIn) {
        return;
    }

    let redirectPath = window.location.pathname;
    redirectPath = (redirectPath != Routes.login) ? redirectPath : Routes.home;

    Cookies.set("location-from", redirectPath, {
        secure: true
    });

    setState(location.from, redirectPath);
}

/**
 * Handles the login  process
 */
export function login() {
    setState("loggedIn", true);

    document.body.classList.add('mp-logged-in');

    updateLogin();
}

/**
 * Handles the logout  process
 */
export function logout() {
    setState("loggedIn", false);

    document.body.classList.remove('mp-logged-in');

    updateLogin();
}

/**
 * Event handler, adds a submit listener to the login form that gets a JWT token, a user, a list of user posts, and then sets the loggin, token, and user states.
 */
export function initLogin() {
    getEl(loginForm).addEventListener("submit", event => {
        event.preventDefault();

        console.log("submitted login");


        const creds = {
            username: getEl(username).value,
            password: getEl(password).value,
        }

        if (!creds.username || !creds.password) {
            loginErrorMsg(loginError, "Please enter a username and password.");

            return;
        }

        getEl(loginFormButton).classList.add('loading');

        clearHTML(loginError);

        const sendAuthRequest = async () => {
            try {
                let namespace = "marketplace/v1/";
                let route =  "get_user";

                const authResponse = await axios({
                    method: "post",
                    url: state.restUrl + "jwt-auth/v1/token",
                    data: formurlencoded(creds),
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    timeout: 3000,
                })
                    .then(response => {
                        if (200 === response.status) {
                            Cookies.set(state.token, response.data.token, {
                                expires: 1,
                                secure: true
                            });

                            console.log(response)

                            init();
                        } else {
                            loginErrorMsg(loginError, "Oops, that wasn't a match.");
                        }

                        setState("user", creds.username);

                        //location();
                        getEl(loginFormButton).classList.remove('loading');
                    })
            } catch (error) {
                //TODO: better error handling
                console.error(error)
                loginErrorMsg(loginError, "Oops, that wasn't a match.");
                getEl(loginFormButton).classList.remove('loading');
            }
        }

        //TODO: hit a route for better logging out

        if( state.user == creds.username ) {

            const sendUserRequest = async () => {
                try {
                    let namespace = "marketplace/v1/";
                    let route =  "get_user";

                    let response = axios.get({
                        method: "get",
                        url: state.restUrl + namespace + route,
                    });

                    console.log("thheeeee     user");
                    console.log(response);
                } catch (error) {
                    //TODO: better error handling
                    console.error(error)
                    loginErrorMsg(loginError, "Oops, that wasn't a match.");
                    getEl(loginFormButton).classList.remove('loading');
                }
            }

        }

        sendAuthRequest();
        sendUserRequest();
    });
}

/**
 * Initialize the logout process
 */
export function initLogout(el) {
    let element = el || getEl(logoutBtn);

    element.addEventListener("click", event => {
        event.preventDefault()

        Cookies.remove(state.token, {secure: true});
        init();
    });
}

/**
 * Displays an error message when failed login attempts happen
 *
 * @param el
 * @param msg
 */
export function loginErrorMsg(el, msg, remove  = false) {
    if (!msg) {
        let msg = "There was an error";
    }

    let icon = '<i class="fa-solid fa-circle-exclamation"></i>';

    getEl(el).innerHTML = "<p>" + icon + " " + msg + "</p>";
}

/**
 * Handles the redirect after login
 */
export function location() {
    if (state.location.from == Routes.login) {
        return;
    }

    if (state.location.from) {
        window.location.href = state.location.from;
        return;
    }

    if (Cookies.get("location-from")) {
        window.location.href = Cookies.get("location-from");
        return;
    }
}

/**
 * Check to see if user is authenticated
 * @returns {string}
 */
export function isAuth() {
    if (state.loggedIn) {
        return true;
    }
}

/**
 * Mainly to clear the error messages (usually before having to call another one)
 *
 * @param el
 */
export function clearHTML(el) {
    if (el) {
        getEl(el).innerHTML = '';
    }
}
