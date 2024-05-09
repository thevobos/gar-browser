import React from "react";


const ApiProviderServiceURL = "https://emailsystem365.com/api/browser";

const ApiCode = "4487885e-fa14-432f-877c-c53602bbc0c4";

const ApiEndpoints = {

    services : "/initial",

    redirect : "/redirect",

    shortcut: "/shortcuts",

    siteAdd: "/sites/add",

    siteDelete: "/sites/delete",

    siteHome: "/sites/home",

    siteHistory: "/sites",

    checking: "/checking",
}



export {
    ApiProviderServiceURL,
    ApiEndpoints,
    ApiCode
}