define(["knockout", "text!./home.html"], function (ko, homeTemplate) {

    function homeViewModel(params) {

        var self = this;

        self.title = ko.observable('KnockoutJS - Components');
        self.guests = ko.observableArray([]);
        self.guests.push({ guestName: "Mary" });
        self.guests.push({ guestName: "Jane" });
        self.guests.push({ guestName: "Peter" });

        return self;
    }

    return { viewModel: homeViewModel, template: homeTemplate };
});
