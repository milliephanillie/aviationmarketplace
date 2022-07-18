import axios from "axios";

import { state, setState } from "../state";
import { getEl } from "../helpers";
import { aircraftTypes } from "../config";

export function init() {
    getEl(siteName)
        .querySelector("a")
        .addEventListener("click", event => {
            event.preventDefault();
        })

    axios
        .get(state.restUrl)
        .then(({data: apiInfo}) => {
            setState("airCraftTypes", apiInfo.name);
            setState("siteDescription", apiInfo.description);
            update();
        })
        .catch(error => {
            console.error((error))
        });
}

export function update() {
    getEl(aircraftTypes).innerText = state.siteName;
}

