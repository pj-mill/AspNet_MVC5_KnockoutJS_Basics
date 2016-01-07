define(["knockout", "text!./sectiontitle.html"], function (ko, SectionTitleTemplate) {

    function SectionTitleViewModel(params) {
        var self = this;

        self.title = ko.observable(params.title);
        self.url = ko.observable(params.url);

        return self;
    }

    return { viewModel: SectionTitleViewModel, template: SectionTitleTemplate };
});