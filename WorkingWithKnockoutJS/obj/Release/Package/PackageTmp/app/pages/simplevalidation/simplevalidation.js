define(["knockout", "knockout.validation", "text!./simplevalidation.html"], function (ko, validation, simpleValidationTemplate) {

    var simpleValidationViewModel = function (params){

        ko.validation.init({
            insertMessages: false,
            decorateElement: true,
            errorElementClass: 'invalid',
            messagesOnModified: false,
            decorateElementOnModified: false,
            parseInputAttributes: true
        });

        var self = this;

        self.title = ko.observable('KnockoutJS - Simple Validation');

        self.textValue = ko.observable("");
        self.integerValue = ko.observable(0);

        self.calculatedInteger = ko.computed(function () {
            return parseInt(self.integerValue()) + 5;
        }, self);

        return self;
    }

    var viewmodel = ko.validatedObservable(new simpleValidationViewModel());

    return { viewModel: viewmodel, template: simpleValidationTemplate };
});
