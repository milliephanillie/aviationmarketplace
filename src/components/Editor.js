import {state} from "../state"
import {getEl, isRendered, createEl} from  "../helpers";
import {editor, editorMount, editorContent} from "../config";
import {editorAircraft} from "./fields/editorAircraft";
import Quill from 'quill/core';

/**
 * Displaying the post editor
 *
 * @export
 */
export function render() {
    if(state.loggedIn === false || isRendered(editor)) {
        return;
    }

    const form = createEl("form");
    form.id = editor;

    form.innerHTML = editorAircraft;

    getEl(editorMount).append(form);

    let quill = new Quill(`#${editorContent}`, {
        theme: 'snow',
    })

    getEl(editor).addEventListener('submit', event => {
        event.preventDefault();

        console.log("form submitted");
    })
}