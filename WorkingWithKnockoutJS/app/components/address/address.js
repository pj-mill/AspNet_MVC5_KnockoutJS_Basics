/*
A RequireJS 'component' module. 
Key thing to note here is use of the text plugin to load the greeting.html. 
Require does all the work to load the template and stuff it into the greeterTemplate parameter.
*/
define(['knockout', 'text!./address.html'], function (ko, greeterTemplate) {
    function greeterViewModel(params) {
        var self = this;

        self.name = ko.observable(params.name);
        self.adr = ko.observable(params.adr);
        self.adr2 = ko.observable(params.adr2);
        self.date = ko.observable(new Date());

        return self;
    }
    return { viewModel: greeterViewModel, template: greeterTemplate };
});

/*
THESE ARE SIMPLY ALTERNATIVES TO THE ABOVE

ko.components.register('greeter', {
    // The register method needs a config object with
    // 2 properties
    template: // template is a string with the HTML template to apply
    // Here we have directly hardcoded the string we originally
    // had in index.html
            "<div class='container-fluid'>" +
                "<div> Hello <span data-bind='text: greeting'></span></div>" +
                "<div> It is <span data-bind='text: date'></span></div>" +
            "</div>",

    viewModel: function(params){ // viewModel that can be an object or function
        greeting = ko.observable(params.name);
        date = ko.observable(new Date());
    }

});

$(function () {
    ko.applyBindings(); //We have removed the explicit reference to the viewModel
});


var viewModel = {
    greeting: ko.observable("Hello World"),
    date: ko.observable(new Date())
};

$(function () {
    ko.applyBindings(viewModel);
});

*/

