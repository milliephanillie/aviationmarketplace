import axios from "axios";

import {accountListings, loginError, loginFormButton} from "../config";

import {state, setState} from "../state";
import {getEl, createEl} from "../helpers";
import {loginErrorMsg} from "./Authentication";

export function init(event: any) {
    if (event) event.preventDefault();

    addEventListeners();
    getAccountListings(state.user.ID, 'aircraft,real_estate', 'any');
}

export function addEventListeners() {

    console.log("addeventt");
    let listingFilters = document.querySelectorAll(".listings-nav-item");

    listingFilters.forEach(filter => {
        filter.addEventListener("click", event => {
            event.preventDefault()
            console.log("we clicked an inner filter")
            console.log(this.getAttribute('data-filter'));
        })
    });
}

export function getAccountListings(user_id: number, post_type: string, post_status: string) {
    console.log("getAccountListings");
    let namespace = "marketplace/v1/";
    let route = "get_account_listings";
    let restUrl = state.restUrl + namespace + route;
    let url = restUrl + "?user_id" + user_id + "&post_status=" + post_status + "&post_type=" + post_type;

    const sendListingsRequest = async () => {
        try {
            const listingsResponse = await axios.get(url)
                .then(response => {
                    console.log("response one");
                });
        } catch (error) {
            //TODO: better error handling
            console.error(error)
            loginErrorMsg(loginError, "Error.");
            getEl(loginFormButton).classList.remove('loading');
        }
    }
}

export function render() {

}
