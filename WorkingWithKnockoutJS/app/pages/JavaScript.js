ko.validation.rules.pattern.message = 'Invalid.';


ko.validation.configure({
    registerExtenders: true,
    messagesOnModified: true,
    insertMessages: true,
    parseInputAttributes: true,
    messageTemplate: null
});


var captcha = function (val) {
    return val == 11;
};

var mustEqual = function (val, other) {
    return val == other();
};

var viewModel = {
    firstName: ko.observable().extend({ minLength: 2, maxLength: 10 }),
    lastName: ko.observable().extend({ required: true }),
    emailAddress: ko.observable().extend({  // custom message
        required: { message: 'Please supply your email address.' }
    }),
    age: ko.observable().extend({ min: 1, max: 100 }),
    location: ko.observable(),
    subscriptionOptions: ['Technology', 'Music'],
    subscription: ko.observable().extend({ required: true }),
    password: ko.observable(),
    captcha: ko.observable().extend({  // custom validator
        validation: { validator: captcha, message: 'Please check.' }
    }),
    submit: function () {
        if (viewModel.errors().length == 0) {
            alert('Thank you.');
        } else {
            alert('Please check your submission.');
            viewModel.errors.showAllMessages();
        }
    }
};

viewModel.confirmPassword = ko.observable().extend({
    validation: { validator: mustEqual, message: 'Passwords do not match.', params: viewModel.password }
}),

viewModel.errors = ko.validation.group(viewModel);

viewModel.requireLocation = function () {
    viewModel.location.extend({ required: true });
};

ko.applyBindings(viewModel);