const state = {
    restUrl: "https://dev.flying/wp-json/",
    siteName: "Aviation Marketplace by FLYING",
    siteDescription: "Aviation marketplace"
}

const setState = (toSet, newValue) => {
    state[toSet] = newValue;
}

export {state, setState};
