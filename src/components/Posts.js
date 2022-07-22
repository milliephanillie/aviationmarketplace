import axios from "axios";

//import components
import { render as Post } from "./Post";

import {state, setState} from "../state";
import {getEl, createEl} from "../helpers";
import {listingsMount} from "../config";


export function init(event) {
    if (event) event.preventDefault()

    let route = "marketplace/v1/get_aircraft";
    let restUrl = state.restUrl + route;

    axios
        .get(restUrl, {
        params: {
            per_page: 5,
        }
    })
        .then(({data: aircraft}) => {
            setState("aircraft", aircraft.posts)
            render();
        })
}


export function render()   {
    clear();

    state.aircraft.map(aircraft => {
        const listing = createEl("div")
        listing.classList.add("item")
        listing.innerHTML = `
            <div class="item-inner">
                <div class="item-image">
                    <a href="">
                        <img src="${aircraft.thumbnail_url}" alt="Airplane"/>
                    </a>
                </div>
                <div class="item-content">
                    <div class="product-tag mb-5px">
                        <span>JET – 2014</span>
                        <span class="featured">FEATURED</span>
                    </div>
                    <div class="item-body">
                        <h4 class="m-0"><a href="#">Bombardier Challenger 300</a></h4>
                        <div class="item-company">
                            <p class="caption">Avpro Inc.</p>
                        </div>
                    </div>
                    <div class="price">
                        <span class="tagged">$12,495,000</span>
                    </div>
                </div>
            </div>
        `;

        listing.querySelector(".item a").addEventListener('click', event => {
            event.preventDefault();

            setState("post", post)
            Post();
        });

        getEl(listingsMount).append(listing);
    })
}

export function clear() {
    getEl(listingsMount).innerHTML = "";
}
