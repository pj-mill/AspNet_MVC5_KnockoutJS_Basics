define(['knockout', 'text!./binding_list.html'], function (ko, BindingListTemplate) {

    function SeatReservation(name , initialMeal) {

        var self = this;

        self.name = ko.observable(name);
        self.meal = ko.observable(initialMeal);

        self.formattedPrice = ko.computed(function () {
            var price = self.meal().price;
            return price ? "€" + price.toFixed(2) : "No Charge";
        });

        //return self;
    }

    function BindingListViewModel() {

        var self = this;

        // Non-editable catalog data - would come from the server
        self.availableMeals = [
            { mealName: "Standard (sandwich)", price: 10 },
            { mealName: "Premium (lobster)", price: 34.95 },
            { mealName: "Ultimate (whole zebra)", price: 290 }
        ];

        // Editable data
        self.seats = ko.observableArray([
            new SeatReservation("Steve", self.availableMeals[0]),
            new SeatReservation("Alan", self.availableMeals[2])
        ]);


        self.addSeat = function () {
            self.seats.push(new SeatReservation("", self.availableMeals[0]));
        }

        self.removeSeat = function (seat) {
            self.seats.remove(seat);
        };

        self.totalSurcharge = ko.computed(function () {
            var total = 0;
            var rv = '';
            for (var i = 0; i < self.seats().length; i++) {
                total += self.seats()[i].meal().price;
            }
            rv = "€" + total.toFixed(2);
            return  rv;
        });

    }


    return { viewModel: BindingListViewModel, template: BindingListTemplate };
});
