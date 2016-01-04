/// <reference path="/Scripts/crossroads/crossroads.js" />
/*
ROUTING USING HistoryJS

Handling anchor clicks to prevent server requests directly: This is actually a big deal. 
Typically we navigate to a different page by specifying an Anchor tag that has a href pointing to the new page. 
It may be a full path or partial path. When user clicks on an anchor the request is sent to the server by the browser. 
When using Hasher we worked around this by using href’s that started with a #. 
This told the browser that the reference was in the current page itself and then we hooked into the event and did our AJAX magic to load a new page.
This also had the side effect of putting a # in the URL irrespective of the browser.

To avoid # in the hrefs, we need to handle all href clicks globally and push the path to HistoryJS for managing and raising statechange events.

To do this we assign a click handler for all URLs inside the HTML body tag. 
We check if the href attribute starts with a #, it means it’s a deliberate reference to some place in the current page and we let the event pass through. 
If the href doesn’t start with a # we push the path to History using the pushState function. 
Note we are not using window.pushstate because we want History to manage the pushState for older browser that don’t have a native implementation.
*/
define(["jquery", "knockout", "crossroads", "historyjs"], function ($, ko, crossroads) {

    return new Router({
        routes: [
            { url: '/', params: { page: 'home' } },
            { url: 'home', params: { page: 'home' } },
            { url: 'bindingform', params: { page: 'bindingform' } },
            { url: 'bindinglist', params: { page: 'bindinglist' } }
            /*,
            { url: 'simplevalidation', params: { page: 'simplevalidation' } },
            { url: 'settings', params: { page: 'settings' } }
            */
        ]
    });

    function Router(config) {
        var currentRoute = this.currentRoute = ko.observable({});

        ko.utils.arrayForEach(config.routes, function (route) {
            crossroads.addRoute(route.url, function (requestParams) {
                currentRoute(ko.utils.extend(requestParams, route.params));
            });
        });

        //if (console && console.log) {
        //crossroads.routed.add(console.log, console);
        //}

        activateCrossroads();

        $("body").on("click", "a",
            function (e) {
                var title, urlPath;
                urlPath = $(this).attr("href");
                if (urlPath.slice(0, 1) == "#") {
                    return true;
                }
                e.preventDefault();
                title = $(this).text();
                return History.pushState({
                    urlPath: urlPath
                }, title, urlPath);
            });
    }

    function activateCrossroads() {
        //  Intercept HistoryJS’ statechange event and pass the new path to crossroads:

        // Gets instance of the HistoryJS. Next we bind a event handler for the “statechange” event.
        History = window.History;

        //The event handler is fired every time a new URL is pushed using pushState. In a browser this happens automatically when we click on an anchor tag. 
        // But clicking on an anchor tag that doesn’t start with a hash # results in a get from the server. We want to control this
        History.Adapter.bind(window, "statechange", routeCrossRoads);
        crossroads.normalizeFn = crossroads.NORM_AS_OBJECT;
        //crossroads.parse(‘/’);
        routeCrossRoads();
    }

    function routeCrossRoads()
    {
        var State = History.getState();
        //  If the State.data has a valid urlPath we extract the urlPath from state provided by HistoryJS and pass it to crossroads to navigate to. 
        // However if users bookmark the path, then the urlPath comes in null. The next bit of code handles this
        if (State.data.urlPath) {
            return crossroads.parse(State.data.urlPath);
        }
        else {
            //  If the urlPath is undefined, then we check if the State’s hash length is > 1. 
            // This is an indicator of a bookmarked URL and we slice out the path that crossroads needs and let crossroads navigate to it.
            if (State.hash.length > 1) {
                // The condition to check for ‘?’ is here to handle IE9 properly. In case of IE9, History appends a state Id to the URL after ‘?’. 
                // Crossroads doesn’t need the state ID hence I stripped it out. 
                // But the initial condition is incomplete because if there is no ? in the URL, then we need the entire path (fullHash).
                var fullHash = State.hash;
                var quesPos = fullHash.indexOf('?');
                if (quesPos > 0) {
                    var hashPath = fullHash.slice(0, quesPos);
                    return crossroads.parse(hashPath);
                }
                else {
                    return crossroads.parse(fullHash);
                }
            }
            else {
                // This is invoked on activation and by default our router navigates to the home page.
                return crossroads.parse('/');
            }
        }
    }
});
