define(["jquery", "knockout", "text!./binding_custom.html"], function ($, ko, CustomBindingTemplate) {

    // Original code source: http://learn.knockoutjs.com/#/?tutorial=custombindings

    function Answer(text) {
        var self = this;

        self.answerText = text;
        self.points = ko.observable(0);

        return self;
    }

    function CustomBindingViewModel() {

        /**********************************************************************************************/
        // BINDING HANDLERS
        /**********************************************************************************************/
        // A binding handler for an animated transition
        ko.bindingHandlers.fadeVisible = {
            // 'init' - called when the binding first happens.
            // 'element' - the element to which it is bound
            // 'valueAccessor' - a function that returns the current value of the associated data
            init: function (element, valueAccessor) {
                // Start visible/invisible according to initial value
                var state = valueAccessor();
                $(element).toggle(state);
            },

            // 'update' - called whenever the associated data updates
            update: function (element, valueAccessor) {
                // On update, fade in/out
                var state = valueAccessor();
                state ? $(element).fadeIn() : $(element).fadeOut();
            }
        };


        // Used to display stars for each rating
        ko.bindingHandlers.starRating = {

            init: function (element, valueAccessor) {
                $(element).addClass("starRating");
                for (var i = 0; i < 5; i++)
                    $("<span>").appendTo(element);

                // Handle mouse events on the stars
                $("span", element).each(function (index) {
                    $(this).hover(
                        function () { $(this).prevAll().add(this).addClass("hoverChosen") },
                        function () { $(this).prevAll().add(this).removeClass("hoverChosen") }
                    )

                    .click(function () {
                        var observable = valueAccessor();  // Get the associated observable
                        observable(index + 1);               // Write the new rating to it
                    });
                });
            },

            update: function (element, valueAccessor) {
                // Give the first x stars the "chosen" class, where x <= rating
                var observable = valueAccessor();
                $("span", element).each(function (index) {
                    $(this).toggleClass("chosen", index < observable());
                });
            }
        };


        /**********************************************************************************************/
        // VARIABLES & METHODS
        /**********************************************************************************************/

        self.question = ko.observable("Which factors affect your technology choices?");
        self.pointsBudget = ko.observable(10);
        self.answers = ko.observableArray([ new Answer("Functionality"),
                                            new Answer("Pricing"),
                                            new Answer("Reviews"),
                                            new Answer("Brand Names")
        ])

        self.save = function () {
            alert('Cheers!')
        };

        self.pointsRemaining = ko.computed(function () {
            
            var total = 0;
            for (var i = 0; i < self.answers().length; i++) {
                total += self.answers()[i].points();
            }

            total = self.pointsBudget() - total;
            return total.toFixed(0);
        });

        self.pointsDisplay = ko.computed(function () {
            var rv = "";
            if(self.pointsRemaining() >= 0){
                rv = "You've got " + self.pointsRemaining() + " points left to use.";
            }
            else {
                var over = self.pointsRemaining() * -1;
                rv = "You've gone over your quota by " + over + " points.";
            }
            
            return rv;
        });
    }

    return { viewModel: CustomBindingViewModel, template: CustomBindingTemplate };
});