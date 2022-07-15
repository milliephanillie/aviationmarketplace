import axios from "axios";

import { state, setState } from "../state";
import { getEl } from "../helpers";
import { siteName, siteDescription } from "../config";


export function init() {
    getEl(siteName)
        .querySelector("a")
        .addEventListener("click", event => {
            event.preventDefault();
        })

    axios
        .get(state.restUrl)
        .then(({data: apiInfo}) => {
            console.log("aiInfo")
            console.log(apiInfo);
            setState("siteName", apiInfo.name);
            setState("siteDescription", apiInfo.description);
            update();
        })
        .catch(error => {
            console.error((error))
        });
}


export function update() {
    getEl(siteName).querySelector("a").innerText = state.siteName;
    getEl(siteDescription).innerText = state.siteDescription;
}
