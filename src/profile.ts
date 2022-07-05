import './css/index.css';
import * as $ from 'jquery';

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
