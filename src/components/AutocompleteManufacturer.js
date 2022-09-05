import autocomplete from "autocompleter";
import {mfAutocomplete} from "../config";
import {getEl} from "../helpers";
import axios from "axios";

export function init() {
    const sendMfRequest = async() => {
        let namespace = 'marketplace/v1/';
        let route = 'mf_search';
        let url = state.restUrl + namespace + route;
        let term = '';

        try {
            const mfRequest = await axios.get(url, {
                params: {
                    term: term,
                }
            })
                .then(res => {
                    if (res.ok) {
                        setAutocomplete(res);
                    }
                });
        } catch (error) {

        }
    }
}

export function setAutocomplete(data) {
    const input = getEl(mfAutocomplete);

    autocomplete({
        input: input,
        fetch: function(text, update) {
            text = text.toLowerCase();
            // you can also use AJAX requests instead of preloaded data
            let suggestions = data.filter(n => n.label.toLowerCase().startsWith(text))
            update(suggestions);
        },
        onSelect: function(item) {
            input.value = item.label;
        }
    })
}