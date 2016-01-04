/*
ROUTING USING HasherJS

To use this
A) Uncommment the line '"hasher": "Scripts/crossroads/hasher",' in require.configure.js file
B) Rename this file to router.js
*/
define(["jquery", "knockout", "crossroads", "hasher"], function ($, ko, crossroads, hasher) {

    return new Router({
        routes: [
            { url: '', params: { page: 'home' } },
            { url: 'settings', params: { page: 'settings' } }
        ]
    });

    function Router(config) {
        var currentRoute = this.currentRoute = ko.observable({});

        ko.utils.arrayForEach(config.routes, function (route) {
            crossroads.addRoute(route.url, function (requestParams) {
                currentRoute(ko.utils.extend(requestParams, route.params));
            });
        });

        crossroads.routed.add(console.log, console);
        activateCrossroads();
    }

    function activateCrossroads() {

        //setup hasher
        function parseHash(newHash, oldHash) {
            crossroads.parse(newHash);
        }

        function changeHash(newHash, oldHash) {
            var route = newHash;
            crossroads.parse(newHash);
        }

        crossroads.normalizeFn = crossroads.NORM_AS_OBJECT;

        hasher.initialized.add(parseHash);//parse initial hash
        hasher.changed.add(changeHash);//parse hash changes
        hasher.init();//start listening for history change
    }
});