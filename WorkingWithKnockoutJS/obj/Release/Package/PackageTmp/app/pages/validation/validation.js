define(["knockout", "text!./validation.html", "knockout-validation"], function (ko, ValidationTemplate) {

    function ValidationViewModel() {

        var self = this;

        ko.validation.rules.pattern.message = 'Invalid.';

        // Forces number validation
        ko.extenders.numeric = function (target, precision) {
            //create a writable computed observable to intercept writes to our observable
            var result = ko.pureComputed({
                read: target,  //always return the original observables value
                write: function (newValue) {
                    var current = target(),
                        roundingMultiplier = Math.pow(10, precision),
                        newValueAsNum = isNaN(newValue) ? 0 : parseFloat(+newValue),
                        valueToWrite = Math.round(newValueAsNum * roundingMultiplier) / roundingMultiplier;

                    //only write if it changed
                    if (valueToWrite !== current) {
                        target(valueToWrite);
                    } else {
                        //if the rounded value is the same, but a different value was written, force a notification for the current field
                        if (newValue !== current) {
                            target.notifySubscribers(valueToWrite);
                        }
                    }
                }
            }).extend({ notify: 'always' });

            //initialize with current value to make sure it is rounded appropriately
            result(target());

            //return the new computed observable
            return result;
        };


        // Custom validation methods
        self.captchaValidator = function (val) { return val == 11; };
        self.mustEqualValidator = function (val, other) { return val == other; };

        // Field variables
        self.firstName = ko.observable().extend({ minLength: 2, maxLength: 10 });
        self.lastName = ko.observable().extend({ required: true});
        self.emailAddress = ko.observable().extend({ required: { message: 'Please supply your email address.' } }); // Custom Message
        self.age = ko.observable().extend({ min: 1, max: 100 });
        self.location = ko.observable();
        self.subscriptionOptions = ko.observableArray(['Technology', 'Music']);
        self.subscription = ko.observable().extend({ required: true });
        self.password = ko.observable().extend({ minlength: 6, message: "Password is required", maxLength: 12 });
        self.confirmPassword = ko.observable().extend({ validation: { validator: self.mustEqualValidator, message: 'Passwords do not match.', params: self.password } }); // Custom Validator
        self.captcha = ko.observable().extend({ validation: { validator: self.captchaValidator, message: 'Please check.' } }); // Custom Validator


        // Rounding numbers
        self.myNumberOne = ko.observable('221.2234').extend({ numeric: 0 });
        self.myNumberTwo = ko.observable('123.4525').extend({ numeric: 2 });


        // Totals errors for this view model
        self.errors = ko.validation.group(self);

        self.requireLocation = function () {
            self.location.extend({ required: true });
            self.errors.showAllMessages();
        };

        self.submit = function () {
            if (self.errors().length == 0) {
                //alert('Thank you.');
            } else {
                //alert('Please check your submission.');
                self.errors.showAllMessages();
            }
        };


        /*
        // Init KO Validation
        ko.validation.init({
            registerExtenders: true,
            messagesOnModified: true,
            insertMessages: true,
            parseInputAttributes: true,
            messageTemplate: null,
            errorElementClass: 'has-error',
            decorateElement: false,
            decorateElementOnModified: true
        });
        */

        ko.validation.registerExtenders();

        return self;

    }

    return { viewModel: ValidationViewModel, template: ValidationTemplate };

});
