/*
We've created a require global variable that has three properties, baseUrl, paths and shim.
The baseUrl property sets the root location with respect to which all other paths will be considered.

The paths property is assigned an object with name value pairs corresponding to the library names and their relative locations. 
Not the .js is stripped away from the paths.

The shim property provides additional dependency information. Here it shows bootstrap is dependent of jquery. 
The value ‘jquery’ matches the name used in ‘paths’ below.
*/
var require = {
    baseUrl: "/",
    paths: {
        "bootstrap": "Scripts/bootstrap/bootstrap",
        "historyjs": "Scripts/history/native.history",
        "crossroads": "Scripts/crossroads/crossroads",
        "jquery": "Scripts/jquery/jquery-1.9.1",
        "knockout": "Scripts/knockout/knockout-3.4.0",
        "knockout-projections": "Scripts/knockout/knockout-projections",
        "knockout-validation": "Scripts/knockout/knockout.validation",
        "signals": "Scripts/crossroads/signals",
        //"hasher": "Scripts/crossroads/hasher", // replaced with historyjs
        "text": "Scripts/require/text"
    },
    shim: {
        "bootstrap": {
            "deps": ["jquery"]
        },
        "knockout.validation": {
            "deps": ["knockout"]
        }
    }
}