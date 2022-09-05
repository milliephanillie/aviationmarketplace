import './css/index.css';
import * as $ from 'jquery';
import {
    wrapper,
    siteName,
    main,
    siteDescription,
    primary,
    sidebar,
    listingsMount,
    accountListingsMount, sellAircraft
} from "./config";

import {getEl, removeEl, createEl, isRendered } from "./helpers";
import {state, setState} from "./state";
import { init as Header } from "./components/Header";
import { init as Posts } from "./components/Posts";
import { init as Authentication } from "./components/Authentication";
import { init as AccountListings } from "./components/AccountListings";
import { init as AutocompleteManufacturer } from "./components/AutocompleteManufacturer";
import { init as UpdateAircraft } from "./components/UpdateAircraft";

(function init() {
    Authentication();
    Header();

    if( getEl(listingsMount) ) {
        console.log("posts should be happening")
        Posts();
    }

    if(getEl(accountListingsMount)) {
        AccountListings(null);
    }

    if(getEl(sellAircraft)) {
        AutocompleteManufacturer();
        UpdateAircraft();
    }
})();

import Splide from '@splidejs/splide';

var num = 20;

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

var uuid = 'bdc07dec-7c84-5059-93e5-4dcf96d11d83';
var app_name = "Marketplace";
var success_url = "";
var reject_url = "";
var rest = 'https://dev.flyingindex.php?rest_route=/'

$('.testing').on('click', function (e) {
    e.preventDefault();

    $.ajax({
        "method": "GET",
        "url": "https://staging.flyingmag.com/wp-json",
        "data": {
            "title": "This is coming from js"
        },
    }).done(function (msg) {
        console.log(msg);
    });
});

$('.loginForm').on('submit', function (e) {
    e.preventDefault();

    const creds = {
        username: $(this).find('.username').val(),
        password: $(this).find('.password').val()
    };
});

$('.js-view-all, .close').click(function (e) {
    e.preventDefault();

    $('body').toggleClass('modal-open');
});

if ($('.splide').length) {
    const splide = new Splide('.splide', {
        perPage: 1,
        perMove: 1,
        focus: 'center',
        trimSpace: false,
    });

    splide.mount();
}







