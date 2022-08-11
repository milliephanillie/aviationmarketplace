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
    accountListingsMount
} from "./config";

import {getEl, removeEl, createEl, isRendered } from "./helpers";
import {state, setState} from "./state";
import { init as Header } from "./components/Header";
import { init as Posts } from "./components/Posts";
import { init as Authentication } from "./components/Authentication";
import { init as AccountListings } from "./components/AccountListings";

console.log("state th index");

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
var rest = 'https://dev.fklyingindex.php?rest_route=/'

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


$('.js-update-aircraft, .js-save-aircraft-draft').on('click', function (e) {
    e.preventDefault();

    let post_id = $('#post-id').attr('data-id');
    let title = $('.form-field-title').val();
    let category = $('.form-field-category').val();
    let condition = $('.form-field-condition').val();
    let price = $('.price').val();
    let description = $('.description').val();

    let city = $('.form-field-city').val();
    let state = $('.form-field-state').val();
    let year = $('.form-field-year').val();
    let manufacturer = $('.form-field-manufacturer').val();
    let model = $('.form-field-model').val();
    let serial_number = $('.form-field-serial-number').val();
    let registration_number = $('.form-field-registration-number').val();

    let total_time = $('.form-field-totaltime').val();
    let landings = $('.form-field-landings').val();
    let load = $('.form-field-load').val();
    let maintenance = $('.form-field-maintenance').val();
    let airframe_notes = $('.form-field-airframe-notes').val();

    let num_seats = $('.form-field-num-seats').val();
    let field_wifi = $('.form-field-field-wifi').val();

    let interior = $('.form-field-interior').val();
    let exterior = $('.form-field-exterior').val();
    let engine_1 = $('.form-field-engine-1').val();
    let engine_2 = $('.form-field-engine-2').val();
    let engine_3 = $('.form-field-engine-3').val();
    let avionic = $('.form-field-avionic').val();
    let prop = $('.form-field-prop').val();

    let data = {
        'ID': post_id || 0,
        'post_title': String(title),
        'condition': String(condition),
        'price': Number(price),
        'category': String(category),
        'year': Number(year),
    }

    let baseApi = 'https://staging.flyingmag.com/wp-json/';
    let namespace = 'marketplace/v1/';
    let route = 'update_aircraft'

    let url = baseApi + namespace + route;

    let settings = {
        url: url,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(data)
    }

    let request = $.ajax(settings);

    request.done(function (msg) {
        console.log(msg)
    })
})


