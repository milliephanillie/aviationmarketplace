import axios from "axios";

//import components
import { render as Post } from "./Post";

import {state, setState} from "../state";
import {getEl, createEl, removeEl} from "../helpers";
import {listingsError, listingsFilters, listingsMount, loginFormButton} from "../config";
import {loading} from './Loading';


export function init(event, aircraftType = null) {
    if (event) event.preventDefault()

    console.log("INIT POSTS");

    initFilters();
    getPosts(aircraftType);
}

export function getPosts(aircraftType = '', user_id = null, post_status = 'any') {
    console.log("get posts is happening")
    let route = "marketplace/v1/get_aircraft";
    let restUrl = state.restUrl + route;
    const aircraft_type = aircraftType;

    console.log("aircraftType");
    console.log(restUrl);

    const sendPostsRequest = async () => {
        const loaderWrapper = loading();

        getEl(listingsMount).insertBefore(loaderWrapper, getEl(listingsError));

        try {
            const postsRequest = await axios
                .get(restUrl, {
                    params: {
                        per_page: 7,
                        aircraft_type: aircraft_type,
                    },
                    timeout: 10000,
                })
                .then(({data: aircraft}) => {
                    getEl(listingsMount).removeChild(loaderWrapper);

                    if(aircraft.error) {
                        let message = aircraft.error;
                        listingErrorMsg(listingsError, message)
                    } else {
                        setState("aircraft", aircraft.posts)
                        render();
                    }
                })
        } catch(error) {
            //TODO: better error handling
            console.error("errorrrorororor")
            console.error(error)
            getEl(listingsMount).removeChild(loaderWrapper);
            let message = error.message;
            listingErrorMsg(listingsError, message)

            // loginErrorMsg(loginError, "We could not fetch data for the username entered.");
            // getEl(loginFormButton).classList.remove('loading');
        }
    }

    sendPostsRequest();

    console.log("axios calllllll end");
}


export function render()   {
    clear();

    if( ! state.aircraft ) {
        return;
    }

    let grid = createEl('div');
    grid.classList.add('do-4');
    getEl(listingsMount).appendChild(grid);

    state.aircraft.map(aircraft => {
        const listing = createEl("div")
        listing.classList.add("item")
        listing.innerHTML = `
            <div class="item-inner">
                <div class="item-image" style="background: url('${aircraft.thumbnail_url}'); background-size:cover;">
                    <a class="item-image-link" href="/single.html"></a>
                </div>
                <div class="item-content">
                    <div class="product-tag mb-5px">
                        <span>${aircraft.category} ${aircraft.year ? '- ' + aircraft.year : '' }</span>
                        ${aircraft.listing_promotion ? `<span class="featured">FEATURED</span>` : ''} 
                    </div>
                    <div class="item-body">
                        <h4 class="m-0"><a href="/single.html">${aircraft.title}</a></h4>
                        <div class="item-company">
                            <p class="caption">${aircraft.seller}</p>
                        </div>
                    </div>
                    <div class="price">
                        <span class="tagged">${aircraft.price_tag}</span>
                    </div>
                </div>
            </div>
        `;

        listing.querySelector(".item a").addEventListener('click', event => {
            event.preventDefault();

            setState("post", post)
            Post();
        });

        grid.append(listing);
    })
}

export function initFilters() {
    console.log("categoryFilters")
    if(getEl(listingsFilters)) {
        console.log("categoryFilters 2")
        let categoryFilters = document.querySelectorAll(".category-filter");

        console.log("categoryFilters")
        console.log(categoryFilters)

        categoryFilters.forEach(filter => {
            filter.addEventListener("click", event => {
                event.preventDefault();
                categoryFilters.forEach(element => {
                    element.classList.remove('current');
                })
                filter.classList.add('current');
                console.log(filter.getAttribute('data-cat'));
                clear();
                let errorDiv = createEl('div');
                errorDiv.id = listingsError;
                getEl(listingsMount).append(errorDiv);
                getPosts(filter.getAttribute('data-cat'));
            })
        });
    }
}

export function clear() {
    getEl(listingsMount).innerHTML = "";
}

/**
 * Displays an error message when failed api requests
 *
 * @param el
 * @param msg
 */
export function listingErrorMsg(el, msg, remove = false) {
    if (!msg) {
        let msg = "There was an error";
    }

    let icon = '<i class="fa-solid fa-circle-exclamation"></i>';

    getEl(el).innerHTML = "<p>" + icon + " " + msg + "</p>";
}


