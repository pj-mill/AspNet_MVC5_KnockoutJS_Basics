define(['knockout', 'text!./components.html'], function (ko, ComponentzTemplate) {

    function ComponentzViewModel() {

        var self = this;

        self.guests = ko.observableArray([]);
        self.guests.push({ invoiceName: "Mary Jane", invoiceAdr: "1355 Market Street, Suite 900", invoiceAdr2: "San Francisco, CA 94103" });
        self.guests.push({ invoiceName: "Peter Murphy", invoiceAdr: "9855 Main Street", invoiceAdr2: "New York, NY 90546" });

        return self;
    }


    return { viewModel: ComponentzViewModel, template: ComponentzTemplate };
});
