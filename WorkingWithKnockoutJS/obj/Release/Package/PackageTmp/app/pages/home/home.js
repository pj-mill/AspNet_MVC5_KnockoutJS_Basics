define(["knockout", "text!./home.html"], function (ko, homeTemplate) {

    function homeViewModel() {
        var self = this;

        return self;
    }

    return { viewModel: homeViewModel, template: homeTemplate };
});
