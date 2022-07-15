import './css/index.css';
import * as $ from 'jquery';
import {wrapper, siteName, main, siteDescription, primary, sidebar} from "./config";
import {getEl, removeEl, createEl, isRendered } from "./helpers";
import {state, setState} from "./state";
import { init as Header } from "./components/Header";

(function init() {
    Header();
})();

var num = 20;

console.log(state);

const navigation = () => {
    if ($(window).scrollTop() > num) {
        $('.nav-header').addClass('fixed');
    } else {
        $('.nav-header').removeClass('fixed');
    }
}

navigation();

document.addEventListener('scroll', navigation);

$('.accord-dd-label').on('click', function (e) {
    e.preventDefault();

    $(this).toggleClass('clicked');
    $('.accordian').find('.open').not('.clicked').removeClass('open');
    $(this).toggleClass('open');
    $(this).toggleClass('clicked');
})
