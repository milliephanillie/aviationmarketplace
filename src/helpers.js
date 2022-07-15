import {isRenderedElement} from "jsdom/lib/jsdom/living/helpers/svg/render";

export

const getEl = id => document.getElementById(id);

export

const createEl = id => document.createElement(id);

export

const removeEl = el => {
    if (isRenderedElement(el)) getEl(el).remove();
}

export

const isRendered = el => {
    return getEl(el) ? true : false;
}
