import axios from "axios";
import {
    accountListingsMount,
    accountListingsNav, listingsError,
    loginError,
    loginFormButton
} from "../config";

import {state, setState} from "../state";
import {getEl, createEl} from "../helpers";
import {loginErrorMsg} from "./Authentication";
import Cookies from "js-cookie";
import {templateAccountListings} from "./html/templateAccountListings";
import { Post } from "../interfaces/Post";
import {loading} from "./Loading";

export function init(event: any) {
    if (event) event.preventDefault();

    let listingFilters = document.querySelectorAll(".listings-nav-item");

    if(listingFilters) {
        doListingFilters();
    }
}

export function doListingFilters() {
    const listingFilters = document.querySelectorAll(".listings-nav-item");
    const user_id = Cookies.get('user_id');



    //TODO: switch from cookie to something else for capturaing user id
    if (! user_id ) {
        let user_id = getEl(accountListingsNav).getAttribute('data-user-id');
    }

    getAccountListings(parseInt(user_id), 'publish');

    listingFilters.forEach(filter => {
        filter.addEventListener("click", event => {
            event.preventDefault();

            let target = event.target as HTMLInputElement;

            listingFilters.forEach(filter => {;
                filter.classList.remove('active')
            });

            target.classList.add('active');

            let post_status = target.getAttribute('data-filter');

            getAccountListings(parseInt(user_id), post_status);
        })
    });
}

export function getAccountListings(user_id: number, post_status: string) {
    console.log("getAccountListings");
    let namespace = "marketplace/v1/";
    let route = "get_account_listings";
    let url = state.restUrl + namespace + route;

    clearAccountListings();
    let loaderWrapper = loading();

    getEl(accountListingsMount).insertBefore(loaderWrapper, getEl(listingsError));

    const sendListingsRequest = async () => {
        try {
            const listingsResponse = await axios.get(url, {
                params: {
                    post_status: post_status,
                    user_id: user_id,
                }
            })
                .then(response => {
                    let userPosts = {
                        posts: response.data
                    }

                    setState('user', {...state.user, ...userPosts})

                    if(state.user.posts) {
                        render();
                    }
                });
        } catch (error) {
            //TODO: better error handling
            console.error(error)
            loginErrorMsg(loginError, "Error what.");
            getEl(loginFormButton).classList.remove('loading');
        }
    }

    sendListingsRequest()
}

export function render()   {
    clearAccountListings();

    if( ! state.user.posts) {
        return;
    }

    state.user.posts.map((post: Post) => {
        const listing = createEl("div")
        listing.classList.add("item")
        console.log(post)
        listing.innerHTML = templateAccountListings(post);

        listing.querySelector(".item a").addEventListener('click', (event: any) => {
            event.preventDefault();

            setState("post", post)

        });

        getEl(accountListingsMount).append(listing);
    })
}

export function clearAccountListings() {
    getEl(accountListingsMount).innerHTML = "";
}
