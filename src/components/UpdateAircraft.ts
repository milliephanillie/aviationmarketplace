import * as $ from "jquery";
import {state, setState} from "../state";
import {getEl} from "../helpers";
import {
    listingsMount,
    sellAircraft,
    sellAircraftType,
    sellErrorMsg,
    sellPostID,
    sellPostTitle,
    updateAircraft
} from "../config";
import axios from "axios";
import {setAutocomplete} from "./AutocompleteManufacturer";
import Cookies from "js-cookie";

export function init() {
    const restUrl = state.restUrl;
    const update = getEl(updateAircraft);
    let token = Cookies.get(state.token);

    console.log(token)

    update.addEventListener('click', event => {
        event.preventDefault();

        let post_id: any = getEl(sellPostID).getAttribute('data-id') || 0;
        let title: string;
        let aircraft_type: string;

        if( getEl(sellPostTitle) ) {
            title = (<HTMLInputElement>getEl(sellPostTitle)).value;
        }

        let formFields = document.querySelectorAll('.form-field.sell-a-form');
        let fix = null;

        formFields.forEach(el => {
            /* must type cast el because of typescript */
            let element = (<HTMLInputElement>el);

            if( ! element.value && element.hasAttribute('required') ) {
                element.classList.add('required');
                fix = true;
            } else {
                element.classList.remove('required')
            }
        })

        if (fix) {
            errorMsg(sellErrorMsg)
        } else {

            if( getEl(sellAircraftType) ) {
                aircraft_type =  (<HTMLInputElement>getEl(sellAircraftType)).value;
            }

            let condition: any = $('.form-field-condition').val();
            let price: any = $('.price').val();
            let description: any = $('.description').val();
            let city: any = $('.form-field-city').val();
            let state: any = $('.form-field-state').val();
            let year: any = $('.form-field-year').val();
            let manufacturer: any = $('.form-field-manufacturer').val();
            let model: any = $('.form-field-model').val();
            let serial_number: any = $('.form-field-serial-number').val();
            let registration_number: any = $('.form-field-registration-number').val();

            let total_time: any = $('.form-field-total-time').val();
            let landings: any = $('.form-field-landings').val();
            let load: any = $('.form-field-load').val();
            let maintenance: any = $('.form-field-maintenance').val();
            let airframe_notes: any = $('.form-field-airframe-notes').val();

            let num_seats: any = $('.form-field-num-seats').val();
            let field_wifi: any = $('.form-field-field-wifi').val();

            let interior: any = $('.form-field-interior').val();
            let exterior: any = $('.form-field-exterior').val();
            let engine_1: any = $('.form-field-engine-1').val();
            let engine_2: any = $('.form-field-engine-2').val();
            let engine_3: any = $('.form-field-engine-3').val();
            let avionic: any = $('.form-field-avionic').val();
            let prop: any = $('.form-field-prop').val();

            let data = {
                'ID': post_id,
                'post_title': title,
                'aircraft_type': aircraft_type,
            }

            getEl(updateAircraft).classList.add('loading');

            const sendAirplaneUpdate = async () => {
                const namespace = 'marketplace/v1/';
                let route = 'update_aircraft';
                let url = restUrl + namespace + route;

                try {
                    const airplaneUpdateRequest = await axios.post(url, data, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token,
                        }
                    })
                        .then(res => {
                            if (200 === res.status) {
                                console.log("res");
                                console.log(res)
                                if(res.data.post.ID) {
                                    errorMsg(sellErrorMsg, "Success.")
                                }
                            }
                        });
                } catch (error) {
                    errorMsg(sellErrorMsg, error.message)
                }

                getEl(updateAircraft).classList.remove('loading');
            }

            sendAirplaneUpdate();
        }
    })
}


/**
 * Displays an error message when failed login attempts happen
 *
 * @param el
 * @param msg
 */
export function errorMsg(el: string, msg: any = null) {
   if( ! msg ) {
       msg = "Please fill out the required fields";
   }

    let icon = '<i class="fa-solid fa-circle-exclamation"></i>';

    getEl(el).innerHTML = "<p>" + icon + " " + msg + "</p>";
}