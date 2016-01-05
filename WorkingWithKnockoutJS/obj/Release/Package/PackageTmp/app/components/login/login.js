define(['knockout','text!./login.html'], function(ko , LoginTemplate){

    function LoginViewModel(params){
        var self = this;

        self.email = ko.observable("");
        self.password = ko.observable("");

        self.message = ko.computed(function () {
            return "You have signed in: " + self.email();
        });

        self.signin = function () {
            alert(self.message());
        }

        return self;
    }

    return { viewModel: LoginViewModel, template: LoginTemplate };
});
