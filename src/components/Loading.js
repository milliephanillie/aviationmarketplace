import {createEl} from "../helpers";

export function loading() {
    let loaderWrapper = createEl('div');
    loaderWrapper.id = "loader-wrapper";
    loaderWrapper.classList.add('fa-3x', 'loader-wrapper');

    let loader = createEl('i')
    loader.classList.add('fas', 'fa-circle-notch', 'fa-spin');
    loaderWrapper.appendChild(loader);

    return loaderWrapper;
}