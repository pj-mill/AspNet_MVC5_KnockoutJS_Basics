define(["knockout", "text!./subtitle.html"], function (ko, subTitleTemplate) {
    function subTitleViewModel(params) {
        var self = this;

        self.title = ko.observable(params.title);
        self.url = ko.observable(params.url);

        return self;
    }
    return { viewModel: subTitleViewModel, template: subTitleTemplate };
});
